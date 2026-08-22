import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Inbox, Trash2, Eye, Search, Filter, CheckCircle2, Clock } from 'lucide-react';

export default function AdminInquiriesIndex({ inquiries, filters = {}, unreadCount = 0 }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/inquiries', { ...filters, search }, { preserveState: true });
    };

    const handleStatusFilter = (status) => {
        const next = { ...filters };
        if (status) next.status = status;
        else delete next.status;
        router.get('/admin/inquiries', next, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Hapus pesan inquiry ini?')) {
            router.delete(`/admin/inquiries/${id}`);
        }
    };

    return (
        <AdminLayout title="Kotak Masuk Pesan & RFQ">
            <Head title="Kotak Masuk RFQ | Sugiyama CMS" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            Pesan Masuk, RFQ & Konsultasi ({unreadCount} Belum Dibaca)
                        </h3>
                        <p className="text-xs text-slate-500">Kelola permintaan penawaran harga, spesifikasi kebutuhan part, dan pertanyaan calon pelanggan.</p>
                    </div>
                </div>

                {/* Filter / Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <button
                            onClick={() => handleStatusFilter(null)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                !filters.status ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Semua Pesan
                        </button>
                        <button
                            onClick={() => handleStatusFilter('unread')}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                filters.status === 'unread' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Belum Dibaca
                        </button>
                        <button
                            onClick={() => handleStatusFilter('contacted')}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                filters.status === 'contacted' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Sudah Dihubungi
                        </button>
                    </div>

                    <form onSubmit={handleSearch} className="w-full md:w-72 relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari pengirim / subjek..."
                            className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Tipe</th>
                                <th className="px-6 py-4">Pengirim & Perusahaan</th>
                                <th className="px-6 py-4">Kontak Email / Telp</th>
                                <th className="px-6 py-4">Subjek Pesan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {inquiries.data && inquiries.data.map((inq) => (
                                <tr key={inq.id} className={inq.status === 'unread' ? 'bg-emerald-50/40 hover:bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50/80'}>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            inq.type === 'rfq' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                            {inq.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{inq.name}</p>
                                        <p className="text-[11px] text-slate-500">{inq.company_name || '-'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-800">{inq.email}</p>
                                        <p className="text-[11px] text-slate-400 font-mono">{inq.phone || '-'}</p>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate text-slate-800">
                                        {inq.subject}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                            inq.status === 'unread' ? 'bg-emerald-100 text-emerald-800' :
                                            inq.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                            'bg-slate-100 text-slate-500'
                                        }`}>
                                            {inq.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link
                                            href={`/admin/inquiries/${inq.id}`}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 inline-block"
                                            title="Baca Detail Pesan"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(inq.id)}
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
        </AdminLayout>
    );
}
