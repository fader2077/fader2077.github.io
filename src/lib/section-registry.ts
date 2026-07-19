import AwardsSection from '../components/home/AwardsSection.astro';
import ContactSection from '../components/home/ContactSection.astro';
import CurrentResearchSection from '../components/home/CurrentResearchSection.astro';
import CustomMarkdownSection from '../components/home/CustomMarkdownSection.astro';
import ExperienceSection from '../components/home/ExperienceSection.astro';
import FeaturedProjectsSection from '../components/home/FeaturedProjectsSection.astro';
import HeroSection from '../components/home/HeroSection.astro';
import PublicationsSection from '../components/home/PublicationsSection.astro';
import SkillsSection from '../components/home/SkillsSection.astro';

export const sectionRegistry = {
  hero: HeroSection,
  'featured-projects': FeaturedProjectsSection,
  'current-research': CurrentResearchSection,
  publications: PublicationsSection,
  experience: ExperienceSection,
  awards: AwardsSection,
  skills: SkillsSection,
  contact: ContactSection,
  'custom-markdown': CustomMarkdownSection,
} as const;
