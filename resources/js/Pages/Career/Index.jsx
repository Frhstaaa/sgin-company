import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function CareerIndex({ careers = [] }) {
    const { t, lang, translateModel } = useLanguage();

    return (
        <AppLayout>
            <Head title={`${t('career_title', 'Informasi Rekrutmen & Karir')} | PT. Sugiyama Indonesia`} />

            <div className="bg-emerald-950 text-white pt-32 pb-16 relative overflow-hidden">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
<span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                        {t('career_badge', 'Informasi Rekrutmen / 採用情報')}
                    </span>
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
                        {t('career_title', 'Mari Menempa Masa Depan Bersama Insinyur Sugiyama')}
                    </h1>
<p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl mt-4">
                        {t('career_desc', 'Kami mencari talenta berbakat yang memiliki semangat Kaizen dan dedikasi dalam menciptakan teknologi manufaktur presisi tinggi.')}
                    </p>
</motion.div>
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
                            <h3 className="font-bold text-slate-900 text-base">Teknologi Mutakhir</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Kesempatan bekerja langsung dengan mesin penempa dingin 6-Die dan pusat bubut CNC 5-Axis termutakhir.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">Pelatihan di Jepang</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Program pelatihan teknis dan transfer keahlian cetakan langsung di kantor pusat Aichi, Jepang.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <HeartHandshake className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">Jenjang Karir Global</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Budaya kerja Kaizen yang menghargai inovasi individu, keselamatan kerja, dan kesejahteraan jangka panjang.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Vacancies */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                            {t('career_open_positions', 'Lowongan Posisi Terbuka')}
                        </h2>
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

                                    <h3 className="text-xl font-bold text-slate-900">
                                        {career.title}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-emerald-600" />
                                            <span>{career.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-emerald-600" />
                                            <span>{career.is_active ? 'Batas lamaran: 30 hari lagi' : 'Tutup'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center justify-end">
                                    <Link
                                        href={`/kontak?type=career&career_id=${career.id}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors group"
                                    >
                                        <span>{t('career_apply', 'Lamar Sekarang')}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
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
