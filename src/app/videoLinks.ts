import { translations, LanguageCode } from "./translations";

export function getVideoYoutubeLink(contentId: string, language: LanguageCode) {
  const t = translations[language].contentSelector.ximena;

  if (contentId === "ximena-story") {
    return t.storyYoutubeLink;
  }

  if (contentId === "cuerpo-humano") {
    return t.humanBodyLink;
  }

  return t.youtubeLink;
}
