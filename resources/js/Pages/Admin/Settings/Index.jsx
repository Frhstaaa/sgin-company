import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Save, CheckCircle2, Settings, Phone, MapPin, Globe, Image as ImageIcon, Upload, Building2, Sparkles, Clock, Mail } from 'lucide-react';

export default function AdminSettingsIndex({ settings = {} }) {
    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        site_name: settings.site_name || 'PT. Sugiyama Indonesia',
        site_name_jp: settings.site_name_jp || '株式会社スギヤマ',
        site_tagline: settings.site_tagline || '技術を鍛え 未来を造る - Menempa Teknologi, Membangun Masa Depan',
        contact_phone: settings.contact_phone || '0567-68-7077',
        contact_fax: settings.contact_fax || '0567-68-7080',
        contact_email: settings.contact_email || 'info@sugiyama.co.id',
        whatsapp_number: settings.whatsapp_number || '+6281234567890',
        contact_address: settings.contact_address || '〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan',
        contact_address_id: settings.contact_address_id || 'Kawasan Greenland International Industrial Center (GIIC) Blok CF No. 10, Pasirranji, Cikarang Pusat, Bekasi 17530, Jawa Barat, Indonesia',
        office_hours: settings.office_hours || 'Senin - Jumat: 08:00 - 17:00 JST / WIB',
        copyright_text: settings.copyright_text || '© 2026 PT. Sugiyama Indonesia. All Rights Reserved.',
        google_map_embed: settings.google_map_embed || '',
        logo: null,
    });

    const [previewLogo, setPreviewLogo] = useState(null);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setPreviewLogo(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title="Pengaturan Situs & Kontak">
            <Head title="Pengaturan Situs | Sugiyama CMS" />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <Settings className="w-6 h-6 text-emerald-600" />
                            <span>Pengaturan Brand, Kontak & Hotline</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Kelola logo perusahaan, identitas brand website, nomor kontak resmi, dan informasi footer.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
                    </button>
                </div>

                {recentlySuccessful && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm font-semibold flex items-center gap-3 shadow-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Pengaturan dan logo baru berhasil disimpan dan langsung aktif di website!</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Logo & Brand Identity */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <ImageIcon className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                1. Logo & Identitas Brand Perusahaan
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            {/* Logo Upload Box */}
                            <div className="p-6 rounded-2xl bg-slate-50/60 border-2 border-dashed border-slate-300/80 hover:border-emerald-500 transition-colors">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                                    Logo Perusahaan (PNG / WEBP / JPG / SVG)
                                </label>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                    {/* Preview Box */}
                                    <div className="w-44 h-20 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center p-3 shrink-0 shadow-inner overflow-hidden">
                                        {previewLogo ? (
                                            <img src={previewLogo} alt="Preview Baru" className="max-h-full max-w-full object-contain" />
                                        ) : settings.site_logo ? (
                                            <img 
                                                src={settings.site_logo} 
                                                alt="Logo Saat Ini" 
                                                className="max-h-full max-w-full object-contain" 
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <span className="text-xs text-slate-500 font-medium">Belum Ada Logo</span>
                                        )}
                                    </div>

                                    {/* File Input */}
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="file"
                                            id="logo-upload"
                                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                            onChange={handleLogoChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer shadow-xs"
                                        />
                                        <p className="text-[11px] text-slate-500">
                                            Format yang didukung: PNG transparan, WebP, JPG. Maksimal 5MB. Klik <strong>"Simpan Pengaturan"</strong> setelah memilih file.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Brand Names */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Brand Website (Indonesia / Global) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.site_name}
                                        onChange={(e) => setData('site_name', e.target.value)}
                                        placeholder="PT. Sugiyama Indonesia"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nama Kanji Jepang
                                    </label>
                                    <input
                                        type="text"
                                        value={data.site_name_jp}
                                        onChange={(e) => setData('site_name_jp', e.target.value)}
                                        placeholder="株式会社スギヤマ"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium font-jp"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Tagline & Slogan Resmi</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.site_tagline}
                                    onChange={(e) => setData('site_tagline', e.target.value)}
                                    placeholder="技術を鍛え 未来を造る - Menempa Teknologi, Membangun Masa Depan"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Kontak & Hotline */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2.5">
                            <Phone className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                                2. Nomor Kontak, Email & Hotline Resmi
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nomor Telepon Hotline
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="0567-68-7077 atau (021) 30032962"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        Nomor Fax
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_fax}
                                        onChange={(e) => setData('contact_fax', e.target.value)}
                                        placeholder="0567-68-7080"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        WhatsApp Business (+62...)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.whatsapp_number}
                                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                                        placeholder="+6281234567890"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono font-bold text-emerald-700"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Email Resmi Perusahaan</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="info@sugiyama.co.id"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Jam Operasional Kerja</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.office_hours}
                                        onChange={(e) => setData('office_hours', e.target.value)}
                                        placeholder="Senin - Jumat: 08:00 - 17:00 WIB"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Alamat Pabrik Indonesia (Kawasan GIIC Cikarang)</span>
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.contact_address_id}
                                    onChange={(e) => setData('contact_address_id', e.target.value)}
                                    placeholder="Kawasan Greenland International Industrial Center (GIIC) Blok CF No. 10, Pasirranji, Cikarang Pusat, Kabupaten Bekasi, Jawa Barat 17530"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Alamat Kantor Pusat & Pabrik Jepang</span>
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.contact_address}
                                    onChange={(e) => setData('contact_address', e.target.value)}
                                    placeholder="〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium leading-relaxed font-jp"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Teks Hak Cipta Footer (Copyright)
                                </label>
                                <input
                                    type="text"
                                    value={data.copyright_text}
                                    onChange={(e) => setData('copyright_text', e.target.value)}
                                    placeholder="© 2026 PT. Sugiyama Indonesia. All Rights Reserved."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-lg shadow-emerald-900/15 hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan Pengaturan...' : 'Simpan Seluruh Pengaturan'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
