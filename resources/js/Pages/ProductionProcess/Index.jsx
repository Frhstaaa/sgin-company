import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import YouTubeEmbed from '../../Components/YouTubeEmbed';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';
import { 
    Workflow, Factory, Ship, Cog, ShieldCheck, 
    PackageCheck, ArrowRight, CheckCircle2, MapPin, 
    Sparkles, Layers, Cpu, Eye, Microscope, Award, FileCheck2
} from 'lucide-react';

export default function ProductionProcessIndex({ processes = [], mainFlow = [], qcFlow = [] }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');

    // Get active items
    const displayList = activeTab === 'all'
        ? processes
        : activeTab === 'main_flow'
            ? mainFlow
            : qcFlow;

    return (
        <AppLayout>
            <Head 
                title={`${siteSettings.prod_hero_title || t('prod_header_title', 'Alur Proses Manufaktur & Kontrol Kualitas Presisi')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} 
            />

            {/* 1. Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        製造工程
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`grid grid-cols-1 ${siteSettings.prod_hero_video ? 'lg:grid-cols-12 gap-10 items-center' : ''}`}>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.6 }}
                            className={siteSettings.prod_hero_video ? 'lg:col-span-7 space-y-4' : 'max-w-3xl space-y-4'}
                        >
                            {/* Breadcrumb Pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-md">
                                <Workflow className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{(lang === 'id' && siteSettings.prod_hero_badge) ? siteSettings.prod_hero_badge : t('prod_badge', 'ALUR PRODUKSI / 製造工程')}</span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                {(lang === 'id' && siteSettings.prod_hero_title) ? siteSettings.prod_hero_title : t('prod_header_title', 'Alur Proses Manufaktur & Kontrol Kualitas Presisi')}
                            </h1>

                            <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal">
                                {(lang === 'id' && siteSettings.prod_hero_lead) ? siteSettings.prod_hero_lead : t('prod_header_desc', 'Integrasi menyeluruh rantai pasok: mulai dari penempaan bahan baku presisi di Jepang, logistik laut berkala, pemesinan CNC multi-sumbu di Indonesia, hingga 100% inspeksi mutu berstandar global.')}
                            </p>
                        </motion.div>

                        {siteSettings.prod_hero_video && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-5"
                            >
                                <YouTubeEmbed url={siteSettings.prod_hero_video} title="Video Proses Produksi & Kontrol Kualitas" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Global Supply Chain Journey Overview */}
            <section className="py-12 bg-white border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                                <Factory className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                                    {t('prod_chain_01_badge', 'Hulu / Upstream (Japan)')}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                                    {t('prod_chain_01_title', 'Penempaan Blank di Aichi')}
                                </h3>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                    {t('prod_chain_01_desc', 'Bahan baku tempa dingin berstandar JIS Jepang dengan integritas serat metalurgi optimal.')}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold shrink-0">
                                <Ship className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                                    {t('prod_chain_02_badge', 'Rantai Pasok / Logistics')}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                                    {t('prod_chain_02_title', 'Pengiriman Kontainer Laut')}
                                </h3>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                    {t('prod_chain_02_desc', 'Logistik maritim berkala dengan proteksi anti-korosi VCI untuk efisiensi biaya produksi mitra.')}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                                <Cog className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                                    {t('prod_chain_03_badge', 'Hilir / Production (Indonesia)')}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                                    {t('prod_chain_03_title', 'Permesinan CNC & QC 100%')}
                                </h3>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                    {t('prod_chain_03_desc', 'Pemesinan presisi mikro di Karawang dan inspeksi visual menyeluruh sebelum distribusi.')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Interactive Workflow Stepper Section */}
            <section className="py-16 sm:py-24 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* Section Title & Filter Tabs */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-1.5">
                                <Sparkles className="w-4 h-4" />
                                <span>{t('prod_steps_badge', 'TAHAPAN LENGKAP PRODUKSI')}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                                {t('prod_steps_title', 'Integrasi Langkah Proses Produksi')}
                            </h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs self-start md:self-auto">
                            <button
                                type="button"
                                onClick={() => setActiveTab('all')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === 'all'
                                        ? 'bg-emerald-800 text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {t('prod_tab_all', 'Semua Tahapan')} ({processes.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('main_flow')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === 'main_flow'
                                        ? 'bg-emerald-800 text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {t('prod_tab_main', 'Alur Manufaktur Utama')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('qc')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === 'qc'
                                        ? 'bg-emerald-800 text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {t('prod_tab_qc', 'Kontrol Kualitas (QC)')}
                            </button>
                        </div>
                    </div>

                    {/* Stepper Cards Flow */}
                    <div className="space-y-8">
                        {displayList.map((rawProc, index) => {
                            const proc = translateModel(rawProc, 'process');
                            const isEven = index % 2 === 1;

                            return (
                                <ScrollReveal key={proc.id} delay={index * 0.1}>
                                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                                            {/* Image Column */}
                                            <div className={`lg:col-span-5 relative min-h-[260px] lg:min-h-[340px] bg-slate-900 overflow-hidden ${
                                                isEven ? 'lg:order-2' : 'lg:order-1'
                                            }`}>
                                                {proc.image_url ? (
                                                    <img
                                                        src={proc.image_url}
                                                        alt={proc.title_id || proc.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                                                        <Workflow className="w-16 h-16" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />

                                                {/* Floating Step Number Pill */}
                                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-lg border border-emerald-400/40">
                                                        {proc.step_number}
                                                    </div>
                                                    {proc.location_badge && (
                                                        <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
                                                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                                                            <span>{proc.location_badge}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content Column */}
                                            <div className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${
                                                isEven ? 'lg:order-1' : 'lg:order-2'
                                            }`}>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                                            {proc.category === 'qc' ? t('qc_assurance_badge', 'Quality Assurance') : `${t('step_label', 'Langkah')} ${proc.step_number}`}
                                                        </span>
                                                        {proc.category === 'qc' && (
                                                            <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                                                                {t('qc_100_inspect', '100% Inspeksi Mikro')}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                                                        {proc.title}
                                                    </h3>

                                                    {proc.title_jp && lang === 'id' && (
                                                        <p className="text-xs font-jp text-emerald-700 font-semibold">
                                                            {proc.title_jp}
                                                        </p>
                                                    )}

                                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                                                        {proc.description}
                                                    </p>
                                                </div>

                                                {/* Key Specs / Highlights */}
                                                {Array.isArray(proc.specs) && proc.specs.length > 0 && (
                                                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                                                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                            <span>{t('prod_qc_points', 'Poin Keunggulan & Kontrol Mutu:')}</span>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                            {proc.specs.map((spec, i) => (
                                                                <div 
                                                                    key={i} 
                                                                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 text-xs font-medium flex items-start gap-2"
                                                                >
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                                                    <span className="leading-snug">{spec}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. Deep-Dive: Quality Control & Inspection Standards */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                            <ShieldCheck className="w-4 h-4 text-emerald-700" />
                            <span>{t('prod_qc_header_badge', 'STANDAR JAMINAN MUTU JEPANG')}</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            {t('prod_qc_header_title', 'Komitmen Kualitas & Presisi Nol Cacat (Zero Defect)')}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {t('prod_qc_header_desc', 'Sistem manajemen mutu kami dirancang untuk mematuhi regulasi ketat industri otomotif dan energi baru (EV).')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">{t('prod_qc_01_title', '100% Inspeksi Visual Optik')}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {t('prod_qc_01_desc', 'Pemeriksaan teliti setiap butir komponen menggunakan lampu pembesar khusus dan loop optik oleh operator terlatih berstandar Jepang.')}
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Microscope className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">{t('prod_qc_02_title', 'Mikrometer Digital Presisi')}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {t('prod_qc_02_desc', 'Pengukuran dimensi sub-mikron (akurasi hingga ±0.001 mm) dengan mikrometer digital dan dial indicator Mitutoyo terkalibrasi berkala.')}
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">{t('prod_qc_03_title', 'Mesin Ukur 3D Otomatis (CMM)')}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {t('prod_qc_03_desc', 'Verifikasi geometri kompleks dan kontur 3D di dalam ruang metrologi ber-AC (20°C ±0.5°C) untuk keakuratan absolut.')}
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <FileCheck2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">{t('prod_qc_04_title', 'Ketertelusuran Lot & IATF')}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {t('prod_qc_04_desc', 'Setiap batch produksi tercatat lengkap dalam sistem traceability barcode, memastikan rekam jejak material 100% transparan.')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Bottom Consultation CTA Banner */}
            <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-2 max-w-2xl">
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
                            {t('prod_badge', 'KONSULTASI ALUR PRODUKSI KUSTOM')}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                            {t('prod_cta_title', 'Butuh Solusi Penempaan & Permesinan untuk Komponen Anda?')}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {t('prod_cta_desc', 'Diskusikan spesifikasi gambar CAD atau kebutuhan volume produksi Anda bersama tim insinyur PT. Sugiyama Indonesia.')}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40 hover:shadow-2xl transition-all"
                        >
                            <span>{t('prod_cta_btn_contact', 'Konsultasi Teknik Sekarang')}</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
