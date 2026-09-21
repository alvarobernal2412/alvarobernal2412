import { translations, languages, type Language } from './translations';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Language;
  return 'en';
}

export function useContent(lang: Language) {
  return translations[lang];
}

export function getLocalizedPath(lang: Language) {
  return lang === 'en' ? '/' : `/${lang}/`;
}

export { languages };
