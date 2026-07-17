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

export function getHostedVideoUrl(contentId: string, language: LanguageCode) {
  const t = translations[language].contentSelector.ximena;

  if (contentId === "ximena-story") {
    return t.storyHostedVideoUrl || undefined;
  }

  if (contentId === "cuerpo-humano") {
    return t.humanBodyHostedVideoUrl || undefined;
  }

  if (contentId === "ximena") {
    return t.hostedVideoUrl || undefined;
  }

  return undefined;
}
