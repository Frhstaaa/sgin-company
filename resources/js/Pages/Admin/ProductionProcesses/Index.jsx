import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    Workflow, Plus, Edit2, Trash2, X, Save, Image as ImageIcon, 
    CheckCircle2, Globe, MapPin, Tag, ArrowRight, Layers, ShieldCheck, 
    Factory, Ship, Cog, PackageCheck, Eye
} from 'lucide-react';

export default function AdminProductionProcessesIndex({ processes = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProcess, setEditingProcess] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        step_number: '01',
        category: 'main_flow',
        title_id: '',
        title_jp: '',
        title_en: '',
        description_id: '',
        description_jp: '',
        description_en: '',
        location_badge: '',
        icon: 'cog',
        image: null,
        image_url: '',
        specs: ['', '', ''],
        order: 1,
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingProcess(null);
        setPreviewImage(null);
        reset();
        setData({
            step_number: String(processes.length + 1).padStart(2, '0'),
            category: 'main_flow',
            title_id: '',
            title_jp: '',
            title_en: '',
            description_id: '',
            description_jp: '',
            description_en: '',
            location_badge: '🇮🇩 Pabrik Karawang',
            icon: 'cog',
            image: null,
            image_url: '',
            specs: ['', '', ''],
            order: processes.length + 1,
            is_active: true,
        });
        setModalOpen(true);
    };

    const openEditModal = (proc) => {
        setEditingProcess(proc);
        setPreviewImage(proc.image_url || null);
        setData({
            step_number: proc.step_number || '01',
            category: proc.category || 'main_flow',
            title_id: proc.title_id || '',
            title_jp: proc.title_jp || '',
            title_en: proc.title_en || '',
            description_id: proc.description_id || '',
            description_jp: proc.description_jp || '',
            description_en: proc.description_en || '',
            location_badge: proc.location_badge || '',
            icon: proc.icon || 'cog',
            image: null,
            image_url: proc.image_url || '',
            specs: Array.isArray(proc.specs) && proc.specs.length > 0 ? proc.specs : ['', '', ''],
            order: proc.order || 0,
            is_active: proc.is_active ?? true,
        });
        setModalOpen(true);
    };

    const handleSpecChange = (index, value) => {
        const newSpecs = [...data.specs];
        newSpecs[index] = value;
        setData('specs', newSpecs);
    };

    const addSpecField = () => {
        setData('specs', [...data.specs, '']);
    };

    const removeSpecField = (index) => {
        const newSpecs = data.specs.filter((_, i) => i !== index);
        setData('specs', newSpecs);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanedSpecs = data.specs.filter(s => s && s.trim() !== '');
        
        if (editingProcess) {
            // Use router.post with _method: 'PUT' for multipart/form-data support
            router.post(`/admin/production-processes/${editingProcess.id}`, {
                _method: 'PUT',
                ...data,
                specs: cleanedSpecs,
            }, {
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/production-processes', {
                data: {
                    ...data,
                    specs: cleanedSpecs,
                },
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus tahapan proses produksi ini?')) {
            router.delete(`/admin/production-processes/${id}`);
        }
    };

    const filteredProcesses = selectedCategory === 'ALL'
        ? processes
        : processes.filter(p => p.category === selectedCategory);

    return (
        <AdminLayout title="Kelola Proses Produksi">
            <Head title="Kelola Proses Produksi | Sugiyama CMS" />

            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <Workflow className="w-6 h-6 text-emerald-600" />
                            <span>Kelola Alur & Proses Produksi</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Atur seluruh tahapan rantai pasok dan kontrol kualitas yang ditampilkan di halaman publik <code>/proses-produksi</code>.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="/proses-produksi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
                        >
                            <Eye className="w-4 h-4 text-slate-500" />
                            <span>Lihat Halaman Publik</span>
                        </a>

                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Tahapan Baru</span>
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {[
                        { id: 'ALL', label: `Semua Tahapan (${processes.length})` },
                        { id: 'main_flow', label: `Alur Utama (${processes.filter(p => p.category === 'main_flow').length})` },
                        { id: 'qc', label: `Kontrol Kualitas / QC (${processes.filter(p => p.category === 'qc').length})` },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setSelectedCategory(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                selectedCategory === tab.id
                                    ? 'bg-emerald-800 text-white shadow-sm'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Process List Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProcesses.map((proc) => (
                        <div 
                            key={proc.id} 
                            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
                        >
                            {/* Card Top Banner / Image */}
                            <div className="h-44 bg-slate-900 relative overflow-hidden">
                                {proc.image_url ? (
                                    <img 
                                        src={proc.image_url} 
                                        alt={proc.title_id} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                                        <ImageIcon className="w-10 h-10" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                                
                                {/* Step Badge */}
                                <div className="absolute top-3 left-3 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                                        {proc.step_number}
                                    </span>
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                        proc.category === 'qc' 
                                            ? 'bg-amber-500 text-white shadow-xs' 
                                            : 'bg-emerald-950/90 text-emerald-300 backdrop-blur-xs'
                                    }`}>
                                        {proc.category === 'qc' ? 'QC & Inspeksi' : 'Alur Utama'}
                                    </span>
                                </div>

                                {proc.location_badge && (
                                    <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5 drop-shadow-md">
                                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>{proc.location_badge}</span>
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                                        {proc.title_id}
                                    </h3>
                                    {proc.title_jp && (
                                        <p className="text-xs font-jp text-emerald-700 font-semibold">
                                            {proc.title_jp}
                                        </p>
                                    )}
                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                        {proc.description_id}
                                    </p>
                                </div>

                                {/* Specs Pill Tags */}
                                {Array.isArray(proc.specs) && proc.specs.length > 0 && (
                                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Poin Utama:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {proc.specs.slice(0, 2).map((spec, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] truncate max-w-full">
                                                    • {spec}
                                                </span>
                                            ))}
                                            {proc.specs.length > 2 && (
                                                <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
                                                    +{proc.specs.length - 2} lainnya
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[11px] font-semibold text-slate-400">
                                        Urutan: #{proc.order}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(proc)}
                                            className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
                                            title="Edit Tahapan"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(proc.id)}
                                            className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer"
                                            title="Hapus Tahapan"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredProcesses.length === 0 && (
                        <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
                            Belum ada data tahapan proses produksi dalam kategori ini.
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden my-8">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <Workflow className="w-5 h-5 text-emerald-700" />
                                <h3 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                    {editingProcess ? 'Edit Tahapan Proses Produksi' : 'Tambah Tahapan Proses Baru'}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Nomor Langkah (Step) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.step_number}
                                        onChange={(e) => setData('step_number', e.target.value)}
                                        placeholder="01, 02, ..."
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-bold text-center"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Kategori Tahapan <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium"
                                    >
                                        <option value="main_flow">Alur Utama (Main Flow)</option>
                                        <option value="qc">Kontrol Kualitas / QC</option>
                                        <option value="forging">Penempaan (Forging)</option>
                                        <option value="logistics">Logistik & Pengapalan</option>
                                        <option value="machining">Permesinan CNC</option>
                                        <option value="packaging">Pengemasan & Ekspor</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Urutan Tampilan (Order)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-center font-bold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Judul Tahapan (Bahasa Indonesia) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title_id}
                                        onChange={(e) => setData('title_id', e.target.value)}
                                        placeholder="Contoh: Pemesinan CNC & Pemotongan Presisi"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Judul Bahasa Jepang (日本語)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title_jp}
                                        onChange={(e) => setData('title_jp', e.target.value)}
                                        placeholder="Contoh: 精密切削・転造加工"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-jp focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Lokasi / Origin Badge
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location_badge}
                                        onChange={(e) => setData('location_badge', e.target.value)}
                                        placeholder="Contoh: 🇮🇩 Pabrik Karawang, 🇯🇵 Aichi Japan"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Deskripsi Proses (Bahasa Indonesia) <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows="3"
                                    required
                                    value={data.description_id}
                                    onChange={(e) => setData('description_id', e.target.value)}
                                    placeholder="Jelaskan detail proses, teknologi yang digunakan, serta nilai tambah yang dihasilkan..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm leading-relaxed focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Deskripsi Proses Bahasa Jepang (日本語)
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.description_jp}
                                    onChange={(e) => setData('description_jp', e.target.value)}
                                    placeholder="日本語での工程説明..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-jp leading-relaxed focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                />
                            </div>

                            {/* Image Upload with Preview */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Foto / Ilustrasi Proses Produksi
                                </label>
                                
                                {previewImage && (
                                    <div className="mb-3 relative w-48 h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                                />
                            </div>

                            {/* Specs / Key Points */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Poin Spesifikasi / Keunggulan Proses
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addSpecField}
                                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                                    >
                                        + Tambah Poin
                                    </button>
                                </div>

                                {data.specs.map((spec, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={spec}
                                            onChange={(e) => handleSpecChange(index, e.target.value)}
                                            placeholder={`Poin ke-${index + 1} (contoh: Toleransi dimensi ±0.005mm)`}
                                            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                        />
                                        {data.specs.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSpecField(index)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Submit Bar */}
                            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{processing ? 'Menyimpan...' : 'Simpan Tahapan'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
