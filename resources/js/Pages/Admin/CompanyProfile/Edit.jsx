import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Save, CheckCircle2, Building2, User, Target, Quote, Sparkles, Calendar, DollarSign, Users, Award, LayoutTemplate, Image as ImageIcon } from 'lucide-react';

export default function AdminCompanyProfileEdit({ profile = {}, settings = {} }) {
    const { data, setData, processing, recentlySuccessful, errors } = useForm({
        // Header Banner Section
        about_hero_badge: settings.about_hero_badge || 'TENTANG KAMI / 会社概要',
        about_hero_title: settings.about_hero_title || 'Keahlian Presisi Jepang Berstandar Global',
        about_hero_lead: settings.about_hero_lead || 'Sejak didirikan pada tahun 1952 di Aichi, Jepang, PT. Sugiyama Indonesia (Sugiyama Group) terus menempa batas inovasi teknik penempaan dingin.',
        
        // Company Details
        company_name: profile.company_name || 'PT. Sugiyama Indonesia',
        company_name_jp: profile.company_name_jp || '株式会社スギヤマ',
        capital: profile.capital || '50,000,000 JPY',
        established_date: profile.established_date || 'Maret 1952',
        employees_count: profile.employees_count || '280 Karyawan',

        // President Section
        president_name: profile.president_name || 'Takeshi Sugiyama',
        president_message: profile.president_message || 'Sejak didirikan pada tahun 1952, Sugiyama Precision terus berkomitmen menempa batas kemampuan teknik manufaktur. Di era elektrifikasi kendaraan dan otomasi cerdas saat ini, dedikasi kami terhadap toleransi mikron, integritas metalurgi, dan inovasi ramah lingkungan tetap menjadi fondasi kepercayaan mitra global kami di Jepang, Asia Tenggara, dan seluruh dunia.',
        president_photo: null,
        president_photo_url: profile.president_photo_url || '',

        // Philosophy & Visi Misi
        philosophy: profile.philosophy || 'Menempa kualitas terbaik melalui penguasaan teknologi, dedikasi karyawan, dan kepuasan pelanggan yang berkelanjutan.',
        vision: profile.vision || 'Menjadi tolok ukur global dalam teknologi penempaan dingin dan komponen presisi masa depan.',
        mission: profile.mission || 'Menghadirkan produk presisi bernilai tambah tinggi dengan efisiensi sumber daya maksimal.',
    });

    const [previewPhoto, setPreviewPhoto] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('president_photo', file);
            setPreviewPhoto(URL.createObjectURL(file));
        }
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
        <AdminLayout title="Profil & Filosofi Perusahaan">
            <Head title="Edit Profil Perusahaan | Sugiyama CMS" />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <Building2 className="w-6 h-6 text-emerald-600" />
                            <span>Informasi Profil Korporat & Banner</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Kelola judul banner header Tentang Kami, data legalitas perusahaan, pesan presiden direktur, serta filosofi visi & misi.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                    </button>
                </div>

                {recentlySuccessful && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm font-semibold flex items-center gap-3 shadow-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Data profil perusahaan dan banner header berhasil disimpan dan langsung aktif di website publik!</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 0: Header Banner Halaman Tentang Kami */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center gap-2.5">
                            <LayoutTemplate className="w-5 h-5 text-emerald-700" />
                            <div>
                                <h2 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                    1. Header Banner Halaman Tentang Kami (/tentang-kami)
                                </h2>
                                <p className="text-xs text-emerald-700 font-normal">
                                    Ubah teks badge hijau, judul utama, dan pengantar di bagian paling atas halaman.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Badge / Label Kecil Atas
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
                                    rows="3"
                                    value={data.about_hero_lead}
                                    onChange={(e) => setData('about_hero_lead', e.target.value)}
                                    placeholder="Sejak didirikan pada tahun 1952 di Aichi, Jepang..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Nama Resmi Perusahaan */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Building2 className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                2. Identitas & Data Legalitas Perusahaan
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Perusahaan (Bahasa Indonesia / Global) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="PT. Sugiyama Indonesia"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                    {errors.company_name && <p className="text-xs text-rose-500 mt-1.5">{errors.company_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Resmi Kanji Jepang
                                    </label>
                                    <input
                                        type="text"
                                        value={data.company_name_jp}
                                        onChange={(e) => setData('company_name_jp', e.target.value)}
                                        placeholder="株式会社スギヤマ"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium font-jp"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Tahun Berdiri</span>
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
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Modal Dasar (Capital)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.capital}
                                        onChange={(e) => setData('capital', e.target.value)}
                                        placeholder="50,000,000 JPY"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Jumlah Karyawan</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.employees_count}
                                        onChange={(e) => setData('employees_count', e.target.value)}
                                        placeholder="280 Karyawan"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Sambutan Presiden Direktur */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <User className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                3. Sambutan & Profil Presiden Direktur
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-8 space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                            Nama Lengkap Presiden Direktur <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.president_name}
                                            onChange={(e) => setData('president_name', e.target.value)}
                                            placeholder="Contoh: Takeshi Sugiyama"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-slate-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                            Teks Sambutan Presiden Direktur <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            rows="5"
                                            value={data.president_message}
                                            onChange={(e) => setData('president_message', e.target.value)}
                                            placeholder="Tuliskan pesan sambutan kepemimpinan..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-4 space-y-3">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Foto Presiden Direktur
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
                                    <p className="text-[11px] text-slate-500">
                                        Format JPG/PNG/WebP, maksimal 5MB.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Filosofi, Visi & Misi */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Target className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                4. Filosofi, Visi & Misi Korporat
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Filosofi Perusahaan</span>
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
                                        <Target className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Visi Perusahaan</span>
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
                                        <span>Misi Perusahaan</span>
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

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-lg shadow-emerald-900/15 hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan Perubahan...' : 'Simpan Seluruh Profil & Banner'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
