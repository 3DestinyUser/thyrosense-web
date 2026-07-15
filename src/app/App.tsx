import { useState } from "react";
import { HeroLanding } from "./components/HeroLanding";
import { LanguageSelector } from "./components/LanguageSelector";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ContentSelector } from "./components/ContentSelector";
import { VideoInstructionModal } from "./components/VideoInstructionModal";
import { Video360Player } from "./components/Video360Player";
import { Hosted360Player } from "./components/Hosted360Player";
import { LanguageCode } from "./translations";
import { getHostedVideoUrl } from "./videoLinks";

type AppState = "hero" | "language" | "content" | "instruction" | "video";

function isMobileDevice() {
  const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
  const iPadDesktopMode =
    window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;

  return (
    mobileUserAgent ||
    iPadDesktopMode ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("language");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("es");
  const [selectedContent, setSelectedContent] = useState<string>("");

  const handleStartExperience = () => {
    setCurrentState("content");
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language as LanguageCode);
    setCurrentState("hero");
  };

  const handleLanguageChange = (language: LanguageCode) => {
    setSelectedLanguage(language);
  };

  const handleContentSelect = (contentId: string) => {
    setSelectedContent(contentId);
    setCurrentState("instruction");
  };

  const handleInstructionClose = () => {
    setCurrentState("content");
  };

  const handleStartVideo = () => {
    setCurrentState("video");
  };

  const handleCloseVideo = () => {
    setCurrentState("content");
  };

  return (
    <div className="size-full min-h-screen overflow-x-hidden">
      {currentState !== "language" && (
        <LanguageSwitcher
          currentLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {currentState === "hero" && (
        <HeroLanding onStart={handleStartExperience} language={selectedLanguage} />
      )}

      {currentState === "language" && (
        <LanguageSelector
          isOpen={true}
          onSelect={handleLanguageSelect}
          language={selectedLanguage}
        />
      )}

      {currentState === "content" && (
        <ContentSelector onSelectContent={handleContentSelect} language={selectedLanguage} />
      )}

      {currentState === "instruction" && (
        <VideoInstructionModal
          isOpen={true}
          onClose={handleInstructionClose}
          onStart={handleStartVideo}
          language={selectedLanguage}
        />
      )}

      {currentState === "video" && (
        isMobileDevice() ? (
          <Hosted360Player
            contentId={selectedContent}
            hostedVideoUrl={getHostedVideoUrl(selectedContent, selectedLanguage)}
            onClose={handleCloseVideo}
            language={selectedLanguage}
          />
        ) : (
          <Video360Player
            contentId={selectedContent}
            onClose={handleCloseVideo}
            language={selectedLanguage}
          />
        )
      )}
    </div>
  );
}
