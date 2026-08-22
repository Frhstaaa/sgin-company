import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: 'admin@sagayama.co.jp',
        password: 'password123',
        remember: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            <Head title="Admin CMS Login | Sagayama Precision" />

            <div className="absolute inset-0 bg-[radial-gradient(#007155_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-white text-3xl mx-auto shadow-xl shadow-emerald-950/60">
                    <span className="font-jp">サ</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Sagayama CMS Portal
                </h2>
                <p className="text-xs text-emerald-400 font-semibold tracking-wider uppercase">
                    Panel Manajemen Konten Perusahaan
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-100 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Email Administrator
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                />
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            </div>
                            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                />
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            </div>
                            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center text-xs text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-2"
                                />
                                Ingat sesi login
                            </label>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <span>{processing ? 'Memverifikasi...' : 'Masuk ke CMS Dashboard'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                        <p className="font-bold">Kredensial Default Demo:</p>
                        <p>Email: <strong className="font-mono">admin@sagayama.co.jp</strong></p>
                        <p>Password: <strong className="font-mono">password123</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
