import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Cog } from 'lucide-react';

export default function AdminEquipmentIndex({ equipments = [], categories = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEq, setEditingEq] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        category: 'Cold Forging',
        name: '',
        model_number: '',
        manufacturer: '',
        specs: '',
        quantity: 1,
        image: null,
        image_url: '',
        description: '',
        order: 0,
        _method: 'POST',
    });

    const openCreateModal = () => {
        setEditingEq(null);
        reset();
        setData({
            category: categories[0] || 'Cold Forging',
            name: '',
            model_number: '',
            manufacturer: '',
            specs: '',
            quantity: 1,
            image: null,
            image_url: '',
            description: '',
            order: equipments.length + 1,
            _method: 'POST',
        });
        setModalOpen(true);
    };

    const openEditModal = (eq) => {
        setEditingEq(eq);
        setData({
            category: eq.category || 'Cold Forging',
            name: eq.name || '',
            model_number: eq.model_number || '',
            manufacturer: eq.manufacturer || '',
            specs: Array.isArray(eq.specs) ? eq.specs.join(', ') : '',
            quantity: eq.quantity || 1,
            image: null,
            image_url: eq.image_url || '',
            description: eq.description || '',
            order: eq.order || 0,
            _method: 'PUT',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...data,
            specs: typeof data.specs === 'string' ? data.specs.split(',').map(s => s.trim()).filter(Boolean) : data.specs,
        };

        if (editingEq) {
            router.post(`/admin/equipment/${editingEq.id}`, payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/equipment', payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus mesin / peralatan ini?')) {
            router.delete(`/admin/equipment/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Mesin & Peralatan">
            <Head title="Kelola Peralatan | Sagayama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Daftar Fasilitas & Mesin Manufaktur</h3>
                        <p className="text-xs text-slate-500">Kelola mesin penempa dingin, CNC turning centers, CMM metrology, dan 3D printers.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Mesin Baru</span>
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Visual</th>
                                <th className="px-6 py-4">Nama Mesin & Model</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Manufacturer</th>
                                <th className="px-6 py-4">Jumlah Unit</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {equipments.map((eq) => (
                                <tr key={eq.id} className="hover:bg-slate-50/80">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                            <img src={eq.image_url} alt={eq.name} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{eq.name}</p>
                                        <p className="text-[11px] text-slate-400 font-mono">{eq.model_number}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                            {eq.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        {eq.manufacturer || '-'}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        {eq.quantity} Unit
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(eq)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(eq.id)}
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
                                {editingEq ? 'Edit Mesin / Peralatan' : 'Tambah Mesin Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Kategori Mesin <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Cold Forging / CNC Cutting / Inspection"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Jumlah Unit
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Nama Mesin <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Multi-Station Cold Former 6-Die"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Nomor Model
                                    </label>
                                    <input
                                        type="text"
                                        value={data.model_number}
                                        onChange={(e) => setData('model_number', e.target.value)}
                                        placeholder="BP-660SS / NLX 2500"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Pabrikan (Manufacturer)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.manufacturer}
                                        onChange={(e) => setData('manufacturer', e.target.value)}
                                        placeholder="Sakamura / DMG Mori / Mitutoyo"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Spesifikasi Kunci (Pisahkan dengan koma)
                                </label>
                                <input
                                    type="text"
                                    value={data.specs}
                                    onChange={(e) => setData('specs', e.target.value)}
                                    placeholder="Kapasitas 250 Ton, Kecepatan 180 pcs/min, Toleransi ±0.005 mm"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Deskripsi Tambahan
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
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
                                    Simpan Mesin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
