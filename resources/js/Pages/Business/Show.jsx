import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { ArrowLeft, ArrowRight, Package, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function BusinessShow({ business, relatedProducts = [] }) {
    const { t, lang, translateModel } = useLanguage();
    const biz = translateModel(business, 'business');

    return (
        <AppLayout>
            <Head title={`${biz.title} | PT. Sugiyama Indonesia`} />

            <div className="bg-emerald-950 text-white pt-32 pb-16 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <Link
                        href="/bisnis"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{t('biz_back_all', 'Kembali ke Semua Unit Bisnis')}</span>
                    </Link>

                    <span className="px-3.5 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold block w-fit">
                        {biz.tag || 'Business Unit'}
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                        {biz.title}
                    </h1>

                    <p className="text-emerald-200/90 text-sm sm:text-base max-w-3xl leading-relaxed">
                        {biz.description}
                    </p>
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="rounded-3xl overflow-hidden shadow-xl aspect-16/9 bg-slate-950">
                        <img 
                            src={biz.image_url} 
                            alt={biz.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                            {biz.title}
                        </h2>
                        <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-wrap">
                            {biz.content || biz.description}
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="space-y-6 pt-6 border-t border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900">
                                {t('biz_related_products', 'Produk Terkait Unit Bisnis Ini')}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {relatedProducts.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/produk/${p.slug}`}
                                        className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:shadow-md transition-all flex items-center gap-4 group"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                                            <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate">
                                                {p.name}
                                            </h4>
                                            <p className="text-[11px] text-slate-400 font-mono">SKU: {p.sku}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
