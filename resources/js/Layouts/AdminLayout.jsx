import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
    LayoutDashboard, Image, BarChart3, Cpu, Briefcase, 
    Cog, Package, FolderTree, Building2, Newspaper, 
    UserCheck, Inbox, Settings, LogOut, Menu, X, 
    CheckCircle2, AlertCircle, ExternalLink, ChevronRight, User, ShieldCheck, LayoutTemplate, Workflow,
    Users, KeyRound, Crown, Feather, Search, Bell, Calendar, Sparkles, Plus, ArrowUpRight
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Dashboard Overview' }) {
    const { url = '', props = {} } = usePage();
    const { auth = {}, flash = {}, siteSettings = {} } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [currentTime, setCurrentTime] = useState('');

    const userRoles = auth?.user?.roles || [];
    const isSuperAdmin = userRoles.includes('Super Admin') || userRoles.length === 0;
    const isEditor = userRoles.includes('Editor') && !isSuperAdmin && !userRoles.includes('Admin');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
            setCurrentTime(now.toLocaleDateString('id-ID', options));
        };
        updateClock();
    }, []);

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

    useEffect(() => {
        const faviconUrl = siteSettings?.site_favicon || siteSettings?.site_logo;
        if (faviconUrl) {
            const links = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']");
            links.forEach(el => { el.href = faviconUrl; });
        }
    }, [siteSettings]);

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const currentUrl = url || '';

    // Metronic Categorized Navigation
    const menuGroups = [
        {
            groupTitle: 'UTAMA & IKHTISAR',
            items: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, active: currentUrl === '/admin/dashboard', minRole: 'Editor' },
            ]
        },
        {
            groupTitle: 'MANUFAKTUR & PRODUK',
            items: [
                { name: 'Katalog Produk', href: '/admin/products', icon: Package, active: currentUrl.startsWith('/admin/products'), minRole: 'Editor' },
                { name: 'Kategori Produk', href: '/admin/product-categories', icon: FolderTree, active: currentUrl.startsWith('/admin/product-categories'), minRole: 'Editor' },
                { name: 'Proses Produksi', href: '/admin/production-processes', icon: Workflow, active: currentUrl.startsWith('/admin/production-processes'), minRole: 'Admin' },
                { name: 'Mesin & Peralatan', href: '/admin/equipment', icon: Cog, active: currentUrl.startsWith('/admin/equipment'), minRole: 'Admin' },
                { name: 'Pilar Teknologi', href: '/admin/technologies', icon: Cpu, active: currentUrl.startsWith('/admin/technologies'), minRole: 'Admin' },
                { name: 'Unit Bisnis', href: '/admin/business-units', icon: Briefcase, active: currentUrl.startsWith('/admin/business-units'), minRole: 'Admin' },
            ]
        },
        {
            groupTitle: 'KONTEN & TAMPILAN',
            items: [
                { name: 'Hero Sliders', href: '/admin/hero', icon: Image, active: currentUrl.startsWith('/admin/hero'), minRole: 'Admin' },
                { name: 'Banner Halaman & Video', href: '/admin/page-banners', icon: LayoutTemplate, active: currentUrl.startsWith('/admin/page-banners'), minRole: 'Admin' },
                { name: 'Statistik & Metrik', href: '/admin/stats', icon: BarChart3, active: currentUrl.startsWith('/admin/stats'), minRole: 'Admin' },
                { name: 'Profil Perusahaan', href: '/admin/company-profile', icon: Building2, active: currentUrl.startsWith('/admin/company-profile'), minRole: 'Admin' },
                { name: 'Berita & Update', href: '/admin/news', icon: Newspaper, active: currentUrl.startsWith('/admin/news'), minRole: 'Editor' },
                { name: 'Lowongan Karir', href: '/admin/careers', icon: UserCheck, active: currentUrl.startsWith('/admin/careers'), minRole: 'Editor' },
            ]
        },
        {
            groupTitle: 'ADMINISTRASI & SISTEM',
            items: [
                { name: 'Kotak Masuk / RFQ', href: '/admin/inquiries', icon: Inbox, active: currentUrl.startsWith('/admin/inquiries'), minRole: 'Admin' },
                { name: 'Kelola Pengguna', href: '/admin/users', icon: Users, active: currentUrl.startsWith('/admin/users'), minRole: 'Super Admin' },
                { name: 'Pengaturan Situs', href: '/admin/settings', icon: Settings, active: currentUrl.startsWith('/admin/settings'), minRole: 'Super Admin' },
                { name: 'Profil & Password', href: '/admin/profile', icon: KeyRound, active: currentUrl.startsWith('/admin/profile'), minRole: 'Editor' },
            ]
        }
    ];

    const getRoleBadge = (roles) => {
        if (roles.includes('Super Admin')) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-400/15 text-amber-400 border border-amber-400/30">
                    <Crown className="w-3 h-3 text-amber-400" />
                    <span>SUPER ADMIN</span>
                </span>
            );
        }
        if (roles.includes('Admin')) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-400/15 text-emerald-400 border border-emerald-400/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>ADMIN</span>
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-sky-400/15 text-sky-400 border border-sky-400/30">
                <Feather className="w-3 h-3 text-sky-400" />
                <span>EDITOR</span>
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-[#f4f6fa] text-slate-800 antialiased font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
            {/* Mobile Top Header (Metronic Dark Bar) */}
            <div className="lg:hidden bg-[#1e1e2d] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-50 border-b border-[#2b2b40] shadow-md">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#2b2b40] transition-colors cursor-pointer"
                        aria-label="Open sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2.5">
                        {siteSettings?.site_logo ? (
                            <img src={siteSettings.site_logo} alt="Logo" className="w-8 h-8 rounded-xl object-contain bg-white/10 p-1 border border-white/10" />
                        ) : (
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white text-xs shadow-md">
                                <span>S</span>
                            </div>
                        )}
                        <div>
                            <span className="font-extrabold text-sm text-white tracking-tight block leading-tight">
                                {siteSettings?.site_name || 'Sugiyama CMS'}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                                METRONIC v8.2
                            </span>
                        </div>
                    </div>
                </div>

                <a
                    href="/"
                    target="_blank"
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#2b2b40] transition-colors"
                    title="Buka Website Publik"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div 
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-[#090a0f]/80 z-50 lg:hidden backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
                />
            )}

            {/* Metronic Enterprise Sidebar (Fixed on Desktop) */}
            <aside 
                className={`fixed top-0 left-0 bottom-0 w-68 lg:w-72 bg-[#1e1e2d] text-slate-300 z-50 flex flex-col transition-transform duration-300 ease-in-out border-r border-[#2b2b40] shadow-2xl ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Brand Header */}
                <div className="h-18 px-5 border-b border-[#2b2b40] flex items-center justify-between shrink-0 bg-[#151521]">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 min-w-0 group">
                        {siteSettings?.site_logo ? (
                            <img src={siteSettings.site_logo} alt="Logo" className="w-9 h-9 rounded-xl object-contain bg-white/10 p-1 border border-white/10 shadow-md shrink-0 group-hover:scale-105 transition-transform" />
                        ) : (
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-white text-base shadow-lg shadow-emerald-500/20 shrink-0">
                                <span>S</span>
                            </div>
                        )}
                        <div className="min-w-0">
                            <h1 className="font-extrabold text-sm tracking-tight text-white truncate group-hover:text-emerald-400 transition-colors">
                                {siteSettings?.site_name || 'PT Sugiyama'}
                            </h1>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400"></span>
                                <p className="text-[10px] text-emerald-400 font-extrabold tracking-wider uppercase">
                                    Enterprise Portal
                                </p>
                            </div>
                        </div>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#2b2b40] cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Metronic Scrollable Menu Navigation */}
                <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#2b2b40] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#363654]">
                    {menuGroups.map((group, gIdx) => {
                        const filteredItems = group.items.filter(item => {
                            if (isSuperAdmin) return true;
                            if (item.minRole === 'Super Admin') return false;
                            if (isEditor && item.minRole === 'Admin') return false;
                            return true;
                        });

                        if (filteredItems.length === 0) return null;

                        return (
                            <div key={gIdx} className="space-y-1">
                                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#565674] flex items-center justify-between">
                                    <span>{group.groupTitle}</span>
                                </div>

                                {filteredItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                                                item.active
                                                    ? 'bg-[#252538] text-white font-bold shadow-md shadow-black/20 border-l-[3px] border-emerald-500 pl-2.5'
                                                    : 'text-[#92929f] hover:text-white hover:bg-[#252538]/60'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                                    item.active 
                                                        ? 'bg-emerald-500/15 text-emerald-400' 
                                                        : 'bg-white/5 text-[#92929f] group-hover:bg-white/10 group-hover:text-slate-200'
                                                }`}>
                                                    <Icon className="w-4 h-4 shrink-0" />
                                                </div>
                                                <span className="truncate">{item.name}</span>
                                            </div>

                                            {item.active ? (
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 shrink-0"></div>
                                            ) : (
                                                <ChevronRight className="w-3.5 h-3.5 text-[#4c4e6f] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 -translate-x-1 group-hover:translate-x-0" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        );
                    })}
                </nav>

                {/* Metronic Sidebar Footer (User Card & Direct Link) */}
                <div className="p-3.5 border-t border-[#2b2b40] bg-[#151521] shrink-0 space-y-2.5">
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-[#252538]/70 hover:bg-[#252538] transition-colors border border-white/5 group"
                    >
                        <span className="flex items-center gap-2">
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span>Kunjungi Website Publik</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#727288] group-hover:text-white transition-colors" />
                    </a>

                    <div className="pt-2 flex items-center justify-between px-1">
                        <Link 
                            href="/admin/profile" 
                            className="flex items-center gap-2.5 min-w-0 hover:opacity-85 transition-opacity"
                            title="Buka Pengaturan Profil & Kata Sandi"
                        >
                            <div className="relative shrink-0">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-black text-xs shadow-md border border-white/10">
                                    {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#151521]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-100 truncate">
                                    {auth?.user?.name || 'Administrator'}
                                </p>
                                <div className="mt-0.5">
                                    {getRoleBadge(userRoles)}
                                </div>
                            </div>
                        </Link>

                        <button
                            onClick={handleLogout}
                            title="Logout / Keluar"
                            className="p-2 rounded-xl text-[#727288] hover:text-rose-400 hover:bg-[#252538] transition-colors shrink-0 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Container (Pushed right by sidebar on desktop) */}
            <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
                {/* Metronic Top Header Navbar */}
                <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        
                        {/* Breadcrumbs & Title */}
                        <div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                                <Link href="/admin/dashboard" className="hover:text-emerald-600 transition-colors">Portal</Link>
                                <ChevronRight className="w-3 h-3 text-slate-300" />
                                <span className="text-slate-600">{title}</span>
                            </div>
                            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                <span>{title}</span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Current Date Badge */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{currentTime}</span>
                        </div>

                        {/* Direct Site Link Button */}
                        <a
                            href="/"
                            target="_blank"
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 text-xs font-bold transition-all border border-emerald-200/80 shadow-2xs cursor-pointer"
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Lihat Website</span>
                        </a>

                        {/* User Quick Dropdown Button */}
                        <Link
                            href="/admin/profile"
                            className="inline-flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                            title="Buka Pengaturan Akun"
                        >
                            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                                {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                                    {auth?.user?.name || 'Admin'}
                                </p>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                                    {userRoles[0] || 'Administrator'}
                                </span>
                            </div>
                        </Link>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all cursor-pointer"
                            title="Keluar / Logout"
                        >
                            <LogOut className="w-4 h-4" />
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
                                className="p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Body with Soft Metronic Canvas */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1600px] w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
