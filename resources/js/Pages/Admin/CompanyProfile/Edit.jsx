import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    Save, CheckCircle2, Building2, User, Target, Quote, 
    Sparkles, Calendar, DollarSign, Users, Award, LayoutTemplate, 
    Image as ImageIcon, Plus, Trash2, Globe, Factory, MapPin, 
    Video, ShieldCheck, ArrowRight, Layers
} from 'lucide-react';

export default function AdminCompanyProfileEdit({ profile = {}, settings = {} }) {
    // Default initial timeline
    const defaultTimeline = [
        { year: '1952', event: 'Didirikan sebagai Sugiyama Metal Works di Kota Yatomi, Prefektur Aichi, Jepang. Memulai produksi massal komponen penempaan dingin.' },
        { year: '1975', event: 'Mengadopsi mesin cold former multi-station berkecepatan tinggi dan fokus pada komponen powertrain otomotif.' },
        { year: '1998', event: 'Meraih sertifikasi Sistem Manajemen Mutu ISO 9001.' },
        { year: '2012', event: 'Mendirikan pabrik anak perusahaan PT. Sugiyama Indonesia di Kawasan Industri GIIC Cikarang.' },
        { year: '2020', event: 'Meraih sertifikasi standar otomotif internasional IATF 16949:2016.' },
        { year: '2025', event: 'Ekspansi lini produksi khusus terminal tembaga inverter EV dan shaft pinion transmisi presisi.' }
    ];

    const initialTimeline = (Array.isArray(profile.history_timeline) && profile.history_timeline.length > 0)
        ? profile.history_timeline
        : defaultTimeline;

    // Default initial branches
    const defaultBranches = [
        { name: 'Kantor Pusat & Pabrik Aichi (Jepang)', role: 'Pusat Riset, Pengembangan & Cetakan', address: '〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan' },
        { name: 'Pabrik Indonesia (PT. Sugiyama Indonesia)', role: 'Pabrik Produksi Massal & Pemesinan Presisi ASEAN', address: 'Kawasan Industri GIIC Blok AA-12, Kota Deltamas, Cikarang Pusat, Bekasi 17530, Indonesia' }
    ];

    const initialBranches = (Array.isArray(profile.branches) && profile.branches.length > 0)
        ? profile.branches
        : defaultBranches;

    const { data, setData, processing, recentlySuccessful, errors } = useForm({
        // Section 1: Header Banner & Quick Highlights
        about_hero_badge: settings.about_hero_badge || 'TENTANG KAMI / 会社概要',
        about_hero_title: settings.about_hero_title || 'Keahlian Presisi Jepang Berstandar Global',
        about_hero_lead: settings.about_hero_lead || 'Sejak didirikan pada tahun 1952 di Aichi, Jepang, PT. Sugiyama Indonesia (Sugiyama Group) terus menempa batas inovasi teknik penempaan dingin dan komponen presisi berstandar mutu otomotif global.',
        about_hero_video: settings.about_hero_video || '',
        about_stat1_label: settings.about_stat1_label || 'Berdiri',
        about_stat1_value: settings.about_stat1_value || '1952 (70+ Thn)',
        about_stat2_label: settings.about_stat2_label || 'Sertifikasi',
        about_stat2_value: settings.about_stat2_value || 'IATF 16949',
        about_stat3_label: settings.about_stat3_label || 'Karyawan',
        about_stat3_value: settings.about_stat3_value || '280 Grup',
        about_stat4_label: settings.about_stat4_label || 'Lokasi Hub',
        about_stat4_value: settings.about_stat4_value || 'GIIC Cikarang',

        // Section 2: Sambutan Presiden Direktur & Showcase Pabrik
        about_president_badge: settings.about_president_badge || 'PESAN KEPEMIMPINAN / 代表挨拶',
        about_president_title: settings.about_president_title || 'Komitmen Presisi Tanpa Kompromi & Semangat Kaizen',
        about_president_role: settings.about_president_role || 'Presiden Direktur PT. Sugiyama Indonesia',
        about_president_tag: settings.about_president_tag || 'Sugiyama Group Executive',
        president_name: profile.president_name || 'Takeshi Sugiyama',
        president_message: profile.president_message || 'Sejak didirikan pada tahun 1952, Sugiyama Precision terus berkomitmen menempa batas kemampuan teknik manufaktur. Di era elektrifikasi kendaraan dan otomasi cerdas saat ini, dedikasi kami terhadap toleransi mikron, integritas metalurgi, dan inovasi ramah lingkungan tetap menjadi fondasi kepercayaan mitra global kami di Jepang, Asia Tenggara, dan seluruh dunia.',
        president_photo: null,
        president_photo_url: profile.president_photo_url || '',

        // Showcase Visual Fasilitas
        home_about_image: null,
        home_about_badge_quality: settings.home_about_badge_quality || 'IATF 16949 & ISO 9001',
        home_about_badge_heritage: settings.home_about_badge_heritage || 'Aichi, Jepang',
        home_about_plant_title: settings.home_about_plant_title || 'Pabrik & Kantor GIIC Cikarang',
        home_about_plant_subtitle: settings.home_about_plant_subtitle || 'Greenland International Industrial Center (GIIC)',
        home_about_plant_tag: settings.home_about_plant_tag || 'ASEAN Hub',

        // Section 3: Filosofi, Visi & Misi
        about_pillar_badge: settings.about_pillar_badge || 'FILOSOFI & NILAI KORPORAT / 企業理念',
        about_pillar_title: settings.about_pillar_title || 'Fondasi Integritas, Penguasaan Teknologi & Masa Depan',
        about_pillar_subtitle: settings.about_pillar_subtitle || 'Tiga pilar filosofis yang memandu setiap langkah rekayasa presisi, manufaktur zero-defect, dan kepuasan pelanggan global.',
        philosophy: profile.philosophy || 'Menempa kualitas terbaik melalui penguasaan teknologi, dedikasi karyawan, dan kepuasan pelanggan yang berkelanjutan.',
        vision: profile.vision || 'Menjadi tolok ukur global dalam teknologi penempaan dingin dan komponen presisi masa depan.',
        mission: profile.mission || 'Menghadirkan produk presisi bernilai tambah tinggi dengan efisiensi sumber daya maksimal.',

        // Section 4: Data Legalitas Perusahaan (Factsheet)
        company_name: profile.company_name || 'PT. Sugiyama Indonesia',
        company_name_jp: profile.company_name_jp || '株式会社スギヤマ',
        capital: profile.capital || '50,000,000 JPY',
        established_date: profile.established_date || 'Maret 1952',
        employees_count: profile.employees_count || '280 Karyawan (Total Grup)',
        factsheet_certifications: settings.factsheet_certifications || 'IATF 16949:2016 & ISO 9001:2015',
        factsheet_business_scope: settings.factsheet_business_scope || 'Cold Forging & CNC Precision Machining',

        // Section 5 & 6: Dynamic Repeaters
        history_timeline: initialTimeline,
        branches: initialBranches,

        // Section 7: CTA Banner Penutup
        about_cta_badge: settings.about_cta_badge || 'KOLABORASI & KONSULTASI / お問い合わせ',
        about_cta_title: settings.about_cta_title || 'Siap Memulai Proyek Manufaktur Presisi Anda?',
        about_cta_lead: settings.about_cta_lead || 'Diskusikan kebutuhan penempaan dingin, evaluasi gambar teknik 3D CAD, atau jadwalkan kunjungan ke fasilitas pabrik kami di GIIC Cikarang.',
        about_cta_btn1_text: settings.about_cta_btn1_text || 'Minta Penawaran (RFQ)',
        about_cta_btn1_link: settings.about_cta_btn1_link || '/kontak?type=rfq',
        about_cta_btn2_text: settings.about_cta_btn2_text || 'Hubungi Kami',
        about_cta_btn2_link: settings.about_cta_btn2_link || '/kontak',
    });

    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [previewPlantPhoto, setPreviewPlantPhoto] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('president_photo', file);
            setPreviewPhoto(URL.createObjectURL(file));
        }
    };

    const handlePlantPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('home_about_image', file);
            setPreviewPlantPhoto(URL.createObjectURL(file));
        }
    };

    // Timeline Repeater Handlers
    const handleAddTimeline = () => {
        setData('history_timeline', [
            ...data.history_timeline,
            { year: new Date().getFullYear().toString(), event: 'Pencapaian atau milestone baru perusahaan...' }
        ]);
    };

    const handleUpdateTimeline = (index, field, value) => {
        const updated = [...data.history_timeline];
        updated[index] = { ...updated[index], [field]: value };
        setData('history_timeline', updated);
    };

    const handleRemoveTimeline = (index) => {
        const updated = data.history_timeline.filter((_, i) => i !== index);
        setData('history_timeline', updated);
    };

    // Branches Repeater Handlers
    const handleAddBranch = () => {
        setData('branches', [
            ...data.branches,
            { name: 'Nama Fasilitas / Pabrik Baru', role: 'Fasilitas Manufaktur', address: 'Alamat lengkap fasilitas atau pabrik...' }
        ]);
    };

    const handleUpdateBranch = (index, field, value) => {
        const updated = [...data.branches];
        updated[index] = { ...updated[index], [field]: value };
        setData('branches', updated);
    };

    const handleRemoveBranch = (index) => {
        const updated = data.branches.filter((_, i) => i !== index);
        setData('branches', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/admin/company-profile', {
            _method: 'PUT',
            ...data,
        }, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Kelola Lengkap Halaman Tentang Kami & Profil">
            <Head title="Kelola Profil Perusahaan & Tentang Kami | Sugiyama CMS" />

            <div className="max-w-5xl mx-auto space-y-8 pb-16">
                {/* Top Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <Building2 className="w-6 h-6 text-emerald-600" />
                            <span>Konten Dinamis Halaman Tentang Kami</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Ubah seluruh teks, gambar, kutipan presiden, 3 pilar filosofi, milestone sejarah, dan cabang global secara langsung.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/tentang-kami"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
                        >
                            <span>Lihat Halaman Publik</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Semua'}</span>
                        </button>
                    </div>
                </div>

                {recentlySuccessful && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm font-semibold flex items-center gap-3 shadow-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Seluruh perubahan konten halaman Tentang Kami berhasil disimpan dan langsung aktif live!</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* ========================================================================= */}
                    {/* SECTION 1: BANNER HEADER & 4 METRIK KILAS CEPAT */}
                    {/* ========================================================================= */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center gap-2.5">
                            <LayoutTemplate className="w-5 h-5 text-emerald-700" />
                            <div>
                                <h2 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                    1. Banner Header & 4 Metrik Kilas Cepat
                                </h2>
                                <p className="text-xs text-emerald-700 font-normal">
                                    Atur judul utama, deskripsi pengantar, video YouTube, dan 4 kartu angka sorotan di bawah banner.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Badge Kecil Atas
                                    </label>
                                    <input
                                        type="text"
                                        value={data.about_hero_badge}
                                        onChange={(e) => setData('about_hero_badge', e.target.value)}
                                        placeholder="TENTANG KAMI / 会社概要"
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
                                        value={data.about_hero_title}
                                        onChange={(e) => setData('about_hero_title', e.target.value)}
                                        placeholder="Keahlian Presisi Jepang Berstandar Global"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Teks Pengantar / Deskripsi Banner
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.about_hero_lead}
                                    onChange={(e) => setData('about_hero_lead', e.target.value)}
                                    placeholder="Tuliskan teks deskripsi pengantar di bawah judul..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <Video className="w-3.5 h-3.5 text-rose-600" />
                                    <span>Link Video YouTube (Opsional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.about_hero_video}
                                    onChange={(e) => setData('about_hero_video', e.target.value)}
                                    placeholder="Contoh: https://www.youtube.com/watch?v=..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono"
                                />
                            </div>

                            {/* 4 Quick Highlights */}
                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                                    4 Kotak Metrik Kilas Cepat (Quick Highlights di Bawah Banner)
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                        <input
                                            type="text"
                                            value={data.about_stat1_label}
                                            onChange={(e) => setData('about_stat1_label', e.target.value)}
                                            placeholder="Label 1 (misal: Berdiri)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-emerald-800"
                                        />
                                        <input
                                            type="text"
                                            value={data.about_stat1_value}
                                            onChange={(e) => setData('about_stat1_value', e.target.value)}
                                            placeholder="Nilai 1 (misal: 1952 (70+ Thn))"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-black text-slate-900"
                                        />
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                        <input
                                            type="text"
                                            value={data.about_stat2_label}
                                            onChange={(e) => setData('about_stat2_label', e.target.value)}
                                            placeholder="Label 2 (misal: Sertifikasi)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-emerald-800"
                                        />
                                        <input
                                            type="text"
                                            value={data.about_stat2_value}
                                            onChange={(e) => setData('about_stat2_value', e.target.value)}
                                            placeholder="Nilai 2 (misal: IATF 16949)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-black text-slate-900"
                                        />
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                        <input
                                            type="text"
                                            value={data.about_stat3_label}
                                            onChange={(e) => setData('about_stat3_label', e.target.value)}
                                            placeholder="Label 3 (misal: Karyawan)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-emerald-800"
                                        />
                                        <input
                                            type="text"
                                            value={data.about_stat3_value}
                                            onChange={(e) => setData('about_stat3_value', e.target.value)}
                                            placeholder="Nilai 3 (misal: 280 Grup)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-black text-slate-900"
                                        />
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                        <input
                                            type="text"
                                            value={data.about_stat4_label}
                                            onChange={(e) => setData('about_stat4_label', e.target.value)}
                                            placeholder="Label 4 (misal: Lokasi Hub)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-emerald-800"
                                        />
                                        <input
                                            type="text"
                                            value={data.about_stat4_value}
                                            onChange={(e) => setData('about_stat4_value', e.target.value)}
                                            placeholder="Nilai 4 (misal: GIIC Cikarang)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-black text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========================================================================= */}
                    {/* SECTION 2: SAMBUTAN PRESIDEN DIREKTUR & SHOWCASE FASILITAS PABRIK */}
                    {/* ========================================================================= */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center gap-2.5">
                            <User className="w-5 h-5 text-emerald-700" />
                            <div>
                                <h2 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                    2. Sambutan Presiden Direktur & Showcase Fasilitas Pabrik
                                </h2>
                                <p className="text-xs text-emerald-700 font-normal">
                                    Ubah teks kutipan kata sambutan kepemimpinan, profil presiden, serta foto dan lencana fasilitas pabrik.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Badge Bagian Sambutan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.about_president_badge}
                                        onChange={(e) => setData('about_president_badge', e.target.value)}
                                        placeholder="PESAN KEPEMIMPINAN / 代表挨拶"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Judul Bagian Sambutan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.about_president_title}
                                        onChange={(e) => setData('about_president_title', e.target.value)}
                                        placeholder="Komitmen Presisi Tanpa Kompromi & Semangat Kaizen"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                                <div className="md:col-span-8 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                Nama Lengkap Presiden Direktur <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.president_name}
                                                onChange={(e) => setData('president_name', e.target.value)}
                                                placeholder="Takeshi Sugiyama"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-slate-900"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                Jabatan Resmi
                                            </label>
                                            <input
                                                type="text"
                                                value={data.about_president_role}
                                                onChange={(e) => setData('about_president_role', e.target.value)}
                                                placeholder="Presiden Direktur PT. Sugiyama Indonesia"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                            Teks Kutipan / Sambutan Presiden Direktur <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            rows="5"
                                            value={data.president_message}
                                            onChange={(e) => setData('president_message', e.target.value)}
                                            placeholder="Tuliskan pesan kutipan atau sambutan kepemimpinan..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-4 space-y-3">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Foto Avatar Presiden
                                    </label>

                                    <div className="w-full aspect-4/3 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden relative shadow-md flex items-center justify-center">
                                        {previewPhoto ? (
                                            <img src={previewPhoto} alt="Preview Baru" className="w-full h-full object-cover" />
                                        ) : data.president_photo_url ? (
                                            <img 
                                                src={data.president_photo_url} 
                                                alt="Foto Saat Ini" 
                                                className="w-full h-full object-cover" 
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <span className="text-xs text-slate-400">Belum Ada Foto</span>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={handlePhotoChange}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer shadow-xs"
                                    />
                                </div>
                            </div>

                            {/* Showcase Visual Controls */}
                            <div className="pt-6 border-t border-slate-200 space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                                    Kartu Showcase Fasilitas Pabrik (Sebelah Kanan Pesan Presiden)
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                    <div className="md:col-span-4 space-y-2">
                                        <div className="w-full aspect-4/3 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden relative shadow-md flex items-center justify-center">
                                            {previewPlantPhoto ? (
                                                <img src={previewPlantPhoto} alt="Preview Pabrik" className="w-full h-full object-cover" />
                                            ) : settings.home_about_image ? (
                                                <img src={settings.home_about_image} alt="Pabrik Saat Ini" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs text-slate-400">Foto Standar</span>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            onChange={handlePlantPhotoChange}
                                            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer shadow-xs"
                                        />
                                    </div>

                                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Badge Standar Mutu</label>
                                            <input
                                                type="text"
                                                value={data.home_about_badge_quality}
                                                onChange={(e) => setData('home_about_badge_quality', e.target.value)}
                                                placeholder="IATF 16949 & ISO 9001"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Badge Sejak 1952</label>
                                            <input
                                                type="text"
                                                value={data.home_about_badge_heritage}
                                                onChange={(e) => setData('home_about_badge_heritage', e.target.value)}
                                                placeholder="Aichi, Jepang"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Judul Fasilitas Pabrik</label>
                                            <input
                                                type="text"
                                                value={data.home_about_plant_title}
                                                onChange={(e) => setData('home_about_plant_title', e.target.value)}
                                                placeholder="Pabrik & Kantor GIIC Cikarang"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Tag Label Pabrik</label>
                                            <input
                                                type="text"
                                                value={data.home_about_plant_tag}
                                                onChange={(e) => setData('home_about_plant_tag', e.target.value)}
                                                placeholder="ASEAN Hub"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========================================================================= */}
                    {/* SECTION 3: FILOSOFI, VISI & MISI KORPORAT (3 PILAR) */}
                    {/* ========================================================================= */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Target className="w-5 h-5 text-emerald-600" />
                            <div>
                                <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                    3. Tiga Pilar Filosofi, Visi & Misi Korporat
                                </h2>
                                <p className="text-xs text-slate-500 font-normal">
                                    Kelola teks filosofi perusahaan, visi masa depan, dan misi strategis.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Badge Bagian Pilar
                                    </label>
                                    <input
                                        type="text"
                                        value={data.about_pillar_badge}
                                        onChange={(e) => setData('about_pillar_badge', e.target.value)}
                                        placeholder="FILOSOFI & NILAI KORPORAT / 企業理念"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Judul Bagian Pilar
                                    </label>
                                    <input
                                        type="text"
                                        value={data.about_pillar_title}
                                        onChange={(e) => setData('about_pillar_title', e.target.value)}
                                        placeholder="Fondasi Integritas, Penguasaan Teknologi & Masa Depan"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>1. Filosofi Perusahaan (企業理念)</span>
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.philosophy}
                                    onChange={(e) => setData('philosophy', e.target.value)}
                                    placeholder="Menempa kualitas terbaik melalui penguasaan teknologi..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                        <Globe className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>2. Visi Global (ビジョン)</span>
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={data.vision}
                                        onChange={(e) => setData('vision', e.target.value)}
                                        placeholder="Menjadi tolok ukur global dalam teknologi penempaan dingin..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>3. Misi Strategis (ミッション)</span>
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={data.mission}
                                        onChange={(e) => setData('mission', e.target.value)}
                                        placeholder="Menghadirkan produk presisi bernilai tambah tinggi..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========================================================================= */}
                    {/* SECTION 4: DATA LEGALITAS & RINGKASAN PERUSAHAAN (FACTSHEET) */}
                    {/* ========================================================================= */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Building2 className="w-5 h-5 text-emerald-600" />
                            <div>
                                <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                    4. Data Legalitas & Ringkasan Korporat (Factsheet / 会社概要)
                                </h2>
                                <p className="text-xs text-slate-500 font-normal">
                                    Ubah 6 kartu data resmi perusahaan yang tampil pada bagian Ringkasan Data Perusahaan.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Resmi Perusahaan (Indonesia) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="PT. Sugiyama Indonesia"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-slate-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Perusahaan Bahasa Jepang (Kanji)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.company_name_jp}
                                        onChange={(e) => setData('company_name_jp', e.target.value)}
                                        placeholder="株式会社スギヤマ"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-jp font-bold text-slate-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Tahun Pendirian (Established Date)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.established_date}
                                        onChange={(e) => setData('established_date', e.target.value)}
                                        placeholder="Maret 1952"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Modal Dasar (Capital)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.capital}
                                        onChange={(e) => setData('capital', e.target.value)}
                                        placeholder="50,000,000 JPY"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Jumlah Tenaga Kerja (Karyawan)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.employees_count}
                                        onChange={(e) => setData('employees_count', e.target.value)}
                                        placeholder="280 Karyawan (Total Grup)"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Standar Sertifikasi Mutu
                                    </label>
                                    <input
                                        type="text"
                                        value={data.factsheet_certifications}
                                        onChange={(e) => setData('factsheet_certifications', e.target.value)}
                                        placeholder="IATF 16949:2016 & ISO 9001:2015"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Bidang Usaha & Manufaktur Inti
                                    </label>
                                    <input
                                        type="text"
                                        value={data.factsheet_business_scope}
                                        onChange={(e) => setData('factsheet_business_scope', e.target.value)}
                                        placeholder="Cold Forging & CNC Precision Machining"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========================================================================= */}
                    {/* SECTION 5: SEJARAH & MILESTONE PERKEMBANGAN (REPEATER) */}
                    {/* ========================================================================= */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5">
                                <Calendar className="w-5 h-5 text-emerald-700" />
                                <div>
                                    <h2 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                        5. Sejarah & Milestone Perkembangan (Timeline)
                                    </h2>
                                    <p className="text-xs text-emerald-700 font-normal">
                                        Tambah, edit, atau hapus tonggak sejarah pencapaian perusahaan.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddTimeline}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Tambah Milestone</span>
                            </button>
                        </div>

                        <div className="p-6 sm:p-8 space-y-4">
                            {data.history_timeline.map((item, index) => (
                                <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
                                        {index + 1}
                                    </div>

                                    <div className="w-full sm:w-32 shrink-0">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tahun</label>
                                        <input
                                            type="text"
                                            value={item.year}
                                            onChange={(e) => handleUpdateTimeline(index, 'year', e.target.value)}
                                            placeholder="1952"
                                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-black font-mono text-emerald-800 bg-white"
                                        />
                                    </div>

                                    <div className="w-full flex-1">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Narasi Pencapaian / Milestone</label>
                                        <input
                                            type="text"
                                            value={item.event}
                                            onChange={(e) => handleUpdateTimeline(index, 'event', e.target.value)}
                                            placeholder="Tuliskan peristiwa sejarah penting pada tahun tersebut..."
                                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTimeline(index)}
                                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer self-end sm:self-center"
                                        title="Hapus Milestone Ini"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            {data.history_timeline.length === 0 && (
                                <div className="text-center py-8 text-slate-400 text-xs font-medium border-2 border-dashed border-slate-200 rounded-2xl">
                                    Belum ada milestone sejarah. Klik tombol "Tambah Milestone" di atas.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ========================================================================= */}
                    {/* SECTION 6: JARINGAN PABRIK & FASILITAS GLOBAL (REPEATER) */}
                    {/* ========================================================================= */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5">
                                <Factory className="w-5 h-5 text-emerald-700" />
                                <div>
                                    <h2 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                        6. Jaringan Pabrik & Fasilitas Global (Branches)
                                    </h2>
                                    <p className="text-xs text-emerald-700 font-normal">
                                        Kelola lokasi pabrik, kantor pusat, pusat riset, atau cabang internasional.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddBranch}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Tambah Fasilitas</span>
                            </button>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            {data.branches.map((branch, index) => (
                                <div key={index} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                                                {index + 1}
                                            </span>
                                            <span className="font-bold text-xs text-slate-700">Fasilitas #{index + 1}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveBranch(index)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                            title="Hapus Fasilitas Ini"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nama Fasilitas / Pabrik</label>
                                            <input
                                                type="text"
                                                value={branch.name}
                                                onChange={(e) => handleUpdateBranch(index, 'name', e.target.value)}
                                                placeholder="Contoh: Kantor Pusat & Pabrik Aichi (Jepang)"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Peran / Fungsi Fasilitas (Role)</label>
                                            <input
                                                type="text"
                                                value={branch.role}
                                                onChange={(e) => handleUpdateBranch(index, 'role', e.target.value)}
                                                placeholder="Contoh: Pusat Riset, Pengembangan & Cetakan"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-emerald-800 bg-white"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Alamat Lengkap</label>
                                            <textarea
                                                rows="2"
                                                value={branch.address}
                                                onChange={(e) => handleUpdateBranch(index, 'address', e.target.value)}
                                                placeholder="Alamat lengkap jalan, kota, provinsi, dan kode pos..."
                                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {data.branches.length === 0 && (
                                <div className="text-center py-8 text-slate-400 text-xs font-medium border-2 border-dashed border-slate-200 rounded-2xl">
                                    Belum ada cabang atau fasilitas. Klik tombol "Tambah Fasilitas" di atas.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ========================================================================= */}
                    {/* SECTION 7: BANNER PENUTUP RFQ & KOLABORASI */}
                    {/* ========================================================================= */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Sparkles className="w-5 h-5 text-emerald-600" />
                            <div>
                                <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                    7. Banner Penutup Kolaborasi & Permintaan RFQ
                                </h2>
                                <p className="text-xs text-slate-500 font-normal">
                                    Ubah judul ajakan, teks keterangan, serta label dan tautan tombol di bagian bawah halaman.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Badge Atas
                                    </label>
                                    <input
                                        type="text"
                                        value={data.about_cta_badge}
                                        onChange={(e) => setData('about_cta_badge', e.target.value)}
                                        placeholder="KOLABORASI & KONSULTASI / お問い合わせ"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Judul Utama Ajakan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.about_cta_title}
                                        onChange={(e) => setData('about_cta_title', e.target.value)}
                                        placeholder="Siap Memulai Proyek Manufaktur Presisi Anda?"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Teks Keterangan Ajakan
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.about_cta_lead}
                                    onChange={(e) => setData('about_cta_lead', e.target.value)}
                                    placeholder="Diskusikan kebutuhan penempaan dingin, evaluasi gambar teknik..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                                    <span className="font-bold text-xs text-slate-700 uppercase">Tombol Utama (Hijau)</span>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Teks Tombol</label>
                                        <input
                                            type="text"
                                            value={data.about_cta_btn1_text}
                                            onChange={(e) => setData('about_cta_btn1_text', e.target.value)}
                                            placeholder="Minta Penawaran (RFQ)"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tautan URL</label>
                                        <input
                                            type="text"
                                            value={data.about_cta_btn1_link}
                                            onChange={(e) => setData('about_cta_btn1_link', e.target.value)}
                                            placeholder="/kontak?type=rfq"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                                    <span className="font-bold text-xs text-slate-700 uppercase">Tombol Sekunder (Transparan)</span>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Teks Tombol</label>
                                        <input
                                            type="text"
                                            value={data.about_cta_btn2_text}
                                            onChange={(e) => setData('about_cta_btn2_text', e.target.value)}
                                            placeholder="Hubungi Kami"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tautan URL</label>
                                        <input
                                            type="text"
                                            value={data.about_cta_btn2_link}
                                            onChange={(e) => setData('about_cta_btn2_link', e.target.value)}
                                            placeholder="/kontak"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-lg sticky bottom-4 z-20">
                        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                            Pastikan seluruh perubahan telah sesuai sebelum menyimpan.
                        </span>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-lg shadow-emerald-900/15 hover:shadow-xl transition-all cursor-pointer disabled:opacity-50 w-full sm:w-auto"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan Semua...' : 'Simpan Seluruh Profil & Halaman Tentang Kami'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
