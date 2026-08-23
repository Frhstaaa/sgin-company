import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import YouTubeEmbed from '../../Components/YouTubeEmbed';
import { 
    Building2, Calendar, Award, MapPin, Users, 
    ShieldCheck, Clock, CheckCircle2, Globe 
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function AboutIndex({ profile = {} }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();
    const p = translateModel(profile, 'company_profile');

    const companyName = lang === 'ja' ? (p.company_name_jp || '株式会社スギヤマ') : (p.company_name || 'PT. Sugiyama Indonesia');

    return (
        <AppLayout>
            <Head title={`${siteSettings.about_hero_title || t('about_title', 'Tentang Kami / 会社概要')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            {/* Header */}
            <div className="bg-emerald-950 text-white pt-28 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`grid grid-cols-1 ${siteSettings.about_hero_video ? 'lg:grid-cols-12 gap-8 items-center' : ''}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={siteSettings.about_hero_video ? 'lg:col-span-6 space-y-2' : ''}
                        >
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                {(lang === 'id' && siteSettings.about_hero_badge) ? siteSettings.about_hero_badge : t('about_badge', 'TENTANG KAMI / 会社概要')}
                            </span>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1 sm:mt-2 leading-tight">
                                {(lang === 'id' && siteSettings.about_hero_title) ? siteSettings.about_hero_title : t('about_title', 'Keahlian Presisi Jepang Berstandar Global')}
                            </h1>
                            <p className="text-emerald-200/90 text-xs sm:text-sm md:text-base max-w-2xl mt-3 sm:mt-4 leading-relaxed">
                                {(lang === 'id' && siteSettings.about_hero_lead) ? siteSettings.about_hero_lead : t('about_lead', 'Sejak didirikan pada tahun 1952 di Aichi, Jepang, PT. Sugiyama Indonesia (Sugiyama Group) terus menempa batas inovasi teknik penempaan dingin.')}
                            </p>
                        </motion.div>

                        {siteSettings.about_hero_video && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-6"
                            >
                                <YouTubeEmbed url={siteSettings.about_hero_video} title="Video Profil Tentang Kami" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* President Greeting */}
            <section className="py-12 sm:py-20 bg-white border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                                {t('about_president_role', 'Sambutan Presiden Direktur')}
                            </h2>
                            
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic border-l-4 border-emerald-700 pl-4 py-1">
                                "{p.president_message || 'Sebagai seorang ahli penempaan, kami akan merevolusi kualitas manufaktur presisi dunia melalui keterampilan teknis tanpa kompromi.'}"
                            </p>

                            <div className="space-y-1">
                                <p className="font-bold text-slate-900 text-base">
                                    {p.president_name || 'Takeshi Sugiyama'}
                                </p>
                                <p className="text-xs text-emerald-800 font-semibold">
                                    {t('about_president_role', 'Presiden Direktur PT. Sugiyama Indonesia')}
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-4/3 bg-slate-900">
                                <img
                                    src={p.president_photo_url || profile.president_photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'}
                                    alt="President PT. Sugiyama Indonesia"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Philosophy & Vision & Mission */}
            <section className="py-12 sm:py-20 bg-slate-50 border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <ScrollReveal delay={0.1} direction="up">
                        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 h-full">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                                {t('about_philosophy_title', 'Filosofi Perusahaan')}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {p.philosophy || 'Menempa kualitas terbaik melalui penguasaan teknologi, dedikasi karyawan, dan kepuasan pelanggan yang berkelanjutan.'}
                            </p>
                        </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} direction="up">
                        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 h-full">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                                {t('about_vision_title', 'Visi Kami')}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {p.vision || 'Menjadi tolok ukur global dalam teknologi penempaan dingin dan komponen presisi masa depan.'}
                            </p>
                        </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3} direction="up">
                        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 h-full">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                                {t('about_mission_title', 'Misi Kami')}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {p.mission || 'Menghadirkan produk presisi bernilai tambah tinggi dengan efisiensi sumber daya maksimal.'}
                            </p>
                        </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Corporate Factsheet */}
            <section className="py-12 sm:py-20 bg-white border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
                    <ScrollReveal>
                        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-4 sm:mb-8">
                            {t('about_data_title', 'Ringkasan Data Perusahaan')}
                        </h2>

                        <div className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden divide-y divide-slate-200">
                            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 hover:bg-slate-100/50 transition-colors">
                                <span className="font-bold text-slate-500 text-xs uppercase">{t('about_company_name_label', 'Nama Perusahaan')}</span>
                                <span className="col-span-2 font-bold text-slate-900 text-sm">{companyName}</span>
                            </div>
                            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 hover:bg-slate-100/50 transition-colors">
                                <span className="font-bold text-slate-500 text-xs uppercase">{t('about_est_label', 'Tahun Berdiri')}</span>
                                <span className="col-span-2 font-semibold text-slate-800 text-sm">{p.established_date || 'Maret 1952'}</span>
                            </div>
                            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 hover:bg-slate-100/50 transition-colors">
                                <span className="font-bold text-slate-500 text-xs uppercase">{t('about_capital_label', 'Modal Dasar')}</span>
                                <span className="col-span-2 font-semibold text-slate-800 text-sm">{p.capital || '50,000,000 JPY'}</span>
                            </div>
                            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 hover:bg-slate-100/50 transition-colors">
                                <span className="font-bold text-slate-500 text-xs uppercase">{t('about_emp_label', 'Jumlah Karyawan')}</span>
                                <span className="col-span-2 font-semibold text-slate-800 text-sm">{p.employees_count || '280 Karyawan'}</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Timeline */}
            {p.history_timeline && Array.isArray(p.history_timeline) && (
                <section className="py-20 bg-slate-50 border-b border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                        <ScrollReveal>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                {t('about_history_title', 'Sejarah & Milestone Perkembangan')}
                            </h2>
                        </ScrollReveal>

                        <div className="relative border-l-2 border-emerald-700 ml-4 pl-6 sm:pl-8 space-y-8">
                            {p.history_timeline.map((item, idx) => (
                                <ScrollReveal key={idx} delay={0.1}>
                                    <div className="relative group">
                                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-700 absolute -left-[31px] sm:-left-[39px] top-1.5 border-4 border-white shadow-xs group-hover:scale-125 transition-transform" />
                                        <span className="text-base font-black text-emerald-800 font-display block">
                                            {item.year}
                                        </span>
                                        <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                                            {item.event}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Global Branches Network */}
            {p.branches && Array.isArray(p.branches) && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                        <ScrollReveal>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                {t('about_branches_title', 'Jaringan Pabrik & Kantor Global')}
                            </h2>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {p.branches.map((b, idx) => (
                                <ScrollReveal key={idx} delay={idx * 0.1}>
                                    <div className="p-6 rounded-3xl bg-slate-50 hover:bg-slate-100 border border-slate-200 space-y-2 h-full transition-colors">
                                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                            {b.role || 'Facility'}
                                        </span>
                                        <h3 className="font-bold text-slate-900 text-base">{b.name}</h3>
                                        <p className="text-xs text-slate-600">{b.address}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </AppLayout>
    );
}
