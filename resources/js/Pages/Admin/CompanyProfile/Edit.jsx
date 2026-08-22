import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Save, CheckCircle2, Building2 } from 'lucide-react';

export default function AdminCompanyProfileEdit({ profile }) {
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
        <AdminLayout title="Kelola Profil Perusahaan">
            <Head title="Edit Profil Perusahaan | Sugiyama CMS" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Profil & Filosofi Korporat</h3>
                    <p className="text-xs text-slate-500">Perbarui pesan presiden direktur, filosofi perusahaan, data modal, dan sejarah.</p>
                </div>

                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xs">
                    {recentlySuccessful && (
                        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span>Profil perusahaan berhasil diperbarui!</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Nama Perusahaan (EN/ID) <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Nama Perusahaan (Jepang / Kanji)
                                </label>
                                <input
                                    type="text"
                                    value={data.company_name_jp}
                                    onChange={(e) => setData('company_name_jp', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-jp"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Tahun Berdiri
                                </label>
                                <input
                                    type="text"
                                    value={data.established_date}
                                    onChange={(e) => setData('established_date', e.target.value)}
                                    placeholder="Maret 1952"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Modal Dasar
                                </label>
                                <input
                                    type="text"
                                    value={data.capital}
                                    onChange={(e) => setData('capital', e.target.value)}
                                    placeholder="50,000,000 JPY"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Jumlah Karyawan
                                </label>
                                <input
                                    type="text"
                                    value={data.employees_count}
                                    onChange={(e) => setData('employees_count', e.target.value)}
                                    placeholder="280 Karyawan"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Nama Presiden & CEO
                                </label>
                                <input
                                    type="text"
                                    value={data.president_name}
                                    onChange={(e) => setData('president_name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Foto Presiden (URL)
                                </label>
                                <input
                                    type="text"
                                    value={data.president_photo_url}
                                    onChange={(e) => setData('president_photo_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Pesan Presiden Direktur
                            </label>
                            <textarea
                                rows="4"
                                value={data.president_message}
                                onChange={(e) => setData('president_message', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Filosofi Korporat
                            </label>
                            <textarea
                                rows="2"
                                value={data.philosophy}
                                onChange={(e) => setData('philosophy', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Visi Perusahaan
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.vision}
                                    onChange={(e) => setData('vision', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Misi Perusahaan
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.mission}
                                    onChange={(e) => setData('mission', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                <Save className="w-4 h-4" />
                                <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
