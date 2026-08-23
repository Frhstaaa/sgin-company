import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { Package, Search, ArrowRight, ShieldCheck, Filter, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function ProductIndex({ products, categories = [], filters = {} }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang } = useLanguage();
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/produk', { ...filters, search, category: selectedCategory }, { preserveState: true });
    };

    const handleCategoryClick = (catSlug) => {
        setSelectedCategory(catSlug);
        router.get('/produk', { ...filters, search, category: catSlug || undefined }, { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title={`${siteSettings.product_hero_title || t('prd_header_title', 'Katalog Komponen & Suku Cadang Presisi')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            {/* Header */}
            <div className="bg-emerald-950 text-white pt-28 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
                            {siteSettings.product_hero_badge || t('split_prd_sub', 'KATALOG PRODUK / 製品紹介')}
                        </span>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1 sm:mt-2 leading-tight">
                            {siteSettings.product_hero_title || t('prd_header_title', 'Katalog Komponen & Suku Cadang Presisi')}
                        </h1>
                        <p className="text-emerald-200/90 text-xs sm:text-sm md:text-base max-w-2xl mt-3 sm:mt-4 leading-relaxed">
                            {siteSettings.product_hero_lead || t('prd_header_desc', 'Solusi penempaan dingin dan permesinan presisi untuk industri otomotif, kendaraan listrik (EV), robotik, dan permesinan industri.')}
                        </p>
                    </motion.div>
                </div>
            </div>

            <section className="py-12 sm:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
                    {/* Search & Category Filter Bar */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl shadow-xs border border-slate-200">
                        {/* Categories */}
                        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                            <button
                                onClick={() => handleCategoryClick('')}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                    !selectedCategory
                                        ? 'bg-emerald-700 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                {t('prd_filter_all', 'Semua Kategori')}
                            </button>
                            {categories.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => handleCategoryClick(c.slug)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                        selectedCategory === c.slug
                                            ? 'bg-emerald-700 text-white shadow-xs'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    {lang === 'ja' && c.name_jp ? c.name_jp : c.name}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <form onSubmit={handleSearch} className="w-full lg:w-80 relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t('prd_search_placeholder', 'Cari nama produk, material, atau SKU...')}
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        </form>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.data && products.data.map((p, idx) => (
                            <ScrollReveal key={p.id} delay={0.1 * (idx % 4)}>
                            <div
                                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group h-full"
                            >
                                <div>
                                    <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                                        <img
                                            src={p.image_url}
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {p.sku && (
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 rounded-full bg-slate-950/80 text-emerald-300 text-[10px] font-mono font-bold backdrop-blur-xs">
                                                    {p.sku}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 space-y-3">
                                        <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors text-sm line-clamp-1">
                                            {lang === 'ja' && p.name_jp ? p.name_jp : p.name}
                                        </h3>

                                        <div className="space-y-1 text-xs text-slate-500">
                                            <p className="truncate">
                                                {t('prd_material_label', 'Material')}: <strong className="text-slate-800">{p.material || '-'}</strong>
                                            </p>
                                            <p>
                                                {t('prd_tolerance_label', 'Toleransi')}: <strong className="text-emerald-700 font-mono">{p.tolerance || '-'}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                                    <Link
                                        href={`/produk/${p.slug}`}
                                        className="text-xs font-bold text-emerald-800 hover:text-emerald-600 transition-colors flex items-center gap-1"
                                    >
                                        <span>{t('prd_btn_detail', 'Detail')}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>

                                    <Link
                                        href={`/kontak?product_id=${p.id}&type=rfq`}
                                        className="px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider transition-colors shadow-2xs"
                                    >
                                        {t('prd_btn_rfq', 'RFQ')}
                                    </Link>
                                </div>
                            </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
