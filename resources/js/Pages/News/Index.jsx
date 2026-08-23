import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import YouTubeEmbed from '../../Components/YouTubeEmbed';
import { Newspaper, Calendar, Search, ArrowRight, ChevronRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function NewsIndex({ news, filters = {} }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/berita', { ...filters, search }, { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title={`${siteSettings.news_hero_title || t('news_title', 'Update Berita Terkini & Informasi Perusahaan')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            <div className="bg-emerald-950 text-white pt-28 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`grid grid-cols-1 ${siteSettings.news_hero_video ? 'lg:grid-cols-12 gap-8 items-center' : ''}`}>
                        <motion.div 
                            initial={{opacity:0, y:20}} 
                            animate={{opacity:1, y:0}} 
                            transition={{duration:0.6}}
                            className={siteSettings.news_hero_video ? 'lg:col-span-6 space-y-2' : ''}
                        >
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                {(lang === 'id' && siteSettings.news_hero_badge) ? siteSettings.news_hero_badge : t('news_badge', 'BERITA & PENGUMUMAN / ニュース')}
                            </span>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1 sm:mt-2 leading-tight">
                                {(lang === 'id' && siteSettings.news_hero_title) ? siteSettings.news_hero_title : t('news_title', 'Update Berita Terkini & Informasi Perusahaan')}
                            </h1>
                            <p className="text-emerald-200/90 text-xs sm:text-sm md:text-base max-w-2xl mt-3 sm:mt-4 leading-relaxed">
                                {(lang === 'id' && siteSettings.news_hero_lead) ? siteSettings.news_hero_lead : t('news_lead', 'Kabar korporasi, pencapaian sertifikasi mutu, agenda kegiatan, dan teknologi terkini.')}
                            </p>
                        </motion.div>

                        {siteSettings.news_hero_video && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-6"
                            >
                                <YouTubeEmbed url={siteSettings.news_hero_video} title="Video Berita & Informasi Perusahaan" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    {/* Search bar */}
                    <div className="flex justify-end">
                        <form onSubmit={handleSearch} className="w-full sm:w-80 relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t('news_search_placeholder', 'Cari artikel berita...')}
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 shadow-2xs"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        </form>
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.data && news.data.map((rawItem) => {
                            const item = translateModel(rawItem, 'news');
                            return (
                            <Link
                                key={item.id}
                                href={`/berita/${item.slug}`}
                                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="relative h-48 overflow-hidden bg-slate-900">
                                        <img
                                            src={item.cover_image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-emerald-800/90 text-white font-bold text-[10px] backdrop-blur-xs">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-3">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-bold">
                                            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                            <span>{item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : ''}</span>
                                        </div>

                                        <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors text-base line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                                    <span>{t('tech_read_more', 'Baca Selengkapnya')}</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                            </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
