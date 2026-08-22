import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Newspaper, Search } from 'lucide-react';

export default function AdminNewsIndex({ news, filters = {} }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [search, setSearch] = useState(filters.search || '');

    const { data, setData, post, processing, errors, reset } = useForm({
        category: 'Pemberitahuan',
        title: '',
        excerpt: '',
        content: '',
        cover_image: null,
        cover_image_url: '',
        published_at: new Date().toISOString().split('T')[0],
        is_published: true,
        _method: 'POST',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/news', { ...filters, search }, { preserveState: true });
    };

    const openCreateModal = () => {
        setEditingNews(null);
        reset();
        setData({
            category: 'Pemberitahuan',
            title: '',
            excerpt: '',
            content: '',
            cover_image: null,
            cover_image_url: '',
            published_at: new Date().toISOString().split('T')[0],
            is_published: true,
            _method: 'POST',
        });
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingNews(item);
        setData({
            category: item.category || 'Pemberitahuan',
            title: item.title || '',
            excerpt: item.excerpt || '',
            content: item.content || '',
            cover_image: null,
            cover_image_url: item.cover_image || '',
            published_at: item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : '',
            is_published: Boolean(item.is_published),
            _method: 'PUT',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingNews) {
            router.post(`/admin/news/${editingNews.id}`, data, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/news', data, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            router.delete(`/admin/news/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Berita & Pengumuman">
            <Head title="Kelola Berita | Sagayama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Daftar Berita & Notifikasi</h3>
                        <p className="text-xs text-slate-500">Kelola artikel press release, pameran industri, sertifikasi, dan teknologi.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tulis Berita Baru</span>
                    </button>
                </div>

                {/* Filter / Search */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="w-full sm:w-80 relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul berita..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </form>
                    <span className="text-xs text-slate-500 font-semibold">Total {news.total || 0} Berita</span>
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Judul Berita</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {news.data && news.data.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/80">
                                    <td className="px-6 py-4 font-mono font-bold text-slate-600">
                                        {item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900 max-w-md">
                                        {item.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            item.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {item.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
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
                                {editingNews ? 'Edit Berita' : 'Tulis Berita Baru'}
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
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    >
                                        <option value="Pemberitahuan">Pemberitahuan</option>
                                        <option value="Teknologi">Teknologi</option>
                                        <option value="Pameran">Pameran</option>
                                        <option value="Media">Media</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Tanggal Publikasi
                                    </label>
                                    <input
                                        type="date"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Judul Berita <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Investasi Mesin Multi-Station Cold Former 6-Die Terbaru"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Ringkasan / Excerpt <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows="2"
                                    required
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    placeholder="Ringkasan singkat yang muncul di daftar berita..."
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Konten Lengkap <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows="6"
                                    required
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Isi berita lengkap..."
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Upload Gambar Sampul
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('cover_image', e.target.files[0])}
                                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-emerald-50 file:text-emerald-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Atau URL Gambar
                                    </label>
                                    <input
                                        type="text"
                                        value={data.cover_image_url}
                                        onChange={(e) => setData('cover_image_url', e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center text-xs font-bold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-2"
                                    />
                                    Publikasikan Berita Ini
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
                                    Simpan Berita
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
