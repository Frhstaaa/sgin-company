import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { 
    Inbox, Package, Newspaper, Cog, Briefcase, 
    ArrowUpRight, Clock, CheckCircle2, ChevronRight, Plus
} from 'lucide-react';

export default function Dashboard({ stats, recentInquiries = [], recentNews = [] }) {
    const kpis = [
        { label: 'Pesan / RFQ Masuk', value: stats.totalInquiries, badge: `${stats.unreadInquiries} Baru`, icon: Inbox, color: 'bg-emerald-600', link: '/admin/inquiries' },
        { label: 'Katalog Produk', value: stats.totalProducts, badge: 'Aktif', icon: Package, color: 'bg-blue-600', link: '/admin/products' },
        { label: 'Fasilitas & Mesin', value: stats.totalEquipment, badge: 'Terkatalog', icon: Cog, color: 'bg-amber-600', link: '/admin/equipment' },
        { label: 'Berita & Update', value: stats.totalNews, badge: 'Publikasi', icon: Newspaper, color: 'bg-indigo-600', link: '/admin/news' },
    ];

    return (
        <AdminLayout title="Dashboard Overview">
            <Head title="Admin Dashboard | Sagayama" />

            <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, idx) => {
                        const Icon = kpi.icon;
                        return (
                            <Link
                                key={idx}
                                href={kpi.link}
                                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        {kpi.label}
                                    </span>
                                    <div className={`w-10 h-10 rounded-2xl ${kpi.color} text-white flex items-center justify-center shadow-sm`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="pt-4 flex items-baseline justify-between">
                                    <span className="text-3xl font-extrabold text-slate-900 font-display">
                                        {kpi.value}
                                    </span>
                                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                                        {kpi.badge}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Management Actions */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Aksi Cepat Pengelolaan
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/admin/products"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Produk Baru</span>
                        </Link>

                        <Link
                            href="/admin/news"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tulis Berita Baru</span>
                        </Link>

                        <Link
                            href="/admin/company-profile"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                        >
                            <span>Edit Profil Perusahaan</span>
                        </Link>

                        <Link
                            href="/admin/settings"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                        >
                            <span>Pengaturan Kontak & Telepon</span>
                        </Link>
                    </div>
                </div>

                {/* Split Tables: Inquiries & News */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Recent Inquiries / RFQs */}
                    <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-bold text-sm text-slate-900">
                                Permintaan Penawaran & Pesan Terbaru
                            </h3>
                            <Link href="/admin/inquiries" className="text-xs font-bold text-emerald-700 hover:underline">
                                Lihat Semua
                            </Link>
                        </div>

                        {recentInquiries.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {recentInquiries.map((inq) => (
                                    <Link
                                        key={inq.id}
                                        href={`/admin/inquiries/${inq.id}`}
                                        className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors block"
                                    >
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${
                                                    inq.status === 'unread' ? 'bg-emerald-600 animate-pulse' : 'bg-slate-300'
                                                }`} />
                                                <span className="text-xs font-bold text-slate-900">{inq.name}</span>
                                                {inq.company_name && (
                                                    <span className="text-[11px] text-slate-500">({inq.company_name})</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-600 line-clamp-1">{inq.subject}</p>
                                        </div>

                                        <div className="text-right">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                                                inq.status === 'unread' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {inq.status}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-400 py-6 text-center">Belum ada pesan / RFQ masuk.</p>
                        )}
                    </div>

                    {/* Recent News */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-bold text-sm text-slate-900">
                                Berita Terkini
                            </h3>
                            <Link href="/admin/news" className="text-xs font-bold text-emerald-700 hover:underline">
                                Kelola Berita
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentNews.map((item) => (
                                <div key={item.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="font-mono font-bold text-slate-400">
                                            {item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : ''}
                                        </span>
                                        <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-[10px]">
                                            {item.category}
                                        </span>
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                                        {item.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
