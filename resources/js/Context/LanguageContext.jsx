import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, modelTranslations } from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sugiyama_lang');
            if (saved && ['id', 'en', 'ja'].includes(saved)) {
                return saved;
            }
        }
        return 'id'; // Default Indonesian
    });

    const setLang = (newLang) => {
        if (['id', 'en', 'ja'].includes(newLang)) {
            setLangState(newLang);
            if (typeof window !== 'undefined') {
                localStorage.setItem('sugiyama_lang', newLang);
            }
        }
    };

    const t = (key, fallback = '') => {
        const dict = translations[lang] || translations.id;
        return dict[key] !== undefined ? dict[key] : (fallback || key);
    };

    /**
     * Translates a dynamic database model object into the active language
     */
    const translateModel = (item, type = 'generic') => {
        if (!item || typeof item !== 'object') return item;

        // Clone item to avoid mutating original props
        const result = { ...item };

        // 1. If language is Indonesian ('id'), return the database object directly!
        if (lang === 'id') {
            return result;
        }

        // 2. Dynamic column translation for en / ja from database columns (e.g. title_en, title_jp, etc.)
        const suffix = lang === 'ja' ? '_jp' : '_en';
        for (const key in item) {
            const translatedKey = `${key}${suffix}`;
            const baseKey = key.endsWith('_id') ? key.replace('_id', '') : key;
            const alternativeKey = `${baseKey}${suffix}`;

            if (item[translatedKey] !== undefined && item[translatedKey] !== null && item[translatedKey] !== '') {
                result[key] = item[translatedKey];
            } else if (item[alternativeKey] !== undefined && item[alternativeKey] !== null && item[alternativeKey] !== '') {
                result[key] = item[alternativeKey];
            }
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, translateModel }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        return {
            lang: 'id',
            setLang: () => {},
            t: (key, fallback) => (translations.id[key] !== undefined ? translations.id[key] : (fallback || key)),
            translateModel: (item) => item,
        };
    }
    return context;
}
