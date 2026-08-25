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

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        事業内容
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    {/* Breadcrumb Pill */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/business"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900 transition-all backdrop-blur-md"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t('biz_back_all', 'Semua Unit Bisnis')}</span>
                        </Link>
                        {biz.tag && (
                            <>
                                <span className="text-slate-500 text-xs">/</span>
                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{biz.tag}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                        {biz.title}
                    </h1>

                    <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal max-w-3xl">
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
                                        href={`/products/${p.slug}`}
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
