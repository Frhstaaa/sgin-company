import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { useLanguage } from '../Context/LanguageContext';
import YouTubeEmbed from '../Components/YouTubeEmbed';
import { 
    Calendar, Globe, Cpu, ArrowRight, ChevronRight, ChevronLeft, Phone, 
    ShieldCheck, Sparkles, Building2, Layers, CheckCircle2,
    Cog, ExternalLink, ArrowUpRight, Award, Flame, Zap, Workflow, Package,
    Newspaper, Tag, Clock, Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../Components/ScrollReveal';

export default function Home({ 
    heroSlides = [], 
    stats = [], 
    technologies = [], 
    businesses = [], 
    featuredProducts = [], 
    equipmentCount = 0, 
    about = {}, 
    latestNews = [], 
    settings = {} 
}) {
    const { t, lang, translateModel } = useLanguage();
    const [activeTechIndex, setActiveTechIndex] = useState(0);
    const [activeBizIndex, setActiveBizIndex] = useState(0);
    const [activeNewsIndex, setActiveNewsIndex] = useState(0);

    const nextBiz = () => {
        if (businesses.length === 0) return;
        setActiveBizIndex((prev) => (prev + 1) % businesses.length);
    };

    const prevBiz = () => {
        if (businesses.length === 0) return;
        setActiveBizIndex((prev) => (prev - 1 + businesses.length) % businesses.length);
    };

    const nextNews = () => {
        const total = Math.min(latestNews.length, 3);
        if (total === 0) return;
        setActiveNewsIndex((prev) => (prev + 1) % total);
    };

    const prevNews = () => {
        const total = Math.min(latestNews.length, 3);
        if (total === 0) return;
        setActiveNewsIndex((prev) => (prev - 1 + total) % total);
    };

    const defaultFeaturedProducts = [
        {
            id: 1,
            slug: 'precision-flange-shaft-pinion',
            name: 'Precision Flange Shaft Pinion',
            name_jp: '高強度フランジシャフト',
            image_url: '/images/sgin-placeholder.png',
            category: { name: 'Powertrain Transmission', name_jp: '駆動系部品' },
            material: 'SCr420H / SCM435',
            tolerance: '±0.005 mm',
            application: 'Automatic Transmission & Powertrain',
        },
        {
            id: 2,
            slug: 'hollow-stepped-rivet-shaft',
            name: 'Hollow Stepped Rivet Shaft',
            name_jp: '中空段付きシャフト',
            image_url: '/images/sgin-placeholder.png',
            category: { name: 'Steering Column System', name_jp: 'ステアリング部品' },
            material: 'SWCH10R / 1018 Steel',
            tolerance: '±0.008 mm',
            application: 'EPS Steering Column Assembly',
        },
        {
            id: 3,
            slug: 'ev-inverter-copper-busbar-terminal',
            name: 'EV Inverter Copper Busbar Terminal',
            name_jp: 'EVインバータ用高純度銅端子',
            image_url: '/images/sgin-placeholder.png',
            category: { name: 'EV & Electrical Components', name_jp: 'EV・電装部品' },
            material: 'C1100 Oxygen-Free Copper',
            tolerance: '±0.005 mm',
            application: 'High-Voltage Battery Pack & Inverter',
        },
        {
            id: 4,
            slug: 'ultra-precision-micro-gear-blank',
            name: 'Ultra-Precision Micro Gear Blank',
            name_jp: '精密マイクロギヤブランク',
            image_url: '/images/sgin-placeholder.png',
            category: { name: 'Robotics & Actuators', name_jp: 'ロボティクス・駆動要素' },
            material: 'SNCM220 / SUJ2',
            tolerance: '±0.003 mm',
            application: 'Industrial Servo Motors & Actuators',
        },
    ];

    const displayProducts = (featuredProducts && featuredProducts.length > 0) ? featuredProducts : defaultFeaturedProducts;

    const rawActiveSlide = heroSlides[0] || {
        title_jp: '技術を鍛え 未来を造る',
        title_id: 'Menempa Teknologi, Membangun Masa Depan',
        subtitle: 'Sebagai seorang ahli penempaan dan manufaktur presisi, kami merevolusi kualitas industri global melalui keterampilan teknis kelas dunia.',
        image_url: '/images/sgin-placeholder.png',
    };
    const activeSlide = translateModel(rawActiveSlide, 'hero');
    const translatedAbout = translateModel(about, 'company_profile');

    return (
        <AppLayout>
            <Head>
                <title>{`PT. Sugiyama Indonesia | 株式会社スギヤマ - ${t('tagline_sub', 'Menempa Teknologi, Membangun Masa Depan')}`}</title>
                <meta name="description" content="PT. Sugiyama Indonesia (株式会社スギヤマ / Sugiyama) adalah produsen manufaktur presisi spesialis cold forging (penempaan dingin), CNC machining, komponen powertrain otomotif & EV berstandar IATF 16949 di GIIC Cikarang." />
                <meta name="keywords" content="PT Sugiyama Indonesia, PT Sugiyama, Sugiyama, 株式会社スギヤマ, Sugiyama Indonesia, Sugiyama Precision, cold forging, penempaan dingin, suku cadang presisi otomotif, GIIC Cikarang, IATF 16949" />
            </Head>

            {/* ========================================================================= */}
            {/* 1. HERO SECTION (Japanese Kanji Typography + Background) */}
            {/* ========================================================================= */}
            <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-16 sm:pt-20 bg-slate-950 w-full max-w-full">
                {/* Hero Background Image & Atmospheric Gradients */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img 
                        src={activeSlide.image_url} 
                        alt="PT. Sugiyama Indonesia Precision Facility" 
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/75 to-slate-950/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />
                </div>

                {/* Hero Main Content */}
                <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-24 pb-16 flex-1 flex flex-col justify-start sm:justify-center w-full">
                    <div className={`grid grid-cols-1 ${settings?.home_hero_video ? 'lg:grid-cols-12 gap-8 lg:gap-12 items-center' : ''}`}>
                        <div className={`${settings?.home_hero_video ? 'lg:col-span-7' : 'max-w-3xl'} space-y-4 sm:space-y-6`}>
                            {/* Japanese Kanji Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold backdrop-blur-md shadow-lg max-w-full">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                                <span className="font-jp tracking-wider truncate">PT. SUGIYAMA INDONESIA / 株式会社スギヤマ</span>
                            </div>

                            {/* Main Title */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="space-y-2 max-w-full"
                            >
                                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] drop-shadow-md break-words">
                                    <span className="font-jp inline-block bg-emerald-700 text-white px-3 sm:px-4 py-1 sm:py-1.5 mb-1 sm:mb-2 tracking-wider text-lg sm:text-2xl lg:text-3xl">
                                        SUGIYAMA INDONESIA
                                    </span>
                                    <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 block mt-1 font-display">
                                        {(lang === 'id' && activeSlide.title_id) ? activeSlide.title_id : t('tagline_sub', 'Menempa Teknologi, Membangun Masa Depan')}
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                className="text-slate-200 text-xs sm:text-base leading-relaxed max-w-xl font-normal drop-shadow-sm"
                            >
                                {(lang === 'id' && activeSlide.subtitle) ? activeSlide.subtitle : t('hero_desc', 'Sebagai seorang ahli penempaan dan manufaktur presisi, kami merevolusi kualitas industri global melalui keterampilan teknis kelas dunia.')}
                            </motion.p>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
                                <Link
                                    href={activeSlide.button_link || "/contact"}
                                    className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-emerald-950/60 hover:shadow-emerald-700/50 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <span>{(lang !== 'id' && !rawActiveSlide[`button_text_${lang === 'ja' ? 'jp' : 'en'}`]) ? t('hero_btn_contact', 'Hubungi Kami') : (activeSlide.button_text || t('hero_btn_contact', 'Hubungi Kami'))}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    href="/technology"
                                    className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 hover:border-white/40 transition-all text-center"
                                >
                                    {t('hero_btn_tech', 'Pelajari Teknologi')}
                                </Link>
                            </div>
                        </div>

                        {/* Dedicated Video Showcase on Hero Right */}
                        {settings?.home_hero_video && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="lg:col-span-5 relative"
                            >
                                <div className="p-2 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-emerald-950/60">
                                    <YouTubeEmbed url={settings.home_hero_video} title="Video Dokumentasi PT. Sugiyama Indonesia" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Ultra-smooth progressive scrim gradient fade behind the floating quote card */}
                <div 
                    className="absolute bottom-0 left-0 w-full h-28 sm:h-44 z-20 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to top, rgba(248, 250, 252, 1) 0%, rgba(248, 250, 252, 0.92) 15%, rgba(248, 250, 252, 0.65) 32%, rgba(248, 250, 252, 0.35) 50%, rgba(248, 250, 252, 0.12) 70%, rgba(248, 250, 252, 0.03) 85%, rgba(248, 250, 252, 0) 100%)'
                    }}
                />

                {/* Floating Mission Quote Box precisely centered on the border (50% on hero, 50% on content below) */}
                <div className="relative z-30 w-full max-w-4xl mx-auto px-4 -mb-16 sm:-mb-20">
                    <div className="bg-white/98 backdrop-blur-md p-5 sm:p-8 md:p-9 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100/90 text-center space-y-2 sm:space-y-3 transition-all hover:shadow-emerald-950/15">
                        <div className="w-8 sm:w-10 h-1 bg-emerald-600 rounded-full mx-auto mb-1" />
                        <p className="text-xs sm:text-base md:text-lg font-bold text-slate-800 leading-relaxed font-display">
                            "{t('hero_quote', 'Sebagai seorang ahli penempaan, kami akan merevolusi kualitas manufaktur presisi dunia melalui keterampilan teknis tanpa kompromi.')}"
                        </p>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. STATS SECTION (Dynamic from /admin/stats) */}
            {/* ========================================================================= */}
            <section className="bg-slate-50 pt-24 sm:pt-28 pb-20 border-b border-slate-200/60 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {stats && stats.length > 0 ? (
                            stats.map((rawSt, idx) => {
                                const st = translateModel(rawSt, 'stat');
                                const statTitle = lang === 'ja' && st.title_jp ? st.title_jp : (st.title_id || st.title || '');
                                const badgeTitle = st.badge || (st.title_jp ? `${st.title_jp} / ${(st.title_id || '').toUpperCase()}` : (st.title_id || 'STATISTIK'));
                                
                                const renderStatIcon = (iconName) => {
                                    switch (iconName) {
                                        case 'calendar': return <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />;
                                        case 'globe': return <Globe className="w-5 h-5 sm:w-6 sm:h-6" />;
                                        case 'cpu': return <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />;
                                        case 'award': return <Award className="w-5 h-5 sm:w-6 sm:h-6" />;
                                        default: return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />;
                                    }
                                };

                                return (
                                    <ScrollReveal key={st.id || idx} delay={0.1 * (idx + 1)}>
                                        <div className="group bg-white p-5 sm:p-8 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 flex flex-col justify-between h-full">
                                            <div className="space-y-3 sm:space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] sm:text-xs font-bold font-jp text-slate-400 uppercase tracking-wider">
                                                        {badgeTitle}
                                                    </span>
                                                    <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                                                        {renderStatIcon(st.icon)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                                                        {statTitle}
                                                    </h3>
                                                    <div className="flex items-baseline gap-1 text-slate-900 font-extrabold tracking-tight">
                                                        <span className="text-2xl sm:text-3xl lg:text-4xl text-emerald-800 font-display font-black leading-tight">
                                                            {st.value}
                                                        </span>
                                                        {st.unit && (
                                                            <span className="text-lg text-emerald-700 font-jp font-bold">
                                                                {st.unit}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {st.subtext && (
                                                <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-1">
                                                    <span>{st.subtext}</span>
                                                    <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform shrink-0" />
                                                </div>
                                            )}
                                        </div>
                                    </ScrollReveal>
                                );
                            })
                        ) : (
                            <>
                                <ScrollReveal delay={0.1}>
                                    <div className="group bg-white p-5 sm:p-8 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 flex flex-col justify-between h-full">
                                        <div className="space-y-3 sm:space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] sm:text-xs font-bold font-jp text-slate-400 uppercase tracking-wider">
                                                    創業年 / ESTABLISHED
                                                </span>
                                                <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                                                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                                                    {t('stat_est_title', 'Tahun Berdiri')}
                                                </h3>
                                                <div className="flex items-baseline gap-1 text-slate-900 font-extrabold tracking-tight">
                                                    <span className="text-2xl sm:text-3xl lg:text-4xl text-emerald-800 font-display font-black leading-tight">
                                                        {t('stat_est_val', '1952')}
                                                    </span>
                                                    <span className="text-lg text-emerald-700 font-jp font-bold">
                                                        {t('stat_est_unit', '年')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-medium">
                                            <span>{t('stat_est_sub', 'Lebih dari 70 tahun dedikasi presisi')}</span>
                                            <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. TEKNOLOGI SECTION */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                        {/* Left Narrative */}
                        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                            <div>
                                <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                                    {t('tech_badge', 'Teknologi Kami / 技術紹介')}
                                </span>
                                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
                                    {t('tech_title', 'Teknologi & Keunggulan Rekayasa Presisi')}
                                </h2>
                            </div>

                            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                                {t('tech_desc', 'Menggabungkan keahlian cetakan penempaan dingin dengan pemesinan CNC multi-sumbu untuk efisiensi material dan kekuatan mekanis tertinggi.')}
                            </p>

                            <div className="pt-2">
                                <Link
                                    href="/technology"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                                >
                                    <span>{t('tech_view_all', 'Lihat Seluruh Teknologi Kami')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Right: 3 Numbered Interactive Cards */}
                        <div className="lg:col-span-7 space-y-4">
                            {technologies.map((rawTech, index) => {
                                const tech = translateModel(rawTech, 'technology');
                                return (
                                    <ScrollReveal key={tech.id || index} delay={index * 0.1} direction="left">
                                        <Link
                                            href={`/technology/${tech.slug}`}
                                            className="block p-5 sm:p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 group"
                                        >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                                            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                                <span className="text-2xl sm:text-4xl font-black text-emerald-800 font-display group-hover:text-emerald-600 transition-colors">
                                                    {tech.step_number || `0${index + 1}`}
                                                </span>
                                                <div>
                                                    <h3 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                                                        {tech.title}
                                                    </h3>
                                                    {tech.title_jp && lang !== 'ja' && (
                                                        <p className="text-xs text-slate-400 font-jp mt-0.5">
                                                            {tech.title_jp}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform shrink-0">
                                                <span>{t('tech_read_more', 'Pelajari')}</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <p className="text-xs sm:text-sm text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                                            {tech.short_description}
                                        </p>
                                        </Link>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. BISNIS SECTION */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">
                            {t('biz_badge', 'Unit Bisnis / 事業紹介')}
                        </span>
                        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            {t('biz_title', 'Bidang Usaha & Keahlian Manufaktur')}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            {t('biz_desc', 'Solusi manufaktur presisi komprehensif mulai dari penempaan dingin net-shape, turning CNC, hingga rekayasa aditif 3D.')}
                        </p>
                    </div>

                    {/* Mobile Carousel View (< md) */}
                    <div className="block md:hidden">
                        {businesses.length > 0 && (() => {
                            const rawBiz = businesses[activeBizIndex] || businesses[0];
                            const biz = translateModel(rawBiz, 'business');

                            return (
                                <div className="space-y-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeBizIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200/90 flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                                                    <img 
                                                        src={biz.image_url} 
                                                        alt={biz.title} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                        <span className="px-2.5 py-1 rounded-full bg-emerald-700/95 text-white text-[10px] font-bold backdrop-blur-xs shadow-xs">
                                                            {biz.tag || 'Core Business'}
                                                        </span>
                                                        <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                                                            {String(activeBizIndex + 1).padStart(2, '0')} / {String(businesses.length).padStart(2, '0')}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-5 space-y-2">
                                                    <h3 className="text-base font-bold text-slate-900">
                                                        {biz.title}
                                                    </h3>
                                                    {biz.title_jp && lang !== 'ja' && (
                                                        <p className="text-[11px] text-slate-400 font-jp">{biz.title_jp}</p>
                                                    )}
                                                    <p className="text-xs text-slate-600 leading-relaxed">
                                                        {biz.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                                                <Link
                                                    href={`/business/${biz.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-600 transition-colors py-2"
                                                >
                                                    <span>{t('tech_read_more', 'Pelajari Selengkapnya')}</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>

                                                {/* Prev / Next controls */}
                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={prevBiz}
                                                        className="w-8 h-8 rounded-full bg-slate-100 active:bg-emerald-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                                                        aria-label="Previous business unit"
                                                    >
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={nextBiz}
                                                        className="w-8 h-8 rounded-full bg-emerald-800 active:bg-emerald-700 text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                                                        aria-label="Next business unit"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Carousel Pagination Dots */}
                                    <div className="flex items-center justify-center gap-2 pt-1">
                                        {businesses.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setActiveBizIndex(i)}
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    activeBizIndex === i ? 'w-6 bg-emerald-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
                                                }`}
                                                aria-label={`Go to slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Desktop Grid View (>= md) */}
                    <div className="hidden md:grid md:grid-cols-3 gap-8">
                        {businesses.map((rawBiz, idx) => {
                            const biz = translateModel(rawBiz, 'business');
                            return (
                                <ScrollReveal key={biz.id || idx} delay={idx * 0.1}>
                                    <div 
                                        className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group h-full"
                                    >
                                    <div>
                                        <div className="relative h-56 overflow-hidden bg-slate-900">
                                            <img 
                                                src={biz.image_url} 
                                                alt={biz.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="px-3 py-1 rounded-full bg-emerald-700/90 text-white text-[11px] font-bold backdrop-blur-xs">
                                                    {biz.tag || 'Core Business'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5 sm:p-8 space-y-2 sm:space-y-3">
                                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                                                {biz.title}
                                            </h3>
                                            {biz.title_jp && lang !== 'ja' && (
                                                <p className="text-xs text-slate-400 font-jp">{biz.title_jp}</p>
                                            )}
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                {biz.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0">
                                        <Link
                                            href={`/business/${biz.slug}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-600 transition-colors"
                                        >
                                            <span>{t('tech_read_more', 'Pelajari')}</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 5. FASILITAS MESIN & PROSES PRODUKSI TERPADU */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 inline-block">
                            {t('home_eq_badge', 'Fasilitas & Proses / 設備・製造工程')}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            {t('home_eq_title', 'Fasilitas Mesin & Alur Proses Produksi Presisi')}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            {t('home_eq_desc', 'Didukung armada multi-station cold former 6-Die berkecepatan tinggi, pusat bubut CNC 5-sumbu, dan laboratorium inspeksi mutu CMM 3D.')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        {/* Card A: Mesin & Peralatan */}
                        <ScrollReveal delay={0.1}>
                            <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200 group flex flex-col justify-between h-full transition-all duration-300 bg-slate-950 text-white min-h-[420px]">
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        src={settings.home_facility_image || '/images/sgin-placeholder.png'} 
                                        alt={settings.home_facility_title || 'Fasilitas Mesin Sugiyama'} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-emerald-950/40" />
                                </div>

                                <div className="relative z-10 p-6 sm:p-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs">
                                            <Cog className="w-3.5 h-3.5" />
                                            <span>{(lang === 'id' && settings.home_facility_badge) ? settings.home_facility_badge : t('eq_header_title', 'Fasilitas & Mesin Manufaktur Presisi')}</span>
                                        </span>
                                        <span className="text-xs font-jp text-slate-400">{settings.home_facility_tag_jp || '設備紹介'}</span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                                        {(lang === 'id' && settings.home_facility_title) ? settings.home_facility_title : t('home_eq_title', 'Fasilitas Mesin & Peralatan Presisi')}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                        {(lang === 'id' && settings.home_facility_desc) ? settings.home_facility_desc : 'Kombinasi mesin penempa dingin 6-Die berkecepatan 180 pcs/menit dan mesin CNC bubut 5-axis untuk menghasilkan komponen net-shape tanpa pemborosan material.'}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
                                            <p className="text-[10px] text-emerald-300 font-bold uppercase">{settings.home_facility_feat1_title || 'Cold Former 6-Die'}</p>
                                            <p className="text-xs font-semibold text-white">{settings.home_facility_feat1_desc || 'Kecepatan Max 180 ppm'}</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
                                            <p className="text-[10px] text-emerald-300 font-bold uppercase">{settings.home_facility_feat2_title || '5-Axis CNC Turning'}</p>
                                            <p className="text-xs font-semibold text-white">{settings.home_facility_feat2_desc || 'Toleransi Presisi ±0.005mm'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 p-6 sm:p-8 pt-0">
                                    <Link
                                        href={settings.home_facility_btn_link || '/equipment'}
                                        className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-emerald-600/40"
                                    >
                                        <span>{(lang === 'id' && settings.home_facility_btn_text) ? settings.home_facility_btn_text : t('home_eq_btn', 'Lihat Semua Fasilitas Mesin')}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Card B: Alur Proses Produksi */}
                        <ScrollReveal delay={0.2}>
                            <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200 group flex flex-col justify-between h-full transition-all duration-300 bg-slate-950 text-white min-h-[420px]">
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        src={settings.home_process_image || '/images/sgin-placeholder.png'} 
                                        alt={settings.home_process_title || 'Alur Proses Produksi Sugiyama'} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-emerald-950/40" />
                                </div>

                                <div className="relative z-10 p-6 sm:p-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs">
                                            <Workflow className="w-3.5 h-3.5" />
                                            <span>{(lang === 'id' && settings.home_process_badge) ? settings.home_process_badge : t('home_proc_badge', 'Proses Produksi / 製造工程')}</span>
                                        </span>
                                        <span className="text-xs font-jp text-slate-400">{settings.home_process_tag_jp || '製造工程'}</span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                                        {(lang === 'id' && settings.home_process_title) ? settings.home_process_title : t('home_proc_title', 'Alur Rekayasa & Proses Produksi')}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                        {(lang === 'id' && settings.home_process_desc) ? settings.home_process_desc : 'Pengawasan kualitas ketat dari material kawat baja bersertifikat, penempaan dingin terkontrol, hingga inspeksi koordinat 3D CMM sub-mikron.'}
                                    </p>

                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-2 text-xs text-slate-200">
                                            <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                                            <span>{(lang === 'id' && settings.home_process_step1) ? settings.home_process_step1 : 'Persiapan & Uji Metalurgi Kawat Baja'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-200">
                                            <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                                            <span>{(lang === 'id' && settings.home_process_step2) ? settings.home_process_step2 : 'Net-Shape Cold Forging Tanpa Pemanasan'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-200">
                                            <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                                            <span>{(lang === 'id' && settings.home_process_step3) ? settings.home_process_step3 : 'Quality Control 100% Berstandar Jepang'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 p-6 sm:p-8 pt-0">
                                    <Link
                                        href={settings.home_process_btn_link || '/production-process'}
                                        className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md"
                                    >
                                        <span>{(lang === 'id' && settings.home_process_btn_text) ? settings.home_process_btn_text : t('home_proc_btn', 'Pelajari 5 Tahap Proses Produksi')}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 5. KATALOG PRODUK UNGGULAN SECTION */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 inline-block">
                                {t('home_prd_badge', 'Katalog Produk / 製品情報')}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                {t('home_prd_title', 'Komponen Presisi Otomotif & Elektrifikasi EV')}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {t('home_prd_desc', 'Suku cadang powertrain otomotif, stepped rivet shaft, terminal tembaga inverter EV, dan micro gear berstandar mutu tinggi Jepang.')}
                            </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-3">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-emerald-900/20"
                            >
                                <span>{t('home_prd_view_all', 'Lihat Semua Produk')}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Featured Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayProducts.slice(0, 4).map((rawPrd, idx) => {
                            const prd = translateModel(rawPrd, 'product');
                            const categoryName = prd.category?.name || 'Precision Component';

                            return (
                                <ScrollReveal key={prd.id || idx} delay={idx * 0.1}>
                                    <Link
                                        href={`/products/${prd.slug}`}
                                        className="group bg-white hover:bg-slate-50/50 rounded-2xl border border-slate-200/90 hover:border-emerald-300 p-4 transition-all duration-300 flex flex-col justify-between h-full shadow-xs hover:shadow-xl hover:shadow-emerald-950/10 block"
                                    >
                                        <div className="space-y-4">
                                            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                                                <img 
                                                    src={prd.image_url} 
                                                    alt={prd.name} 
                                                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                                                <div className="absolute top-2.5 left-2.5">
                                                    <span className="px-2 py-0.5 rounded-md bg-emerald-100/90 text-emerald-800 text-[10px] font-bold border border-emerald-300/60 backdrop-blur-xs">
                                                        {categoryName}
                                                    </span>
                                                </div>
                                                {prd.tolerance && (
                                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-slate-200 font-mono">
                                                        <span className="bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs">Toleransi: {prd.tolerance}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-1.5">
                                                <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                                                    {prd.name}
                                                </h3>
                                                {prd.name_jp && lang !== 'ja' && (
                                                    <p className="text-[11px] text-slate-400 font-jp line-clamp-1">{prd.name_jp}</p>
                                                )}
                                                {prd.application && (
                                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                        {prd.application}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-600">
                                            <span>{t('prd_btn_detail', 'Lihat Detail Komponen')}</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                    {/* RFQ Callout Strip */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
                        <div className="space-y-1.5">
                            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-emerald-400" />
                                <span>Butuh Komponen Kustom dengan Gambar Teknik 2D/3D CAD?</span>
                            </h4>
                            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl leading-relaxed">
                                Tim rekayasa kami siap menganalisis efisiensi biaya penempaan dingin dan kelayakan manufaktur komponen Anda.
                            </p>
                        </div>
                        <Link
                            href="/contact?type=rfq"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
                        >
                            <span>{t('home_prd_rfq_btn', 'Minta Penawaran Harga (RFQ)')}</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 6. ABOUT SECTION (Corporate Heritage & Leadership) */}
            {/* ========================================================================= */}
            <section className="py-20 md:py-28 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200/60">
                {/* Background Japanese Watermark & Subtle Blueprint Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-100/70 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    {/* Subtle Japanese Kanji watermark in background */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-100/80 font-black text-9xl select-none font-jp hidden xl:block">
                        株式会社スギヤマ
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                            
                            {/* LEFT: Leadership & Legacy Story */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
                                        <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                                        <span>{(lang === 'id' && settings.about_hero_badge) ? settings.about_hero_badge : t('about_badge', 'Tentang Kami / 会社概要')}</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                                        {(lang === 'id' && settings.about_hero_title) ? settings.about_hero_title : t('about_title', 'Keahlian Presisi Jepang Berstandar Global')}
                                    </h2>
                                    <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                                        {(lang === 'id' && settings.about_hero_lead) ? settings.about_hero_lead : t('about_lead', 'Sejak didirikan pada tahun 1952 di Aichi, Jepang, PT. Sugiyama Indonesia (Sugiyama Group) terus menempa batas inovasi teknik penempaan dingin dan komponen presisi berstandar mutu otomotif global.')}
                                    </p>
                                </div>

                                {/* President Quote Card */}
                                <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-md relative overflow-hidden">
                                    <Quote className="w-10 h-10 text-emerald-800/10 absolute right-4 top-4 pointer-events-none" />
                                    <div className="space-y-4 relative z-10">
                                        <p className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed">
                                            "{translatedAbout.president_message || 'Sebagai seorang ahli penempaan, kami akan merevolusi kualitas manufaktur presisi dunia melalui keterampilan teknis tanpa kompromi.'}"
                                        </p>

                                        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-600 shadow-xs shrink-0 bg-slate-100">
                                                    <img 
                                                        src={about.president_photo_url || '/images/sgin-placeholder.png'} 
                                                        alt={translatedAbout.president_name || 'Yuichi Sugiyama'} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-extrabold text-slate-900 text-sm">
                                                        {translatedAbout.president_name || 'Yuichi Sugiyama'}
                                                    </p>
                                                    <p className="text-[11px] text-emerald-800 font-bold">
                                                        {t('about_president_role', 'Presiden Direktur PT. Sugiyama Indonesia')}
                                                    </p>
                                                </div>
                                            </div>

                                            <Link
                                                href="/about-us"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-xs shadow-md hover:shadow-emerald-950/20 transition-all shrink-0"
                                            >
                                                <span>{t('about_btn_more', 'Profil Lengkap & Sejarah')}</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Visual Showcase & Floating Badges */}
                            <div className="lg:col-span-5 relative">
                                {/* Main Facility Showcase Image Card */}
                                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group aspect-4/3 bg-slate-100">
                                    <img 
                                        src={settings.home_about_image || '/images/sgin-placeholder.png'} 
                                        alt="Fasilitas Manufaktur PT. Sugiyama Indonesia" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                                    {/* Top Overlay Badges inside the card (Never clipped) */}
                                    <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 z-10">
                                        {/* Quality Badge */}
                                        <div className="py-1.5 px-3 rounded-xl bg-white/95 border border-slate-200 text-slate-900 shadow-md backdrop-blur-md flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200 shrink-0">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none">Standar Mutu</p>
                                                <p className="text-[11px] font-black text-slate-900 font-mono leading-tight mt-0.5">{settings.home_about_badge_quality || 'IATF 16949 & ISO 9001'}</p>
                                            </div>
                                        </div>

                                        {/* Heritage Badge */}
                                        <div className="py-1.5 px-3 rounded-xl bg-white/95 border border-slate-200 text-slate-900 shadow-md backdrop-blur-md flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200 shrink-0">
                                                <Award className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[9px] font-bold text-amber-700 uppercase tracking-wider leading-none">Sejak 1952</p>
                                                <p className="text-[11px] font-black text-slate-900 leading-tight mt-0.5">{settings.home_about_badge_heritage || 'Aichi, Jepang'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Plant Label on Bottom */}
                                    <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 flex items-center justify-between text-xs z-10 shadow-lg">
                                        <div>
                                            <p className="font-extrabold text-slate-900 text-xs sm:text-sm">{settings.home_about_plant_title || 'Pabrik & Kantor GIIC Cikarang'}</p>
                                            <p className="text-[10px] text-slate-500">{settings.home_about_plant_subtitle || 'Greenland International Industrial Center (GIIC)'}</p>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] border border-emerald-300/60 shrink-0">
                                            {settings.home_about_plant_tag || 'ASEAN Hub'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* 3 Key Corporate Pillars Mini-Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5 shadow-2xs">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Jaringan Global Aichi & GIIC</h4>
                                    <p className="text-[11px] text-slate-500">3 Fasilitas di Jepang & 1 Hub ASEAN di Cikarang</p>
                                </div>
                            </div>

                            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5 shadow-2xs">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Presisi Mikro ±0.005 mm</h4>
                                    <p className="text-[11px] text-slate-500">Pemesinan CNC 5-Axis & Cold Former 6-Die</p>
                                </div>
                            </div>

                            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5 shadow-2xs">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Filosofi Mutu Kaizen</h4>
                                    <p className="text-[11px] text-slate-500">Inovasi tanpa henti & Zero-Defect Quality</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 7. NEWS SECTION */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-white border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-6">
                        <div className="space-y-2">
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 inline-flex items-center gap-1.5">
                                <Newspaper className="w-3.5 h-3.5" />
                                <span>{t('news_badge', 'Berita & Informasi / お知らせ')}</span>
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                {t('news_title', 'Update Berita Terkini & Informasi Perusahaan')}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                                Kabar korporasi terbaru, ekspansi fasilitas manufaktur, dan pencapaian standar mutu industri.
                            </p>
                        </div>
                        <Link 
                            href="/news" 
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-xs uppercase tracking-wider transition-colors border border-slate-200/80 shrink-0 shadow-2xs"
                        >
                            <span>{t('news_view_all', 'Lihat Semua Berita')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Mobile News Carousel (< md) */}
                    <div className="block md:hidden">
                        {latestNews.length > 0 && (() => {
                            const rawItem = latestNews[activeNewsIndex] || latestNews[0];
                            const item = translateModel(rawItem, 'news');
                            const fallbacks = [
                                '/images/sgin-placeholder.png',
                                '/images/sgin-placeholder.png',
                                '/images/sgin-placeholder.png',
                            ];
                            const coverImg = item.cover_image || fallbacks[activeNewsIndex % fallbacks.length];

                            return (
                                <div className="space-y-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeNewsIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="relative h-48 overflow-hidden bg-slate-900">
                                                    <img 
                                                        src={coverImg} 
                                                        alt={item.title} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                                    
                                                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                                                        <span className="px-2.5 py-1 rounded-full bg-emerald-700/95 text-white font-bold text-[10px] backdrop-blur-xs shadow-xs">
                                                            {item.category || 'Berita'}
                                                        </span>
                                                        <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                                                            {String(activeNewsIndex + 1).padStart(2, '0')} / {String(Math.min(latestNews.length, 3)).padStart(2, '0')}
                                                        </span>
                                                    </div>

                                                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-slate-200 font-mono">
                                                        <Calendar className="w-3 h-3 text-emerald-400" />
                                                        <span>{item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : ''}</span>
                                                    </div>
                                                </div>

                                                <div className="p-5 space-y-2">
                                                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                                        {item.excerpt}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                                                <Link
                                                    href={`/news/${item.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-600 transition-colors py-2"
                                                >
                                                    <span>{t('tech_read_more', 'Baca Selengkapnya')}</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>

                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={prevNews}
                                                        className="w-8 h-8 rounded-full bg-slate-100 active:bg-emerald-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                                                        aria-label="Previous news"
                                                    >
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={nextNews}
                                                        className="w-8 h-8 rounded-full bg-emerald-800 active:bg-emerald-700 text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                                                        aria-label="Next news"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Carousel Pagination Dots */}
                                    <div className="flex items-center justify-center gap-2 pt-1">
                                        {latestNews.slice(0, 3).map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setActiveNewsIndex(i)}
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    activeNewsIndex === i ? 'w-6 bg-emerald-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
                                                }`}
                                                aria-label={`Go to news slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Desktop News Grid (>= md) */}
                    <div className="hidden md:grid md:grid-cols-3 gap-8">
                        {latestNews.slice(0, 3).map((rawItem, idx) => {
                            const item = translateModel(rawItem, 'news');
                            const fallbacks = [
                                '/images/sgin-placeholder.png',
                                '/images/sgin-placeholder.png',
                                '/images/sgin-placeholder.png',
                            ];
                            const coverImg = item.cover_image || fallbacks[idx % fallbacks.length];

                            return (
                                <ScrollReveal key={item.id || idx} delay={idx * 0.1} direction="up" className="h-full">
                                    <Link 
                                        href={`/news/${item.slug}`}
                                        className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/90 hover:border-emerald-300 transition-all duration-500 flex flex-col justify-between h-full"
                                    >
                                        <div>
                                            <div className="relative h-52 overflow-hidden bg-slate-900">
                                                <img 
                                                    src={coverImg} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                                
                                                <div className="absolute top-3.5 left-3.5">
                                                    <span className="px-3 py-1 rounded-full bg-emerald-800/95 text-white font-bold text-[10px] backdrop-blur-xs shadow-xs">
                                                        {item.category || 'Berita'}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 text-[11px] text-slate-200 font-mono">
                                                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span>{item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : ''}</span>
                                                </div>
                                            </div>

                                            <div className="p-6 space-y-2.5">
                                                <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 text-base leading-snug">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                                    {item.excerpt}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6 pt-0">
                                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-600">
                                                <span>{t('tech_read_more', 'Baca Selengkapnya')}</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 8. RECRUITMENT BANNER */}
            {/* ========================================================================= */}
            <section className="py-8 sm:py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="relative rounded-2xl overflow-hidden bg-emerald-900 text-white p-6 sm:p-12 shadow-xl">
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src="/images/sgin-placeholder.png" 
                                    alt="Sugiyama Precision Recruitment" 
                                    className="w-full h-full object-cover opacity-20"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/80 to-transparent" />
                            </div>

                            <div className="relative z-10 max-w-2xl space-y-4">
                                <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-300 text-[10px] sm:text-xs font-bold">
                                    {t('career_badge', 'Informasi Rekrutmen / 採用情報')}
                                </span>
                                <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                                    {t('career_title', 'Mari Menempa Masa Depan Bersama Insinyur Sugiyama')}
                                </h2>
                                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                                    {t('career_desc', 'Kami mencari talenta berbakat yang memiliki semangat Kaizen dan dedikasi dalam menciptakan teknologi manufaktur presisi tinggi.')}
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href="/careers"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                                    >
                                        <span>{t('career_btn', 'Kunjungi Portal Karir & Lowongan')}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 9. CONTACT CTA & LOCATION MAP (COMBINED 2-COLUMN GRID) */}
            {/* ========================================================================= */}
            <section className="py-12 md:py-20 bg-slate-50 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                        {/* Column 1: Hubungi Kami (Contact CTA) */}
                        <ScrollReveal delay={0.1} direction="up" className="h-full">
                            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white text-slate-900 shadow-sm flex flex-col justify-between h-full relative overflow-hidden border border-slate-200">
                                <div className="space-y-3 relative z-10">
                                    <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                                        {t('cta_badge', 'Hubungi Kami / お問い合わせ')}
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                                        {t('cta_title', 'Konsultasi Kebutuhan Manufaktur Presisi Anda')}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        {t('cta_desc', 'Dapatkan estimasi biaya penempaan dingin, evaluasi gambar teknik 3D CAD, atau konsultasi langsung dengan staf ahli kami.')}
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-semibold">{t('cta_phone_lbl', 'Hotline Kantor Pusat')}</p>
                                        <p className="text-base sm:text-lg font-black font-mono text-emerald-800">
                                            {settings.contact_phone || '0567-68-7077'}
                                        </p>
                                    </div>

                                    <Link
                                        href="/contact"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-emerald-950/20 transition-all shrink-0"
                                    >
                                        <span>{t('cta_btn', 'Formulir RFQ & Kontak')}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Column 2: Lokasi Kami (Location Map) */}
                        <ScrollReveal delay={0.2} direction="up" className="h-full">
                            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                                            {t('map_badge', 'Lokasi Kami / アクセス')}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                                            GIIC Cikarang
                                        </span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 leading-tight">
                                        {t('map_title', 'Kunjungi Pabrik & Kantor Kami')}
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                        {settings.contact_address || 'Kawasan Industri GIIC Blok AA-12, Kota Deltamas, Cikarang Pusat'}
                                    </p>
                                </div>

                                <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200/80 h-52 sm:h-60 bg-slate-100">
                                    <div 
                                        className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                                        dangerouslySetInnerHTML={{ 
                                            __html: settings.google_map_embed || '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63440.101695046!2d107.15796418063826!3d-6.393180535225231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699ec8d0450783%3A0xf8f55f1cd8f651bb!2sPT.%20Sugiyama%20Indonesia!5e0!3m2!1sen!2sus!4v1787366226439!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
                                        }}
                                    />
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
