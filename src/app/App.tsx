import { useState } from "react";
import { HeroLanding } from "./components/HeroLanding";
import { LanguageSelector } from "./components/LanguageSelector";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ContentSelector } from "./components/ContentSelector";
import { VideoInstructionModal } from "./components/VideoInstructionModal";
import { Video360Player } from "./components/Video360Player";
import { LanguageCode } from "./translations";

type AppState = "hero" | "language" | "content" | "instruction" | "video";

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
        <Video360Player
          contentId={selectedContent}
          onClose={handleCloseVideo}
          language={selectedLanguage}
        />
      )}
    </div>
  );
}
