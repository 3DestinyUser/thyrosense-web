import { AnimatePresence, motion } from "motion/react";
import { translations, LanguageCode } from "../translations";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrImage: string;
  language: LanguageCode;
}

export function QrCodeModal({ isOpen, onClose, qrImage, language }: QrCodeModalProps) {
  const t = translations[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md mx-4"
          >
            <div
              className="absolute -inset-1 rounded-3xl opacity-50 blur-2xl animate-pulse"
              style={{ backgroundImage: "linear-gradient(to right, #F59E0B, #FBBF24, #F59E0B)" }}
            />

            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-2xl sm:text-3xl text-center text-white">
                  {t.contentSelector.scanQR}
                </h2>

                <div className="rounded-2xl bg-white p-4 shadow-xl">
                  <img
                    src={qrImage}
                    alt={t.contentSelector.scanQR}
                    className="w-64 h-64 sm:w-72 sm:h-72"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-sm sm:text-base border border-white/10 transition-all duration-300"
                >
                  {t.videoInstructions.cancel}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
