import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, UserCheck } from 'lucide-react';

export default function AdminCareersIndex({ careers = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCareer, setEditingCareer] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        department: 'Engineering & Production',
        employment_type: 'Full-time',
        location: 'Pabrik GIIC Cikarang',
        requirements: '',
        responsibilities: '',
        benefits: '',
        salary_range: '',
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingCareer(null);
        reset();
        setData({
            title: '',
            department: 'Engineering & Production',
            employment_type: 'Full-time',
            location: 'Pabrik GIIC Cikarang',
            requirements: '',
            responsibilities: '',
            benefits: '',
            salary_range: 'Rp 8.000.000 - Rp 15.000.000',
            is_active: true,
        });
        setModalOpen(true);
    };

    const openEditModal = (c) => {
        setEditingCareer(c);
        setData({
            title: c.title || '',
            department: c.department || 'Engineering & Production',
            employment_type: c.employment_type || 'Full-time',
            location: c.location || 'Pabrik GIIC Cikarang',
            requirements: Array.isArray(c.requirements) ? c.requirements.join('\n') : '',
            responsibilities: Array.isArray(c.responsibilities) ? c.responsibilities.join('\n') : '',
            benefits: Array.isArray(c.benefits) ? c.benefits.join('\n') : '',
            salary_range: c.salary_range || '',
            is_active: Boolean(c.is_active),
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...data,
            requirements: data.requirements.split('\n').map(s => s.trim()).filter(Boolean),
            responsibilities: data.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
            benefits: data.benefits.split('\n').map(s => s.trim()).filter(Boolean),
        };

        if (editingCareer) {
            put(`/admin/careers/${editingCareer.id}`, payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/careers', payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus lowongan karir ini?')) {
            router.delete(`/admin/careers/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Lowongan Karir">
            <Head title="Kelola Karir | Sagayama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Daftar Lowongan Karir & Rekrutmen</h3>
                        <p className="text-xs text-slate-500">Kelola posisi pekerjaan terbuka, persyaratan, tanggung jawab, dan status lamaran.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Lowongan</span>
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Posisi Lowongan</th>
                                <th className="px-6 py-4">Departemen</th>
                                <th className="px-6 py-4">Tipe & Lokasi</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {careers.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50/80">
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        {c.title}
                                    </td>
                                    <td className="px-6 py-4 text-emerald-800 font-semibold">
                                        {c.department}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <p>{c.employment_type}</p>
                                        <p className="text-[11px] text-slate-400">{c.location}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                            c.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {c.is_active ? 'Buka' : 'Ditutup'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(c)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c.id)}
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
                                {editingCareer ? 'Edit Lowongan Karir' : 'Tambah Lowongan Karir'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Posisi Pekerjaan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="CNC Precision Machining Engineer"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Departemen <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        placeholder="Engineering & Production"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Tipe Pekerjaan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.employment_type}
                                        onChange={(e) => setData('employment_type', e.target.value)}
                                        placeholder="Full-time / Kontrak"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Lokasi Penempatan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Pabrik GIIC Cikarang"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Kisaran Gaji
                                    </label>
                                    <input
                                        type="text"
                                        value={data.salary_range}
                                        onChange={(e) => setData('salary_range', e.target.value)}
                                        placeholder="Rp 8.000.000 - Rp 15.000.000"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Persyaratan Kualifikasi (1 baris per poin)
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.requirements}
                                    onChange={(e) => setData('requirements', e.target.value)}
                                    placeholder="Pendidikan S1 Teknik Mesin&#10;Pengalaman min. 2 tahun CNC Lathe"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Tanggung Jawab (1 baris per poin)
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.responsibilities}
                                    onChange={(e) => setData('responsibilities', e.target.value)}
                                    placeholder="Setup mesin CNC dan pergantian tools&#10;Menjaga toleransi dalam ±0.005mm"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center text-xs font-bold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-2"
                                    />
                                    Buka Lowongan Ini di Website
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
                                    Simpan Lowongan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
