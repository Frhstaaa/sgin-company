import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Save, CheckCircle2, Building2, User, Target, Quote, Sparkles, Calendar, DollarSign, Users, Award } from 'lucide-react';

export default function AdminCompanyProfileEdit({ profile = {} }) {
    const { data, setData, put, processing, recentlySuccessful, errors } = useForm({
        company_name: profile.company_name || '',
        company_name_jp: profile.company_name_jp || '',
        president_name: profile.president_name || '',
        president_message: profile.president_message || '',
        president_photo: null,
        president_photo_url: profile.president_photo_url || '',
        philosophy: profile.philosophy || '',
        vision: profile.vision || '',
        mission: profile.mission || '',
        capital: profile.capital || '',
        established_date: profile.established_date || '',
        employees_count: profile.employees_count || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/admin/company-profile', {
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
                            <span>Informasi Profil Korporat</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Kelola data legalitas, sejarah berdiri, pesan presiden direktur, serta visi & misi PT. Sugiyama Indonesia.
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
                        <span>Data profil perusahaan berhasil disimpan dan diperbarui di website publik!</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Nama Resmi Perusahaan */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Building2 className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                1. Identitas & Nama Resmi Perusahaan
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Perusahaan (Bahasa Indonesia / Internasional) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="Contoh: PT. Sugiyama Indonesia"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                    {errors.company_name && <p className="text-xs text-rose-500 mt-1.5">{errors.company_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Perusahaan (Jepang / Kanji)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.company_name_jp}
                                        onChange={(e) => setData('company_name_jp', e.target.value)}
                                        placeholder="Contoh: 株式会社スギヤマ"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium font-jp"
                                    />
                                    {errors.company_name_jp && <p className="text-xs text-rose-500 mt-1.5">{errors.company_name_jp}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Data Skala & Legalitas */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Award className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                2. Data Skala & Tonggak Korporat
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                                        <span>Modal Dasar</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.capital}
                                        onChange={(e) => setData('capital', e.target.value)}
                                        placeholder="50,000,000 JPY (¥50 Juta)"
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
                                        placeholder="280 Karyawan (Global Group)"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Pimpinan & Pesan Direktur */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <User className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                3. Pimpinan & Sambutan Presiden Direktur
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Presiden & CEO
                                    </label>
                                    <input
                                        type="text"
                                        value={data.president_name}
                                        onChange={(e) => setData('president_name', e.target.value)}
                                        placeholder="Contoh: Takeshi Sugiyama"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Foto Presiden Direktur (URL Foto)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.president_photo_url}
                                        onChange={(e) => setData('president_photo_url', e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <Quote className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Pesan Sambutan Presiden Direktur</span>
                                </label>
                                <textarea
                                    rows="5"
                                    value={data.president_message}
                                    onChange={(e) => setData('president_message', e.target.value)}
                                    placeholder="Tuliskan pesan komitmen mutu dan sambutan pimpinan..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Filosofi, Visi & Misi */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Target className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                4. Filosofi Korporat, Visi & Misi
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Filosofi Korporat</span>
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.philosophy}
                                    onChange={(e) => setData('philosophy', e.target.value)}
                                    placeholder="Contoh: Menempa kualitas terbaik melalui penguasaan teknologi..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                                        🎯 Visi Perusahaan
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={data.vision}
                                        onChange={(e) => setData('vision', e.target.value)}
                                        placeholder="Visi masa depan perusahaan..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                    />
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                                        🚀 Misi Perusahaan
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={data.mission}
                                        onChange={(e) => setData('mission', e.target.value)}
                                        placeholder="Langkah strategis misi operasional..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
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
                            <span>{processing ? 'Menyimpan Perubahan...' : 'Simpan Seluruh Perubahan Profil'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
