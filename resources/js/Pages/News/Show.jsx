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
                    <Link href="/berita" className="text-emerald-700 font-bold mt-4 inline-block">
                        &larr; Kembali ke Berita
                    </Link>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`${itemData.title} | PT. Sugiyama Indonesia`} />

            <div className="bg-emerald-950 text-white pt-32 pb-16 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <Link
                        href="/berita"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{t('news_back_all', 'Kembali ke Semua Berita')}</span>
                    </Link>

                    <div className="flex items-center gap-3 text-xs">
                        <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 font-bold">
                            {itemData.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-emerald-300 font-mono">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{itemData.published_at ? new Date(itemData.published_at).toISOString().split('T')[0] : ''}</span>
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
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
