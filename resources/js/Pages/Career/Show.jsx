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

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        募集要項
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    {/* Breadcrumb Pill */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/careers"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900 transition-all backdrop-blur-md"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t('career_back_all', 'Semua Lowongan')}</span>
                        </Link>
                        {career.department && (
                            <>
                                <span className="text-slate-500 text-xs">/</span>
                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{career.department}</span>
                            </>
                        )}
                        {career.employment_type && (
                            <>
                                <span className="text-slate-500 text-xs">/</span>
                                <span className="text-slate-300 text-xs">{career.employment_type}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                        {career.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{career.location}</span>
                        </div>
                        {career.salary_range && (
                            <span className="text-slate-400">| {career.salary_range}</span>
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
                                {t('career_apply_box_desc', 'Lengkapi biodata dan unggah berkas CV/Resume Anda (Maksimal 2 MB) melalui formulir lamaran resmi kami.')}
                            </p>
                        </div>
                        <Link
                            href={`/careers/${career.slug}/apply`}
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
