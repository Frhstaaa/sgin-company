import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
    LayoutDashboard, Image, BarChart3, Cpu, Briefcase, 
    Cog, Package, FolderTree, Building2, Newspaper, 
    UserCheck, Inbox, Settings, LogOut, Menu, X, 
    CheckCircle2, AlertCircle, ExternalLink, ChevronRight, User
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
        { name: 'Teknologi', href: '/admin/technologies', icon: Cpu, active: currentUrl.startsWith('/admin/technologies') },
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
        <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800 antialiased font-sans">
            {/* Mobile Header */}
            <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                    {siteSettings?.site_logo ? (
                        <img src={siteSettings.site_logo} alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-white p-0.5" />
                    ) : (
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                            <span>S</span>
                        </div>
                    )}
                    <span className="font-bold text-sm truncate max-w-[150px]">{siteSettings?.site_name || 'Sugiyama CMS'}</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 md:bottom-auto md:sticky md:top-0 h-screen z-50 w-64 shrink-0 bg-[#0f172a] text-slate-300 flex flex-col transition-transform duration-300 shadow-xl ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                {/* Brand / Logo */}
                <div className="p-5 border-b border-slate-800/60 flex items-center justify-between shrink-0">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 min-w-0">
                        {siteSettings?.site_logo ? (
                            <img src={siteSettings.site_logo} alt="Logo" className="w-9 h-9 rounded-xl object-contain bg-white p-1 shadow-md shadow-emerald-900/20 shrink-0" />
                        ) : (
                            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-white text-lg shadow-md shadow-emerald-900/20 shrink-0">
                                <span>S</span>
                            </div>
                        )}
                        <div className="min-w-0">
                            <h1 className="font-bold text-sm tracking-tight text-white truncate">
                                {siteSettings?.site_name || 'Sugiyama CMS'}
                            </h1>
                            <p className="text-[10px] text-emerald-400 font-medium tracking-wider truncate">
                                Admin Panel
                            </p>
                        </div>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden p-1 rounded-md text-slate-400 hover:text-white shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                                    item.active
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                            >
                                <Icon className={`w-4 h-4 shrink-0 ${item.active ? 'text-emerald-400' : 'text-slate-500'}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Bottom Profile & Quick Links */}
                <div className="p-4 border-t border-slate-800/60 bg-[#0f172a] shrink-0 space-y-3">
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            <span>Lihat Website</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </a>

                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between px-1">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 border border-slate-700">
                                <User className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[13px] font-semibold text-slate-200 truncate">{auth?.user?.name || 'Administrator'}</p>
                                <p className="text-[10px] text-slate-500 truncate">{auth?.user?.email || 'admin@sugiyama.co.id'}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            title="Keluar"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Backdrop for mobile */}
            {sidebarOpen && (
                <div 
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-950/60 z-40 md:hidden backdrop-blur-xs"
                />
            )}

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="bg-white border-b border-slate-200 py-3.5 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
                    <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                            {title}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Kunjungi Situs</span>
                        </a>

                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>

                {/* Toast Notification */}
                {toast && (
                    <div className="fixed top-16 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className={`p-4 rounded-xl shadow-xl flex items-start gap-3 border ${
                            toast.type === 'success' 
                                ? 'bg-emerald-50 text-emerald-950 border-emerald-200' 
                                : 'bg-rose-50 text-rose-950 border-rose-200'
                        }`}>
                            {toast.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 text-xs font-semibold leading-relaxed">
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

                {/* Main Content Area */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
