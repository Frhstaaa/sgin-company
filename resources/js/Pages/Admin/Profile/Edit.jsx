import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    User, Lock, KeyRound, Save, CheckCircle2, 
    ShieldCheck, Mail, ShieldAlert, Sparkles 
} from 'lucide-react';

export default function AdminProfileEdit({ user = {} }) {
    // Form 1: Profile Info
    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    // Form 2: Password Update
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.put('/admin/profile', {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/admin/profile/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AdminLayout title="Profil & Ganti Kata Sandi">
            <Head title="Profil Akun & Ganti Password | Sugiyama CMS" />

            <div className="max-w-4xl mx-auto space-y-8 pb-12">
                {/* Header Action Bar */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-emerald-950/20">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                                <span>Pengaturan Akun & Keamanan</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    {user.role || 'Administrator'}
                                </span>
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Login sebagai <strong className="text-slate-700">{user.email}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 1. Profile Information */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center gap-2.5">
                                <User className="w-5 h-5 text-emerald-600" />
                                <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                    Informasi Profil
                                </h2>
                            </div>

                            <form id="profile-form" onSubmit={handleProfileSubmit} className="p-6 space-y-4">
                                {profileForm.recentlySuccessful && (
                                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span>Profil berhasil diperbarui!</span>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={profileForm.data.name}
                                            onChange={(e) => profileForm.setData('name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                        />
                                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                    </div>
                                    {profileForm.errors.name && <p className="text-rose-500 text-xs mt-1">{profileForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Alamat Email Login
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={profileForm.data.email}
                                            onChange={(e) => profileForm.setData('email', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                        />
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                    </div>
                                    {profileForm.errors.email && <p className="text-rose-500 text-xs mt-1">{profileForm.errors.email}</p>}
                                </div>
                            </form>
                        </div>

                        <div className="p-6 pt-0">
                            <button
                                type="submit"
                                form="profile-form"
                                disabled={profileForm.processing}
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                <span>{profileForm.processing ? 'Menyimpan...' : 'Simpan Profil'}</span>
                            </button>
                        </div>
                    </div>

                    {/* 2. Change Password */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center gap-2.5">
                                <KeyRound className="w-5 h-5 text-emerald-600" />
                                <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                    Ganti Kata Sandi
                                </h2>
                            </div>

                            <form id="password-form" onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                                {passwordForm.recentlySuccessful && (
                                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span>Kata sandi berhasil diganti!</span>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Kata Sandi Saat Ini <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            placeholder="Masukkan kata sandi lama..."
                                            value={passwordForm.data.current_password}
                                            onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                        />
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                    </div>
                                    {passwordForm.errors.current_password && (
                                        <p className="text-rose-500 text-xs mt-1">{passwordForm.errors.current_password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Kata Sandi Baru <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            placeholder="Minimal 6 karakter..."
                                            value={passwordForm.data.password}
                                            onChange={(e) => passwordForm.setData('password', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                        />
                                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                    </div>
                                    {passwordForm.errors.password && (
                                        <p className="text-rose-500 text-xs mt-1">{passwordForm.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Konfirmasi Kata Sandi Baru <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            placeholder="Ulangi kata sandi baru..."
                                            value={passwordForm.data.password_confirmation}
                                            onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                        />
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-6 pt-0">
                            <button
                                type="submit"
                                form="password-form"
                                disabled={passwordForm.processing}
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                            >
                                <Lock className="w-4 h-4 text-emerald-400" />
                                <span>{passwordForm.processing ? 'Mengubah...' : 'Perbarui Kata Sandi'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
