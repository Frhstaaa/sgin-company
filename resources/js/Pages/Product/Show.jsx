import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { ArrowLeft, Send, CheckCircle2, ShieldCheck, ArrowRight, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function ProductShow({ product: rawProduct, relatedProducts = [] }) {
    const { t, lang, translateModel } = useLanguage();
    const product = translateModel(rawProduct, 'product');
    const category = product.category ? translateModel(product.category, 'product_category') : null;

    return (
        <AppLayout>
            <Head title={`${product.name} | PT. Sugiyama Indonesia`} />

            {/* Page Header Banner */}
            <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 sm:pt-36 sm:pb-20 relative overflow-hidden">
                {/* Background Japanese Watermark & Blueprint Ambient Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/25 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-800/25 font-black text-8xl sm:text-9xl select-none font-jp hidden lg:block">
                        製品詳細
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    {/* Breadcrumb Pill */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900 transition-all backdrop-blur-md"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t('prd_back_all', 'Katalog Produk')}</span>
                        </Link>
                        {category && (
                            <>
                                <span className="text-slate-500 text-xs">/</span>
                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{category.name}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                        {product.name}
                    </h1>

                    {product.sku && (
                        <p className="text-xs sm:text-sm text-emerald-400 font-mono font-bold">
                            {t('prd_sku_label', 'SKU / Kode Part')}: {product.sku}
                        </p>
                    )}
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
                    {/* Media & Key Specs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-6 rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-slate-900">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="md:col-span-6 space-y-5 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
                            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                                {t('prd_specs_label', 'Spesifikasi Teknis')}
                            </h2>

                            <div className="space-y-3 text-xs sm:text-sm">
                                <div>
                                    <span className="text-slate-400 font-semibold">{t('prd_material_label', 'Material Bahan')}:</span>
                                    <p className="font-bold text-slate-900">{product.material || '-'}</p>
                                </div>

                                <div>
                                    <span className="text-slate-400 font-semibold">{t('prd_tolerance_label', 'Toleransi Dimensi')}:</span>
                                    <p className="font-bold text-emerald-700 font-mono">{product.tolerance || '-'}</p>
                                </div>

                                <div>
                                    <span className="text-slate-400 font-semibold">{t('prd_application_label', 'Aplikasi Penggunaan')}:</span>
                                    <p className="font-semibold text-slate-800">{product.application || '-'}</p>
                                </div>
                            </div>

                            <div className="pt-3">
                                <Link
                                    href={`/contact?product_id=${product.id}&type=rfq`}
                                    className="w-full py-3.5 px-6 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
                                >
                                    <span>{t('prd_btn_rfq', 'Minta Penawaran (RFQ)')}</span>
                                    <Send className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Specs Object if present */}
                    {product.specs && typeof product.specs === 'object' && Object.keys(product.specs).length > 0 && (
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                            <h3 className="text-base font-bold text-slate-900">
                                {t('prd_specs_label', 'Spesifikasi Teknis Lengkap')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Object.entries(product.specs).map(([key, val]) => (
                                    <div key={key} className="p-3.5 rounded-2xl bg-white border border-slate-100 flex items-center justify-between text-xs">
                                        <span className="text-slate-500 font-semibold">{key}</span>
                                        <span className="font-bold text-slate-900 font-mono">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
