import { motion, AnimatePresence } from "motion/react";
import { Globe, Check } from "lucide-react";
import { useState } from "react";
import { languages, translations, LanguageCode } from "../translations";

interface LanguageSelectorProps {
  isOpen: boolean;
  onSelect: (language: string) => void;
  language: LanguageCode;
}

export function LanguageSelector({ isOpen, onSelect, language }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const t = translations[language].languageSelector;

  const handleSelect = (code: string) => {
    setSelectedLanguage(code);
    setTimeout(() => {
      onSelect(code);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md mx-4"
          >
            <div
              className="absolute -inset-1 rounded-3xl opacity-50 blur-xl"
              style={{ backgroundImage: "linear-gradient(to right, #7B3FF2, #9B5BFF)" }}
            />

            <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              <div className="flex flex-col items-center gap-5 sm:gap-6">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundImage: "linear-gradient(135deg, #7B3FF2, #9B5BFF)" }}
                >
                  <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl mb-2 text-gray-900">{t.title}</h2>
                  <p className="text-sm sm:text-base text-gray-600 px-2">{t.subtitle}</p>
                </div>

                <div className="w-full space-y-3">
                  {languages.map((lang, index) => (
                    <motion.button
                      key={lang.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(lang.code)}
                      style={selectedLanguage === lang.code
                        ? {
                            backgroundImage: "linear-gradient(to right, #7B3FF2, #9B5BFF)",
                            color: "white",
                            boxShadow: "0 10px 15px -3px rgba(123, 63, 242, 0.5)"
                          }
                        : {}
                      }
                      className={`
                        w-full p-4 sm:p-5 rounded-2xl transition-all duration-300
                        ${selectedLanguage === lang.code ? '' : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-2xl sm:text-3xl">{lang.flag}</span>
                          <span className="text-base sm:text-lg">{lang.name}</span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                          >
                            <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
