import './App.css';
import { useTranslation } from 'react-i18next';

const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
};

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
      <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>{t('simpleText')}</p>
        <p>{t('deeply.nested.text')}</p>
        <p>{t('textWithVariable', { date: new Date().toLocaleString() })}</p>
      </header>
    </div>
  );
}

export default App;
