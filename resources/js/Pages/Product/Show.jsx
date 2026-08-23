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

            <div className="bg-emerald-950 text-white pt-32 pb-16 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <Link
                        href="/produk"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{t('prd_back_all', 'Kembali ke Katalog Produk')}</span>
                    </Link>

                    {category && (
                        <span className="px-3.5 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold block w-fit">
                            {category.name}
                        </span>
                    )}

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {product.name}
                    </h1>

                    {product.sku && (
                        <p className="text-xs text-emerald-300 font-mono">
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
                                    href={`/kontak?product_id=${product.id}&type=rfq`}
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
