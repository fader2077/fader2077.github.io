import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const publicRoutes = ['/', '/projects.html', '/publications.html', '/cv.html'];

for (const route of publicRoutes) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')).toEqual([]);
  });
}

test('homepage follows configured section order and hides disabled sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-section-id]').first()).toHaveAttribute('data-section-id', 'hero');
  await expect(page.locator('[data-section-id="notes"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Edge AI Object Detection on KV260/ })).toHaveAttribute('href', /edge-ai-object-detection-kv260/);
});

test('project routes exclude drafts and keep case studies reachable', async ({ page, request }) => {
  await page.goto('/projects.html');
  await expect(page.getByRole('heading', { name: 'Edge AI Object Detection on KV260' })).toBeVisible();
  await expect(page.getByText('Agentic GraphRAG Evidence Sufficiency')).toHaveCount(0);
  expect((await request.get('/projects/agentic-graphrag-evidence-sufficiency/')).status()).toBe(404);
});

test('publication filters update visible records and support reset', async ({ page }) => {
  await page.goto('/publications.html');
  const items = page.locator('[data-publication]');
  const total = await items.count();
  await page.getByLabel('Publication type').selectOption('journal');
  expect(await items.filter({ visible: true }).count()).toBeLessThan(total);
  await expect(page.locator('[data-publication]:visible')).toHaveCount(3);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.locator('[data-publication]:visible')).toHaveCount(total);
});

test('CV is data-driven and exposes print control', async ({ page }) => {
  await page.goto('/cv.html');
  await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Print CV' })).toBeVisible();
  await expect(page.locator('[data-verified-publication-count]')).toHaveText('2');
});

test('mobile menu is keyboard operable and returns focus', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'), 'mobile viewport only');
  await page.goto('/');
  const trigger = page.locator('button[aria-controls="mobile-navigation-panel"]');
  await expect(trigger).toHaveAccessibleName('Open navigation');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('pages emit structured data and no browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
  await page.goto('/');
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain('Person');
  await page.goto('/projects/edge-ai-object-detection-kv260/');
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain('CreativeWork');
  expect(errors).toEqual([]);
});
