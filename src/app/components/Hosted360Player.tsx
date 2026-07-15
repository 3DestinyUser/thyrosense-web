import { motion } from "motion/react";
import { Compass, Maximize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { translations, LanguageCode } from "../translations";

interface Hosted360PlayerProps {
  contentId: string;
  hostedVideoUrl?: string;
  onClose: () => void;
  language: LanguageCode;
}

interface DeviceOrientationEventWithPermission {
  requestPermission?: () => Promise<PermissionState>;
}

type AFrameSceneElement = HTMLElement & {
  pause?: () => void;
  renderer?: {
    dispose?: () => void;
  };
};

let aframeLoadPromise: Promise<void> | null = null;

function loadAFrame() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("A-Frame requires a browser environment."));
  }

  if ("AFRAME" in window) {
    return Promise.resolve();
  }

  aframeLoadPromise ??= import("aframe")
    .then(() => undefined)
    .catch((error) => {
      aframeLoadPromise = null;
      throw error;
    });
  return aframeLoadPromise;
}

function supportsOrientationPermission() {
  return (
    typeof window !== "undefined" &&
    "DeviceOrientationEvent" in window &&
    typeof (
      window.DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission
    ).requestPermission === "function"
  );
}

function getVideoTitle(contentId: string, language: LanguageCode) {
  const t = translations[language].contentSelector;

  return contentId === "cuerpo-humano" ? t.cuerpoHumano.title : t.ximena.title;
}

export function Hosted360Player({
  contentId,
  hostedVideoUrl,
  onClose,
  language
}: Hosted360PlayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<AFrameSceneElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraRef = useRef<HTMLElement | null>(null);
  const mountedRef = useRef(true);
  const t = translations[language];
  const hostedText = t.videoPlayer.hosted;
  const [aframeReady, setAframeReady] = useState(false);
  const [error, setError] = useState<string | null>(
    hostedVideoUrl ? null : hostedText.urlMissing
  );
  const [loading, setLoading] = useState(Boolean(hostedVideoUrl));
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [sensorEnabled, setSensorEnabled] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const title = getVideoTitle(contentId, language);

  const exitOwnedFullscreen = async () => {
    if (document.fullscreenElement !== rootRef.current || !document.exitFullscreen) {
      return;
    }

    try {
      await document.exitFullscreen();
    } catch {
      // Ignore rejected fullscreen cleanup.
    }
  };

  useEffect(() => {
    setFullscreenSupported(
      Boolean(document.fullscreenEnabled && rootRef.current?.requestFullscreen)
    );
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let disposed = false;
    let cleanupVideoListeners = () => undefined;

    if (!hostedVideoUrl) {
      setError(hostedText.urlMissing);
      setLoading(false);
      setAframeReady(false);
      setStarted(false);
      setPlaying(false);
      setSensorEnabled(false);
      return undefined;
    }

    setError(null);
    setLoading(true);
    setAframeReady(false);
    setStarted(false);
    setPlaying(false);
    setSensorEnabled(false);

    loadAFrame()
      .then(() => {
        if (disposed || !containerRef.current) {
          return;
        }

        const video = document.createElement("video");
        video.id = "hosted-360-video";
        video.crossOrigin = "anonymous";
        video.preload = "metadata";
        video.playsInline = true;
        video.setAttribute("webkit-playsinline", "true");
        video.setAttribute("playsinline", "true");
        video.muted = false;
        video.src = hostedVideoUrl;

        const assets = document.createElement("a-assets");
        assets.appendChild(video);

        const sphere = document.createElement("a-videosphere");
        sphere.setAttribute("src", "#hosted-360-video");
        sphere.setAttribute("rotation", "0 -90 0");

        const camera = document.createElement("a-camera");
        camera.setAttribute(
          "look-controls",
          "touchEnabled: true; mouseEnabled: true; magicWindowTrackingEnabled: false"
        );

        const scene = document.createElement("a-scene") as AFrameSceneElement;
        scene.setAttribute("embedded", "true");
        scene.setAttribute("vr-mode-ui", "enabled: false");
        scene.setAttribute("device-orientation-permission-ui", "enabled: false");
        scene.setAttribute("renderer", "antialias: true; alpha: false");
        scene.style.width = "100%";
        scene.style.height = "100%";
        scene.append(assets, sphere, camera);

        const handleCanPlay = () => {
          if (!disposed) {
            setLoading(false);
          }
        };
        const handleError = () => {
          if (!disposed) {
            setLoading(false);
            setError(hostedText.loadError);
          }
        };
        const handleEnded = () => {
          if (!disposed) {
            setPlaying(false);
          }
        };

        video.addEventListener("loadedmetadata", handleCanPlay);
        video.addEventListener("canplay", handleCanPlay);
        video.addEventListener("error", handleError);
        video.addEventListener("ended", handleEnded);
        cleanupVideoListeners = () => {
          video.removeEventListener("loadedmetadata", handleCanPlay);
          video.removeEventListener("canplay", handleCanPlay);
          video.removeEventListener("error", handleError);
          video.removeEventListener("ended", handleEnded);
        };

        containerRef.current.replaceChildren(scene);
        sceneRef.current = scene;
        videoRef.current = video;
        cameraRef.current = camera;
        setAframeReady(true);
      })
      .catch(() => {
        if (!disposed) {
          setLoading(false);
          setAframeReady(false);
          setError(hostedText.initError);
        }
      });

    return () => {
      disposed = true;

      const video = videoRef.current;
      if (video) {
        cleanupVideoListeners();
        video.pause();
        video.removeAttribute("src");
        video.load();
      }

      const scene = sceneRef.current;
      scene?.pause?.();
      scene?.renderer?.dispose?.();
      containerRef.current?.replaceChildren();
      void exitOwnedFullscreen();

      sceneRef.current = null;
      videoRef.current = null;
      cameraRef.current = null;
    };
  }, [hostedVideoUrl, hostedText.initError, hostedText.loadError, hostedText.urlMissing]);

  const requestOrientation = async () => {
    if (!cameraRef.current || !("DeviceOrientationEvent" in window)) {
      return false;
    }

    let permission: PermissionState = "granted";
    const orientationEvent =
      window.DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission;

    try {
      permission = orientationEvent.requestPermission
        ? await orientationEvent.requestPermission()
        : "granted";
    } catch {
      permission = "denied";
    }

    const camera = cameraRef.current;

    if (!camera || !mountedRef.current) {
      return false;
    }

    if (permission !== "granted") {
      camera.setAttribute(
        "look-controls",
        "touchEnabled: true; mouseEnabled: true; magicWindowTrackingEnabled: false"
      );
      setSensorEnabled(false);
      return false;
    }

    camera.setAttribute(
      "look-controls",
      "touchEnabled: true; mouseEnabled: true; magicWindowTrackingEnabled: true"
    );
    setSensorEnabled(true);
    return true;
  };

  const startVideo = async () => {
    const video = videoRef.current;

    if (!video || !aframeReady || error) {
      return;
    }

    const orientationPromise = requestOrientation().catch(() => false);
    video.muted = false;
    const playPromise = video.play();

    try {
      await playPromise;
      setMuted(false);
    } catch {
      try {
        video.muted = true;
        await video.play();
        setMuted(true);
      } catch {
        setError(hostedText.playbackRejected);
        setPlaying(false);
        return;
      }
    }

    void orientationPromise;
    setStarted(true);
    setPlaying(true);
  };

  const togglePlaying = async () => {
    const video = videoRef.current;

    if (!video || !started) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setError(hostedText.playbackRejected);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMuted = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = async () => {
    const root = rootRef.current;

    if (!root || !fullscreenSupported) {
      return;
    }

    try {
      if (document.fullscreenElement === root) {
        await exitOwnedFullscreen();
      } else if (!document.fullscreenElement) {
        await root.requestFullscreen();
      }
    } catch {
      // Fullscreen is optional for this flow.
    }
  };

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <div ref={containerRef} className="h-full w-full" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 sm:h-2 sm:w-2" />
            <h2 className="max-w-[150px] truncate text-sm text-white sm:max-w-none sm:text-base md:text-xl">
              {title}
            </h2>
            <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white sm:px-3 sm:py-1 sm:text-sm">
              360
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-12 sm:w-12"
          >
            <X className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </motion.button>
        </div>
      </div>

      {(!started || loading || error) && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/85 px-6 text-center">
          <div className="max-w-md space-y-5">
            <h3 className="text-2xl text-white">{title}</h3>
            {error ? (
              <p className="text-sm leading-relaxed text-white/70">{error}</p>
            ) : (
              <p className="text-sm leading-relaxed text-white/70">
                {loading
                  ? hostedText.loading
                  : hostedText.startHint}
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              {!error && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startVideo}
                  disabled={!aframeReady || loading}
                  className="flex-1 rounded-2xl bg-violet-600 px-6 py-3 text-sm text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.videoInstructions.start}
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10"
              >
                {t.videoInstructions.cancel}
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {started && !error && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlaying}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-14 sm:w-14"
            >
              {playing ? (
                <Pause className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              ) : (
                <Play className="ml-1 h-5 w-5 text-white sm:h-6 sm:w-6" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMuted}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-12 sm:w-12"
            >
              {muted ? (
                <VolumeX className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              ) : (
                <Volume2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              )}
            </motion.button>

            {supportsOrientationPermission() && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={requestOrientation}
                className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-12 sm:w-12 ${
                  sensorEnabled ? "bg-violet-500/70" : "bg-white/10"
                }`}
              >
                <Compass className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </motion.button>
            )}

            {fullscreenSupported && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullscreen}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-12 sm:w-12"
              >
                <Maximize2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </motion.button>
            )}
          </div>

          <p className="mt-3 px-4 text-center text-xs text-white/60 sm:mt-4 sm:text-sm">
            {t.videoPlayer.helpText}
          </p>
        </div>
      )}
    </motion.div>
  );
}
