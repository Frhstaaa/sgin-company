import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import YouTubeEmbed from '../../Components/YouTubeEmbed';
import { Briefcase, ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function BusinessIndex({ businesses = [] }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();

    return (
        <AppLayout>
            <Head title={`${siteSettings.biz_hero_title || t('biz_title', 'Bidang Usaha & Keahlian Manufaktur')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        事業紹介
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`grid grid-cols-1 ${siteSettings.biz_hero_video ? 'lg:grid-cols-12 gap-10 items-center' : ''}`}>
                        <motion.div 
                            initial={{opacity:0, y:20}} 
                            animate={{opacity:1, y:0}} 
                            transition={{duration:0.6}}
                            className={siteSettings.biz_hero_video ? 'lg:col-span-7 space-y-4' : 'max-w-3xl space-y-4'}
                        >
                            {/* Breadcrumb Pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-md">
                                <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{(lang === 'id' && siteSettings.biz_hero_badge) ? siteSettings.biz_hero_badge : t('biz_badge', 'UNIT BISNIS / 事業紹介')}</span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                {(lang === 'id' && siteSettings.biz_hero_title) ? siteSettings.biz_hero_title : t('biz_title', 'Bidang Usaha & Keahlian Manufaktur')}
                            </h1>

                            <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal">
                                {(lang === 'id' && siteSettings.biz_hero_lead) ? siteSettings.biz_hero_lead : t('biz_desc', 'Solusi manufaktur presisi komprehensif mulai dari penempaan dingin net-shape, turning CNC, hingga rekayasa aditif 3D.')}
                            </p>
                        </motion.div>

                        {siteSettings.biz_hero_video && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-5"
                            >
                                <YouTubeEmbed url={siteSettings.biz_hero_video} title="Video Unit Bisnis" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Business Cards List */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {businesses.map((rawBiz, index) => {
                            const biz = translateModel(rawBiz, 'business');

                            return (
                                <div
                                    key={biz.id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="relative h-60 overflow-hidden bg-slate-900">
                                            <img
                                                src={biz.image_url}
                                                alt={biz.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="px-3 py-1 rounded-full bg-emerald-700/90 text-white text-[11px] font-bold backdrop-blur-xs">
                                                    {biz.tag || 'Business Unit'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 sm:p-8 space-y-4">
                                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                                                {biz.title}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                {biz.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-8 pt-0">
                                        <Link
                                            href={`/business/${biz.slug}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 group-hover:bg-emerald-700 text-slate-800 group-hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                                        >
                                            <span>{t('tech_read_more', 'Pelajari')}</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
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
