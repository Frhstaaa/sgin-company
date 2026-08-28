import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LanguageProvider } from './Context/LanguageContext';

const appName = import.meta.env.VITE_APP_NAME || 'PT. Sugiyama Indonesia';

// Auto-handle 419 CSRF Token / Session Expired seamlessly
router.on('invalid', (event) => {
    if (event.detail.response?.status === 419) {
        event.preventDefault();
        // Automatically reload page to refresh session and CSRF token without user needing to do anything
        window.location.reload();
    }
});

// Global Image Error (404) Auto-Fallback Handler
if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
        if (event.target && event.target.tagName === 'IMG') {
            const fallbackSrc = '/images/sgin-placeholder.png';
            if (event.target.src && !event.target.src.endsWith(fallbackSrc) && !event.target.dataset.fallbackApplied) {
                event.target.dataset.fallbackApplied = 'true';
                event.target.src = fallbackSrc;
            }
        }
    }, true);
}

createInertiaApp({
    title: (title) => title ? `${title} | ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <LanguageProvider initialPageProps={props.initialPage?.props}>
                <App {...props} />
            </LanguageProvider>
        );
    },
    progress: {
        color: '#007155',
        showSpinner: true,
    },
});
