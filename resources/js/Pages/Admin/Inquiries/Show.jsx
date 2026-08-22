import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { ArrowLeft, Mail, Phone, Building2, Package, CheckCircle2, Send } from 'lucide-react';

export default function AdminInquiriesShow({ inquiry }) {
    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        status: inquiry.status || 'read',
        admin_notes: inquiry.admin_notes || '',
    });

    const handleUpdateStatus = (e) => {
        e.preventDefault();
        patch(`/admin/inquiries/${inquiry.id}/status`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title={`Detail Pesan #${inquiry.id}`}>
            <Head title={`Pesan dari ${inquiry.name} | Sugiyama CMS`} />

            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/admin/inquiries"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Kotak Masuk</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Message Details */}
                    <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div>
                                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                                    Tipe: {inquiry.type}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 mt-2">{inquiry.subject}</h3>
                                <p className="text-xs text-slate-400 font-mono mt-0.5">
                                    Diterima pada: {new Date(inquiry.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Sender Info Card */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                                <p className="text-slate-400 font-semibold">Nama Pengirim:</p>
                                <p className="font-bold text-slate-900">{inquiry.name}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-semibold">Perusahaan / Institusi:</p>
                                <p className="font-bold text-slate-900">{inquiry.company_name || '-'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                                <a href={`mailto:${inquiry.email}`} className="text-emerald-700 font-bold hover:underline">
                                    {inquiry.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                <a href={`tel:${inquiry.phone}`} className="text-slate-800 font-mono font-bold">
                                    {inquiry.phone || '-'}
                                </a>
                            </div>
                        </div>

                        {/* Attached Product if any */}
                        {inquiry.product && (
                            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
                                <Package className="w-6 h-6 text-emerald-700 shrink-0" />
                                <div>
                                    <p className="text-[11px] font-semibold text-emerald-900">Produk yang Diminta:</p>
                                    <p className="font-bold text-xs text-emerald-950">{inquiry.product.name} ({inquiry.product.sku})</p>
                                </div>
                            </div>
                        )}

                        {/* Message Content */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                Isi Pesan Permintaan:
                            </h4>
                            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {inquiry.message}
                            </div>
                        </div>

                        <div className="pt-2 flex gap-3">
                            <a
                                href={`mailto:${inquiry.email}?subject=RE: ${encodeURIComponent(inquiry.subject)}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs"
                            >
                                <Mail className="w-4 h-4" />
                                <span>Balas via Email</span>
                            </a>
                            {inquiry.phone && (
                                <a
                                    href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(inquiry.name)},%20kami%20dari%20PT.%20Sugiyama%20Indonesia%20menindaklanjuti%20permintaan%20Anda.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Hubungi via WhatsApp</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Status & Admin Notes Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                                Update Status Follow-Up
                            </h4>

                            {recentlySuccessful && (
                                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Status disimpan
                                </p>
                            )}

                            <form onSubmit={handleUpdateStatus} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">
                                        Status Inquiry
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    >
                                        <option value="unread">Unread (Belum Dibaca)</option>
                                        <option value="read">Read (Sudah Dibaca)</option>
                                        <option value="contacted">Contacted (Sudah Dihubungi)</option>
                                        <option value="closed">Closed (Selesai)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">
                                        Catatan Internal Tim Penjualan
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={data.admin_notes}
                                        onChange={(e) => setData('admin_notes', e.target.value)}
                                        placeholder="Catatan hasil penawaran, tanggal follow up, dll..."
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-xs"
                                >
                                    Update Status & Catatan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
