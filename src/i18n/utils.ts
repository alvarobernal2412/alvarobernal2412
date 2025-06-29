import { translations, type Language } from './translations';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Language;
  return 'en';
}

export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
}

export function getStaticPaths() {
  return [
    { params: { lang: 'en' } },
    { params: { lang: 'es' } }
  ];
}