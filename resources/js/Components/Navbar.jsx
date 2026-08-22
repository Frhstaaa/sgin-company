import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useLanguage } from '../Context/LanguageContext';
import { 
    Menu, X, Phone, ChevronRight, Globe, Send
} from 'lucide-react';

export default function Navbar() {
    const { url = '', props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { lang, setLang, t } = useLanguage();
    
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentUrl = url || '';

    const navLinks = [
        { name: t('nav_home', 'Beranda'), href: '/', active: currentUrl === '/' },
        { name: t('nav_technology', 'Teknologi'), href: '/teknologi', active: currentUrl.startsWith('/teknologi') },
        { name: t('nav_business', 'Bisnis'), href: '/bisnis', active: currentUrl.startsWith('/bisnis') },
        { name: t('nav_equipment', 'Peralatan'), href: '/peralatan', active: currentUrl.startsWith('/peralatan') },
        { name: t('nav_products', 'Produk'), href: '/produk', active: currentUrl.startsWith('/produk') },
        { name: t('nav_about', 'Tentang Kami'), href: '/tentang-kami', active: currentUrl.startsWith('/tentang-kami') },
        { name: t('nav_news', 'Berita'), href: '/berita', active: currentUrl.startsWith('/berita') },
        { name: t('nav_careers', 'Karir'), href: '/karir', active: currentUrl.startsWith('/karir') },
        { name: t('nav_contact', 'Kontak'), href: '/kontak', active: currentUrl.startsWith('/kontak') },
    ];

    return (
        <>
            <header 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full overflow-x-hidden ${
                    scrolled 
                        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5' 
                        : 'bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent py-2.5 sm:py-4'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-2 lg:gap-4 w-full">
                        {/* 1. Logo & Brand */}
                        <Link href="/" className="flex items-center gap-2.5 group min-w-0 flex-1">
                            {siteSettings.site_logo ? (
                                <img 
                                    src={siteSettings.site_logo} 
                                    alt="PT. Sugiyama Indonesia" 
                                    className="w-auto h-7 sm:h-9 object-contain shrink-0 max-h-9"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-base sm:text-xl shadow-md group-hover:bg-emerald-600 transition-colors shrink-0">
                                    <span className="font-jp">ス</span>
                                </div>
                            )}
                            <div className="flex flex-col min-w-0">
                                <span className={`font-black tracking-tight text-xs sm:text-base transition-colors leading-tight truncate ${
                                    scrolled ? 'text-slate-900' : 'text-white'
                                }`}>
                                    PT. Sugiyama Indonesia
                                </span>
                                <span className={`text-[8px] sm:text-[10px] font-semibold tracking-wider font-jp transition-colors leading-none mt-0.5 truncate ${
                                    scrolled ? 'text-emerald-700' : 'text-emerald-300'
                                }`}>
                                    株式会社スギヤマ / SUGIYAMA
                                </span>
                            </div>
                        </Link>

                        {/* 2. Desktop Navigation Links (Clean, No-Wrap, Balanced Gaps) */}
                        <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center px-1">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-2 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-200 ${
                                        item.active 
                                            ? scrolled
                                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                                                : 'bg-white/15 text-emerald-300 border border-white/20 shadow-2xs backdrop-blur-xs'
                                            : scrolled 
                                                ? 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100' 
                                                : 'text-slate-200 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* 3. Right Tools: Language Selector + RFQ Button */}
                        <div className="hidden xl:flex items-center gap-1.5 shrink-0">
                            {/* 3-Language Toggle Segmented Pill */}
                            <div className={`flex items-center rounded-full p-0.5 border transition-colors ${
                                scrolled 
                                    ? 'bg-slate-100 border-slate-200 text-slate-700' 
                                    : 'bg-slate-900/70 border-white/20 text-white backdrop-blur-xs'
                            }`}>
                                {[
                                    { code: 'id', label: 'ID' },
                                    { code: 'en', label: 'EN' },
                                    { code: 'ja', label: 'JP' },
                                ].map((item) => (
                                    <button
                                        key={item.code}
                                        type="button"
                                        onClick={() => setLang(item.code)}
                                        className={`px-2 py-1 text-[10px] font-black rounded-full transition-all cursor-pointer ${
                                            lang === item.code 
                                                ? 'bg-emerald-700 text-white shadow-xs' 
                                                : 'hover:text-emerald-400 opacity-70 hover:opacity-100'
                                        }`}
                                        title={`Switch to ${item.label}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            {/* Contact Hotline / RFQ Button */}
                            <Link
                                href="/kontak?type=rfq"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>{t('nav_rfq', 'Minta RFQ')}</span>
                            </Link>
                        </div>

                        {/* 4. Mobile Menu Button & Quick Switcher */}
                        <div className="flex items-center gap-2 xl:hidden shrink-0">
                            {/* Mobile Language Switcher Pill */}
                            <div className={`h-8 sm:h-9 flex items-center rounded-full p-0.5 border shadow-xs transition-colors ${
                                scrolled 
                                    ? 'bg-slate-100 border-slate-200 text-slate-700' 
                                    : 'bg-slate-900/80 border-white/20 text-white backdrop-blur-xs'
                            }`}>
                                {['id', 'en', 'ja'].map((code) => (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => setLang(code)}
                                        className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase transition-all cursor-pointer leading-none ${
                                            lang === code 
                                                ? 'bg-emerald-700 text-white shadow-xs' 
                                                : 'opacity-70 hover:opacity-100 hover:text-emerald-400'
                                        }`}
                                    >
                                        {code}
                                    </button>
                                ))}
                            </div>

                            {/* Elegant Custom Burger Menu Button */}
                            <button
                                type="button"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Buka Menu Navigasi"
                                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex flex-col items-center justify-center gap-1 border shadow-xs transition-all duration-200 cursor-pointer active:scale-95 ${
                                    scrolled 
                                        ? 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200' 
                                        : 'bg-slate-900/80 border-white/20 text-white hover:bg-slate-900 backdrop-blur-xs'
                                }`}
                            >
                                <span className="w-3.5 h-0.5 rounded-full bg-current transition-all" />
                                <span className="w-4 h-0.5 rounded-full bg-current transition-all" />
                                <span className="w-2.5 h-0.5 rounded-full bg-current transition-all self-center" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Slide-Out Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 flex justify-end xl:hidden animate-in fade-in duration-200">
                    <div 
                        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
                        onClick={() => setMobileOpen(false)}
                    />
                    
                    <div className="relative w-full max-w-xs bg-slate-950 text-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 border-l border-slate-800 overflow-y-auto">
                        <div className="space-y-6">
                            {/* Top header */}
                            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center font-bold text-base text-white">
                                        <span className="font-jp">ス</span>
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">PT. Sugiyama Indonesia</span>
                                </div>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* 3-Language Selector in Mobile Drawer */}
                            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pilih Bahasa / Language / 言語</p>
                                <div className="grid grid-cols-3 gap-1">
                                    {[
                                        { code: 'id', label: 'Bahasa ID' },
                                        { code: 'en', label: 'English EN' },
                                        { code: 'ja', label: '日本語 JP' },
                                    ].map((item) => (
                                        <button
                                            key={item.code}
                                            onClick={() => setLang(item.code)}
                                            className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                                                lang === item.code 
                                                    ? 'bg-emerald-700 text-white shadow-xs' 
                                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Nav Links */}
                            <nav className="space-y-1">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                                            item.active 
                                                ? 'bg-emerald-700 text-white' 
                                                : 'text-slate-300 hover:text-white hover:bg-slate-900'
                                        }`}
                                    >
                                        <span>{item.name}</span>
                                        <ChevronRight className="w-4 h-4 opacity-50" />
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Footer in Drawer */}
                        <div className="pt-6 border-t border-slate-800 space-y-3">
                            <div className="text-[11px] text-slate-400">
                                <p className="font-semibold text-slate-200">Hotline:</p>
                                <p className="font-mono text-emerald-400 font-bold">{siteSettings.contact_phone || '0567-68-7077'}</p>
                            </div>

                            <Link
                                href="/kontak?type=rfq"
                                onClick={() => setMobileOpen(false)}
                                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider text-center block shadow-md"
                            >
                                {t('nav_rfq', 'Minta Penawaran (RFQ)')}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
