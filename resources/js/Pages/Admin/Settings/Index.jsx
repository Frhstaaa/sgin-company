import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Save, CheckCircle2, Settings, Phone, MapPin, Globe } from 'lucide-react';

export default function AdminSettingsIndex({ settings = {} }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        site_name: settings.site_name || 'Sagayama Precision',
        site_name_jp: settings.site_name_jp || '株式会社サガヤマ',
        site_tagline: settings.site_tagline || '技術を鍛え 未来を造る - Menempa Teknologi, Membangun Masa Depan',
        contact_phone: settings.contact_phone || '0567-68-7077',
        contact_fax: settings.contact_fax || '0567-68-7080',
        contact_email: settings.contact_email || 'info@sagayama.co.jp',
        whatsapp_number: settings.whatsapp_number || '+6281234567890',
        contact_address: settings.contact_address || '〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan',
        contact_address_id: settings.contact_address_id || 'Kawasan Industri GIIC Blok AA-12, Deltamas, Cikarang Pusat, Bekasi 17530, Indonesia',
        office_hours: settings.office_hours || 'Senin - Jumat: 08:00 - 17:00 JST / WIB',
        copyright_text: settings.copyright_text || '© 2026 Sagayama Precision Co., Ltd. All Rights Reserved.',
        google_map_embed: settings.google_map_embed || '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63440.101695046!2d107.15796418063826!3d-6.393180535225231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699ec8d0450783%3A0xf8f55f1cd8f651bb!2sPT.%20Sugiyama%20Indonesia!5e0!3m2!1sen!2sus!4v1787366226439!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
        logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title="Pengaturan Situs & Kontak">
            <Head title="Pengaturan Situs | Sagayama CMS" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Pengaturan Brand, Kontak & Hotline</h3>
                    <p className="text-xs text-slate-500">Konfigurasi nomor telepon pusat (0567-68-7077), email, alamat pabrik, dan teks copyright.</p>
                </div>

                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xs">
                    {recentlySuccessful && (
                        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span>Pengaturan situs berhasil disimpan!</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Brand Identity */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-2">
                                Identitas Brand Perusahaan
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Logo Perusahaan
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('logo', e.target.files[0])}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                    />
                                    {settings.site_logo && (
                                        <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-2">
                                            <span>Logo saat ini:</span>
                                            <img src={settings.site_logo} alt="Current Logo" className="h-6 w-auto object-contain bg-slate-800 p-1 rounded" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Nama Brand Website
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.site_name}
                                        onChange={(e) => setData('site_name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Nama Kanji Jepang
                                    </label>
                                    <input
                                        type="text"
                                        value={data.site_name_jp}
                                        onChange={(e) => setData('site_name_jp', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-jp"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Tagline & Slogan
                                </label>
                                <input
                                    type="text"
                                    value={data.site_tagline}
                                    onChange={(e) => setData('site_tagline', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Contacts */}
                        <div className="space-y-4 pt-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-2">
                                Kontak & Hotline Resmi
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Nomor Telepon Hotline (Jepang)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-mono font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Nomor Fax
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_fax}
                                        onChange={(e) => setData('contact_fax', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        WhatsApp Business
                                    </label>
                                    <input
                                        type="text"
                                        value={data.whatsapp_number}
                                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-mono"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Email Resmi
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Jam Operasional
                                    </label>
                                    <input
                                        type="text"
                                        value={data.office_hours}
                                        onChange={(e) => setData('office_hours', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Alamat Pabrik & Kantor Pusat (Jepang)
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.contact_address}
                                    onChange={(e) => setData('contact_address', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Alamat Pabrik Indonesia (ASEAN Hub)
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.contact_address_id}
                                    onChange={(e) => setData('contact_address_id', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Google Map Embed (Iframe)
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.google_map_embed}
                                    onChange={(e) => setData('google_map_embed', e.target.value)}
                                    placeholder='<iframe src="..."></iframe>'
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 focus:bg-white"
                                />
                                <p className="text-[10px] text-slate-500 mt-1">Salin kode HTML dari Google Maps &gt; Bagikan &gt; Sematkan Peta.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Teks Footer Copyright
                                </label>
                                <input
                                    type="text"
                                    value={data.copyright_text}
                                    onChange={(e) => setData('copyright_text', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                <Save className="w-4 h-4" />
                                <span>{processing ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
