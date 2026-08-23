import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { translations, modelTranslations } from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children, initialPageProps = {} }) {
    const [pageProps, setPageProps] = useState(initialPageProps || {});

    const serverLocale = initialPageProps?.locale || 'id';

    const [lang, setLangState] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sugiyama_lang');
            if (saved && ['id', 'en', 'ja'].includes(saved)) {
                return saved;
            }
        }
        return serverLocale;
    });

    // Listen to Inertia page navigations to keep shared translations in sync
    useEffect(() => {
        const removeListener = router.on('navigate', (event) => {
            if (event.detail?.page?.props) {
                const nextProps = event.detail.page.props;
                setPageProps(nextProps);
                
                if (nextProps.locale && ['id', 'en', 'ja'].includes(nextProps.locale)) {
                    setLangState(nextProps.locale);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('sugiyama_lang', nextProps.locale);
                    }
                }
            }
        });

        return () => {
            if (typeof removeListener === 'function') {
                removeListener();
            }
        };
    }, []);

    const setLang = (newLang) => {
        if (['id', 'en', 'ja'].includes(newLang)) {
            setLangState(newLang);
            if (typeof window !== 'undefined') {
                localStorage.setItem('sugiyama_lang', newLang);
                document.cookie = `app_locale=${newLang};path=/;max-age=${60 * 60 * 24 * 365}`;
            }

            // Sync with Laravel server session via Inertia
            router.post(`/locale/${newLang}`, {}, {
                preserveScroll: true,
                preserveState: false, // refresh props from server with translated data
            });
        }
    };

    /**
     * Translate string using Laravel backend dictionary with client fallback
     */
    const t = (key, fallback = '') => {
        // 1. Check Laravel server shared translations for current locale
        if (pageProps?.translations && pageProps.translations[key] !== undefined) {
            return pageProps.translations[key];
        }

        // 2. Check bundled client-side translations dictionary
        const dict = translations[lang] || translations.id;
        if (dict && dict[key] !== undefined) {
            return dict[key];
        }

        return fallback || key;
    };

    /**
     * Translates a dynamic database model object into the active language
     */
    const translateModel = (item, type = 'generic') => {
        if (!item || typeof item !== 'object') return item;

        // Clone item to avoid mutating original props
        const result = { ...item };

        // 1. If language is Indonesian ('id'), return the database object directly
        if (lang === 'id') {
            return result;
        }

        // 2. Dynamic column translation for en / ja from database columns (e.g. title_en, title_jp, etc.)
        const suffixes = lang === 'ja' ? ['_jp', '_ja'] : ['_en'];
        for (const key in item) {
            for (const sfx of suffixes) {
                const translatedKey = `${key}${sfx}`;
                const baseKey = key.endsWith('_id') ? key.replace('_id', '') : key;
                const alternativeKey = `${baseKey}${sfx}`;

                if (item[translatedKey] !== undefined && item[translatedKey] !== null && item[translatedKey] !== '') {
                    result[key] = item[translatedKey];
                    break;
                } else if (item[alternativeKey] !== undefined && item[alternativeKey] !== null && item[alternativeKey] !== '') {
                    result[key] = item[alternativeKey];
                    break;
                }
            }
        }

        // 3. Fallback to modelTranslations dictionary for hardcoded seed models if translation columns are empty
        if (modelTranslations && modelTranslations[lang]) {
            const dict = modelTranslations[lang];
            
            // Check by ID or Slug or Title
            const identifier = item.slug || item.id || item.title || item.name;
            if (identifier && dict[identifier]) {
                return { ...result, ...dict[identifier] };
            }
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, translateModel, availableLocales: ['id', 'ja', 'en'] }}>
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
            availableLocales: ['id', 'ja', 'en'],
        };
    }
    return context;
}
