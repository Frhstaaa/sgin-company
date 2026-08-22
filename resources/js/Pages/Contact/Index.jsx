import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { 
    Phone, Mail, MapPin, Send, CheckCircle2, 
    MessageSquare, Building2, HelpCircle, Clock 
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../Components/ScrollReveal';

export default function ContactIndex({ selectedProduct, products = [], defaultType = 'general' }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t } = useLanguage();

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        type: defaultType,
        name: '',
        company_name: '',
        email: '',
        phone: '',
        subject: selectedProduct ? `Permintaan Penawaran (RFQ) - ${selectedProduct.name}` : '',
        message: '',
        product_id: selectedProduct ? selectedProduct.id : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontak', {
            preserveScroll: true,
            onSuccess: () => reset('name', 'company_name', 'email', 'phone', 'subject', 'message'),
        });
    };

    return (
        <AppLayout>
            <Head title={`${t('contact_page_title', 'Konsultasi Teknik & Permintaan Penawaran')} | PT. Sugiyama Indonesia`} />

            <div className="bg-emerald-950 text-white pt-28 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
                            {t('cta_badge', 'Hubungi Kami / お問い合わせ')}
                        </span>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1 sm:mt-2 leading-tight">
                            {t('contact_page_title', 'Konsultasi Teknik & Permintaan Penawaran')}
                        </h1>
                        <p className="text-emerald-200/90 text-xs sm:text-sm md:text-base max-w-2xl mt-3 sm:mt-4 leading-relaxed">
                            {t('contact_page_desc', 'Tim teknis dan penjualan PT. Sugiyama Indonesia siap membantu estimasi biaya produksi penempaan dingin, evaluasi gambar teknik CAD, serta konsultasi spesifikasi material.')}
                        </p>
                    </motion.div>
                </div>
            </div>

            <section className="py-12 sm:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <ScrollReveal delay={0.1}>
                            <div className="bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200">
                            {recentlySuccessful && (
                                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                    <span>{t('contact_success_msg', 'Pesan atau permintaan penawaran Anda berhasil dikirimkan. Tim kami akan segera menindaklanjuti.')}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Type Selector */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                        {t('contact_type_label', 'Jenis Permintaan')} <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {[
                                            { id: 'general', label: t('contact_type_general', 'Pertanyaan Umum') },
                                            { id: 'rfq', label: t('contact_type_rfq', 'Minta RFQ') },
                                            { id: 'consultation', label: t('contact_type_consult', 'Konsultasi Teknik') },
                                            { id: 'career', label: t('contact_type_career', 'Karir') },
                                        ].map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setData('type', item.id)}
                                                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                    data.type === item.id
                                                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                                }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.type && <p className="text-rose-500 text-xs mt-1">{errors.type}</p>}
                                </div>

                                {/* Part Selection if RFQ */}
                                {products.length > 0 && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            {t('contact_product_label', 'Komponen Terkait (Opsional)')}
                                        </label>
                                        <select
                                            value={data.product_id}
                                            onChange={(e) => setData('product_id', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                        >
                                            <option value="">-- Pilih produk dari katalog kami (opsional) --</option>
                                            {products.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name} {p.sku ? `(${p.sku})` : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            {t('contact_name_label', 'Nama Lengkap')} <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Contoh: Budi Santoso"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                        />
                                        {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            {t('contact_company_label', 'Nama Perusahaan / Institusi')}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            placeholder="PT. Otomotif Presisi"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            {t('contact_email_label', 'Alamat Email')} <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="name@company.com"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                        />
                                        {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            {t('contact_phone_label', 'Nomor Telepon / WhatsApp')}
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="0812xxxxxxx"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        {t('contact_subject_label', 'Subjek Pesan')} <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Judul permohonan atau pertanyaan..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                    {errors.subject && <p className="text-rose-500 text-xs mt-1">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        {t('contact_message_label', 'Rincian Pesan / Deskripsi Kebutuhan')} <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        rows="5"
                                        required
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Jelaskan spesifikasi material, perkiraan volume per bulan, dimensi part, atau pertanyaan teknis..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                                    />
                                    {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message}</p>}
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3.5 px-6 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <span>{processing ? t('contact_sending', 'Sedang Mengirim...') : t('contact_submit_btn', 'Kirim Pesan / Permintaan RFQ')}</span>
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                            </div>
                            </ScrollReveal>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                            <ScrollReveal delay={0.2} direction="left">
                            <div className="bg-emerald-900 text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl space-y-4 sm:space-y-6">
                                <h3 className="text-base sm:text-lg font-bold">
                                    {t('contact_sidebar_title', 'Hotline Resmi Sugiyama')}
                                </h3>

                                <div className="space-y-4 text-xs text-emerald-100/90">
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-white text-sm font-mono">{siteSettings.contact_phone || '0567-68-7077'}</p>
                                            <p className="text-[11px] text-emerald-300">{t('contact_sidebar_sub', 'Kantor Pusat Jepang (Senin - Jumat: 08:00 - 17:00 JST)')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-white">{siteSettings.contact_email || 'info@sugiyama.co.id'}</p>
                                            <p className="text-[11px] text-emerald-300">info@sugiyama.co.id</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-white">{t('contact_hours_title', 'Jam Operasional')}</p>
                                            <p className="text-[11px] text-emerald-300">{siteSettings.office_hours || 'Senin - Jumat: 08:00 - 17:00'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3} direction="left">
                            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-3 sm:space-y-4">
                                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">
                                    {t('footer_contact_info', 'Alamat Pabrik & Kantor')}
                                </h4>
                                
                                <div className="space-y-3 text-xs text-slate-600">
                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="font-bold text-slate-900 mb-1">{t('footer_hq_title', 'Kantor Pusat & Pabrik Aichi (Jepang)')}</p>
                                        <p>{siteSettings.contact_address || t('footer_hq_addr', '〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan')}</p>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="font-bold text-slate-900 mb-1">{t('footer_id_title', 'Pabrik Indonesia (ASEAN Hub)')}</p>
                                        <p>{siteSettings.contact_address_id || t('footer_id_addr', 'Kawasan Industri GIIC Blok AA-12, Kota Deltamas, Cikarang Pusat, Bekasi 17530, Jawa Barat, Indonesia')}</p>
                                    </div>
                                </div>
                            </div>
                            </ScrollReveal>

                            {/* Google Maps Embed */}
                            <ScrollReveal delay={0.4} direction="up">
                                <div className="bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm mt-2 sm:mt-0">
                                    <div 
                                        className="w-full h-56 sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden [&>iframe]:w-full [&>iframe]:h-full"
                                        dangerouslySetInnerHTML={{ 
                                            __html: siteSettings.google_map_embed || '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63440.101695046!2d107.15796418063826!3d-6.393180535225231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699ec8d0450783%3A0xf8f55f1cd8f651bb!2sPT.%20Sugiyama%20Indonesia!5e0!3m2!1sen!2sus!4v1787366226439!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
                                        }}
                                    />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
