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
        if (!item) return item;

        // Custom slug override
        if (type && modelTranslations[type] && item.slug && modelTranslations[type][item.slug]) {
            const overrides = modelTranslations[type][item.slug][lang];
            if (overrides) {
                return { ...item, ...overrides };
            }
        }

        // Dynamic translation mapping
        if (lang !== 'id' && typeof item === 'object') {
            const translatedItem = { ...item };
            for (const key in item) {
                // Determine suffix based on language (ja -> _jp, en -> _en)
                const suffix = lang === 'ja' ? '_jp' : '_en';
                const translatedKey = `${key}${suffix}`;
                
                // If key is like title_id, translatedKey should be title_jp
                const baseKey = key.endsWith('_id') ? key.replace('_id', '') : key;
                const translatedKeyAlternative = `${baseKey}${suffix}`;

                if (item[translatedKey] !== undefined && item[translatedKey] !== null && item[translatedKey] !== '') {
                    translatedItem[key] = item[translatedKey];
                } else if (item[translatedKeyAlternative] !== undefined && item[translatedKeyAlternative] !== null && item[translatedKeyAlternative] !== '') {
                    translatedItem[key] = item[translatedKeyAlternative];
                }
            }
            return translatedItem;
        }

        return item;
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
