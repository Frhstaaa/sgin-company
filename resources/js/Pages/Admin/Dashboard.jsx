import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { 
    Inbox, Package, Newspaper, Cog, Briefcase, 
    ArrowUpRight, Clock, CheckCircle2, ChevronRight, Plus,
    LayoutTemplate, Workflow, Users, Settings, Sparkles, 
    TrendingUp, ShieldCheck, ExternalLink, Activity, Crown,
    Cpu, Eye, Mail, Phone, Flame
} from 'lucide-react';

export default function Dashboard({ stats = {}, recentInquiries = [], recentNews = [] }) {
    const { props = {} } = usePage();
    const { auth = {}, siteSettings = {} } = props;
    const userRoles = auth?.user?.roles || [];

    const kpis = [
        { 
            label: 'Pesan & RFQ Masuk', 
            value: stats.totalInquiries ?? 0, 
            badge: stats.unreadInquiries ? `${stats.unreadInquiries} Pesan Baru` : 'Semua Terbaca', 
            icon: Inbox, 
            gradient: 'from-emerald-500 to-teal-700',
            bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            iconBg: 'bg-emerald-500/10 text-emerald-600',
            link: '/admin/inquiries',
            trend: '+100% Responsif'
        },
        { 
            label: 'Katalog Produk Aktif', 
            value: stats.totalProducts ?? 0, 
            badge: 'Terkatalog', 
            icon: Package, 
            gradient: 'from-blue-500 to-indigo-700',
            bgLight: 'bg-blue-50 text-blue-700 border-blue-200',
            iconBg: 'bg-blue-500/10 text-blue-600',
            link: '/admin/products',
            trend: 'Presisi Cold Forging'
        },
        { 
            label: 'Mesin & Peralatan', 
            value: stats.totalEquipment ?? 0, 
            badge: 'Fasilitas Pabrik', 
            icon: Cog, 
            gradient: 'from-amber-500 to-orange-700',
            bgLight: 'bg-amber-50 text-amber-700 border-amber-200',
            iconBg: 'bg-amber-500/10 text-amber-600',
            link: '/admin/equipment',
            trend: 'Standar Industri Jepang'
        },
        { 
            label: 'Berita & Pengumuman', 
            value: stats.totalNews ?? 0, 
            badge: 'Terpublikasi', 
            icon: Newspaper, 
            gradient: 'from-purple-500 to-pink-700',
            bgLight: 'bg-purple-50 text-purple-700 border-purple-200',
            iconBg: 'bg-purple-500/10 text-purple-600',
            link: '/admin/news',
            trend: 'Update Berkala'
        },
    ];

    const quickActions = [
        { label: 'Tambah Produk', desc: 'Unggah komponen presisi baru', href: '/admin/products', icon: Package, color: 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white' },
        { label: 'Tulis Berita', desc: 'Publikasi artikel / info karir', href: '/admin/news', icon: Newspaper, color: 'bg-blue-500/10 text-blue-600 hover:bg-blue-600 hover:text-white' },
        { label: 'Banner & Video Tiap Menu', desc: 'Edit teks & sematkan video YouTube', href: '/admin/page-banners', icon: LayoutTemplate, color: 'bg-purple-500/10 text-purple-600 hover:bg-purple-600 hover:text-white' },
        { label: 'Alur Proses Produksi', desc: 'Atur 5 tahapan manufaktur', href: '/admin/production-processes', icon: Workflow, color: 'bg-amber-500/10 text-amber-600 hover:bg-amber-600 hover:text-white' },
        { label: 'Kelola Pengguna', desc: 'Role Spatie & hak akses staf', href: '/admin/users', icon: Users, color: 'bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white' },
        { label: 'Pengaturan Situs', desc: 'Kontak, logo, & konfigurasi', href: '/admin/settings', icon: Settings, color: 'bg-slate-500/10 text-slate-700 hover:bg-slate-800 hover:text-white' },
    ];

    return (
        <AdminLayout title="Dashboard Overview">
            <Head title="Admin Dashboard | PT. Sugiyama Indonesia" />

            <div className="space-y-8 pb-10">
                {/* 1. Metronic Executive Welcome Hero Card */}
                <div className="bg-gradient-to-r from-[#1e1e2d] via-[#232338] to-[#151521] text-white p-7 sm:p-9 rounded-3xl relative overflow-hidden border border-slate-700/60 shadow-xl">
                    {/* Decorative Background Elements */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>SUGIYAMA ENTERPRISE CMS v2.5</span>
                                </span>
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-slate-300 border border-white/10">
                                    IATF 16949 / ISO 9001
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                                Selamat Datang Kembali, <span className="text-emerald-400">{auth?.user?.name || 'Administrator'}</span>!
                            </h1>

                            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal">
                                Portal kontrol sentral PT. Sugiyama Indonesia. Seluruh katalog produk, alur proses manufaktur, banner tiap halaman, dan pesan penawaran terintegrasi secara real-time.
                            </p>

                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                <Link
                                    href="/admin/inquiries"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                                >
                                    <Inbox className="w-4 h-4" />
                                    <span>Cek Pesan / RFQ Masuk</span>
                                    {stats.unreadInquiries > 0 && (
                                        <span className="w-5 h-5 rounded-full bg-white text-emerald-900 font-extrabold text-[10px] flex items-center justify-center">
                                            {stats.unreadInquiries}
                                        </span>
                                    )}
                                </Link>

                                <a
                                    href="/update.php"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all"
                                >
                                    <span>⚡ 1-Click Update Server</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Server Status Pill Box */}
                        <div className="p-4 rounded-2xl bg-[#151521]/90 border border-white/10 space-y-2.5 shrink-0 min-w-[220px]">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400 font-semibold">Server & Database:</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                    Online
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400 font-semibold">Hak Akses Login:</span>
                                <span className="text-amber-300 font-bold uppercase text-[11px]">
                                    {userRoles[0] || 'Super Admin'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400 font-semibold">Bahasa Aktif:</span>
                                <span className="text-white font-mono text-[11px] font-bold">ID / JP / EN</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Metronic 4 KPI Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {kpis.map((kpi, idx) => {
                        const Icon = kpi.icon;
                        return (
                            <Link
                                key={idx}
                                href={kpi.link}
                                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group relative overflow-hidden"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                            {kpi.label}
                                        </p>
                                        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-display">
                                            {kpi.value}
                                        </p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-2xl ${kpi.iconBg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="pt-5 flex items-center justify-between border-t border-slate-100 mt-4">
                                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${kpi.bgLight}`}>
                                        {kpi.badge}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-medium group-hover:text-emerald-600 flex items-center gap-1 transition-colors">
                                        <span>Lihat Detail</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* 3. Metronic Quick Action Launchpad */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <h2 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                                Launchpad Aksi Cepat
                            </h2>
                        </div>
                        <span className="text-xs text-slate-400 font-semibold">Pintasan Cepat CMS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                        {quickActions.map((action, aIdx) => {
                            const ActionIcon = action.icon;
                            return (
                                <Link
                                    key={aIdx}
                                    href={action.href}
                                    className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 hover:border-slate-300 transition-all flex flex-col justify-between group cursor-pointer"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center transition-colors mb-3 shadow-2xs`}>
                                        <ActionIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                                            {action.label}
                                        </p>
                                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                                            {action.desc}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* 4. Split Tables: Recent Inquiries & Recent News */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left 7 Cols: Recent Inquiries / RFQs */}
                    <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                                        <Inbox className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-sm text-slate-900">
                                            Permintaan Penawaran (RFQ) & Pesan Terbaru
                                        </h3>
                                        <p className="text-[11px] text-slate-400">
                                            Kotak masuk dari calon klien & mitra industri
                                        </p>
                                    </div>
                                </div>
                                <Link 
                                    href="/admin/inquiries" 
                                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 hover:bg-emerald-100 transition-all"
                                >
                                    <span>Lihat Semua</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {recentInquiries.length > 0 ? (
                                <div className="divide-y divide-slate-100 mt-2">
                                    {recentInquiries.map((inq) => {
                                        const isUnread = inq.status === 'unread';
                                        return (
                                            <Link
                                                key={inq.id}
                                                href={`/admin/inquiries/${inq.id}`}
                                                className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-3 rounded-2xl transition-colors block group"
                                            >
                                                <div className="space-y-1 min-w-0 pr-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                                                            isUnread ? 'bg-emerald-600 animate-pulse' : 'bg-slate-300'
                                                        }`} />
                                                        <span className="text-xs font-extrabold text-slate-900 truncate">
                                                            {inq.name}
                                                        </span>
                                                        {inq.company_name && (
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 truncate max-w-[140px]">
                                                                {inq.company_name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-600 line-clamp-1 group-hover:text-slate-900 transition-colors">
                                                        {inq.subject || inq.message}
                                                    </p>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border ${
                                                        isUnread 
                                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                                            : 'bg-slate-100 text-slate-600 border-slate-200'
                                                    }`}>
                                                        {inq.status}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-12 text-center space-y-2">
                                    <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
                                    <p className="text-xs text-slate-500 font-semibold">Belum ada pesan RFQ masuk.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right 5 Cols: Recent News & Corporate Activity */}
                    <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                                        <Newspaper className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-sm text-slate-900">
                                            Publikasi & Berita
                                        </h3>
                                        <p className="text-[11px] text-slate-400">
                                            Artikel & agenda korporat terbaru
                                        </p>
                                    </div>
                                </div>
                                <Link 
                                    href="/admin/news" 
                                    className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200/60 hover:bg-purple-100 transition-all"
                                >
                                    <span>Kelola</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {recentNews.length > 0 ? (
                                <div className="divide-y divide-slate-100 mt-2">
                                    {recentNews.map((news) => (
                                        <Link
                                            key={news.id}
                                            href="/admin/news"
                                            className="py-3 flex items-center gap-3 hover:bg-slate-50 px-2 rounded-2xl transition-colors block group"
                                        >
                                            {news.cover_image ? (
                                                <img 
                                                    src={news.cover_image} 
                                                    alt={news.title} 
                                                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100 group-hover:scale-105 transition-transform" 
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                                                    <Newspaper className="w-5 h-5" />
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-bold text-slate-900 truncate group-hover:text-purple-700 transition-colors">
                                                    {news.title}
                                                </p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">
                                                    {news.published_at || 'Terbit'}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center space-y-2">
                                    <Newspaper className="w-10 h-10 text-slate-300 mx-auto" />
                                    <p className="text-xs text-slate-500 font-semibold">Belum ada berita terpublikasi.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
