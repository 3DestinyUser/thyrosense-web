export const translations = {
  es: {
    hero: {
      title: "Explora la experiencia",
      titleLine2: "inmersiva 360°",
      subtitle: "Descubre contenidos médicos interactivos desde una nueva perspectiva.",
      cta: "Comenzar experiencia"
    },
    languageSelector: {
      title: "Selecciona tu idioma",
      subtitle: "Choose your language / Escolha seu idioma"
    },
    contentSelector: {
      badge: "EXPERIENCIAS INMERSIVAS",
      title: "Elige una experiencia",
      subtitle: "Selecciona el contenido que deseas explorar en 360°",
      view360: "Ver en 360°",
      download: "Descargar video",
      tryFilter: "Probar Filtro",
      scanQR: "Escanear QR",
      ximena: {
        title: "La vida de Ximena",
        description: "Conoce una historia humana e inmersiva en formato 360°."
      },
      cuerpoHumano: {
        title: "El cuerpo humano",
        description: "Explora el cuerpo humano desde una perspectiva interactiva y educativa."
      },
      tercera: {
        title: "Filtro RA",
        description: "Visualiza signos y síntomas de las personas que viven con hipotiroidismo"
      }
    },
    videoInstructions: {
      title: "Experiencia 360°",
      description: "Este contenido fue diseñado para visualizarse en formato inmersivo 360°. Puedes interactuar moviendo la cámara y explorando el entorno durante la reproducción.",
      instruction1: "Arrastra",
      instruction1Sub: "con el mouse o dedo",
      instruction2: "Explora 360°",
      instruction2Sub: "gira en todas direcciones",
      instruction3: "Experiencia VR",
      instruction3Sub: "inmersión completa",
      understood: "Entendido",
      start: "Comenzar experiencia"
    },
    videoPlayer: {
      helpText: "Arrastra para explorar 360° • Usa los controles para reproducir"
    }
  },
  en: {
    hero: {
      title: "Explore the immersive",
      titleLine2: "360° experience",
      subtitle: "Discover interactive medical content from a new perspective.",
      cta: "Start experience"
    },
    languageSelector: {
      title: "Select your language",
      subtitle: "Selecciona tu idioma / Escolha seu idioma"
    },
    contentSelector: {
      badge: "IMMERSIVE EXPERIENCES",
      title: "Choose an experience",
      subtitle: "Select the content you want to explore in 360°",
      view360: "View in 360°",
      download: "Download video",
      tryFilter: "Try Filter",
      scanQR: "Scan QR",
      ximena: {
        title: "Ximena's Story",
        description: "Discover a human and immersive story in 360° format."
      },
      cuerpoHumano: {
        title: "The Human Body",
        description: "Explore the human body from an interactive and educational perspective."
      },
      tercera: {
        title: "AR Filter",
        description: "Visualize signs and symptoms of people living with hypothyroidism"
      }
    },
    videoInstructions: {
      title: "360° Experience",
      description: "This content was designed to be viewed in immersive 360° format. You can interact by moving the camera and exploring the environment during playback.",
      instruction1: "Drag",
      instruction1Sub: "with mouse or finger",
      instruction2: "Explore 360°",
      instruction2Sub: "rotate in all directions",
      instruction3: "VR Experience",
      instruction3Sub: "full immersion",
      understood: "Got it",
      start: "Start experience"
    },
    videoPlayer: {
      helpText: "Drag to explore 360° • Use controls to play"
    }
  },
  pt: {
    hero: {
      title: "Explore a experiência",
      titleLine2: "imersiva 360°",
      subtitle: "Descubra conteúdos médicos interativos de uma nova perspectiva.",
      cta: "Começar experiência"
    },
    languageSelector: {
      title: "Selecione seu idioma",
      subtitle: "Choose your language / Selecciona tu idioma"
    },
    contentSelector: {
      badge: "EXPERIÊNCIAS IMERSIVAS",
      title: "Escolha uma experiência",
      subtitle: "Selecione o conteúdo que deseja explorar em 360°",
      view360: "Ver em 360°",
      download: "Baixar vídeo",
      tryFilter: "Experimentar Filtro",
      scanQR: "Escanear QR",
      ximena: {
        title: "A vida de Ximena",
        description: "Conheça uma história humana e imersiva em formato 360°."
      },
      cuerpoHumano: {
        title: "O corpo humano",
        description: "Explore o corpo humano de uma perspectiva interativa e educacional."
      },
      tercera: {
        title: "Filtro RA",
        description: "Visualize sinais e sintomas das pessoas que vivem com hipotireoidismo"
      }
    },
    videoInstructions: {
      title: "Experiência 360°",
      description: "Este conteúdo foi projetado para ser visualizado em formato imersivo 360°. Você pode interagir movendo a câmera e explorando o ambiente durante a reprodução.",
      instruction1: "Arraste",
      instruction1Sub: "com o mouse ou dedo",
      instruction2: "Explore 360°",
      instruction2Sub: "gire em todas as direções",
      instruction3: "Experiência VR",
      instruction3Sub: "imersão completa",
      understood: "Entendi",
      start: "Começar experiência"
    },
    videoPlayer: {
      helpText: "Arraste para explorar 360° • Use os controles para reproduzir"
    }
  }
};

export const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" }
];

export type LanguageCode = keyof typeof translations;
