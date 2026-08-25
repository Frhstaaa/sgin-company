import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import YouTubeEmbed from '../../Components/YouTubeEmbed';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function CareerIndex({ careers = [] }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();

    return (
        <AppLayout>
            <Head title={`${siteSettings.career_hero_title || t('career_title', 'Informasi Rekrutmen & Karir')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        採用情報
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`grid grid-cols-1 ${siteSettings.career_hero_video ? 'lg:grid-cols-12 gap-10 items-center' : ''}`}>
                        <motion.div 
                            initial={{opacity:0, y:20}} 
                            animate={{opacity:1, y:0}} 
                            transition={{duration:0.6}}
                            className={siteSettings.career_hero_video ? 'lg:col-span-7 space-y-4' : 'max-w-3xl space-y-4'}
                        >
                            {/* Breadcrumb Pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-md">
                                <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{(lang === 'id' && siteSettings.career_hero_badge) ? siteSettings.career_hero_badge : t('career_badge', 'KARIR & REKRUTMEN / 採用情報')}</span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                {(lang === 'id' && siteSettings.career_hero_title) ? siteSettings.career_hero_title : t('career_title', 'Mari Menempa Masa Depan Bersama Insinyur Sugiyama')}
                            </h1>

                            <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal">
                                {(lang === 'id' && siteSettings.career_hero_lead) ? siteSettings.career_hero_lead : t('career_desc', 'Kami mencari talenta berbakat yang memiliki semangat Kaizen dan dedikasi dalam menciptakan teknologi manufaktur presisi tinggi.')}
                            </p>
                        </motion.div>

                        {siteSettings.career_hero_video && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-5"
                            >
                                <YouTubeEmbed url={siteSettings.career_hero_video} title="Video Karir & Budaya Kerja" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Why Join Us */}
            <section className="py-16 bg-white border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Award className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">
                                {t('career_why_01_title', 'Teknologi Mutakhir')}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {t('career_why_01_desc', 'Kesempatan bekerja langsung dengan mesin penempa dingin 6-Die dan pusat bubut CNC 5-Axis termutakhir.')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">
                                {t('career_why_02_title', 'Pelatihan di Jepang')}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {t('career_why_02_desc', 'Program pelatihan teknis dan transfer keahlian cetakan langsung di kantor pusat Aichi, Jepang.')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <HeartHandshake className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">
                                {t('career_why_03_title', 'Jenjang Karir Global')}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {t('career_why_03_desc', 'Budaya kerja Kaizen yang menghargai inovasi individu, keselamatan kerja, dan kesejahteraan jangka panjang.')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Vacancies */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                        <div>
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                {t('career_badge', 'Informasi Rekrutmen / 採用情報')}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                                {t('career_open_positions', 'Lowongan Posisi Terbuka')}
                            </h2>
                        </div>
                        <Link
                            href="/careers/apply"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-emerald-900/30 shrink-0"
                        >
                            <span>{t('career_btn_apply', 'Formulir Lamaran / Kirim CV')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {careers.map((rawCareer) => {
                            const career = translateModel(rawCareer, 'career');
                            return (
                            <div
                                key={career.id}
                                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                                            {career.department}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                                            {career.employment_type}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900">{career.title}</h3>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                            {career.location}
                                        </span>
                                        {career.salary_range && (
                                            <span className="font-semibold text-emerald-700">
                                                {career.salary_range}
                                            </span>
                                        )}
                                        {career.deadline && (
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                {t('career_deadline_label', 'Batas:')} {career.deadline}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center gap-3">
                                    <Link
                                        href={`/careers/${career.slug}`}
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                                    >
                                        <span>{t('career_view_detail', 'Lihat Rincian Posisi')}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <Link
                                        href={`/careers/${career.slug}/apply`}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                                    >
                                        <span>{t('career_apply_btn', 'Lamar Posisi Ini')}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        )})}

                        {careers.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm space-y-4">
                                <p>{t('career_no_positions', 'Belum ada lowongan posisi terbuka saat ini. Silakan kirimkan CV umum Anda melalui formulir lamaran.')}</p>
                                <Link
                                    href="/careers/apply"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider"
                                >
                                    <span>{t('career_btn_apply_general', 'Isi Formulir Lamaran Umum')}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
