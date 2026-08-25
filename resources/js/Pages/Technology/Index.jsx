import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import YouTubeEmbed from '../../Components/YouTubeEmbed';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';
import { 
    Cpu, ArrowRight, ChevronRight, CheckCircle2, 
    ShieldCheck, Sparkles, Layers, PenTool 
} from 'lucide-react';

export default function TechnologyIndex({ technologies = [] }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();

    return (
        <AppLayout>
            <Head title={`${siteSettings.tech_hero_title || t('tech_title', 'Teknologi & Keunggulan Rekayasa Presisi')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        技術紹介
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`grid grid-cols-1 ${siteSettings.tech_hero_video ? 'lg:grid-cols-12 gap-10 items-center' : ''}`}>
                        <motion.div 
                            initial={{opacity:0, y:20}} 
                            animate={{opacity:1, y:0}} 
                            transition={{duration:0.6}}
                            className={siteSettings.tech_hero_video ? 'lg:col-span-7 space-y-4' : 'max-w-3xl space-y-4'}
                        >
                            {/* Breadcrumb Pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-md">
                                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{(lang === 'id' && siteSettings.tech_hero_badge) ? siteSettings.tech_hero_badge : t('tech_badge', 'TEKNOLOGI KAMI / 技術紹介')}</span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                {(lang === 'id' && siteSettings.tech_hero_title) ? siteSettings.tech_hero_title : t('tech_title', 'Teknologi & Keunggulan Rekayasa Presisi')}
                            </h1>

                            <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal">
                                {(lang === 'id' && siteSettings.tech_hero_lead) ? siteSettings.tech_hero_lead : t('tech_desc', 'Menggabungkan keahlian cetakan penempaan dingin dengan pemesinan CNC multi-sumbu untuk efisiensi material dan kekuatan mekanis tertinggi.')}
                            </p>
                        </motion.div>

                        {siteSettings.tech_hero_video && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-5"
                            >
                                <YouTubeEmbed url={siteSettings.tech_hero_video} title="Video Teknologi Presisi" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content List */}
            <section className="py-12 sm:py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-16">
                    {technologies.map((rawTech, index) => {
                        const tech = translateModel(rawTech, 'technology');
                        const isEven = index % 2 === 1;

                        return (
                            <ScrollReveal key={tech.id} direction={isEven ? 'right' : 'left'}>
                            <div 
                                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-6 sm:gap-12 bg-white p-6 sm:p-12 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs`}
                            >
                                <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden aspect-16/10 shadow-lg bg-slate-900">
                                    <img 
                                        src={tech.image_url} 
                                        alt={tech.title}
                                        className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3.5 py-1.5 rounded-full bg-emerald-800/90 text-white font-black text-xs backdrop-blur-xs">
                                            {lang === 'ja' ? `第${parseInt(tech.step_number, 10)}の柱` : `${t('tech_pillar', 'PILAR')} ${tech.step_number}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5">
                                    <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-display">
                                        {tech.step_number}
                                    </span>
                                    <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                                        {tech.title}
                                    </h2>
                                    <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                                        {tech.short_description}
                                    </p>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {tech.content}
                                    </p>

                                    {tech.features && Array.isArray(tech.features) && (
                                        <div className="space-y-2 pt-2">
                                            {tech.features.map((feat, idx) => (
                                                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <Link
                                            href={`/technology/${tech.slug}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                                        >
                                            <span>{t('tech_read_more', 'Pelajari')}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </section>
        </AppLayout>
    );
}
