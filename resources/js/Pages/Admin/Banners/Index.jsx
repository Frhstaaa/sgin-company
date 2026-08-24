import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import YouTubeEmbed, { getYouTubeVideoId } from '../../../Components/YouTubeEmbed';
import { 
    LayoutTemplate, Save, CheckCircle2, Building2, Cpu, 
    Briefcase, Cog, Package, Newspaper, UserCheck, Phone, 
    Sparkles, ArrowRight, ExternalLink, Workflow, Home, Video, Play,
    Upload
} from 'lucide-react';

export default function AdminBannersIndex({ settings = {} }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        // 0. Beranda
        home_hero_video: settings.home_hero_video || '',
        
        // Beranda - Fasilitas Mesin
        home_facility_image: null,
        home_facility_badge: settings.home_facility_badge || 'Fasilitas & Mesin Manufaktur Presisi',
        home_facility_tag_jp: settings.home_facility_tag_jp || '設備紹介',
        home_facility_title: settings.home_facility_title || 'Fasilitas Mesin & Peralatan Presisi',
        home_facility_desc: settings.home_facility_desc || 'Kombinasi mesin penempa dingin 6-Die berkecepatan 180 pcs/menit dan mesin CNC bubut 5-axis untuk menghasilkan komponen net-shape tanpa pemborosan material.',
        home_facility_feat1_title: settings.home_facility_feat1_title || 'Cold Former 6-Die',
        home_facility_feat1_desc: settings.home_facility_feat1_desc || 'Kecepatan Max 180 ppm',
        home_facility_feat2_title: settings.home_facility_feat2_title || '5-Axis CNC Turning',
        home_facility_feat2_desc: settings.home_facility_feat2_desc || 'Toleransi Presisi ±0.005mm',
        home_facility_btn_text: settings.home_facility_btn_text || 'Lihat Semua Fasilitas Mesin',
        home_facility_btn_link: settings.home_facility_btn_link || '/peralatan',

        // Beranda - Alur Proses Produksi
        home_process_image: null,
        home_process_badge: settings.home_process_badge || 'Proses Produksi / 製造工程',
        home_process_tag_jp: settings.home_process_tag_jp || '製造工程',
        home_process_title: settings.home_process_title || 'Alur Rekayasa & Proses Produksi',
        home_process_desc: settings.home_process_desc || 'Pengawasan kualitas ketat dari material kawat baja bersertifikat, penempaan dingin terkontrol, hingga inspeksi koordinat 3D CMM sub-mikron.',
        home_process_step1: settings.home_process_step1 || 'Persiapan & Uji Metalurgi Kawat Baja',
        home_process_step2: settings.home_process_step2 || 'Net-Shape Cold Forging Tanpa Pemanasan',
        home_process_step3: settings.home_process_step3 || 'Quality Control 100% Berstandar Jepang',
        home_process_btn_text: settings.home_process_btn_text || 'Pelajari 5 Tahap Proses Produksi',
        home_process_btn_link: settings.home_process_btn_link || '/proses-produksi',

        // 1. Tentang Kami
        about_hero_badge: settings.about_hero_badge || 'TENTANG KAMI / 会社概要',
        about_hero_title: settings.about_hero_title || 'Keahlian Presisi Jepang Berstandar Global',
        about_hero_lead: settings.about_hero_lead || 'Sejak didirikan pada tahun 1952 di Aichi, Jepang, PT. Sugiyama Indonesia (Sugiyama Group) terus menempa batas inovasi teknik penempaan dingin.',
        about_hero_video: settings.about_hero_video || '',

        // 2. Teknologi
        tech_hero_badge: settings.tech_hero_badge || 'TEKNOLOGI KAMI / 技術紹介',
        tech_hero_title: settings.tech_hero_title || 'Teknologi & Keunggulan Rekayasa Presisi',
        tech_hero_lead: settings.tech_hero_lead || 'Menggabungkan keahlian cetakan penempaan dingin dengan pemesinan CNC multi-sumbu untuk efisiensi material dan kekuatan mekanis tertinggi.',
        tech_hero_video: settings.tech_hero_video || '',

        // 3. Bisnis
        biz_hero_badge: settings.biz_hero_badge || 'UNIT BISNIS / 事業内容',
        biz_hero_title: settings.biz_hero_title || 'Solusi Komprehensif Manufaktur Otomotif & Industri',
        biz_hero_lead: settings.biz_hero_lead || 'Dukungan end-to-end dari perancangan cetakan cold forging, produksi massal, hingga perakitan presisi.',
        biz_hero_video: settings.biz_hero_video || '',

        // 4. Peralatan
        machine_hero_badge: settings.machine_hero_badge || 'FASILITAS & PERALATAN / 設備一覧',
        machine_hero_title: settings.machine_hero_title || 'Kapasitas Mesin & Peralatan Presisi Tinggi',
        machine_hero_lead: settings.machine_hero_lead || 'Dukungan mesin cold former multi-station, CNC machining center, dan instrumen metrologi standar Jepang.',
        machine_hero_video: settings.machine_hero_video || '',

        // 5. Proses Produksi
        prod_hero_badge: settings.prod_hero_badge || 'ALUR PRODUKSI / 製造工程',
        prod_hero_title: settings.prod_hero_title || 'Alur Proses Manufaktur & Kontrol Kualitas Presisi',
        prod_hero_lead: settings.prod_hero_lead || 'Integrasi rantai pasok dari penempaan bahan baku di Jepang, pengapalan laut, permesinan CNC di Indonesia, hingga 100% inspeksi mutu standar Jepang.',
        prod_hero_video: settings.prod_hero_video || '',

        // 6. Produk
        product_hero_badge: settings.product_hero_badge || 'KATALOG PRODUK / 製品紹介',
        product_hero_title: settings.product_hero_title || 'Portofolio Komponen Presisi Otomotif & Industri',
        product_hero_lead: settings.product_hero_lead || 'Komponen penempaan dingin berkualitas tinggi untuk sistem transmisi, kemudi, suspensi, dan suku cadang presisi.',
        product_hero_video: settings.product_hero_video || '',

        // 7. Berita
        news_hero_badge: settings.news_hero_badge || 'BERITA & PENGUMUMAN / ニュース',
        news_hero_title: settings.news_hero_title || 'Informasi Terbaru & Perkembangan Perusahaan',
        news_hero_lead: settings.news_hero_lead || 'Kabar korporasi, pencapaian sertifikasi mutu, agenda kegiatan, dan teknologi terkini.',
        news_hero_video: settings.news_hero_video || '',

        // 8. Karir
        career_hero_badge: settings.career_hero_badge || 'KARIR & REKRUTMEN / 採用情報',
        career_hero_title: settings.career_hero_title || 'Bergabung Bersama Membangun Masa Depan Manufaktur',
        career_hero_lead: settings.career_hero_lead || 'Kembangkan potensi terbaik Anda bersama PT. Sugiyama Indonesia dalam lingkungan kerja profesional berstandar Jepang.',
        career_hero_video: settings.career_hero_video || '',

        // 9. Kontak
        contact_hero_badge: settings.contact_hero_badge || 'HUBUNGI KAMI / お問い合わせ',
        contact_hero_title: settings.contact_hero_title || 'Konsultasi Teknik & Permintaan Penawaran',
        contact_hero_lead: settings.contact_hero_lead || 'Tim teknis dan penjualan PT. Sugiyama Indonesia siap membantu estimasi biaya produksi penempaan dingin, evaluasi gambar teknik CAD, serta konsultasi spesifikasi material.',
        contact_hero_video: settings.contact_hero_video || '',
    });

    const [activeTab, setActiveTab] = useState('home');
    const [facilityPreview, setFacilityPreview] = useState(settings.home_facility_image || '');
    const [processPreview, setProcessPreview] = useState(settings.home_process_image || '');

    const handleFacilityFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('home_facility_image', file);
            setFacilityPreview(URL.createObjectURL(file));
        }
    };

    const handleProcessFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('home_process_image', file);
            setProcessPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/page-banners', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const bannerPages = [
        { id: 'home', name: 'Beranda (Home)', path: '/', icon: Home, color: 'emerald' },
        { id: 'about', name: 'Tentang Kami', path: '/tentang-kami', icon: Building2, color: 'emerald' },
        { id: 'tech', name: 'Teknologi', path: '/teknologi', icon: Cpu, color: 'sky' },
        { id: 'biz', name: 'Unit Bisnis', path: '/bisnis', icon: Briefcase, color: 'indigo' },
        { id: 'machine', name: 'Peralatan & Mesin', path: '/peralatan', icon: Cog, color: 'amber' },
        { id: 'prod', name: 'Proses Produksi', path: '/proses-produksi', icon: Workflow, color: 'blue' },
        { id: 'product', name: 'Katalog Produk', path: '/produk', icon: Package, color: 'teal' },
        { id: 'news', name: 'Berita & Update', path: '/berita', icon: Newspaper, color: 'rose' },
        { id: 'career', name: 'Lowongan Karir', path: '/karir', icon: UserCheck, color: 'purple' },
        { id: 'contact', name: 'Kontak & Konsultasi', path: '/kontak', icon: Phone, color: 'emerald' },
    ];

    return (
        <AdminLayout title="Kelola Banner Halaman & Embed Video">
            <Head title="Banner Halaman & Embed Video | Sugiyama CMS" />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <LayoutTemplate className="w-6 h-6 text-emerald-600" />
                            <span>Banner Header & Konten Beranda</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Atur judul banner, label badge, background foto fasilitas mesin & proses di beranda, serta <strong>link video YouTube mandiri</strong>.
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
                        <span>Seluruh konfigurasi banner dan foto background beranda berhasil disimpan dan aktif live!</span>
                    </div>
                )}

                {/* Page Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {bannerPages.map((page) => {
                        const Icon = page.icon;
                        const isActive = activeTab === page.id;
                        const videoKey = `${page.id}_hero_video`;
                        const hasVideo = !!data[videoKey];

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
                                {hasVideo && (
                                    <span className="w-2 h-2 rounded-full bg-rose-400" title="Ada video terpasang" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Active Tab Form Content */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {bannerPages.map((page) => {
                        if (activeTab !== page.id) return null;

                        const Icon = page.icon;
                        const badgeKey = `${page.id}_hero_badge`;
                        const titleKey = `${page.id}_hero_title`;
                        const leadKey = `${page.id}_hero_lead`;
                        const videoKey = `${page.id}_hero_video`;
                        const isHome = page.id === 'home';

                        return (
                            <div key={page.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                                {/* Tab Header Banner */}
                                <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2.5">
                                        <Icon className="w-5 h-5 text-emerald-700" />
                                        <div>
                                            <h2 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                                Konfigurasi Halaman: {page.name}
                                            </h2>
                                            <p className="text-xs text-emerald-700 font-mono">Path URL: {page.path}</p>
                                        </div>
                                    </div>
                                    <a
                                        href={page.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-2xs"
                                    >
                                        <span>Lihat Halaman Publik</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>

                                <div className="p-6 sm:p-8 space-y-8">
                                    {/* SECTION 1: HOMEPAGE EXCLUSIVE SECTIONS (FASILITAS & MESIN + PROSES PRODUKSI) */}
                                    {isHome && (
                                        <div className="space-y-8">
                                            {/* Card 1 Editor: Fasilitas & Mesin */}
                                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                                                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                                                            <Cog className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-extrabold text-slate-900 text-sm">
                                                                Kartu 1: Fasilitas Mesin & Peralatan Presisi (Beranda)
                                                            </h3>
                                                            <p className="text-xs text-slate-500">
                                                                Atur foto background, judul, deskripsi, dan teks tombol kartu sebelah kiri di beranda
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Background Photo Uploader for Facility Card */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                                            Foto Background Fasilitas Mesin
                                                        </label>
                                                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shadow-inner group">
                                                            <img 
                                                                src={facilityPreview || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop'} 
                                                                alt="Preview Fasilitas" 
                                                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <label className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-md">
                                                                    <Upload className="w-3.5 h-3.5" />
                                                                    <span>Ganti Foto</span>
                                                                    <input 
                                                                        type="file" 
                                                                        accept="image/*" 
                                                                        onChange={handleFacilityFile} 
                                                                        className="hidden" 
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 text-xs font-semibold cursor-pointer w-full justify-center transition-colors">
                                                            <Upload className="w-3.5 h-3.5 text-emerald-600" />
                                                            <span>Pilih File Gambar Baru</span>
                                                            <input 
                                                                type="file" 
                                                                accept="image/*" 
                                                                onChange={handleFacilityFile} 
                                                                className="hidden" 
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="md:col-span-2 space-y-4">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                    Badge Teks Atas
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_facility_badge}
                                                                    onChange={(e) => setData('home_facility_badge', e.target.value)}
                                                                    placeholder="Fasilitas & Mesin Manufaktur Presisi"
                                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                    Tag Kanji Jepang
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_facility_tag_jp}
                                                                    onChange={(e) => setData('home_facility_tag_jp', e.target.value)}
                                                                    placeholder="設備紹介"
                                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white font-jp"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                Judul Kartu Fasilitas
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.home_facility_title}
                                                                onChange={(e) => setData('home_facility_title', e.target.value)}
                                                                placeholder="Fasilitas Mesin & Peralatan Presisi"
                                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                Deskripsi Singkat
                                                            </label>
                                                            <textarea
                                                                rows="2"
                                                                value={data.home_facility_desc}
                                                                onChange={(e) => setData('home_facility_desc', e.target.value)}
                                                                placeholder="Kombinasi mesin penempa dingin 6-Die berkecepatan 180 pcs/menit..."
                                                                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                                                                <p className="text-[11px] font-bold text-emerald-800 uppercase">Fitur Spek 1</p>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_facility_feat1_title}
                                                                    onChange={(e) => setData('home_facility_feat1_title', e.target.value)}
                                                                    placeholder="Cold Former 6-Die"
                                                                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={data.home_facility_feat1_desc}
                                                                    onChange={(e) => setData('home_facility_feat1_desc', e.target.value)}
                                                                    placeholder="Kecepatan Max 180 ppm"
                                                                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900"
                                                                />
                                                            </div>
                                                            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                                                                <p className="text-[11px] font-bold text-emerald-800 uppercase">Fitur Spek 2</p>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_facility_feat2_title}
                                                                    onChange={(e) => setData('home_facility_feat2_title', e.target.value)}
                                                                    placeholder="5-Axis CNC Turning"
                                                                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={data.home_facility_feat2_desc}
                                                                    onChange={(e) => setData('home_facility_feat2_desc', e.target.value)}
                                                                    placeholder="Toleransi Presisi ±0.005mm"
                                                                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                    Teks Tombol
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_facility_btn_text}
                                                                    onChange={(e) => setData('home_facility_btn_text', e.target.value)}
                                                                    placeholder="Lihat Semua Fasilitas Mesin"
                                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                    Link URL Tombol
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_facility_btn_link}
                                                                    onChange={(e) => setData('home_facility_btn_link', e.target.value)}
                                                                    placeholder="/peralatan"
                                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card 2 Editor: Alur Proses Produksi */}
                                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                                                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold">
                                                            <Workflow className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-extrabold text-slate-900 text-sm">
                                                                Kartu 2: Alur Rekayasa & Proses Produksi (Beranda)
                                                            </h3>
                                                            <p className="text-xs text-slate-500">
                                                                Atur foto background, judul, deskripsi, 3 tahapan, dan tombol kartu sebelah kanan di beranda
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Background Photo Uploader for Process Card */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                                            Foto Background Proses Produksi
                                                        </label>
                                                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shadow-inner group">
                                                            <img 
                                                                src={processPreview || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop'} 
                                                                alt="Preview Proses" 
                                                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <label className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-md">
                                                                    <Upload className="w-3.5 h-3.5" />
                                                                    <span>Ganti Foto</span>
                                                                    <input 
                                                                        type="file" 
                                                                        accept="image/*" 
                                                                        onChange={handleProcessFile} 
                                                                        className="hidden" 
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:border-teal-500 text-slate-700 text-xs font-semibold cursor-pointer w-full justify-center transition-colors">
                                                            <Upload className="w-3.5 h-3.5 text-teal-600" />
                                                            <span>Pilih File Gambar Baru</span>
                                                            <input 
                                                                type="file" 
                                                                accept="image/*" 
                                                                onChange={handleProcessFile} 
                                                                className="hidden" 
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="md:col-span-2 space-y-4">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                    Badge Teks Atas
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_process_badge}
                                                                    onChange={(e) => setData('home_process_badge', e.target.value)}
                                                                    placeholder="Proses Produksi / 製造工程"
                                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                    Tag Kanji Jepang
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_process_tag_jp}
                                                                    onChange={(e) => setData('home_process_tag_jp', e.target.value)}
                                                                    placeholder="製造工程"
                                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white font-jp"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                Judul Kartu Proses Produksi
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={data.home_process_title}
                                                                onChange={(e) => setData('home_process_title', e.target.value)}
                                                                placeholder="Alur Rekayasa & Proses Produksi"
                                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                Deskripsi Singkat
                                                            </label>
                                                            <textarea
                                                                rows="2"
                                                                value={data.home_process_desc}
                                                                onChange={(e) => setData('home_process_desc', e.target.value)}
                                                                placeholder="Pengawasan kualitas ketat dari material kawat baja bersertifikat..."
                                                                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <p className="text-[11px] font-bold text-teal-800 uppercase">3 Poin Tahapan Manufaktur</p>
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">1</span>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_process_step1}
                                                                    onChange={(e) => setData('home_process_step1', e.target.value)}
                                                                    placeholder="Persiapan & Uji Metalurgi Kawat Baja"
                                                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">2</span>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_process_step2}
                                                                    onChange={(e) => setData('home_process_step2', e.target.value)}
                                                                    placeholder="Net-Shape Cold Forging Tanpa Pemanasan"
                                                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">3</span>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_process_step3}
                                                                    onChange={(e) => setData('home_process_step3', e.target.value)}
                                                                    placeholder="Quality Control 100% Berstandar Jepang"
                                                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                    Teks Tombol
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_process_btn_text}
                                                                    onChange={(e) => setData('home_process_btn_text', e.target.value)}
                                                                    placeholder="Pelajari 5 Tahap Proses Produksi"
                                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                                    Link URL Tombol
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.home_process_btn_link}
                                                                    onChange={(e) => setData('home_process_btn_link', e.target.value)}
                                                                    placeholder="/proses-produksi"
                                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* SECTION 2: OTHER SUBPAGES BANNER PREVIEW & INPUTS */}
                                    {!isHome && (
                                        <>
                                            {/* Live Preview Header Banner */}
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

                                            {/* Banner Text Inputs */}
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
                                        </>
                                    )}

                                    {/* SECTION 3: YOUTUBE VIDEO LINK (FOR ANY PAGE) */}
                                    <div className="pt-6 border-t border-slate-200 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Video className="w-5 h-5 text-rose-600" />
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                                                    Link Video YouTube Menu {page.name} (Opsional &bull; Autoplay)
                                                </label>
                                            </div>
                                            {data[videoKey] && (
                                                <button
                                                    type="button"
                                                    onClick={() => setData(videoKey, '')}
                                                    className="text-xs font-bold text-rose-600 hover:text-rose-800"
                                                >
                                                    Hapus Video
                                                </button>
                                            )}
                                        </div>

                                        <p className="text-xs text-slate-500">
                                            Masukkan URL video YouTube khusus untuk menu <strong>{page.name}</strong> (misal: <code>https://www.youtube.com/watch?v=...</code> atau <code>https://youtu.be/...</code>). Video akan disematkan di halaman ini secara otomatis (autoplay muted). Kosongkan jika ingin menggunakan tampilan standar.
                                        </p>

                                        <input
                                            type="text"
                                            value={data[videoKey] || ''}
                                            onChange={(e) => setData(videoKey, e.target.value)}
                                            placeholder="Contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono"
                                        />

                                        {/* Live YouTube Preview if valid URL */}
                                        {data[videoKey] && getYouTubeVideoId(data[videoKey]) && (
                                            <div className="space-y-2 pt-2">
                                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                                                    <Play className="w-3.5 h-3.5 fill-emerald-700" />
                                                    <span>Live Preview Pemutar Video YouTube:</span>
                                                </div>
                                                <div className="max-w-xl">
                                                    <YouTubeEmbed url={data[videoKey]} title={`Preview Video ${page.name}`} />
                                                </div>
                                            </div>
                                        )}
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
                            <span>{processing ? 'Menyimpan Semua Banner...' : 'Simpan Seluruh Banner & Foto Beranda'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
