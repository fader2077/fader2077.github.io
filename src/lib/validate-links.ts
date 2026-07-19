export const isSafeExternalUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'mailto:';
  } catch {
    return false;
  }
};

export const isSafeInternalPath = (value: string) =>
  value.startsWith('/') && value !== '/' + '#' && !value.includes('javascript:');
