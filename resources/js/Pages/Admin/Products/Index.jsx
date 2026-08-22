import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Package, Search } from 'lucide-react';

export default function AdminProductsIndex({ products, categories = [], filters = {} }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProd, setEditingProd] = useState(null);
    const [search, setSearch] = useState(filters.search || '');

    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: categories[0]?.id || '',
        sku: '',
        name: '',
        name_jp: '',
        material: '',
        application: '',
        tolerance: '±0.005 mm',
        image: null,
        image_url: '',
        is_featured: false,
        order: 0,
        _method: 'POST',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/products', { ...filters, search }, { preserveState: true });
    };

    const openCreateModal = () => {
        setEditingProd(null);
        reset();
        setData({
            category_id: categories[0]?.id || '',
            sku: `SGN-PRD-${Math.floor(100 + Math.random() * 900)}`,
            name: '',
            name_jp: '',
            material: 'SCM435H / Alloy Steel',
            application: 'Otomotif & Industri Presisi',
            tolerance: '±0.005 mm',
            image: null,
            image_url: '',
            is_featured: false,
            order: (products.total || 0) + 1,
            _method: 'POST',
        });
        setModalOpen(true);
    };

    const openEditModal = (prod) => {
        setEditingProd(prod);
        setData({
            category_id: prod.category_id || '',
            sku: prod.sku || '',
            name: prod.name || '',
            name_jp: prod.name_jp || '',
            material: prod.material || '',
            application: prod.application || '',
            tolerance: prod.tolerance || '±0.005 mm',
            image: null,
            image_url: prod.image_url || '',
            is_featured: Boolean(prod.is_featured),
            order: prod.order || 0,
            _method: 'PUT',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProd) {
            router.post(`/admin/products/${editingProd.id}`, data, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/products', data, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <AdminLayout title="Katalog & Produk Presisi">
            <Head title="Kelola Produk | Sugiyama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Daftar Komponen & Suku Cadang Presisi</h3>
                        <p className="text-xs text-slate-500">Kelola spesifikasi teknis material, toleransi dimensi, foto katalog, dan status unggulan.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Produk Baru</span>
                    </button>
                </div>

                {/* Filter / Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="w-full sm:w-80 relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama produk / SKU..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </form>

                    <div className="text-xs text-slate-500 font-semibold">
                        Total {products.total || 0} Produk Terdaftar
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Foto</th>
                                <th className="px-6 py-4">Nama Produk & SKU</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Material & Toleransi</th>
                                <th className="px-6 py-4">Unggulan</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {products.data && products.data.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50/80">
                                    <td className="px-6 py-4">
                                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                                            <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{p.name}</p>
                                        <p className="text-[11px] text-slate-400 font-mono">SKU: {p.sku || '-'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                                            {p.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-800 font-semibold">{p.material || '-'}</p>
                                        <p className="text-[11px] text-emerald-700 font-bold font-mono">{p.tolerance || '-'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            p.is_featured ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {p.is_featured ? 'Featured' : 'Regular'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(p)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id)}
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
                    <div className="relative z-10 bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-extrabold text-base text-slate-900">
                                {editingProd ? 'Edit Produk' : 'Tambah Produk Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Kategori <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        required
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        SKU / Kode Part
                                    </label>
                                    <input
                                        type="text"
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                        placeholder="SGN-FS-435"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-mono"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Nama Produk <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Precision Flange Shaft"
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
                                        placeholder="高強度フランジシャフト"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-jp"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Material Bahan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.material}
                                        onChange={(e) => setData('material', e.target.value)}
                                        placeholder="SCM435 / SUS304 / C1100"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Toleransi Dimensi
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tolerance}
                                        onChange={(e) => setData('tolerance', e.target.value)}
                                        placeholder="±0.005 mm"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Aplikasi Penggunaan
                                </label>
                                <input
                                    type="text"
                                    value={data.application}
                                    onChange={(e) => setData('application', e.target.value)}
                                    placeholder="Transmisi Otomatis, Motor EV, Sistem Power Steering"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Upload Foto Produk
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
                                        Atau URL Foto
                                    </label>
                                    <input
                                        type="text"
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center text-xs font-bold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-2"
                                    />
                                    Tampilkan sebagai Produk Unggulan di Beranda
                                </label>
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
                                    Simpan Produk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
