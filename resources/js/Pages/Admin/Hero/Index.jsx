import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Check, Image as ImageIcon } from 'lucide-react';

export default function AdminHeroIndex({ slides = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title_jp: '',
        title_id: '',
        subtitle: '',
        image: null,
        image_url: '',
        button_text: 'Hubungi Kami',
        button_link: '/kontak',
        order: 0,
        is_active: true,
        _method: 'POST',
    });

    const openCreateModal = () => {
        setEditingSlide(null);
        reset();
        setData({
            title_jp: '技術を鍛え 未来を造る',
            title_id: '',
            subtitle: '',
            image: null,
            image_url: '',
            button_text: 'Hubungi Kami',
            button_link: '/kontak',
            order: slides.length + 1,
            is_active: true,
            _method: 'POST',
        });
        setModalOpen(true);
    };

    const openEditModal = (slide) => {
        setEditingSlide(slide);
        setData({
            title_jp: slide.title_jp || '',
            title_id: slide.title_id || '',
            subtitle: slide.subtitle || '',
            image: null,
            image_url: slide.image_url || '',
            button_text: slide.button_text || 'Hubungi Kami',
            button_link: slide.button_link || '/kontak',
            order: slide.order || 0,
            is_active: Boolean(slide.is_active),
            _method: 'PUT',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSlide) {
            post(`/admin/hero/${editingSlide.id}`, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/hero', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus slide hero ini?')) {
            router.delete(`/admin/hero/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Hero Banner & Slider">
            <Head title="Kelola Hero Slides | Sugiyama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Daftar Hero Banner Slider</h3>
                        <p className="text-xs text-slate-500">Atur visual banner utama, teks bahasa Jepang / Indonesia, dan tombol aksi.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Slide Baru</span>
                    </button>
                </div>

                {/* Slides Table */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                                <tr>
                                    <th className="px-6 py-4">Visual</th>
                                    <th className="px-6 py-4">Judul Utama</th>
                                    <th className="px-6 py-4">Sub-judul</th>
                                    <th className="px-6 py-4">Urutan</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                {slides.map((slide) => (
                                    <tr key={slide.id} className="hover:bg-slate-50/80">
                                        <td className="px-6 py-4">
                                            <div className="w-20 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                                <img src={slide.image_url} alt={slide.title_id} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900">{slide.title_id}</p>
                                            <p className="text-[11px] text-emerald-700 font-jp font-semibold">{slide.title_jp}</p>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate">
                                            {slide.subtitle}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900">
                                            #{slide.order}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                slide.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {slide.is_active ? 'Aktif' : 'Non-aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => openEditModal(slide)}
                                                className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(slide.id)}
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
            </div>

            {/* Modal Form */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
                    <div className="relative z-10 bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-extrabold text-base text-slate-900">
                                {editingSlide ? 'Edit Hero Slide' : 'Tambah Hero Slide Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Judul Kanji Jepang
                                </label>
                                <input
                                    type="text"
                                    value={data.title_jp}
                                    onChange={(e) => setData('title_jp', e.target.value)}
                                    placeholder="Contoh: 技術を鍛え 未来を造る"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-jp"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Judul Indonesia / Utama <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title_id}
                                    onChange={(e) => setData('title_id', e.target.value)}
                                    placeholder="Menempa Teknologi, Membangun Masa Depan"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Sub-judul Deskripsi
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.subtitle}
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                    placeholder="Deskripsi singkat mengenai keahlian teknik penempaan presisi..."
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Upload Gambar Banner
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
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
                                        placeholder="https://..."
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Teks Tombol
                                    </label>
                                    <input
                                        type="text"
                                        value={data.button_text}
                                        onChange={(e) => setData('button_text', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Link Tombol
                                    </label>
                                    <input
                                        type="text"
                                        value={data.button_link}
                                        onChange={(e) => setData('button_link', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center text-xs font-bold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-2"
                                    />
                                    Aktifkan Slide di Website
                                </label>

                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-bold text-slate-700">Urutan:</label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        className="w-16 px-2 py-1 rounded-lg border border-slate-200 text-xs text-center"
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
                                    {processing ? 'Menyimpan...' : 'Simpan Slide'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
