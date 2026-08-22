import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Cpu } from 'lucide-react';

export default function AdminTechnologiesIndex({ technologies = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTech, setEditingTech] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        step_number: '01',
        title: '',
        title_jp: '',
        short_description: '',
        content: '',
        features: '',
        image: null,
        image_url: '',
        icon: 'cpu',
        order: 0,
        _method: 'POST',
    });

    const openCreateModal = () => {
        setEditingTech(null);
        reset();
        setData({
            step_number: `0${technologies.length + 1}`,
            title: '',
            title_jp: '',
            short_description: '',
            content: '',
            features: '',
            image: null,
            image_url: '',
            icon: 'cpu',
            order: technologies.length + 1,
            _method: 'POST',
        });
        setModalOpen(true);
    };

    const openEditModal = (t) => {
        setEditingTech(t);
        setData({
            step_number: t.step_number || '01',
            title: t.title || '',
            title_jp: t.title_jp || '',
            short_description: t.short_description || '',
            content: t.content || '',
            features: Array.isArray(t.features) ? t.features.join(', ') : '',
            image: null,
            image_url: t.image_url || '',
            icon: t.icon || 'cpu',
            order: t.order || 0,
            _method: 'PUT',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...data,
            features: typeof data.features === 'string' ? data.features.split(',').map(s => s.trim()).filter(Boolean) : data.features,
        };

        if (editingTech) {
            router.post(`/admin/technologies/${editingTech.id}`, payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/technologies', payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus teknologi ini?')) {
            router.delete(`/admin/technologies/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Pilar Teknologi">
            <Head title="Kelola Teknologi | Sugiyama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Pilar Teknologi & Inovasi (01, 02, 03)</h3>
                        <p className="text-xs text-slate-500">Kelola konten keunggulan teknologi (Desain, Pemrosesan Presisi, Kontrol Kualitas).</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Teknologi</span>
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Pilar</th>
                                <th className="px-6 py-4">Visual</th>
                                <th className="px-6 py-4">Judul Teknologi</th>
                                <th className="px-6 py-4">Deskripsi Singkat</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {technologies.map((t) => (
                                <tr key={t.id} className="hover:bg-slate-50/80">
                                    <td className="px-6 py-4 font-black text-emerald-800 text-base font-display">
                                        {t.step_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                            <img src={t.image_url} alt={t.title} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{t.title}</p>
                                        <p className="text-[11px] text-slate-400 font-jp">{t.title_jp}</p>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate">
                                        {t.short_description}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(t)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(t.id)}
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

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
                    <div className="relative z-10 bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-extrabold text-base text-slate-900">
                                {editingTech ? 'Edit Teknologi' : 'Tambah Teknologi Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Nomor Pilar <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.step_number}
                                        onChange={(e) => setData('step_number', e.target.value)}
                                        placeholder="01 / 02 / 03"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-display font-bold text-center"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Judul Teknologi <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Desain dan Pengembangan"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Judul Kanji Jepang
                                </label>
                                <input
                                    type="text"
                                    value={data.title_jp}
                                    onChange={(e) => setData('title_jp', e.target.value)}
                                    placeholder="設計・開発"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-jp"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Deskripsi Singkat (Tampil di Beranda) <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows="2"
                                    required
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Konten Detail Halaman
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Fitur Kunci (Pisahkan dengan koma)
                                </label>
                                <input
                                    type="text"
                                    value={data.features}
                                    onChange={(e) => setData('features', e.target.value)}
                                    placeholder="3D CAD/CAM Modeling, Forging Flow CAE, Die Tooling"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Upload Gambar
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-emerald-50 file:text-emerald-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Atau URL Gambar
                                    </label>
                                    <input
                                        type="text"
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
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
                                    Simpan Teknologi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
