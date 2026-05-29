import { motion, AnimatePresence } from "motion/react";
import { Glasses, MousePointerClick, RotateCw } from "lucide-react";
import { translations, LanguageCode } from "../translations";

interface VideoInstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  language: LanguageCode;
}

export function VideoInstructionModal({ isOpen, onClose, onStart, language }: VideoInstructionModalProps) {
  const t = translations[language].videoInstructions;
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
            className="relative w-full max-w-2xl mx-4"
          >
            <div
              className="absolute -inset-1 rounded-3xl opacity-50 blur-2xl animate-pulse"
              style={{ backgroundImage: "linear-gradient(to right, #7B3FF2, #9B5BFF, #7B3FF2)" }}
            />

            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/10">
              <div className="flex flex-col items-center gap-6 sm:gap-8">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    backgroundColor: "#7B3FF2",
                    backgroundImage: "linear-gradient(135deg, #7B3FF2 0%, #9B5BFF 100%)",
                    boxShadow: "0 10px 15px -3px rgba(123, 63, 242, 0.5)"
                  }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                >
                  <Glasses className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </motion.div>

                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-white">{t.title}</h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg px-2">
                    {t.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="w-12 h-12 rounded-full bg-violet-600/20 flex items-center justify-center">
                        <MousePointerClick className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white mb-1">{t.instruction1}</p>
                        <p className="text-xs text-gray-400">{t.instruction1Sub}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="w-12 h-12 rounded-full bg-violet-600/20 flex items-center justify-center">
                        <RotateCw className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white mb-1">{t.instruction2}</p>
                        <p className="text-xs text-gray-400">{t.instruction2Sub}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="w-12 h-12 rounded-full bg-violet-600/20 flex items-center justify-center">
                        <Glasses className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white mb-1">{t.instruction3}</p>
                        <p className="text-xs text-gray-400">{t.instruction3Sub}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-sm sm:text-base border border-white/10 transition-all duration-300"
                  >
                    {t.understood}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStart}
                    className="flex-1 relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl overflow-hidden group"
                  >
                    <div
                      className="absolute inset-0 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundImage: "linear-gradient(to right, #7B3FF2, #9B5BFF)" }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                      style={{ backgroundImage: "linear-gradient(to right, #8B5CF6, #A855F7)" }}
                    />
                    <span className="relative text-white text-sm sm:text-base tracking-wide">
                      {t.start}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
