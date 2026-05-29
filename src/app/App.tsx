import { useState } from 'react';
import { translations, LanguageCode } from './translations';
import { Footer } from './components/Footer';

// IMPORTANTE: Asegúrate de importar aquí tus otros componentes 
// (Hero, LanguageSelector, ContentSelector, etc.) según tu estructura real.

function App() {
  // Estado para el idioma, por defecto en Español
  const [currentLang, setCurrentLang] = useState<LanguageCode>('es');

  // Función para cambiar el idioma que puedes pasar a tus otros componentes
  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLang(lang);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* El componente <main> tiene 'flex-grow'. 
          Esto hace que ocupe todo el espacio disponible y empuje el footer al fondo.
      */}
      <main className="flex-grow">
        
        {/* AQUÍ VAN TUS COMPONENTES ACTUALES */}
        {/* Ejemplo (ajusta según tus nombres reales):
          <Hero lang={currentLang} />
          <LanguageSelector onSelect={handleLanguageChange} />
          <ContentSelector lang={currentLang} />
        */}
        
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold">{translations[currentLang].hero.title}</h1>
          <p className="mt-4 text-muted-foreground">{translations[currentLang].hero.subtitle}</p>
          
          {/* Botones de prueba para que veas cómo cambia el footer legal al instante */}
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={() => setCurrentLang('es')} className="px-4 py-2 bg-blue-600 text-white rounded">ES</button>
            <button onClick={() => setCurrentLang('en')} className="px-4 py-2 bg-blue-600 text-white rounded">EN</button>
            <button onClick={() => setCurrentLang('pt')} className="px-4 py-2 bg-blue-600 text-white rounded">PT</button>
          </div>
        </div>

      </main>

      {/* El Footer siempre al final */}
      <Footer lang={currentLang} />
    </div>
  );
}

export default App;