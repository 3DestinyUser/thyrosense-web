import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { translations, LanguageCode } from "../translations";
import imgXimena from "../../imports/Container__2_.png";
import imgTercera from "../../imports/Container-3.png";
import { QrCodeModal } from "./QrCodeModal";
import { Footer } from "./Footer";

interface ContentSelectorProps {
  onSelectContent: (contentId: string) => void;
  language: LanguageCode;
}

const qrModalHistoryStateKey = "thyrosenseQrModal";

export function ContentSelector({ onSelectContent, language }: ContentSelectorProps) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const hasQrModalHistoryEntryRef = useRef(false);
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
      id: "InstagramFilter",
      title: t.instagramFilter.title,
      description: t.instagramFilter.description,
      image: imgTercera,
      gradient: "from-amber-500 via-orange-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
    }
  ];

  const handleOpenFilter = () => {
    window.open(t.instagramFilter.pageLink, "_blank", "noopener,noreferrer");
  };

  const handleCloseQrModal = () => {
    if (hasQrModalHistoryEntryRef.current) {
      window.history.back();
      return;
    }

    setIsQrModalOpen(false);
  };

  useEffect(() => {
    if (!isQrModalOpen) {
      return undefined;
    }

    const currentHistoryState = window.history.state;
    const nextHistoryState =
      typeof currentHistoryState === "object" && currentHistoryState !== null
        ? { ...currentHistoryState, [qrModalHistoryStateKey]: true }
        : { [qrModalHistoryStateKey]: true };

    if (
      typeof currentHistoryState === "object" &&
      currentHistoryState !== null &&
      currentHistoryState[qrModalHistoryStateKey] === true
    ) {
      window.history.replaceState(nextHistoryState, "", window.location.href);
    } else {
      window.history.pushState(nextHistoryState, "", window.location.href);
    }

    hasQrModalHistoryEntryRef.current = true;

    const handlePopState = () => {
      hasQrModalHistoryEntryRef.current = false;
      setIsQrModalOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isQrModalOpen]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-gray-50 via-white to-violet-50 pt-12 sm:pt-16 md:pt-8 lg:pt-6 px-4 sm:px-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex w-full max-w-7xl flex-1 flex-col mx-auto lg:justify-center"
      >
        <div className="text-center mb-2 sm:mb-10 md:mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-1 sm:mb-2"
          >
            <div className="px-4 sm:px-2 py-2 md:py-1 rounded-full bg-violet-100 border border-violet-200">
              <span className="text-xs sm:text-sm text-violet-700 tracking-wide">{t.badge}</span>
            </div>
          </motion.div>

          <h1
            className="text-2xl sm:text-4xl md:text-4xl mb-3 sm:mb-4 md:mb-2 bg-clip-text text-transparent px-4"
            style={{
              backgroundImage: "linear-gradient(to right, #111827, #4C1D95, #111827)"
            }}
          >
            {t.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-6 max-w-5xl mx-auto">
          {contents.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
              className="relative h-full"
            >
              <div
                className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl"
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
                <div className="relative h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl border border-white/50">
                  <div className="aspect-video md:aspect-[2.35/1] lg:aspect-[2.1/1] relative overflow-hidden">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
                  </div>

                  <div className="flex flex-1 flex-col p-3 sm:p-4 py-3 sm:py-6 md:py-4 lg:py-5 bg-white/80">
                    <h3 className="text-1xl sm:text-3xl md:text-2xl mb-2 sm:mb-3 md:mb-2 lg:mb-4 text-gray-900">{content.title}</h3>
                    <p className="min-h-[4.5rem] md:min-h-12 text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 md:mb-3 leading-relaxed md:leading-snug">
                      {content.description}
                    </p>

                    <div
                      className={`mt-auto flex flex-col gap-3 md:gap-2 ${
                        content.id === "InstagramFilter" ? "sm:flex-row" : ""
                      }`}
                    >
                      {content.id === "InstagramFilter" ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleOpenFilter}
                            className="relative flex-1 sm:min-h-16 md:min-h-12 px-2 sm:px-3 py-3 sm:py-4 md:py-2 rounded-2xl overflow-hidden"
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
                            onClick={() => setIsQrModalOpen(true)}
                            className="relative flex-1 sm:min-h-16 md:min-h-12 px-2 sm:px-2 py-3 sm:py-4 md:py-2 rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-lg group/download overflow-hidden"
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
                            className="group/btn relative flex-1 sm:min-h-16 md:min-h-12 px-2 sm:px-3 py-3 sm:py-4 md:py-2 rounded-2xl overflow-hidden"
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
                          {content.id === "ximena" && (
                            <div className="flex flex-row gap-3 md:gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelectContent("ximena-story")}
                                className="ximena-story-button group/ximena-story relative flex-1 sm:min-h-16 md:min-h-12 px-2 sm:px-3 py-3 sm:py-4 md:py-2 rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-lg overflow-hidden"
                                style={{ borderColor: "#f34168" }}
                              >
                                <div
                                  className="absolute inset-0 opacity-0 group-hover/ximena-story:opacity-10 transition-opacity duration-300"
                                  style={{ backgroundColor: "#f34168" }}
                                />
                                <div
                                  className="relative flex items-center justify-center gap-2"
                                  style={{ color: "#f34168" }}
                                >
                                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
                                  <span className="text-xs sm:text-base tracking-wide font-medium">
                                    {t.viewXimenaStory}
                                  </span>
                                </div>
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelectContent("cuerpo-humano")}
                                className="human-body-button group/human-body relative flex-1 sm:min-h-16 md:min-h-12 px-2 sm:px-3 py-3 sm:py-4 md:py-2 rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-lg overflow-hidden"
                                style={{ borderColor: "#ae54ef" }}
                              >
                                <div
                                  className="absolute inset-0 opacity-0 group-hover/human-body:opacity-10 transition-opacity duration-300"
                                  style={{ backgroundColor: "#ae54ef" }}
                                />
                                <div
                                  className="relative flex items-center justify-center gap-2"
                                  style={{ color: "#ae54ef" }}
                                >
                                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
                                  <span className="text-xs sm:text-base tracking-wide font-medium">
                                    {t.viewHumanBody}
                                  </span>
                                </div>
                              </motion.button>
                            </div>
                          )}
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

      <Footer language={language} />

      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={handleCloseQrModal}
        qrImage={t.instagramFilter.qrImage}
        language={language}
      />
    </div>
  );
}
