import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { ArrowLeft, MapPin, Clock, CheckCircle2, Send, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function CareerShow({ career: rawCareer }) {
    const { t, lang, translateModel } = useLanguage();
    const career = translateModel(rawCareer, 'career');

    return (
        <AppLayout>
            <Head title={`${career.title} | PT. Sugiyama Indonesia`} />

            <div className="bg-emerald-950 text-white pt-32 pb-16 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <Link
                        href="/karir"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{t('career_back_all', 'Kembali ke Semua Lowongan')}</span>
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 font-bold">
                            {career.department}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-300">
                            {career.employment_type}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                        {career.title}
                    </h1>

                    <div className="flex items-center gap-4 text-xs text-emerald-300/90 pt-2">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span>{career.location}</span>
                        </div>
                        {career.salary_range && (
                            <span>| {career.salary_range}</span>
                        )}
                    </div>
                </div>
            </div>

            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    {/* Requirements */}
                    {career.requirements && Array.isArray(career.requirements) && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                                {t('career_req_title', 'Kualifikasi & Persyaratan')}
                            </h3>
                            <div className="space-y-2.5">
                                {career.requirements.map((req, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Responsibilities */}
                    {career.responsibilities && Array.isArray(career.responsibilities) && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                                {t('career_resp_title', 'Tanggung Jawab Pekerjaan')}
                            </h3>
                            <div className="space-y-2.5">
                                {career.responsibilities.map((resp, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>{resp}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Benefits */}
                    {career.benefits && Array.isArray(career.benefits) && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                                {t('career_ben_title', 'Tunjangan & Keuntungan')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {career.benefits.map((ben, idx) => (
                                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-semibold flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span>{ben}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Apply Card */}
                    <div className="p-8 rounded-3xl bg-emerald-900 text-white space-y-4 shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-lg font-bold">
                                {t('career_apply_box_title', 'Tertarik dengan Posisi Ini?')}
                            </h4>
                            <p className="text-xs text-emerald-200 mt-1">
                                {t('career_apply_box_desc', 'Kirimkan CV dan dokumen pendukung Anda melalui formulir kontak rekrutmen kami.')}
                            </p>
                        </div>
                        <Link
                            href={`/kontak?type=career&subject=Lamaran:${encodeURIComponent(career.title)}`}
                            className="px-6 py-3.5 rounded-full bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold shrink-0 shadow-md flex items-center gap-2"
                        >
                            <span>{t('career_apply_btn', 'Lamar Posisi Ini')}</span>
                            <Send className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
