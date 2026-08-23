import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { Cog, CheckCircle2, ShieldCheck, Factory, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function EquipmentIndex({ equipments = [], categories = [] }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const filtered = selectedCategory === 'ALL'
        ? equipments
        : equipments.filter(e => e.category === selectedCategory);

    return (
        <AppLayout>
            <Head title={`${siteSettings.machine_hero_title || t('eq_header_title', 'Fasilitas & Mesin Manufaktur Presisi')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            <div className="bg-emerald-950 text-white pt-28 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
                            {siteSettings.machine_hero_badge || t('split_eq_sub', 'FASILITAS & PERALATAN / 設備一覧')}
                        </span>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1 sm:mt-2 leading-tight">
                            {siteSettings.machine_hero_title || t('eq_header_title', 'Fasilitas & Mesin Manufaktur Presisi')}
                        </h1>
                        <p className="text-emerald-200/90 text-xs sm:text-sm md:text-base max-w-2xl mt-3 sm:mt-4 leading-relaxed">
                            {siteSettings.machine_hero_lead || t('eq_header_desc', 'Lini mesin modern berstandar industri Jepang untuk menjamin kapasitas produksi massal dan toleransi mikro konsisten.')}
                        </p>
                    </motion.div>
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
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Machinery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((eq) => (
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
                                                {eq.category}
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
                                        {eq.quantity} Unit
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
