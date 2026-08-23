import React, { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    Users, UserPlus, Shield, Key, Edit2, Trash2, X, Save, 
    CheckCircle2, AlertCircle, Lock, Mail, User, ShieldCheck, 
    Crown, Feather, Info
} from 'lucide-react';

export default function AdminUsersIndex({ users = [], roles = [] }) {
    const { auth = {} } = usePage().props;
    const currentUserId = auth?.user?.id;

    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'Admin',
    });

    const openCreateModal = () => {
        setEditingUser(null);
        clearErrors();
        reset();
        setData({
            name: '',
            email: '',
            password: '',
            role: 'Admin',
        });
        setModalOpen(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        clearErrors();
        setData({
            name: user.name || '',
            email: user.email || '',
            password: '',
            role: user.role || 'Admin',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            put(`/admin/users/${editingUser.id}`, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/users', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (user) => {
        if (user.id === currentUserId) {
            alert('Anda tidak dapat menghapus akun Anda sendiri.');
            return;
        }

        if (confirm(`Apakah Anda yakin ingin menghapus pengguna "${user.name}" (${user.email})?`)) {
            router.delete(`/admin/users/${user.id}`);
        }
    };

    const getRoleBadge = (roleName) => {
        switch (roleName) {
            case 'Super Admin':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                        <Crown className="w-3.5 h-3.5 text-amber-600" />
                        <span>Super Admin</span>
                    </span>
                );
            case 'Admin':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Admin</span>
                    </span>
                );
            case 'Editor':
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs">
                        <Feather className="w-3.5 h-3.5 text-sky-600" />
                        <span>Editor</span>
                    </span>
                );
        }
    };

    return (
        <AdminLayout title="Manajemen Pengguna & Role">
            <Head title="Manajemen Pengguna & Hak Akses | Sugiyama CMS" />

            <div className="max-w-6xl mx-auto space-y-8 pb-12">
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <Users className="w-6 h-6 text-emerald-600" />
                            <span>Manajemen Pengguna & Role Permission</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Kelola staf administrator yang memiliki izin mengelola konten dan konfigurasi website.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all cursor-pointer shrink-0"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Tambah Pengguna Baru</span>
                    </button>
                </div>

                {/* Role Explanations Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                        <Crown className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-0.5">
                            <p className="font-bold text-amber-900">Peran: Super Admin</p>
                            <p className="text-amber-800/80 leading-relaxed">
                                Hak akses 100% penuh: Tambah/hapus user, pengaturan website, edit banner, dan seluruh modul konten.
                            </p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-0.5">
                            <p className="font-bold text-emerald-900">Peran: Admin</p>
                            <p className="text-emerald-800/80 leading-relaxed">
                                Mengelola seluruh konten produk, proses produksi, mesin, teknologi, berita, karir, & pesan RFQ.
                            </p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex items-start gap-3">
                        <Feather className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-0.5">
                            <p className="font-bold text-sky-900">Peran: Editor</p>
                            <p className="text-sky-800/80 leading-relaxed">
                                Hak akses terbatas untuk mempublikasikan Berita Korporat, Lowongan Karir, dan Katalog Produk.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Daftar Pengguna Terdaftar ({users.length})
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3.5">Nama & Pengguna</th>
                                    <th className="px-6 py-3.5">Email Akun</th>
                                    <th className="px-6 py-3.5">Peran / Role</th>
                                    <th className="px-6 py-3.5">Terdaftar</th>
                                    <th className="px-6 py-3.5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((u) => {
                                    const isCurrent = u.id === currentUserId;

                                    return (
                                        <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                                                        {u.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 flex items-center gap-2">
                                                            <span>{u.name}</span>
                                                            {isCurrent && (
                                                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                                                                    Akun Anda
                                                                </span>
                                                            )}
                                                        </p>
                                                        <span className="text-[11px] text-slate-400">ID: #{u.id}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 font-mono text-slate-600">
                                                {u.email}
                                            </td>

                                            <td className="px-6 py-4">
                                                {getRoleBadge(u.role)}
                                            </td>

                                            <td className="px-6 py-4 text-slate-500">
                                                {u.created_at || '-'}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(u)}
                                                        className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
                                                        title="Edit Pengguna & Peran"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>

                                                    {!isCurrent && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(u)}
                                                            className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer"
                                                            title="Hapus Pengguna"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create / Edit User Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <Users className="w-5 h-5 text-emerald-700" />
                                <h3 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                                    {editingUser ? `Edit Pengguna: ${editingUser.name}` : 'Tambah Pengguna Administrator Baru'}
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
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Nama Lengkap <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Budi Santoso / Tanaka Hiroshi"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-semibold"
                                    />
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                </div>
                                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Alamat Email Login <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="email.staf@sugiyama.co.id"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                                    />
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                </div>
                                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    {editingUser ? 'Kata Sandi Baru (Kosongkan jika tidak ingin diubah)' : 'Kata Sandi Awal *'}
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required={!editingUser}
                                        placeholder={editingUser ? '••••••••' : 'Minimal 6 karakter...'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                </div>
                                {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Penetapan Peran (Role Spatie) <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                >
                                    <option value="Super Admin">👑 Super Admin (Akses Penuh Semua Modul & Pengaturan)</option>
                                    <option value="Admin">🛡️ Admin (Seluruh Konten, Banners, Produk, Berita & Pesan)</option>
                                    <option value="Editor">✍️ Editor (Hanya Berita, Karir & Katalog Produk)</option>
                                </select>
                            </div>

                            {/* Submit Buttons */}
                            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{processing ? 'Menyimpan...' : 'Simpan Pengguna'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
