import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    LayoutTemplate, Save, CheckCircle2, Building2, Cpu, 
    Briefcase, Cog, Package, Newspaper, UserCheck, Phone, 
    Sparkles, ArrowRight, ExternalLink 
} from 'lucide-react';

export default function AdminBannersIndex({ settings = {} }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        // 1. Tentang Kami
        about_hero_badge: settings.about_hero_badge || 'TENTANG KAMI / 会社概要',
        about_hero_title: settings.about_hero_title || 'Keahlian Presisi Jepang Berstandar Global',
        about_hero_lead: settings.about_hero_lead || 'Sejak didirikan pada tahun 1952 di Aichi, Jepang, PT. Sugiyama Indonesia (Sugiyama Group) terus menempa batas inovasi teknik penempaan dingin.',

        // 2. Teknologi
        tech_hero_badge: settings.tech_hero_badge || 'TEKNOLOGI KAMI / 技術紹介',
        tech_hero_title: settings.tech_hero_title || 'Teknologi & Keunggulan Rekayasa Presisi',
        tech_hero_lead: settings.tech_hero_lead || 'Menggabungkan keahlian cetakan penempaan dingin dengan pemesinan CNC multi-sumbu untuk efisiensi material dan kekuatan mekanis tertinggi.',

        // 3. Bisnis
        biz_hero_badge: settings.biz_hero_badge || 'UNIT BISNIS / 事業内容',
        biz_hero_title: settings.biz_hero_title || 'Solusi Komprehensif Manufaktur Otomotif & Industri',
        biz_hero_lead: settings.biz_hero_lead || 'Dukungan end-to-end dari perancangan cetakan cold forging, produksi massal, hingga perakitan presisi.',

        // 4. Peralatan
        machine_hero_badge: settings.machine_hero_badge || 'FASILITAS & PERALATAN / 設備一覧',
        machine_hero_title: settings.machine_hero_title || 'Kapasitas Mesin & Peralatan Presisi Tinggi',
        machine_hero_lead: settings.machine_hero_lead || 'Dukungan mesin cold former multi-station, CNC machining center, dan instrumen metrologi standar Jepang.',

        // 5. Produk
        product_hero_badge: settings.product_hero_badge || 'KATALOG PRODUK / 製品紹介',
        product_hero_title: settings.product_hero_title || 'Portofolio Komponen Presisi Otomotif & Industri',
        product_hero_lead: settings.product_hero_lead || 'Komponen penempaan dingin berkualitas tinggi untuk sistem transmisi, kemudi, suspensi, dan suku cadang presisi.',

        // 6. Berita
        news_hero_badge: settings.news_hero_badge || 'BERITA & PENGUMUMAN / ニュース',
        news_hero_title: settings.news_hero_title || 'Informasi Terbaru & Perkembangan Perusahaan',
        news_hero_lead: settings.news_hero_lead || 'Kabar korporasi, pencapaian sertifikasi mutu, agenda kegiatan, dan teknologi terkini.',

        // 7. Karir
        career_hero_badge: settings.career_hero_badge || 'KARIR & REKRUTMEN / 採用情報',
        career_hero_title: settings.career_hero_title || 'Bergabung Bersama Membangun Masa Depan Manufaktur',
        career_hero_lead: settings.career_hero_lead || 'Kembangkan potensi terbaik Anda bersama PT. Sugiyama Indonesia dalam lingkungan kerja profesional berstandar Jepang.',

        // 8. Kontak
        contact_hero_badge: settings.contact_hero_badge || 'HUBUNGI KAMI / お問い合わせ',
        contact_hero_title: settings.contact_hero_title || 'Konsultasi Teknik & Permintaan Penawaran',
        contact_hero_lead: settings.contact_hero_lead || 'Tim teknis dan penjualan PT. Sugiyama Indonesia siap membantu estimasi biaya produksi penempaan dingin, evaluasi gambar teknik CAD, serta konsultasi spesifikasi material.',
    });

    const [activeTab, setActiveTab] = useState('about');

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/page-banners', {
            preserveScroll: true,
        });
    };

    const bannerPages = [
        { id: 'about', name: 'Tentang Kami', path: '/tentang-kami', icon: Building2, color: 'emerald' },
        { id: 'tech', name: 'Teknologi', path: '/teknologi', icon: Cpu, color: 'sky' },
        { id: 'biz', name: 'Unit Bisnis', path: '/bisnis', icon: Briefcase, color: 'indigo' },
        { id: 'machine', name: 'Peralatan & Mesin', path: '/peralatan', icon: Cog, color: 'amber' },
        { id: 'product', name: 'Katalog Produk', path: '/produk', icon: Package, color: 'teal' },
        { id: 'news', name: 'Berita & Update', path: '/berita', icon: Newspaper, color: 'rose' },
        { id: 'career', name: 'Lowongan Karir', path: '/karir', icon: UserCheck, color: 'purple' },
        { id: 'contact', name: 'Kontak & Konsultasi', path: '/kontak', icon: Phone, color: 'emerald' },
    ];

    return (
        <AdminLayout title="Kelola Banner Halaman">
            <Head title="Banner Halaman | Sugiyama CMS" />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <LayoutTemplate className="w-6 h-6 text-emerald-600" />
                            <span>Kelola Banner Header Semua Halaman</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Sesuaikan teks badge, judul utama, dan pengantar pada banner hijau di seluruh halaman menu website.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Menyimpan...' : 'Simpan Semua Banner'}</span>
                    </button>
                </div>

                {recentlySuccessful && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm font-semibold flex items-center gap-3 shadow-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Seluruh Banner Header Halaman berhasil disimpan dan langsung aktif live!</span>
                    </div>
                )}

                {/* Page Navigation Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {bannerPages.map((page) => {
                        const Icon = page.icon;
                        const isActive = activeTab === page.id;
                        return (
                            <button
                                key={page.id}
                                type="button"
                                onClick={() => setActiveTab(page.id)}
                                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                    isActive
                                        ? 'bg-emerald-800 text-white shadow-md'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{page.name}</span>
                            </button>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Dynamic Active Page Card */}
                    {bannerPages.map((page) => {
                        if (activeTab !== page.id) return null;
                        const Icon = page.icon;
                        const badgeKey = `${page.id}_hero_badge`;
                        const titleKey = `${page.id}_hero_title`;
                        const leadKey = `${page.id}_hero_lead`;

                        return (
                            <div key={page.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                                <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2.5">
                                        <Icon className="w-5 h-5 text-emerald-700" />
                                        <div>
                                            <h2 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                                Header Banner: Halaman {page.name}
                                            </h2>
                                            <p className="text-xs text-emerald-700 font-mono">
                                                URL: {page.path}
                                            </p>
                                        </div>
                                    </div>

                                    <a
                                        href={page.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-2xs"
                                    >
                                        <span>Lihat Halaman</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>

                                <div className="p-6 sm:p-8 space-y-6">
                                    {/* Live Banner Preview Box */}
                                    <div className="rounded-2xl bg-emerald-950 text-white p-6 sm:p-8 shadow-inner relative overflow-hidden space-y-2 border border-emerald-900">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                                            {data[badgeKey] || 'LABEL BADGE'}
                                        </div>
                                        <div className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
                                            {data[titleKey] || 'Judul Utama Banner'}
                                        </div>
                                        <div className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-2xl pt-1">
                                            {data[leadKey] || 'Deskripsi atau teks pengantar banner akan tampil di sini secara dinamis.'}
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                Badge / Label Kecil Atas
                                            </label>
                                            <input
                                                type="text"
                                                value={data[badgeKey] || ''}
                                                onChange={(e) => setData(badgeKey, e.target.value)}
                                                placeholder="Contoh: TENTANG KAMI / 会社概要"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                Judul Utama Banner <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data[titleKey] || ''}
                                                onChange={(e) => setData(titleKey, e.target.value)}
                                                placeholder="Contoh: Keahlian Presisi Jepang Berstandar Global"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-slate-900"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                            Teks Pengantar / Deskripsi Banner
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={data[leadKey] || ''}
                                            onChange={(e) => setData(leadKey, e.target.value)}
                                            placeholder="Tuliskan teks deskripsi pengantar di bawah judul banner..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-lg shadow-emerald-900/15 hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan Semua Banner...' : 'Simpan Seluruh Banner Halaman'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
