import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { translations, modelTranslations } from '../../translations';
import YouTubeEmbed from '../../Components/YouTubeEmbed';
import { 
    Building2, Calendar, Award, MapPin, Users, 
    ShieldCheck, Globe, Cpu, Quote, ArrowRight, 
    CheckCircle2, Sparkles, Factory, ChevronRight,
    Briefcase, FileText, Check, Phone, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function AboutIndex({ profile = {}, equipmentCount = 0 }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();
    const p = translateModel(profile, 'company_profile');

    const companyName = lang === 'ja' 
        ? (p.company_name_jp || '株式会社スギヤマ') 
        : (p.company_name || 'PT. Sugiyama Indonesia');

    // Robust timeline data parsing
    const defaultTimeline = modelTranslations?.company_profile?.[lang]?.history_timeline 
        || modelTranslations?.company_profile?.id?.history_timeline 
        || [];

    const timelineData = (lang === 'id' && p.history_timeline && Array.isArray(p.history_timeline) && p.history_timeline.length > 0 && typeof p.history_timeline[0] === 'object')
        ? p.history_timeline
        : (modelTranslations?.company_profile?.[lang]?.history_timeline || p.history_timeline || defaultTimeline);

    // Robust branches data parsing
    const defaultBranches = modelTranslations?.company_profile?.[lang]?.branches 
        || modelTranslations?.company_profile?.id?.branches 
        || [];

    const branchesData = (lang === 'id' && p.branches && Array.isArray(p.branches) && p.branches.length > 0 && typeof p.branches[0] === 'object')
        ? p.branches
        : (modelTranslations?.company_profile?.[lang]?.branches || p.branches || defaultBranches);

    const renderPoints = (val, defaultVal) => {
        let items = [];
        if (Array.isArray(val)) {
            items = val.filter(Boolean);
        } else if (typeof val === 'string' && val.trim()) {
            try {
                const parsed = JSON.parse(val);
                if (Array.isArray(parsed)) items = parsed.filter(Boolean);
            } catch (e) {}
            if (items.length === 0) {
                if (val.includes('\n')) {
                    items = val.split('\n').map(s => s.trim().replace(/^\d+[\.\)]\s*/, '')).filter(Boolean);
                } else {
                    const numSplit = val.split(/(?=\d+[\.\)]\s+)/).map(s => s.trim().replace(/^\d+[\.\)]\s*/, '')).filter(Boolean);
                    if (numSplit.length > 1) items = numSplit;
                    else items = [val.trim()];
                }
            }
        } else if (defaultVal) {
            items = Array.isArray(defaultVal) ? defaultVal : [defaultVal];
        }

        if (items.length <= 1) {
            return (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {items[0] || ''}
                </p>
            );
        }

        return (
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs border border-emerald-200/80">
                            {idx + 1}
                        </span>
                        <span className="flex-1 font-medium">{item}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <AppLayout>
            <Head>
                <title>{`${siteSettings.about_hero_title || t('about_title', 'Tentang Kami / 会社概要')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`}</title>
                <meta name="description" content="Profil lengkap PT. Sugiyama Indonesia (株式会社スギヤマ) - Produsen presisi cold forging otomotif, sejarah 1952 Aichi Jepang, sertifikasi IATF 16949, visi misi, dan fasilitas pabrik GIIC Cikarang." />
                <meta name="keywords" content="Tentang PT Sugiyama Indonesia, Profil Perusahaan Sugiyama, Sejarah Sugiyama 1952, Pabrik GIIC Cikarang, IATF 16949, Visi Misi Sugiyama, Cold Forging Indonesia" />
            </Head>

            {/* ========================================================================= */}
            {/* 1. HERO HEADER BANNER */}
            {/* ========================================================================= */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-16 sm:pt-36 sm:pb-24 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        会社概要
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`grid grid-cols-1 ${siteSettings.about_hero_video ? 'lg:grid-cols-12 gap-10 items-center' : ''}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={siteSettings.about_hero_video ? 'lg:col-span-7 space-y-4' : 'max-w-3xl space-y-4'}
                        >
                            {/* Breadcrumb Pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-md">
                                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{(lang === 'id' && siteSettings.about_hero_badge) ? siteSettings.about_hero_badge : t('about_badge', 'TENTANG KAMI / 会社概要')}</span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                {(lang === 'id' && siteSettings.about_hero_title) ? siteSettings.about_hero_title : t('about_title', 'Keahlian Presisi Jepang Berstandar Global')}
                            </h1>

                            <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal">
                                {(lang === 'id' && siteSettings.about_hero_lead) ? siteSettings.about_hero_lead : t('about_lead', 'Sejak didirikan pada tahun 1952 di Aichi, Jepang, PT. Sugiyama Indonesia (Sugiyama Group) terus menempa batas inovasi teknik penempaan dingin dan komponen presisi berstandar mutu otomotif global.')}
                            </p>

                            {/* Quick Highlights Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                                    <p className="text-[10px] text-emerald-400 font-bold uppercase">{t('about_stat1_label', 'Berdiri')}</p>
                                    <p className="text-xs sm:text-sm font-black text-white mt-0.5">{t('about_stat1_value', '1952 (70+ Thn)')}</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                                    <p className="text-[10px] text-emerald-400 font-bold uppercase">{t('about_stat2_label', 'Sertifikasi')}</p>
                                    <p className="text-xs sm:text-sm font-black text-white mt-0.5">{t('about_stat2_value', 'IATF 16949')}</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                                    <p className="text-[10px] text-emerald-400 font-bold uppercase">{t('about_stat3_label', 'Karyawan')}</p>
                                    <p className="text-xs sm:text-sm font-black text-white mt-0.5">{t('about_stat3_value', '93 Karyawan')}</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                                    <p className="text-[10px] text-emerald-400 font-bold uppercase">{t('about_stat4_label', 'Lokasi Hub')}</p>
                                    <p className="text-xs sm:text-sm font-black text-white mt-0.5">{t('about_stat4_value', 'GIIC Cikarang')}</p>
                                </div>
                            </div>
                        </motion.div>

                        {siteSettings.about_hero_video && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-5"
                            >
                                <div className="p-2 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                                    <YouTubeEmbed url={siteSettings.about_hero_video} title="Video Profil Tentang Kami" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. PRESIDENT GREETING & LEADERSHIP SECTION */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                            
                            {/* Left: President's Message */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-bold">
                                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                                        <span>{(lang === 'id' && siteSettings.about_president_badge) ? siteSettings.about_president_badge : t('about_president_badge', 'PESAN KEPEMIMPINAN / 代表挨拶')}</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                        {(lang === 'id' && siteSettings.about_president_title) ? siteSettings.about_president_title : t('about_president_title', 'Komitmen Presisi Tanpa Kompromi & Semangat Kaizen')}
                                    </h2>
                                </div>

                                {/* Quote Card */}
                                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-md relative overflow-hidden">
                                    <Quote className="w-12 h-12 text-emerald-800/10 absolute right-4 top-4 pointer-events-none" />
                                    
                                    <div className="space-y-6 relative z-10">
                                        <p className="text-sm sm:text-base text-slate-700 italic font-medium leading-relaxed">
                                            "{p.president_message || 'Sebagai seorang ahli penempaan, kami akan merevolusi kualitas manufaktur presisi dunia melalui keterampilan teknis tanpa kompromi. Di era elektrifikasi kendaraan dan otomasi cerdas saat ini, dedikasi kami terhadap toleransi mikron, integritas metalurgi, dan inovasi ramah lingkungan tetap menjadi fondasi kepercayaan mitra global kami di Jepang, Asia Tenggara, dan seluruh dunia.'}"
                                        </p>

                                        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-600 shadow-xs shrink-0 bg-slate-100">
                                                    <img
                                                        src={p.president_photo_url || profile.president_photo_url || '/images/sgin-placeholder.png'}
                                                        alt={p.president_name || 'Yuichi Sugiyama'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-extrabold text-slate-900 text-base">
                                                        {p.president_name || 'Yuichi Sugiyama'}
                                                    </p>
                                                    <p className="text-xs text-emerald-800 font-bold">
                                                        {siteSettings.about_president_role || t('about_president_role', 'Presiden Direktur PT. Sugiyama Indonesia')}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold border border-emerald-200 shrink-0">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{siteSettings.about_president_tag || t('about_president_tag', 'Sugiyama Group Executive')}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Showcase Facility Visual with Badges */}
                            <div className="lg:col-span-5 relative">
                                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group aspect-4/3 bg-slate-100">
                                    <img
                                        src={siteSettings.home_about_image || '/images/sgin-placeholder.png'}
                                        alt="Fasilitas Manufaktur PT. Sugiyama Indonesia"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                                    {/* Top Overlay Badges inside the card */}
                                    <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 z-10">
                                        <div className="py-1.5 px-3 rounded-xl bg-white/95 border border-slate-200 text-slate-900 shadow-md backdrop-blur-md flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200 shrink-0">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none">{t('home_about_quality_title', 'Standar Mutu')}</p>
                                                <p className="text-[11px] font-black text-slate-900 font-mono leading-tight mt-0.5">{t('home_about_quality_val', 'IATF 16949 & ISO 9001')}</p>
                                            </div>
                                        </div>

                                        <div className="py-1.5 px-3 rounded-xl bg-white/95 border border-slate-200 text-slate-900 shadow-md backdrop-blur-md flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200 shrink-0">
                                                <Award className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[9px] font-bold text-amber-700 uppercase tracking-wider leading-none">{t('home_about_heritage_title', 'Sejak 1952')}</p>
                                                <p className="text-[11px] font-black text-slate-900 leading-tight mt-0.5">{t('home_about_heritage_val', 'Aichi, Jepang')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Plant Label on Bottom */}
                                    <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 flex items-center justify-between text-xs z-10 shadow-lg">
                                        <div>
                                            <p className="font-extrabold text-slate-900 text-xs sm:text-sm">{t('home_about_plant_title', 'Pabrik & Kantor GIIC Cikarang')}</p>
                                            <p className="text-[10px] text-slate-500">{t('home_about_plant_subtitle', 'Greenland International Industrial Center (GIIC)')}</p>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] border border-emerald-300/60 shrink-0">
                                            {t('home_about_plant_tag', 'ASEAN Hub')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. CORPORATE PHILOSOPHY, VISION & MISSION (3 PILLARS) */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 inline-block">
                            {(lang === 'id' && siteSettings.about_pillar_badge) ? siteSettings.about_pillar_badge : t('about_pillar_badge', 'FILOSOFI & NILAI KORPORAT / 企業理念')}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            {(lang === 'id' && siteSettings.about_pillar_title) ? siteSettings.about_pillar_title : t('about_pillar_title', 'Fondasi Integritas, Penguasaan Teknologi & Masa Depan')}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            {(lang === 'id' && siteSettings.about_pillar_subtitle) ? siteSettings.about_pillar_subtitle : t('about_pillar_subtitle', 'Tiga pilar filosofis yang memandu setiap langkah rekayasa presisi, manufaktur zero-defect, dan kepuasan pelanggan global.')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {/* 1. Philosophy */}
                        <ScrollReveal delay={0.1} direction="up" className="h-full">
                            <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 to-teal-500" />
                                
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200/60 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-jp font-bold text-slate-400">企業理念</span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                                        {t('about_philosophy_title', 'Filosofi Perusahaan')}
                                    </h3>

                                    {renderPoints(p.philosophy, t('about_philosophy_desc', 'Menempa kualitas terbaik melalui penguasaan teknologi, dedikasi karyawan, dan kepuasan pelanggan yang berkelanjutan.'))}
                                </div>

                                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    <span>Zero-Defect Commitment</span>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 2. Vision */}
                        <ScrollReveal delay={0.2} direction="up" className="h-full">
                            <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600" />
                                
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200/60 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-jp font-bold text-slate-400">ビジョン</span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                                        {t('about_vision_title', 'Visi Global')}
                                    </h3>

                                    {renderPoints(p.vision, t('about_vision_desc', 'Menjadi tolok ukur global dalam teknologi penempaan dingin dan komponen presisi masa depan.'))}
                                </div>

                                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    <span>Global Benchmark Standard</span>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 3. Mission */}
                        <ScrollReveal delay={0.3} direction="up" className="h-full">
                            <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 to-amber-500" />
                                
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200/60 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-jp font-bold text-slate-400">ミッション</span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                                        {t('about_mission_title', 'Misi Strategis')}
                                    </h3>

                                    {renderPoints(p.mission, t('about_mission_desc', 'Menghadirkan produk presisi bernilai tambah tinggi dengan efisiensi sumber daya maksimal.'))}
                                </div>

                                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    <span>High-Value Resource Efficiency</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. CORPORATE FACTSHEET / LEGALITAS & RINGKASAN DATA PERUSAHAAN */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                            <div className="space-y-2">
                                <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 inline-block">
                                    {t('about_factsheet_badge', 'DATA LEGALITAS / 会社概要')}
                                </span>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                    {t('about_data_title', 'Ringkasan Legalitas & Data Perusahaan')}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500">
                                    {t('about_data_sub', 'Informasi resmi profil korporat dan operasional manufaktur PT. Sugiyama Indonesia.')}
                                </p>
                            </div>
                            <span className="text-xs font-jp text-emerald-800 font-bold px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 shrink-0">
                                会社概要 / CORPORATE PROFILE
                            </span>
                        </div>

                        {/* Japanese-Style Factsheet List / Table */}
                        <div className="mt-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-md">
                            <div className="divide-y divide-slate-200/80">
                                
                                {/* Row 1: Company Name */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_company_name_label', 'Nama Perusahaan')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1 space-y-1">
                                        <p className="text-sm sm:text-base font-black text-slate-900">
                                            {companyName}
                                        </p>
                                        <p className="text-xs text-emerald-800 font-semibold">
                                            {t('about_group_label', 'Grup Perusahaan')}: {t('about_group_val', 'Sugiyama Co., Ltd. (Jepang)')}
                                        </p>
                                    </div>
                                </div>

                                {/* Row 2: Founded & Production Start */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_est_label', 'Tahun Berdiri & Mulai Produksi')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1">
                                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                                            {t('about_est_val', '9 April 2012 (Mulai Produksi: November 2012)')}
                                        </p>
                                    </div>
                                </div>

                                {/* Row 3: President Director */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_president_name_label', 'Presiden Direktur')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1 flex items-center gap-3">
                                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                                            {t('about_president_name_val', 'Yuichi Sugiyama')}
                                        </p>
                                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                            President Director
                                        </span>
                                    </div>
                                </div>

                                {/* Row 4: Registered Capital & Shareholders */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <Award className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_capital_label', 'Modal Dasar & Pemegang Saham')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1 space-y-1">
                                        <p className="text-xs sm:text-sm font-black font-mono text-slate-900">
                                            {p.capital || t('about_capital_val', 'USD 3,750,000')}
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            {siteSettings.factsheet_shareholders || t('about_capital_sub_val', 'Sugiyama Co., Ltd. (98.33%), Takahide Sugiyama (1.67%)')}
                                        </p>
                                    </div>
                                </div>

                                {/* Row 5: Total Workforce */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_emp_label', 'Jumlah Karyawan')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1 space-y-1">
                                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                                            {p.employees_count || t('about_emp_val', '93 Karyawan (per Des 2024)')}
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            {t('about_emp_sub_val', '90 Tenaga Kerja Lokal & 3 Expatriate Jepang')}
                                        </p>
                                    </div>
                                </div>

                                {/* Row 6: Land & Factory Building Area */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <Factory className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_area_label', 'Luas Lahan & Bangunan Pabrik')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1">
                                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                                            {(siteSettings.factsheet_site_area || siteSettings.factsheet_building_area)
                                                ? `Luas Lahan: ${siteSettings.factsheet_site_area || '7.582 m²'} | Luas Bangunan: ${siteSettings.factsheet_building_area || '3.913 m²'}`
                                                : t('about_area_val', 'Luas Lahan: 7.582 m² | Luas Bangunan Pabrik: 3.913 m²')}
                                        </p>
                                    </div>
                                </div>

                                {/* Row 7: Business Scope */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <Cpu className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_scope_label', 'Bidang Usaha (Business Scope)')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1">
                                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                                            {siteSettings.factsheet_business_scope || t('about_scope_val', 'Manufaktur & Penjualan Suku Cadang Otomotif [Penempaan Dingin & Permesinan Presisi]')}
                                        </p>
                                    </div>
                                </div>

                                {/* Row 8: Major Customers */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_cust_label', 'Pelanggan Utama (Major Customers)')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1 space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                                                {t('about_cust_domestic_lbl', 'Domestik:')}
                                            </span>
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {siteSettings.factsheet_customers_domestic || t('about_cust_domestic_val', 'PT. Denso Indonesia')}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                                                {t('about_cust_overseas_lbl', 'Overseas (Ekspor):')}
                                            </span>
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {siteSettings.factsheet_customers_overseas || t('about_cust_overseas_val', 'Niterra Japan & India, Daido Kogyo Thailand')}
                                            </span>
                                        </div>
                                        {/* Fallback if single factsheet_customers string is provided in Admin */}
                                        {siteSettings.factsheet_customers && !siteSettings.factsheet_customers_domestic && !siteSettings.factsheet_customers_overseas && (
                                            <div className="pt-1 text-xs text-slate-900 font-bold border-t border-slate-100">
                                                {siteSettings.factsheet_customers}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Row 9: Quality Management Standards */}
                                <div className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-full sm:w-72 lg:w-80 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center gap-3 shrink-0">
                                        <div className="w-1.5 h-6 rounded-full bg-emerald-600" />
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-700" />
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                                                {t('about_certs_label', 'Standar Sertifikasi Mutu')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1">
                                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                                            {siteSettings.factsheet_certifications || t('about_certs_val', 'ISO 9001:2015 & IATF 16949:2016 (On Progress) [SGS ID15/03091]')}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 5. HISTORY & MILESTONE TIMELINE (JAPANESE LIST FORMAT) */}
            {/* ========================================================================= */}
            {timelineData && timelineData.length > 0 && (
                <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                        <ScrollReveal>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                                <div className="space-y-2">
                                    <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 inline-block">
                                        {(lang === 'id' && siteSettings.about_history_badge) ? siteSettings.about_history_badge : t('about_history_badge', 'SEJARAH & MILESTONE / 沿革')}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                        {t('about_history_title', 'Perjalanan Sejarah & Milestone Perkembangan')}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                                        {(lang === 'id' && siteSettings.about_history_lead) ? siteSettings.about_history_lead : t('about_history_lead', 'Tonggak penting perjalanan manufaktur presisi PT. Sugiyama Indonesia sejak pendirian hingga ekspansi pasar global.')}
                                    </p>
                                </div>
                                <span className="text-xs font-jp text-emerald-800 font-bold px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 shrink-0">
                                    沿革 / HISTORY & MILESTONES
                                </span>
                            </div>

                            {/* Japanese-Style Chronological List / Table */}
                            <div className="mt-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-md">
                                <div className="divide-y divide-slate-200/80">
                                    {timelineData.map((item, idx) => {
                                        const yearText = typeof item === 'object' ? item.year : item;
                                        const eventText = typeof item === 'object' ? item.event : '';

                                        return (
                                            <div 
                                                key={idx} 
                                                className="flex flex-col sm:flex-row sm:items-center hover:bg-emerald-50/30 transition-colors group"
                                            >
                                                {/* Left Column: Period Badge */}
                                                <div className="w-full sm:w-48 lg:w-56 p-4 sm:p-5 bg-slate-50/70 sm:border-r border-slate-200 flex items-center justify-between sm:justify-start gap-3 shrink-0">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-1.5 h-5 rounded-full bg-emerald-600 group-hover:scale-y-125 transition-transform" />
                                                        <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-mono font-black text-xs sm:text-sm border border-emerald-300/70 shadow-2xs">
                                                            {yearText}
                                                        </span>
                                                    </div>
                                                    <span className="sm:hidden text-[10px] font-bold text-slate-400 font-mono">
                                                        #{String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                </div>

                                                {/* Right Column: Event Milestone Details */}
                                                <div className="p-4 sm:p-5 flex-1 flex items-center justify-between gap-4">
                                                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                                                        {eventText || 'Pengembangan lini produksi presisi dan penguatan kapabilitas manufaktur berstandar Jepang.'}
                                                    </p>
                                                    <span className="hidden sm:flex w-7 h-7 rounded-full bg-slate-100 text-slate-400 group-hover:bg-emerald-800 group-hover:text-white items-center justify-center text-xs font-bold font-mono transition-colors shrink-0">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* ========================================================================= */}
            {/* 6. GLOBAL BRANCHES & FACILITIES NETWORK */}
            {/* ========================================================================= */}
            {branchesData && branchesData.length > 0 && (
                <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                        <ScrollReveal>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
                                <div className="space-y-2">
                                    <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 inline-block">
                                        {(lang === 'id' && siteSettings.about_branches_badge) ? siteSettings.about_branches_badge : t('about_branches_badge', 'JARINGAN GLOBAL / グローバル拠点')}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                        {t('about_branches_title', 'Jaringan Pabrik & Fasilitas Global')}
                                    </h2>
                                </div>
                                <span className="text-xs text-slate-500 font-medium">
                                    {t('about_branches_sub', 'Sinergi Manufaktur Jepang & Indonesia')}
                                </span>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {branchesData.map((b, idx) => (
                                <ScrollReveal key={idx} delay={idx * 0.15} direction="up" className="h-full">
                                    <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                                                    {b.role || 'Manufacturing Facility'}
                                                </span>
                                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-800 flex items-center justify-center shadow-xs">
                                                    <Factory className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                                                {b.name}
                                            </h3>

                                            <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed pt-1">
                                                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>{b.address}</span>
                                            </div>
                                        </div>

                                        <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-600 transition-colors"
                                            >
                                                <span>{t('about_contact_facility', 'Hubungi Fasilitas Ini')}</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                            <span className="text-[10px] text-slate-400 font-mono font-bold">
                                                {idx === 0 ? 'HQ JAPAN' : 'ASEAN HUB'}
                                            </span>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ========================================================================= */}
            {/* 7. CLOSING CTA BANNER */}
            {/* ========================================================================= */}
            <section className="py-12 sm:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                            
                            <div className="space-y-2 relative z-10 max-w-2xl">
                                <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                    {(lang === 'id' && siteSettings.about_cta_badge) ? siteSettings.about_cta_badge : t('about_cta_badge', 'KOLABORASI & KONSULTASI / お問い合わせ')}
                                </span>
                                <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                                    {(lang === 'id' && siteSettings.about_cta_title) ? siteSettings.about_cta_title : t('about_cta_title', 'Siap Memulai Proyek Manufaktur Presisi Anda?')}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                    {(lang === 'id' && siteSettings.about_cta_lead) ? siteSettings.about_cta_lead : t('about_cta_lead', 'Diskusikan kebutuhan penempaan dingin, evaluasi gambar teknik 3D CAD, atau jadwalkan kunjungan ke fasilitas pabrik kami di GIIC Cikarang.')}
                                </p>
                            </div>

                            <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
                                <Link
                                    href={siteSettings.about_cta_btn1_link || '/contact?type=rfq'}
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-500/30"
                                >
                                    <span>{(lang === 'id' && siteSettings.about_cta_btn1_text) ? siteSettings.about_cta_btn1_text : t('about_cta_btn1', 'Minta Penawaran (RFQ)')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={siteSettings.about_cta_btn2_link || '/contact'}
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all"
                                >
                                    <span>{(lang === 'id' && siteSettings.about_cta_btn2_text) ? siteSettings.about_cta_btn2_text : t('about_cta_btn2', 'Hubungi Kami')}</span>
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </AppLayout>
    );
}
