import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function NewsShow({ article, news = article, latestNews = [], recentNews = latestNews }) {
    const { t, lang, translateModel } = useLanguage();
    const itemData = translateModel(article || news || {}, 'news');

    if (!itemData || !itemData.title) {
        return (
            <AppLayout>
                <div className="pt-32 pb-20 text-center">
                    <p className="text-slate-500">Berita tidak ditemukan.</p>
                    <Link href="/news" className="text-emerald-700 font-bold mt-4 inline-block">
                        &larr; Kembali ke Berita
                    </Link>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`${itemData.title} | PT. Sugiyama Indonesia`} />

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        記事詳細
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    {/* Breadcrumb Pill */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900 transition-all backdrop-blur-md"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t('news_back_all', 'Semua Berita')}</span>
                        </Link>
                        {itemData.category && (
                            <>
                                <span className="text-slate-500 text-xs">/</span>
                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{itemData.category}</span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{itemData.published_at ? new Date(itemData.published_at).toISOString().split('T')[0] : ''}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                        {itemData.title}
                    </h1>
                </div>
            </div>

            <article className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    {itemData.cover_image && (
                        <div className="rounded-3xl overflow-hidden shadow-xl aspect-16/9 bg-slate-900">
                            <img
                                src={itemData.cover_image}
                                alt={itemData.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-6 whitespace-pre-wrap">
                        {itemData.content || itemData.excerpt}
                    </div>
                </div>
            </article>
        </AppLayout>
    );
}
