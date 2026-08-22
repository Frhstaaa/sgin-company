import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, FolderTree } from 'lucide-react';

export default function AdminProductCategoriesIndex({ categories = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCat, setEditingCat] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        name_jp: '',
        description: '',
        image: null,
        image_url: '',
        order: 0,
        _method: 'POST',
    });

    const openCreateModal = () => {
        setEditingCat(null);
        reset();
        setData({
            name: '',
            name_jp: '',
            description: '',
            image: null,
            image_url: '',
            order: categories.length + 1,
            _method: 'POST',
        });
        setModalOpen(true);
    };

    const openEditModal = (cat) => {
        setEditingCat(cat);
        setData({
            name: cat.name || '',
            name_jp: cat.name_jp || '',
            description: cat.description || '',
            image: null,
            image_url: cat.image_url || '',
            order: cat.order || 0,
            _method: 'PUT',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCat) {
            router.post(`/admin/product-categories/${editingCat.id}`, data, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/product-categories', data, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kategori produk ini?')) {
            router.delete(`/admin/product-categories/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Kategori Produk">
            <Head title="Kategori Produk | Sugiyama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Daftar Kategori Produk</h3>
                        <p className="text-xs text-slate-500">Kelola pengelompokan suku cadang otomotif, EV elektronik, dan fastener industri.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Kategori</span>
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Nama Kategori</th>
                                <th className="px-6 py-4">Nama JP</th>
                                <th className="px-6 py-4">Deskripsi</th>
                                <th className="px-6 py-4">Jumlah Produk</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50/80">
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        {cat.name}
                                    </td>
                                    <td className="px-6 py-4 text-emerald-700 font-jp">
                                        {cat.name_jp || '-'}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate text-slate-500">
                                        {cat.description || '-'}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        {cat.products_count || 0} Produk
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(cat)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
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
                    <div className="relative z-10 bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-extrabold text-base text-slate-900">
                                {editingCat ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Nama Kategori <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Komponen Otomotif & Transmisi"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Nama JP (Kanji)
                                </label>
                                <input
                                    type="text"
                                    value={data.name_jp}
                                    onChange={(e) => setData('name_jp', e.target.value)}
                                    placeholder="自動車・トランスミッション部品"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-jp"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Deskripsi Kategori
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
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
                                    Simpan Kategori
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
