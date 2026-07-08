import { motion } from "motion/react";
import { Compass, Maximize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { translations, LanguageCode } from "../translations";
import { getVideoYoutubeLink } from "../videoLinks";

/*Dummy change for PR*/

interface Video360PlayerProps {
  contentId: string;
  onClose: () => void;
  language: LanguageCode;
}

interface SphericalProperties {
  enableOrientationSensor?: boolean;
  yaw?: number;
  pitch?: number;
  roll?: number;
  fov?: number;
}

interface DeviceOrientationEventWithPermission {
  requestPermission?: () => Promise<PermissionState>;
}

interface YouTubePlayer {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getIframe: () => HTMLIFrameElement;
  getSphericalProperties: () => SphericalProperties;
  mute: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setSphericalProperties: (properties: SphericalProperties) => void;
  unMute: () => void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
}

interface YouTubePlayerStateEvent extends YouTubePlayerEvent {
  data: number;
}

interface YouTubeApi {
  Player: new (
    element: HTMLDivElement,
    options: {
      height: string;
      videoId: string;
      width: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady: (event: YouTubePlayerEvent) => void;
        onStateChange: (event: YouTubePlayerStateEvent) => void;
      };
    }
  ) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeApi;
  }
}

const playingState = 1;
const sensitivity = 0.2;

function getYouTubeVideoId(url: string) {
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname === "youtu.be") {
    return parsedUrl.pathname.slice(1);
  }

  return parsedUrl.searchParams.get("v") ?? parsedUrl.pathname.split("/").pop() ?? "";
}

function formatTime(seconds: number) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function supportsOrientationSensor() {
  return (
    typeof window !== "undefined" &&
    "DeviceOrientationEvent" in window &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

function getInitialSphericalProperties(player: YouTubePlayer) {
  const sphericalProperties = player.getSphericalProperties();

  if (Object.keys(sphericalProperties).length > 0) {
    return sphericalProperties;
  }

  return {
    yaw: 0,
    pitch: 0,
    roll: 0,
    fov: 100
  };
}

export function Video360Player({ contentId, onClose, language }: Video360PlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sensorEnabled, setSensorEnabled] = useState(false);
  const [sensorSupported] = useState(supportsOrientationSensor);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const sphericalRef = useRef<SphericalProperties | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const t = translations[language];
  const video =
    contentId === "cuerpo-humano"
      ? t.contentSelector.cuerpoHumano
      : t.contentSelector.ximena;
  const youtubeLink = getVideoYoutubeLink(contentId, language);
  const videoId = getYouTubeVideoId(youtubeLink);

  useEffect(() => {
    let disposed = false;
    let progressIntervalId: number | undefined;

    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }

    const intervalId = window.setInterval(() => {
      if (!window.YT?.Player || !containerRef.current) {
        return;
      }

      window.clearInterval(intervalId);

      const player = new window.YT.Player(containerRef.current, {
        height: "100%",
        videoId,
        width: "100%",
        playerVars: {
          controls: 0,
          rel: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            if (disposed) {
              return;
            }

            setIsReady(true);
            const iframe = event.target.getIframe();
            const iframeAllow = iframe.getAttribute("allow");
            iframe.setAttribute(
              "allow",
              [iframeAllow, "accelerometer", "gyroscope", "fullscreen"]
                .filter(Boolean)
                .join("; ")
            );
            iframe.style.pointerEvents = "none";
            event.target.setSphericalProperties({ enableOrientationSensor: false });
            setSensorEnabled(false);
            sphericalRef.current = getInitialSphericalProperties(event.target);
            progressIntervalId = window.setInterval(() => {
              setCurrentTime(event.target.getCurrentTime());
              setDuration(event.target.getDuration());
            }, 500);
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (disposed) {
              return;
            }

            const isPlaying = event.data === playingState;
            setPlaying(isPlaying);

            if (isPlaying) {
              const sphericalProperties = event.target.getSphericalProperties();

              if (Object.keys(sphericalProperties).length > 0) {
                sphericalRef.current = sphericalProperties;
              }
            }
          }
        }
      });

      playerRef.current = player;
    }, 50);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);

      if (progressIntervalId !== undefined) {
        window.clearInterval(progressIntervalId);
      }

      playerRef.current?.destroy();
      playerRef.current = null;
      sphericalRef.current = null;
      dragRef.current = null;
    };
  }, [videoId]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    if (sensorEnabled) {
      player.setSphericalProperties({ enableOrientationSensor: false });
      setSensorEnabled(false);
    }

    sphericalRef.current = getInitialSphericalProperties(player);
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const spherical = sphericalRef.current;

    if (!drag || drag.pointerId !== event.pointerId || !spherical) {
      return;
    }

    const yaw = ((spherical.yaw ?? 0) + (event.clientX - drag.x) * sensitivity + 360) % 360;
    const pitch = Math.max(
      -90,
      Math.min(90, (spherical.pitch ?? 0) - (event.clientY - drag.y) * sensitivity)
    );
    const nextSpherical = {
      yaw,
      pitch,
      roll: 0,
      fov: spherical.fov
    };

    playerRef.current?.setSphericalProperties(nextSpherical);
    sphericalRef.current = nextSpherical;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY
    };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) {
      return;
    }

    dragRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const togglePlaying = () => {
    if (!isReady) {
      return;
    }

    if (playing) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
  };

  const toggleMuted = () => {
    if (muted) {
      playerRef.current?.unMute();
    } else {
      playerRef.current?.mute();
    }

    setMuted(!muted);
  };

  const enableOrientationSensor = async () => {
    if (!isReady || !sensorSupported) {
      return;
    }

    if (sensorEnabled) {
      playerRef.current?.setSphericalProperties({ enableOrientationSensor: false });
      setSensorEnabled(false);
      return;
    }

    const orientationEvent = window.DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission;
    let permission: PermissionState = "granted";

    try {
      permission =
        orientationEvent.requestPermission !== undefined
          ? await orientationEvent.requestPermission()
          : "granted";
    } catch {
      permission = "denied";
    }

    if (permission !== "granted") {
      setSensorEnabled(false);
      playerRef.current?.setSphericalProperties({ enableOrientationSensor: false });
      return;
    }

    playerRef.current?.setSphericalProperties({ enableOrientationSensor: true });
    setSensorEnabled(true);
  };

  const seekFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!duration) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const targetTime = progress * duration;

    playerRef.current?.seekTo(targetTime, true);
    setCurrentTime(targetTime);
  };

  const handleSeekPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    seekFromPointer(event);
  };

  const handleSeekPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    event.stopPropagation();
    seekFromPointer(event);
  };

  const handleSeekPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <div ref={containerRef} className="h-full w-full" />

      <div
        className="absolute inset-0 z-10 cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 sm:h-2 sm:w-2" />
            <h2 className="max-w-[150px] truncate text-sm text-white sm:max-w-none sm:text-base md:text-xl">
              {video.title}
            </h2>
            <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white sm:px-3 sm:py-1 sm:text-sm">
              360Â°
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="mx-auto mb-4 flex max-w-4xl items-center gap-3 text-xs text-white/70">
          <span>{formatTime(currentTime)}</span>
          <div
            className="pointer-events-auto relative h-4 flex-1 cursor-pointer touch-none"
            onPointerDown={handleSeekPointerDown}
            onPointerMove={handleSeekPointerMove}
            onPointerUp={handleSeekPointerUp}
            onPointerCancel={handleSeekPointerUp}
          >
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              style={{ left: `${progress}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlaying}
            disabled={!isReady}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-14"
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

          {sensorSupported && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={enableOrientationSensor}
              disabled={!isReady}
              className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 backdrop-blur-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12 ${
                sensorEnabled ? "bg-violet-500/70" : "bg-white/10"
              }`}
            >
              <Compass className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </motion.button>
          )}

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
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-12 sm:w-12"
          >
            <Maximize2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </motion.button>
        </div>

        <p className="mt-3 px-4 text-center text-xs text-white/60 sm:mt-4 sm:text-sm">
          {t.videoPlayer.helpText}
        </p>
      </div>
    </motion.div>
  );
}
