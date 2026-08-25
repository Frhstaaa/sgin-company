import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { ArrowLeft, CheckCircle2, Phone, ArrowRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function TechnologyShow({ technology, otherTechnologies = [] }) {
    const { t, lang, translateModel } = useLanguage();
    const tech = translateModel(technology, 'technology');

    return (
        <AppLayout>
            <Head title={`${tech.title} | PT. Sugiyama Indonesia`} />

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        精密技術
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    {/* Breadcrumb Pill */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/technology"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900 transition-all backdrop-blur-md"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t('tech_back_all', 'Semua Teknologi')}</span>
                        </Link>
                        <span className="text-slate-500 text-xs">/</span>
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{tech.step_number}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-display">
                            {tech.step_number}
                        </span>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                            {tech.title}
                        </h1>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal max-w-3xl">
                        {tech.short_description}
                    </p>
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
                    {/* Media Banner */}
                    <div className="rounded-3xl overflow-hidden shadow-xl aspect-16/9 bg-slate-950">
                        <img 
                            src={tech.image_url} 
                            alt={tech.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Detailed Content */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                            {tech.title}
                        </h2>
                        <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-wrap">
                            {tech.content}
                        </div>
                    </div>

                    {/* Features Grid */}
                    {tech.features && Array.isArray(tech.features) && (
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                            <h3 className="text-base font-bold text-slate-900">
                                {t('tech_key_features', 'Fitur Utama & Keunggulan')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {tech.features.map((feat, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Box */}
                    <div className="p-8 rounded-3xl bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="space-y-1 text-center sm:text-left">
                            <h3 className="text-lg font-bold">
                                {t('tech_consult_title', 'Tertarik Menerapkan Teknologi Ini?')}
                            </h3>
                            <p className="text-xs text-emerald-200 max-w-md">
                                {t('tech_consult_desc', 'Konsultasikan gambar teknik CAD dan spesifikasi komponen Anda dengan tim engineer kami.')}
                            </p>
                        </div>
                        <Link
                            href="/contact?type=consultation"
                            className="px-6 py-3.5 rounded-full bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold shrink-0 shadow-md flex items-center gap-2"
                        >
                            <span>{t('tech_btn_consult', 'Konsultasi Sekarang')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
