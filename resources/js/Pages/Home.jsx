import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { useLanguage } from '../Context/LanguageContext';
import { 
    Calendar, Globe, Cpu, ArrowRight, ChevronRight, Phone, 
    ShieldCheck, Sparkles, Building2, Layers, CheckCircle2,
    Cog, ExternalLink, ArrowUpRight, Award, Flame, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
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

    const rawActiveSlide = heroSlides[0] || {
        title_jp: '技術を鍛え 未来を造る',
        title_id: 'Menempa Teknologi, Membangun Masa Depan',
        subtitle: 'Sebagai seorang ahli penempaan dan manufaktur presisi, kami merevolusi kualitas industri global melalui keterampilan teknis kelas dunia.',
        image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop',
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
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/65 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
                </div>

                {/* Hero Main Content */}
                <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-24 pb-16 flex-1 flex flex-col justify-start sm:justify-center w-full">
                    <div className="max-w-3xl space-y-4 sm:space-y-6">
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
                                    {activeSlide.title_id || t('tagline_sub', 'Menempa Teknologi, Membangun Masa Depan')}
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="text-slate-200 text-xs sm:text-base leading-relaxed max-w-xl font-normal drop-shadow-sm"
                        >
                            {t('hero_desc', activeSlide.subtitle)}
                        </motion.p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
                            <Link
                                href={activeSlide.button_link || "/kontak"}
                                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-emerald-950/60 hover:shadow-emerald-700/50 transition-all flex items-center justify-center gap-2 group"
                            >
                                <span>{(lang !== 'id' && !rawActiveSlide[`button_text_${lang === 'ja' ? 'jp' : 'en'}`]) ? t('hero_btn_contact', 'Hubungi Kami') : (activeSlide.button_text || t('hero_btn_contact', 'Hubungi Kami'))}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/teknologi"
                                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 hover:border-white/40 transition-all text-center"
                            >
                                {t('hero_btn_tech', 'Pelajari Teknologi')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Gradient fade to blend with the next section smoothly */}
                <div className="absolute bottom-0 left-0 w-full h-48 sm:h-64 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent z-20 pointer-events-none" />

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
            {/* 2. STATS SECTION */}
            {/* ========================================================================= */}
            <section className="bg-slate-50 pt-24 sm:pt-28 pb-20 border-b border-slate-200/60 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {/* Stat 1: Established Year */}
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

                        {/* Stat 2: Operational Bases */}
                        <ScrollReveal delay={0.2}>
                            <div className="group bg-white p-5 sm:p-8 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 flex flex-col justify-between h-full">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] sm:text-xs font-bold font-jp text-slate-400 uppercase tracking-wider">
                                        拠点数 / GLOBAL BASES
                                    </span>
                                    <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                                        <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                                        {t('stat_bases_title', 'Basis Operasional')}
                                    </h3>
                                    <div className="flex items-baseline gap-1 text-slate-900 font-extrabold tracking-tight">
                                        <span className="text-xl sm:text-3xl lg:text-4xl text-emerald-800 font-display font-black leading-tight">
                                            {t('stat_bases_val', '日本 3 海外 1')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-medium">
                                <span>{t('stat_bases_sub', '3 Pabrik di Jepang & 1 di Indonesia')}</span>
                                <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        </ScrollReveal>

                        {/* Stat 3: Annual Production */}
                        <ScrollReveal delay={0.3}>
                            <div className="group bg-white p-5 sm:p-8 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 flex flex-col justify-between h-full">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] sm:text-xs font-bold font-jp text-slate-400 uppercase tracking-wider">
                                        年間生産数 / ANNUAL OUTPUT
                                    </span>
                                    <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                                        <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                                        {t('stat_prod_title', 'Produksi Tahunan')}
                                    </h3>
                                    <div className="flex items-baseline gap-1 text-slate-900 font-extrabold tracking-tight">
                                        <span className="text-2xl sm:text-3xl lg:text-4xl text-emerald-800 font-display font-black leading-tight">
                                            {t('stat_prod_val', '約 5,000')}
                                        </span>
                                        <span className="text-lg text-emerald-700 font-jp font-bold">
                                            {t('stat_prod_unit', '万個')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-1">
                                <span>{t('stat_prod_sub', 'Hingga 50 juta pcs komponen presisi/tahun')}</span>
                                <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        </ScrollReveal>
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
                                    href="/teknologi"
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
                                            href={`/teknologi/${tech.slug}`}
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                            href={`/bisnis/${biz.slug}`}
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
            {/* 5. SPLIT HIGHLIGHT BANNERS */}
            {/* ========================================================================= */}
            <section className="py-8 md:py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {/* Process & Equipment Card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[280px] sm:min-h-[360px] flex flex-col justify-end p-6 sm:p-10 text-white">
                            <div className="absolute inset-0 z-0 bg-slate-950">
                                <img 
                                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Proses & Peralatan Sugiyama" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-slate-950/60 to-transparent" />
                            </div>

                            <div className="relative z-10 space-y-2 sm:space-y-3">
                                <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-[11px] font-bold">
                                    {t('split_eq_sub', 'Fasilitas & Mesin Manufaktur')}
                                </span>
                                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                                    {t('split_eq_title', 'Proses & Peralatan')}
                                </h3>
                                <p className="text-[11px] sm:text-sm text-slate-200 leading-relaxed max-w-md">
                                    {t('split_eq_desc', 'Dilengkapi mesin multi-station cold former 6-Die, pusat bubut CNC 5-sumbu, dan laboratorium metrologi CMM 3D.')}
                                </p>
                                <div className="pt-2 sm:pt-3">
                                    <Link
                                        href="/peralatan"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-emerald-50 font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-colors shadow-md"
                                    >
                                        <span>{t('split_eq_btn', 'Lihat Fasilitas')}</span>
                                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Products Catalog Card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[280px] sm:min-h-[360px] flex flex-col justify-end p-6 sm:p-10 text-white">
                            <div className="absolute inset-0 z-0 bg-slate-950">
                                <img 
                                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Katalog Produk Sugiyama" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-slate-950/60 to-transparent" />
                            </div>

                            <div className="relative z-10 space-y-2 sm:space-y-3">
                                <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-[11px] font-bold">
                                    {t('split_prd_sub', 'Suku Cadang & Komponen Presisi')}
                                </span>
                                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                                    {t('split_prd_title', 'Katalog Produk')}
                                </h3>
                                <p className="text-[11px] sm:text-sm text-slate-200 leading-relaxed max-w-md">
                                    {t('split_prd_desc', 'Suku cadang powertrain otomotif, shaft pinion, terminal tembaga inverter EV, dan fastener khusus industri.')}
                                </p>
                                <div className="pt-2 sm:pt-3">
                                    <Link
                                        href="/produk"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-colors shadow-md"
                                    >
                                        <span>{t('split_prd_btn', 'Katalog Produk')}</span>
                                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 6. ABOUT SECTION */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                    <div className="bg-white rounded-2xl p-6 sm:p-12 lg:p-16 border border-slate-200/80 shadow-xs">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                                <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                    {t('about_badge', 'Tentang Kami / 会社概要')}
                                </span>
                                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                    {t('about_title', 'Keahlian Presisi Jepang Berstandar Global')}
                                </h2>
                                <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                                    {t('about_lead', 'Sejak didirikan pada tahun 1952 di Aichi, Jepang, PT. Sugiyama Indonesia (Sugiyama Group) terus menempa batas inovasi teknik penempaan dingin.')}
                                </p>

                                <div className="p-5 sm:p-6 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] sm:text-sm text-emerald-950 font-medium italic leading-relaxed">
                                    "{translatedAbout.president_message || 'Sebagai seorang ahli penempaan, kami akan merevolusi kualitas manufaktur presisi dunia melalui keterampilan teknis tanpa kompromi.'}"
                                </div>

                                <div className="pt-2 flex items-center gap-4">
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">
                                            {t('about_president_name', translatedAbout.president_name || 'Takeshi Sugiyama')}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {t('about_president_role', 'Presiden Direktur PT. Sugiyama Indonesia')}
                                        </p>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200 mx-2" />
                                    <Link
                                        href="/tentang-kami"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-600 transition-colors"
                                    >
                                        <span>{t('about_btn_more', 'Profil Perusahaan')}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 bg-slate-900">
                                    <img 
                                        src={about.president_photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'} 
                                        alt="President Director PT. Sugiyama Indonesia" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 7. NEWS SECTION */}
            {/* ========================================================================= */}
            <section className="py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4 sm:pb-6">
                        <div>
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                {t('news_badge', 'Berita & Informasi / お知らせ')}
                            </span>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                                {t('news_title', 'Update Berita Terkini & Informasi Perusahaan')}
                            </h2>
                        </div>
                        <Link 
                            href="/berita" 
                            className="text-xs font-bold text-emerald-800 hover:text-emerald-600 inline-flex items-center gap-1 shrink-0"
                        >
                            <span>{t('news_view_all', 'Lihat Semua Berita')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestNews.slice(0, 3).map((rawItem) => {
                            const item = translateModel(rawItem, 'news');
                            return (
                                <ScrollReveal key={item.id} delay={0.1} direction="up" className="h-full">
                                    <Link 
                                        href={`/berita/${item.slug}`}
                                        className="group p-5 sm:p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/70 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 h-full"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-mono font-bold text-slate-400">
                                                    {item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : ''}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 text-sm leading-snug">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                {item.excerpt}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                                            <span>{t('tech_read_more', 'Baca Selengkapnya')}</span>
                                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
                                    src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop" 
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
                                        href="/karir"
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
                            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col justify-between h-full relative overflow-hidden border border-slate-800">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                                
                                <div className="space-y-3 relative z-10">
                                    <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                                        {t('cta_badge', 'Hubungi Kami / お問い合わせ')}
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                                        {t('cta_title', 'Konsultasi Kebutuhan Manufaktur Presisi Anda')}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                        {t('cta_desc', 'Dapatkan estimasi biaya penempaan dingin, evaluasi gambar teknik 3D CAD, atau konsultasi langsung dengan staf ahli kami.')}
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-semibold">{t('cta_phone_lbl', 'Hotline Kantor Pusat')}</p>
                                        <p className="text-base sm:text-lg font-black font-mono text-emerald-400">
                                            {settings.contact_phone || '0567-68-7077'}
                                        </p>
                                    </div>

                                    <Link
                                        href="/kontak"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-600/40 transition-all shrink-0"
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
