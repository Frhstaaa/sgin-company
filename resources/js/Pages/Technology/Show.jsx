import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { ArrowLeft, CheckCircle2, Phone, ArrowRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function TechnologyShow({ technology, otherTechnologies = [] }) {
    const { t, translateModel } = useLanguage();
    const tech = translateModel(technology, 'technology');

    return (
        <AppLayout>
            <Head title={`${tech.title} | PT. Sugiyama Indonesia`} />

            {/* Header */}
            <div className="bg-emerald-950 text-white pt-32 pb-16 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <Link
                        href="/teknologi"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{t('tech_back_all', 'Kembali ke Semua Teknologi')}</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-emerald-400 font-display">
                            {tech.step_number}
                        </span>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                            {tech.title}
                        </h1>
                    </div>

                    <p className="text-emerald-200/90 text-sm sm:text-base max-w-3xl leading-relaxed">
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
                            href="/kontak?type=consultation"
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
