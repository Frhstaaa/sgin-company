import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useLanguage } from '../Context/LanguageContext';
import { 
    Phone, Mail, MapPin, ArrowUp, ShieldCheck, 
    ChevronRight, ExternalLink, Globe, Search
} from 'lucide-react';

export default function Footer() {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-emerald-950 text-white border-t border-emerald-900/60 pt-16 pb-12 w-full max-w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Row: Brand & Quick Action */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/80">
                    {/* Brand Info */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-3">
                            {siteSettings.site_logo ? (
                                <img src={siteSettings.site_logo} alt="Logo" className="w-auto h-11 object-contain shrink-0" />
                            ) : (
                                <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-2xl shadow-inner shrink-0">
                                    <span className="font-jp">ス</span>
                                </div>
                            )}
                            <div>
                                <h3 className="font-black text-xl tracking-tight text-white">
                                    PT. Sugiyama Indonesia
                                </h3>
                                <p className="text-xs text-emerald-400 font-semibold tracking-wider font-jp">
                                    株式会社スギヤマ / SUGIYAMA PRECISION
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
                            {t('tagline_sub', 'Menempa masa depan manufaktur presisi melalui teknologi penempaan dingin dan pemesinan CNC kelas dunia.')}
                        </p>

                        {/* Contact details */}
                        <div className="space-y-2 pt-2 text-xs text-emerald-100/90">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{t('footer_hq_addr', '〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan')}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Tel: <strong>{siteSettings.contact_phone || '0567-68-7077'}</strong></span>
                                <span className="text-emerald-500">|</span>
                                <span>Fax: {siteSettings.contact_fax || '0567-68-7080'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{siteSettings.contact_email || 'info@sugiyama.co.id'}</span>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-2.5 py-1 rounded-md bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-[10px] font-bold">
                                ISO 9001:2015
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-[10px] font-bold">
                                IATF 16949:2016
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-[10px] font-bold">
                                ISO 14001:2015
                            </span>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {/* Col 1 */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                {t('nav_technology', 'Teknologi')} & {t('nav_business', 'Bisnis')}
                            </h4>
                            <ul className="space-y-2 text-xs text-emerald-200/80">
                                <li>
                                    <Link href="/teknologi" className="hover:text-white transition-colors">
                                        {t('tech_step_01', 'Desain dan Pengembangan')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/teknologi" className="hover:text-white transition-colors">
                                        {t('tech_step_02', 'Pemrosesan Presisi')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/teknologi" className="hover:text-white transition-colors">
                                        {t('tech_step_03', 'Kontrol Kualitas')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bisnis" className="hover:text-white transition-colors">
                                        {t('biz_unit_01', 'Penempaan Dingin')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bisnis" className="hover:text-white transition-colors">
                                        {t('biz_unit_02', 'Pemrosesan Pemotongan')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bisnis" className="hover:text-white transition-colors">
                                        {t('biz_unit_03', 'Bisnis AV / 3D Printing')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 2 */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                {t('footer_quick_links', 'Tautan Cepat')}
                            </h4>
                            <ul className="space-y-2 text-xs text-emerald-200/80">
                                <li>
                                    <Link href="/peralatan" className="hover:text-white transition-colors">
                                        {t('nav_equipment', 'Proses & Peralatan')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/produk" className="hover:text-white transition-colors">
                                        {t('nav_products', 'Katalog Produk')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/tentang-kami" className="hover:text-white transition-colors">
                                        {t('nav_about', 'Tentang Kami')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/berita" className="hover:text-white transition-colors">
                                        {t('nav_news', 'Berita & Update')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/karir" className="hover:text-white transition-colors">
                                        {t('nav_careers', 'Informasi Rekrutmen')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kontak" className="hover:text-white transition-colors">
                                        {t('nav_contact', 'Hubungi Kami')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Branches */}
                        <div className="space-y-3 col-span-2 sm:col-span-1">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                {t('footer_id_title', 'Pabrik Indonesia')}
                            </h4>
                            <p className="text-xs text-emerald-200/80 leading-relaxed">
                                {t('footer_id_addr', 'Kawasan Industri GIIC Blok AA-12, Kota Deltamas, Cikarang Pusat, Bekasi 17530, Jawa Barat, Indonesia')}
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/admin/login"
                                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
                                >
                                    <span>{t('nav_admin', 'Portal CMS Admin')}</span>
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
                    <p>
                        © 2026 PT. Sugiyama Indonesia (株式会社スギヤマ). {t('footer_rights', 'All Rights Reserved.')}
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white text-[11px] font-bold transition-colors"
                    >
                        <span>Back to Top</span>
                        <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
