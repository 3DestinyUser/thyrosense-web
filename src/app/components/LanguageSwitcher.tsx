import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { languages, LanguageCode } from "../translations";

interface LanguageSwitcherProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 hover:shadow-xl transition-all"
        >
          <span className="text-lg sm:text-xl">{currentLang?.flag}</span>
          <span className="text-xs sm:text-sm font-medium text-gray-900">{currentLang?.code.toUpperCase()}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40"
              />

              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-44 sm:w-48 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 overflow-hidden z-50"
              >
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileHover={{ backgroundColor: "#7B3FF20D" }}
                    onClick={() => {
                      onLanguageChange(lang.code as LanguageCode);
                      setIsOpen(false);
                    }}
                    style={currentLanguage === lang.code ? { backgroundColor: "#F5F3FF" } : {}}
                    className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors"
                  >
                    <span className="text-xl sm:text-2xl">{lang.flag}</span>
                    <span className={`text-xs sm:text-sm font-medium ${currentLanguage === lang.code ? "text-violet-700" : "text-gray-900"}`}>
                      {lang.name}
                    </span>
                    {currentLanguage === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-600"
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
