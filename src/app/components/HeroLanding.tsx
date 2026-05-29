import { motion } from "motion/react";
import { Play } from "lucide-react";
import { translations, LanguageCode } from "../translations";
import logoMerck from "../../imports/logo-merck.png";
import bgImage from "../../imports/Container__1_.png";

interface HeroLandingProps {
  onStart: () => void;
  language: LanguageCode;
}

export function HeroLanding({ onStart, language }: HeroLandingProps) {
  const t = translations[language].hero;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-violet-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(123,63,242,0.05),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-6 max-w-5xl mx-auto py-8 md:py-0"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <img src={logoMerck} alt="Merck" className="h-10 sm:h-12 md:h-16 w-auto" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative group"
        >
          <div
            className="absolute -inset-1 rounded-[2rem] opacity-30 blur-2xl group-hover:opacity-50 transition-all duration-1000"
            style={{ backgroundImage: "linear-gradient(to right, #7B3FF2, #9B5BFF, #7B3FF2)" }}
          />

          <div className="relative rounded-[2rem] p-8 sm:p-12 md:p-16 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            <img
              src={bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 rounded-[2rem]"
              style={{ backgroundImage: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), transparent, rgba(168, 85, 247, 0.2))" }}
            />

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px #7B3FF24D",
                  "0 0 80px #9B5BFF66",
                  "0 0 60px #7B3FF24D"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundColor: "#7B3FF2", backgroundImage: "linear-gradient(135deg, #7B3FF2 0%, #9B5BFF 100%)" }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "#7B3FF2", backgroundImage: "linear-gradient(135deg, #7B3FF2 0%, #9B5BFF 100%)" }}>
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center space-y-4 md:space-y-6"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight bg-clip-text text-transparent px-4"
            style={{
              backgroundImage: "linear-gradient(to right, #111827, #4C1D95, #111827)"
            }}
          >
            {t.title}
            <br />
            {t.titleLine2}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Botón clickeado");
            onStart();
          }}
          className="relative group px-8 sm:px-10 md:px-12 py-4 md:py-5 rounded-full overflow-hidden cursor-pointer z-20"
        >
          <div
            className="absolute inset-0 transition-all duration-300 group-hover:scale-110 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(to right, #7B3FF2, #9B5BFF)" }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
            style={{ backgroundImage: "linear-gradient(to right, #8B5CF6, #A855F7)" }}
          />
          <span className="relative text-white text-base sm:text-lg tracking-wide pointer-events-none">
            {t.cta}
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-violet-400 flex items-start justify-center p-1.5 md:p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-violet-400"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
