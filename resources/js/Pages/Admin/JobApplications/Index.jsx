import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    Briefcase, User, Mail, Phone, Calendar, GraduationCap, 
    FileText, Download, Trash2, Eye, Search, Filter, 
    CheckCircle2, Clock, X, Building2, DollarSign, Globe, 
    MessageSquare, AlertCircle, Save, ExternalLink
} from 'lucide-react';

export default function AdminJobApplicationsIndex({ applications, filters = {}, careers = [], counts = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCareer, setSelectedCareer] = useState(filters.career_id || '');
    const [activeModalApp, setActiveModalApp] = useState(null);
    const [editStatus, setEditStatus] = useState('new');
    const [adminNotes, setAdminNotes] = useState('');
    const [isSavingStatus, setIsSavingStatus] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/job-applications', { ...filters, search, career_id: selectedCareer }, { preserveState: true });
    };

    const handleStatusFilter = (status) => {
        const next = { ...filters };
        if (status && status !== 'all') next.status = status;
        else delete next.status;
        router.get('/admin/job-applications', next, { preserveState: true });
    };

    const handleCareerFilterChange = (e) => {
        const val = e.target.value;
        setSelectedCareer(val);
        const next = { ...filters };
        if (val) next.career_id = val;
        else delete next.career_id;
        router.get('/admin/job-applications', next, { preserveState: true });
    };

    const openDetailModal = (app) => {
        setActiveModalApp(app);
        setEditStatus(app.status || 'new');
        setAdminNotes(app.admin_notes || '');

        // If status was 'new', auto-mark to 'reviewed' on view
        if (app.status === 'new') {
            router.patch(`/admin/job-applications/${app.id}/status`, {
                status: 'reviewed',
                admin_notes: app.admin_notes || '',
            }, { preserveScroll: true, preserveState: true });
        }
    };

    const saveStatusUpdate = (e) => {
        e.preventDefault();
        if (!activeModalApp) return;

        setIsSavingStatus(true);
        router.patch(`/admin/job-applications/${activeModalApp.id}/status`, {
            status: editStatus,
            admin_notes: adminNotes,
        }, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => {
                setIsSavingStatus(false);
                setActiveModalApp((prev) => prev ? { ...prev, status: editStatus, admin_notes: adminNotes } : null);
            }
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Hapus data lamaran atas nama "${name}" beserta berkas CV-nya?`)) {
            router.delete(`/admin/job-applications/${id}`, {
                onSuccess: () => {
                    if (activeModalApp && activeModalApp.id === id) {
                        setActiveModalApp(null);
                    }
                }
            });
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'new':
                return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">BARU (NEW)</span>;
            case 'reviewed':
                return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">DALAM REVIEW</span>;
            case 'interview':
                return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">INTERVIEW</span>;
            case 'accepted':
                return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">DITERIMA</span>;
            case 'rejected':
                return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">DITOLAK</span>;
            default:
                return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700">{status}</span>;
        }
    };

    return (
        <AdminLayout title="Pelamar Kerja & CV Karir">
            <Head title="Manajemen Pelamar Karir | Sugiyama CMS" />

            <div className="space-y-6">
                
                {/* Header & Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Pelamar</p>
                        <p className="text-xl font-black text-slate-900">{counts.all || 0}</p>
                    </div>
                    <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200/80 shadow-2xs space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Lamaran Baru</p>
                        <p className="text-xl font-black text-rose-900">{counts.new || 0}</p>
                    </div>
                    <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80 shadow-2xs space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Dalam Review</p>
                        <p className="text-xl font-black text-blue-900">{counts.reviewed || 0}</p>
                    </div>
                    <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 shadow-2xs space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Tahap Interview</p>
                        <p className="text-xl font-black text-amber-900">{counts.interview || 0}</p>
                    </div>
                    <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 shadow-2xs space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Diterima</p>
                        <p className="text-xl font-black text-emerald-900">{counts.accepted || 0}</p>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Ditolak</p>
                        <p className="text-xl font-black text-slate-800">{counts.rejected || 0}</p>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                    {/* Status Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                        {[
                            { id: 'all', label: 'Semua', count: counts.all },
                            { id: 'new', label: 'Baru', count: counts.new },
                            { id: 'reviewed', label: 'Review', count: counts.reviewed },
                            { id: 'interview', label: 'Interview', count: counts.interview },
                            { id: 'accepted', label: 'Diterima', count: counts.accepted },
                            { id: 'rejected', label: 'Ditolak', count: counts.rejected },
                        ].map((tab) => {
                            const isActive = (!filters.status && tab.id === 'all') || filters.status === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => handleStatusFilter(tab.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                        isActive 
                                            ? 'bg-emerald-800 text-white shadow-xs' 
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    {tab.count !== undefined && (
                                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                                            isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                                        }`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Filters & Search Inputs */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <select
                            value={selectedCareer}
                            onChange={handleCareerFilterChange}
                            className="w-full sm:w-48 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                        >
                            <option value="">Semua Posisi</option>
                            {careers.map((c) => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>

                        <form onSubmit={handleSearch} className="w-full sm:w-64 relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama, email, telp..."
                                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </form>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                                <tr>
                                    <th className="px-6 py-4">Pelamar</th>
                                    <th className="px-6 py-4">Posisi yang Dilamar</th>
                                    <th className="px-6 py-4">Kontak Email / Telp</th>
                                    <th className="px-6 py-4">Pendidikan & Pengalaman</th>
                                    <th className="px-6 py-4">Dokumen CV</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                {applications.data && applications.data.map((app) => (
                                    <tr 
                                        key={app.id} 
                                        className={app.status === 'new' ? 'bg-rose-50/30 hover:bg-rose-50/60 font-semibold' : 'hover:bg-slate-50/80'}
                                    >
                                        {/* Candidate Info */}
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="font-bold text-slate-900 text-sm">{app.full_name}</p>
                                                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                                    <span>{app.gender || '-'}</span>
                                                    {app.date_of_birth && (
                                                        <>
                                                            <span>&bull;</span>
                                                            <span>{new Date(app.date_of_birth).toISOString().split('T')[0]}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Position */}
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="font-bold text-slate-800">{app.position_title}</p>
                                                {app.career && (
                                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold inline-block">
                                                        {app.career.department}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Contact */}
                                        <td className="px-6 py-4">
                                            <div className="space-y-1 text-slate-700">
                                                <a href={`mailto:${app.email}`} className="hover:text-emerald-700 flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{app.email}</span>
                                                </a>
                                                <a href={`https://wa.me/${app.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-emerald-700 flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{app.phone}</span>
                                                </a>
                                            </div>
                                        </td>

                                        {/* Background */}
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5 text-slate-700">
                                                <p className="font-semibold text-slate-800">{app.last_education} {app.major ? `- ${app.major}` : ''}</p>
                                                <p className="text-[11px] text-slate-500">Pengalaman: {app.years_of_experience || '-'}</p>
                                            </div>
                                        </td>

                                        {/* CV Download */}
                                        <td className="px-6 py-4">
                                            {app.cv_url ? (
                                                <a
                                                    href={app.cv_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors shadow-2xs"
                                                >
                                                    <Download className="w-3.5 h-3.5 text-emerald-700" />
                                                    <span>Unduh CV</span>
                                                </a>
                                            ) : (
                                                <span className="text-slate-400 italic">Tidak ada file</span>
                                            )}
                                        </td>

                                        {/* Status Badge */}
                                        <td className="px-6 py-4">
                                            {getStatusBadge(app.status)}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => openDetailModal(app)}
                                                    className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition-colors cursor-pointer"
                                                    title="Lihat Rincian Pelamar"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(app.id, app.full_name)}
                                                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 transition-colors cursor-pointer"
                                                    title="Hapus Lamaran"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {(!applications.data || applications.data.length === 0) && (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                                            Belum ada data lamaran pekerjaan yang sesuai dengan filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {applications.links && applications.links.length > 3 && (
                        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <div>
                                Menampilkan {applications.from || 0} - {applications.to || 0} dari {applications.total || 0} pelamar
                            </div>
                            <div className="flex items-center gap-1">
                                {applications.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url || link.active}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                                            link.active 
                                                ? 'bg-emerald-800 text-white' 
                                                : link.url 
                                                    ? 'bg-slate-50 text-slate-700 hover:bg-slate-200' 
                                                    : 'text-slate-300 opacity-50 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* DETAIL & STATUS UPDATE MODAL */}
            {activeModalApp && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                        
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                            <div className="space-y-1">
                                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                    LAMARAN #{activeModalApp.id}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900">{activeModalApp.full_name}</h3>
                                <p className="text-xs text-slate-500 font-medium">
                                    Posisi: <span className="font-bold text-slate-800">{activeModalApp.position_title}</span> &bull; Dikirim pada {new Date(activeModalApp.created_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveModalApp(null)}
                                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Candidate Data Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Email</span>
                                <p className="font-bold text-slate-900">{activeModalApp.email}</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-slate-400">WhatsApp / Telepon</span>
                                <p className="font-bold text-slate-900">{activeModalApp.phone}</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Pendidikan Terakhir</span>
                                <p className="font-bold text-slate-900">{activeModalApp.last_education} {activeModalApp.major ? `(${activeModalApp.major})` : ''}</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Pengalaman Kerja</span>
                                <p className="font-bold text-slate-900">{activeModalApp.years_of_experience || '-'}</p>
                            </div>
                            {activeModalApp.current_company && (
                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400">Perusahaan Terakhir</span>
                                    <p className="font-bold text-slate-900">{activeModalApp.current_company}</p>
                                </div>
                            )}
                            {activeModalApp.expected_salary && (
                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400">Ekspektasi Gaji</span>
                                    <p className="font-bold text-slate-900">{activeModalApp.expected_salary}</p>
                                </div>
                            )}
                            {activeModalApp.portfolio_url && (
                                <div className="sm:col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400">Portofolio / LinkedIn</span>
                                    <div>
                                        <a href={activeModalApp.portfolio_url} target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1">
                                            <span>{activeModalApp.portfolio_url}</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cover Letter */}
                        {activeModalApp.cover_letter && (
                            <div className="space-y-1.5 text-xs">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Surat Pengantar / Catatan Pelamar</span>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {activeModalApp.cover_letter}
                                </div>
                            </div>
                        )}

                        {/* CV File Box */}
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900">Dokumen CV / Resume Pelamar</p>
                                    <p className="text-[11px] text-emerald-700">Maksimal 2 MB (PDF / Word)</p>
                                </div>
                            </div>
                            {activeModalApp.cv_url && (
                                <a
                                    href={activeModalApp.cv_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors inline-flex items-center gap-1.5"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download CV</span>
                                </a>
                            )}
                        </div>

                        {/* HR Status & Notes Form */}
                        <form onSubmit={saveStatusUpdate} className="pt-4 border-t border-slate-100 space-y-4">
                            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                                Update Status Seleksi & Catatan HRD
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700">Status Lamaran</label>
                                    <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-bold"
                                    >
                                        <option value="new">Baru (New)</option>
                                        <option value="reviewed">Dalam Review HRD</option>
                                        <option value="interview">Tahap Interview</option>
                                        <option value="accepted">Diterima (Accepted)</option>
                                        <option value="rejected">Ditolak (Rejected)</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700">Catatan Internal HRD</label>
                                    <input
                                        type="text"
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Contoh: Jadwal interview tgl 28 Agustus"
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveModalApp(null)}
                                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
                                >
                                    Tutup
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSavingStatus}
                                    className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    <span>{isSavingStatus ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
