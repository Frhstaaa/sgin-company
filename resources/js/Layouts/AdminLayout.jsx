import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
    LayoutDashboard, Image, BarChart3, Cpu, Briefcase, 
    Cog, Package, FolderTree, Building2, Newspaper, 
    UserCheck, Inbox, Settings, LogOut, Menu, X, 
    CheckCircle2, AlertCircle, ExternalLink, ChevronRight, User, ShieldCheck
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Admin Dashboard' }) {
    const { url = '', props = {} } = usePage();
    const { auth, flash, siteSettings } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setToast({ type: 'success', message: flash.success });
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setToast({ type: 'error', message: flash.error });
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const currentUrl = url || '';

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, active: currentUrl === '/admin/dashboard' },
        { name: 'Hero Sliders', href: '/admin/hero', icon: Image, active: currentUrl.startsWith('/admin/hero') },
        { name: 'Statistik', href: '/admin/stats', icon: BarChart3, active: currentUrl.startsWith('/admin/stats') },
        { name: 'Pilar Teknologi', href: '/admin/technologies', icon: Cpu, active: currentUrl.startsWith('/admin/technologies') },
        { name: 'Unit Bisnis', href: '/admin/business-units', icon: Briefcase, active: currentUrl.startsWith('/admin/business-units') },
        { name: 'Mesin & Peralatan', href: '/admin/equipment', icon: Cog, active: currentUrl.startsWith('/admin/equipment') },
        { name: 'Kategori Produk', href: '/admin/product-categories', icon: FolderTree, active: currentUrl.startsWith('/admin/product-categories') },
        { name: 'Katalog Produk', href: '/admin/products', icon: Package, active: currentUrl.startsWith('/admin/products') },
        { name: 'Profil Perusahaan', href: '/admin/company-profile', icon: Building2, active: currentUrl.startsWith('/admin/company-profile') },
        { name: 'Berita & Update', href: '/admin/news', icon: Newspaper, active: currentUrl.startsWith('/admin/news') },
        { name: 'Lowongan Karir', href: '/admin/careers', icon: UserCheck, active: currentUrl.startsWith('/admin/careers') },
        { name: 'Kotak Masuk / RFQ', href: '/admin/inquiries', icon: Inbox, active: currentUrl.startsWith('/admin/inquiries') },
        { name: 'Pengaturan Situs', href: '/admin/settings', icon: Settings, active: currentUrl.startsWith('/admin/settings') },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col">
            {/* Mobile Top Header */}
            <div className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-slate-800 shadow-md">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        aria-label="Open sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        {siteSettings?.site_logo ? (
                            <img src={siteSettings.site_logo} alt="Logo" className="w-7 h-7 rounded-md object-contain bg-white p-0.5" />
                        ) : (
                            <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                                <span>S</span>
                            </div>
                        )}
                        <span className="font-bold text-sm text-white truncate max-w-[160px]">
                            {siteSettings?.site_name || 'Sugiyama CMS'}
                        </span>
                    </div>
                </div>
                <a
                    href="/"
                    target="_blank"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    title="Lihat Website"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div 
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-950/70 z-50 lg:hidden backdrop-blur-xs transition-opacity"
                />
            )}

            {/* Sidebar (Fixed on Desktop) */}
            <aside 
                className={`fixed top-0 left-0 bottom-0 w-64 lg:w-72 bg-[#0b132b] text-slate-300 z-50 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800/80 shadow-2xl ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Brand Header */}
                <div className="p-5 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-[#070d1e]">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 min-w-0">
                        {siteSettings?.site_logo ? (
                            <img src={siteSettings.site_logo} alt="Logo" className="w-9 h-9 rounded-xl object-contain bg-white p-1 shadow-md shrink-0" />
                        ) : (
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-black text-white text-base shadow-md shrink-0">
                                <span>S</span>
                            </div>
                        )}
                        <div className="min-w-0">
                            <h1 className="font-extrabold text-sm tracking-tight text-white truncate">
                                {siteSettings?.site_name || 'PT Sugiyama'}
                            </h1>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <p className="text-[11px] text-emerald-400 font-semibold tracking-wide">
                                    CMS Management
                                </p>
                            </div>
                        </div>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links (Scrollable) */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Menu Utama
                    </div>
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                                    item.active
                                        ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/20 shadow-xs'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                                }`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                                        item.active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                                    }`} />
                                    <span className="truncate">{item.name}</span>
                                </div>
                                {item.active && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Bottom Profile Section */}
                <div className="p-3.5 border-t border-slate-800/80 bg-[#070d1e] shrink-0 space-y-2.5">
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700/40"
                    >
                        <span className="flex items-center gap-2">
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Lihat Website Publik</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </a>

                    <div className="pt-2 flex items-center justify-between px-1">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold text-xs">
                                <User className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-200 truncate">
                                    {auth?.user?.name || 'Administrator'}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                    {auth?.user?.email || 'admin@sugiyama.co.id'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            title="Logout / Keluar"
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Container (Pushed right by sidebar on desktop) */}
            <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
                {/* Top Sticky Header */}
                <header className="bg-white border-b border-slate-200/90 py-4 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                                {title}
                            </h2>
                            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                                PT. Sugiyama Indonesia Admin Portal
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all border border-emerald-200/60"
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Buka Situs</span>
                        </a>

                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-bold transition-all border border-slate-200 hover:border-rose-200"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Keluar</span>
                        </button>
                    </div>
                </header>

                {/* Toast Notification */}
                {toast && (
                    <div className="fixed top-20 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className={`p-4 rounded-2xl shadow-xl flex items-start gap-3 border ${
                            toast.type === 'success' 
                                ? 'bg-emerald-50 text-emerald-950 border-emerald-200 shadow-emerald-900/10' 
                                : 'bg-rose-50 text-rose-950 border-rose-200 shadow-rose-900/10'
                        }`}>
                            {toast.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 text-xs font-bold leading-relaxed">
                                {toast.message}
                            </div>
                            <button
                                onClick={() => setToast(null)}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Body */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
