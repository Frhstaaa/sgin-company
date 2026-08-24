import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import YouTubeEmbed from '../../Components/YouTubeEmbed';
import { Cog, CheckCircle2, ShieldCheck, Factory, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function EquipmentIndex({ equipments = [], categories = [] }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const filtered = selectedCategory === 'ALL'
        ? equipments
        : equipments.filter(e => e.category === selectedCategory);

    return (
        <AppLayout>
            <Head title={`${siteSettings.machine_hero_title || t('eq_header_title', 'Fasilitas & Mesin Manufaktur Presisi')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        設備紹介
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`grid grid-cols-1 ${siteSettings.machine_hero_video ? 'lg:grid-cols-12 gap-10 items-center' : ''}`}>
                        <motion.div 
                            initial={{opacity:0, y:20}} 
                            animate={{opacity:1, y:0}} 
                            transition={{duration:0.6}}
                            className={siteSettings.machine_hero_video ? 'lg:col-span-7 space-y-4' : 'max-w-3xl space-y-4'}
                        >
                            {/* Breadcrumb Pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-md">
                                <Cog className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{(lang === 'id' && siteSettings.machine_hero_badge) ? siteSettings.machine_hero_badge : t('split_eq_sub', 'FASILITAS & PERALATAN / 設備一覧')}</span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                {(lang === 'id' && siteSettings.machine_hero_title) ? siteSettings.machine_hero_title : t('eq_header_title', 'Fasilitas & Mesin Manufaktur Presisi')}
                            </h1>

                            <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal">
                                {(lang === 'id' && siteSettings.machine_hero_lead) ? siteSettings.machine_hero_lead : t('eq_header_desc', 'Lini mesin modern berstandar industri Jepang untuk menjamin kapasitas produksi massal dan toleransi mikro konsisten.')}
                            </p>
                        </motion.div>

                        {siteSettings.machine_hero_video && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-5"
                            >
                                <YouTubeEmbed url={siteSettings.machine_hero_video} title="Video Mesin & Peralatan" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                                selectedCategory === 'ALL'
                                    ? 'bg-emerald-700 text-white shadow-md'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                        >
                            {t('eq_filter_all', 'Semua Mesin')}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-emerald-700 text-white shadow-md'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                {t(cat, cat)}
                            </button>
                        ))}
                    </div>

                    {/* Machinery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((rawEq) => {
                            const eq = translateModel(rawEq, 'equipment');
                            return (
                                <div
                                    key={eq.id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="relative h-56 overflow-hidden bg-slate-900">
                                            <img
                                                src={eq.image_url}
                                                alt={eq.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full bg-emerald-800/90 text-white font-bold text-[11px] backdrop-blur-xs">
                                                    {t(eq.category, eq.category)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                                                    {eq.name}
                                                </h3>
                                                <p className="text-xs font-mono text-emerald-700 font-bold mt-0.5">
                                                    {eq.model_number}
                                                </p>
                                            </div>

                                            <p className="text-xs text-slate-500">
                                                {t('eq_mfg_label', 'Pabrikan')}: <strong className="text-slate-800">{eq.manufacturer || 'Japan Machinery'}</strong>
                                            </p>

                                            {eq.specs && Array.isArray(eq.specs) && (
                                                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                                    {eq.specs.map((spec, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                            <span>{spec}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-500 font-bold border-t border-slate-100 mt-4">
                                        <span>{t('eq_qty_label', 'Jumlah Unit')}</span>
                                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono">
                                            {eq.quantity} {t('eq_unit_suffix', 'Unit')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
