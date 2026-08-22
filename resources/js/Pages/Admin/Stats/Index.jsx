import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, BarChart3, Calendar, Globe, Cpu, Award } from 'lucide-react';

export default function AdminStatsIndex({ stats = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title_jp: '',
        title_id: '',
        value: '',
        unit: '',
        subtext: '',
        icon: 'calendar',
        order: 0,
    });

    const openCreateModal = () => {
        setEditingStat(null);
        reset();
        setData({
            title_jp: '',
            title_id: '',
            value: '',
            unit: '',
            subtext: '',
            icon: 'award',
            order: stats.length + 1,
        });
        setModalOpen(true);
    };

    const openEditModal = (st) => {
        setEditingStat(st);
        setData({
            title_jp: st.title_jp || '',
            title_id: st.title_id || '',
            value: st.value || '',
            unit: st.unit || '',
            subtext: st.subtext || '',
            icon: st.icon || 'calendar',
            order: st.order || 0,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingStat) {
            put(`/admin/stats/${editingStat.id}`, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/stats', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data statistik ini?')) {
            router.delete(`/admin/stats/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Statistik Perusahaan">
            <Head title="Kelola Statistik | Sugiyama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Statistik Kunci & Milestone</h3>
                        <p className="text-xs text-slate-500">Ubah nilai angka pencapaian (Tahun berdiri 1952, Jumlah basis operasional, Kapasitas produksi).</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Statistik</span>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Judul ID / JP</th>
                                <th className="px-6 py-4">Nilai & Satuan</th>
                                <th className="px-6 py-4">Keterangan Subteks</th>
                                <th className="px-6 py-4">Ikon</th>
                                <th className="px-6 py-4">Urutan</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {stats.map((st) => (
                                <tr key={st.id} className="hover:bg-slate-50/80">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{st.title_id}</p>
                                        <p className="text-[11px] text-emerald-700 font-jp">{st.title_jp}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-base font-extrabold text-emerald-800">{st.value}</span>{' '}
                                        <span className="text-xs font-bold text-slate-500">{st.unit}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {st.subtext || '-'}
                                    </td>
                                    <td className="px-6 py-4 font-mono font-bold text-slate-700">
                                        {st.icon}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        #{st.order}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(st)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(st.id)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
                    <div className="relative z-10 bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-extrabold text-base text-slate-900">
                                {editingStat ? 'Edit Statistik' : 'Tambah Statistik Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Judul ID <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title_id}
                                        onChange={(e) => setData('title_id', e.target.value)}
                                        placeholder="Tahun Berdiri"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Judul JP (Kanji)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title_jp}
                                        onChange={(e) => setData('title_jp', e.target.value)}
                                        placeholder="創業年"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-jp"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Nilai Angka / Teks <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.value}
                                        onChange={(e) => setData('value', e.target.value)}
                                        placeholder="1952 / 日本 3 海外 1"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-mono font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Satuan (Unit)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.unit}
                                        onChange={(e) => setData('unit', e.target.value)}
                                        placeholder="年 / 万個 / Unit"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Subteks Penjelasan
                                </label>
                                <input
                                    type="text"
                                    value={data.subtext}
                                    onChange={(e) => setData('subtext', e.target.value)}
                                    placeholder="Lebih dari 70 tahun dedikasi presisi"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Ikon
                                    </label>
                                    <select
                                        value={data.icon}
                                        onChange={(e) => setData('icon', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    >
                                        <option value="calendar">Calendar (Tahun)</option>
                                        <option value="globe">Globe (Cabang Global)</option>
                                        <option value="cpu">CPU / Gear (Produksi)</option>
                                        <option value="award">Award / Shield (Mutu)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Urutan
                                    </label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Statistik'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
