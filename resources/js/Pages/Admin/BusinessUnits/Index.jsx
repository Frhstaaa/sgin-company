import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Briefcase } from 'lucide-react';

export default function AdminBusinessUnitsIndex({ businesses = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBiz, setEditingBiz] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        title_jp: '',
        description: '',
        content: '',
        tag: 'Core Capability',
        image: null,
        image_url: '',
        order: 0,
        _method: 'POST',
    });

    const openCreateModal = () => {
        setEditingBiz(null);
        reset();
        setData({
            title: '',
            title_jp: '',
            description: '',
            content: '',
            tag: 'Core Capability',
            image: null,
            image_url: '',
            order: businesses.length + 1,
            _method: 'POST',
        });
        setModalOpen(true);
    };

    const openEditModal = (b) => {
        setEditingBiz(b);
        setData({
            title: b.title || '',
            title_jp: b.title_jp || '',
            description: b.description || '',
            content: b.content || '',
            tag: b.tag || 'Core Capability',
            image: null,
            image_url: b.image_url || '',
            order: b.order || 0,
            _method: 'PUT',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBiz) {
            router.post(`/admin/business-units/${editingBiz.id}`, data, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/business-units', data, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus unit bisnis ini?')) {
            router.delete(`/admin/business-units/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Unit Bisnis">
            <Head title="Kelola Unit Bisnis | Sugiyama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Daftar 3 Unit Bisnis</h3>
                        <p className="text-xs text-slate-500">Kelola unit bisnis Penempaan Dingin, Pemotongan CNC, dan Bisnis AV / 3D Printing.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Unit Bisnis</span>
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Visual</th>
                                <th className="px-6 py-4">Judul Bisnis</th>
                                <th className="px-6 py-4">Tag / Kategori</th>
                                <th className="px-6 py-4">Deskripsi</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {businesses.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-50/80">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                            <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{b.title}</p>
                                        <p className="text-[11px] text-slate-400 font-jp">{b.title_jp}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                            {b.tag || 'Business'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate">
                                        {b.description}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(b)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(b.id)}
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
                                {editingBiz ? 'Edit Unit Bisnis' : 'Tambah Unit Bisnis'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Judul Bisnis <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Penempaan dingin"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
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
                                        placeholder="冷間鍛造"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-jp"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Label Tag Badge
                                </label>
                                <input
                                    type="text"
                                    value={data.tag}
                                    onChange={(e) => setData('tag', e.target.value)}
                                    placeholder="Core Capability / Precision CNC"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Deskripsi Singkat (Beranda) <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows="2"
                                    required
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
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
                                    Simpan Unit Bisnis
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
