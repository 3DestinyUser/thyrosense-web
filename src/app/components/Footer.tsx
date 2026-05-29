import { translations, LanguageCode } from '../translations';

interface FooterProps {
  lang: LanguageCode;
}

export const Footer = ({ lang }: FooterProps) => {
  const t = translations[lang].footer;

  return (
    <footer className="w-full py-8 px-6 mt-auto border-t border-gray-100 bg-white/50">
      <div className="max-w-5xl mx-auto flex flex-col space-y-2 text-center text-gray-400 text-[10px] sm:text-[11px] leading-relaxed">
        <p className="font-bold text-gray-500 uppercase tracking-wider">{t.code}</p>
        <p>{t.line1}</p>
        <p>{t.line2}</p>
        {t.address && <p className="italic">{t.address}</p>}
        <p className="pt-4 font-semibold text-gray-400">{t.rights}</p>
      </div>
    </footer>
  );
};