import { motion, AnimatePresence } from "motion/react";
import ReactPlayer from "react-player";
import { X, Maximize2, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { translations, LanguageCode } from "../translations";

interface Video360PlayerProps {
  contentId: string;
  onClose: () => void;
  language: LanguageCode;
}

const videoData: Record<string, { url: string }> = {
  ximena: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  "cuerpo-humano": {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  tercera: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
};

export function Video360Player({ contentId, onClose, language }: Video360PlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const video = videoData[contentId];
  const t = translations[language];
  const videoTitle =
    contentId === "ximena"
      ? t.contentSelector.ximena.title
      : contentId === "cuerpo-humano"
      ? t.contentSelector.cuerpoHumano.title
      : t.contentSelector.tercera.title;

  const handleReady = () => {
    setIsReady(true);
    setPlaying(true);
  };

  const handleError = (error: any) => {
    console.error("Video player error:", error);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="relative w-full h-full">
        <ReactPlayer
          ref={playerRef}
          url={video.url}
          playing={playing}
          muted={muted}
          width="100%"
          height="100%"
          controls={false}
          onReady={handleReady}
          onError={handleError}
          playsinline
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                playsinline: 1
              }
            }
          }}
        />

        <AnimatePresence>
          {showControls && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
                    <h2 className="text-white text-sm sm:text-base md:text-xl truncate max-w-[150px] sm:max-w-none">{videoTitle}</h2>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-violet-600 text-white text-xs sm:text-sm">360°</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/20"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
              >
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (isReady) {
                        setPlaying(!playing);
                      }
                    }}
                    disabled={!isReady}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {playing ? (
                      <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMuted(!muted)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/20"
                  >
                    {muted ? (
                      <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (document.fullscreenElement) {
                        document.exitFullscreen();
                      } else {
                        document.documentElement.requestFullscreen();
                      }
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/20"
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.button>
                </div>

                <div className="mt-3 sm:mt-4 text-center px-4">
                  <p className="text-white/60 text-xs sm:text-sm">
                    {t.videoPlayer.helpText}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-8 h-8 border-2 border-white rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
