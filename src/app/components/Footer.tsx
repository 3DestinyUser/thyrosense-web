import { translations, LanguageCode } from "../translations";

interface FooterProps {
  language: LanguageCode;
}

export function Footer({ language }: FooterProps) {
  const footer = translations[language].footer;

  return (
    <footer className="w-full px-4 py-4 text-center text-xs leading-relaxed text-gray-600">
      <div className="max-w-5xl mx-auto space-y-1">
        <p className="mb-0 leading-none">{footer.code}</p>
        <p className="mb-0 leading-none">{footer.line1}</p>
        <p className="mb-0 leading-none">{footer.line2}</p>
        {footer.address && <p className="mb-0 leading-none">{footer.address}</p>}
        <p className="mb-0 leading-none">{footer.rights}</p>
      </div>
    </footer>
  );
}
