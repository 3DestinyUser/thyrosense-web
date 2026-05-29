import { motion } from "motion/react";
import { Play, Download } from "lucide-react";
import { translations, LanguageCode } from "../translations";
import imgXimena from "../../imports/Container__2_.png";
import imgCuerpoHumano from "../../imports/Container__3_.png";
import imgTercera from "../../imports/Container-3.png";

interface ContentSelectorProps {
  onSelectContent: (contentId: string) => void;
  language: LanguageCode;
}

const videoDownloadLinks: Record<string, string> = {
  ximena: "https://example.com/videos/ximena-360.mp4",
  "cuerpo-humano": "https://example.com/videos/cuerpo-humano-360.mp4",
  tercera: "https://example.com/videos/tercera-360.mp4"
};

export function ContentSelector({ onSelectContent, language }: ContentSelectorProps) {
  const t = translations[language].contentSelector;

  const contents = [
    {
      id: "ximena",
      title: t.ximena.title,
      description: t.ximena.description,
      image: imgXimena,
      gradient: "from-rose-500 via-pink-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-rose-50 to-violet-50"
    },
    {
      id: "cuerpo-humano",
      title: t.cuerpoHumano.title,
      description: t.cuerpoHumano.description,
      image: imgCuerpoHumano,
      gradient: "from-blue-500 via-cyan-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-violet-50"
    },
    {
      id: "tercera",
      title: t.tercera.title,
      description: t.tercera.description,
      image: imgTercera,
      gradient: "from-amber-500 via-orange-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
    }
  ];

  const handleDownload = (contentId: string) => {
    const downloadUrl = videoDownloadLinks[contentId];
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${contentId}-360.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-violet-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="px-4 sm:px-6 py-2 rounded-full bg-violet-100 border border-violet-200">
              <span className="text-xs sm:text-sm text-violet-700 tracking-wide">{t.badge}</span>
            </div>
          </motion.div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 bg-clip-text text-transparent px-4"
            style={{
              backgroundImage: "linear-gradient(to right, #111827, #4C1D95, #111827)"
            }}
          >
            {t.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {contents.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div
                className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl group-hover:opacity-60 transition-all duration-500"
                style={{
                  backgroundImage:
                    content.id === "ximena"
                      ? "linear-gradient(to right, #F43F5E, #EC4899, #A855F7)"
                      : content.id === "cuerpo-humano"
                      ? "linear-gradient(to right, #3B82F6, #06B6D4, #A855F7)"
                      : "linear-gradient(to right, #F59E0B, #FB923C, #FBBF24)"
                }}
              />

              <div className="relative h-full">
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-white/50 backdrop-blur-sm">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
                  </div>

                  <div className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm">
                    <h3 className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-gray-900">{content.title}</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                      {content.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {content.id === "tercera" ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelectContent(content.id)}
                            className="relative flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl overflow-hidden"
                            style={{
                              backgroundColor: "#F59E0B",
                              backgroundImage: "linear-gradient(to right, #F59E0B, #FBBF24)"
                            }}
                          >
                            <div className="relative flex items-center justify-center gap-2 text-white">
                              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                              <span className="text-sm sm:text-base tracking-wide font-medium">
                                {t.tryFilter}
                              </span>
                            </div>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDownload(content.id)}
                            className="relative flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-lg group/download overflow-hidden"
                            style={{ borderColor: "#F59E0B" }}
                          >
                            <div
                              className="absolute inset-0 opacity-0 group-hover/download:opacity-10 transition-opacity duration-300"
                              style={{ backgroundImage: "linear-gradient(to right, #F59E0B, #FBBF24)" }}
                            />
                            <div className="relative flex items-center justify-center gap-2" style={{ color: "#F59E0B" }}>
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                              </svg>
                              <span className="text-sm sm:text-base tracking-wide font-medium">
                                {t.scanQR}
                              </span>
                            </div>
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelectContent(content.id)}
                            className="group/btn relative flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl overflow-hidden"
                          >
                            <div
                              className="absolute inset-0 transition-all duration-300 group-hover/btn:scale-110"
                              style={{
                                backgroundImage:
                                  content.id === "ximena"
                                    ? "linear-gradient(to right, #F43F5E, #EC4899, #A855F7)"
                                    : "linear-gradient(to right, #3B82F6, #06B6D4, #A855F7)"
                              }}
                            />
                            <div
                              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-xl"
                              style={{
                                backgroundImage:
                                  content.id === "ximena"
                                    ? "linear-gradient(to right, #F43F5E, #EC4899, #A855F7)"
                                    : "linear-gradient(to right, #3B82F6, #06B6D4, #A855F7)"
                              }}
                            />
                            <div className="relative flex items-center justify-center gap-2 text-white">
                              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                              <span className="text-sm sm:text-base tracking-wide">
                                {t.view360}
                              </span>
                            </div>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDownload(content.id)}
                            className="relative flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-lg group/download overflow-hidden"
                            style={{
                              borderColor: content.id === "ximena" ? "#F43F5E" : "#3B82F6"
                            }}
                          >
                            <div
                              className="absolute inset-0 opacity-0 group-hover/download:opacity-10 transition-opacity duration-300"
                              style={{
                                backgroundImage:
                                  content.id === "ximena"
                                    ? "linear-gradient(to right, #F43F5E, #EC4899, #A855F7)"
                                    : "linear-gradient(to right, #3B82F6, #06B6D4, #A855F7)"
                              }}
                            />
                            <div className="relative flex items-center justify-center gap-2"
                              style={{
                                color: content.id === "ximena" ? "#F43F5E" : "#3B82F6"
                              }}
                            >
                              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="text-sm sm:text-base tracking-wide">
                                {t.download}
                              </span>
                            </div>
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
