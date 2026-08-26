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
    const { t, lang } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Parse certifications badges from settings
    const rawCerts = siteSettings.footer_certifications || 'ISO 9001:2015, IATF 16949:2016, ISO 14001:2015';
    const certsList = rawCerts.split(',').map(c => c.trim()).filter(Boolean);

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
                                    {siteSettings.site_name || 'PT. Sugiyama Indonesia'}
                                </h3>
                                <p className="text-xs text-emerald-400 font-semibold tracking-wider font-jp">
                                    {siteSettings.site_name_jp || '株式会社スギヤマ / SUGIYAMA PRECISION'}
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
                            {(lang === 'id' && (siteSettings.footer_tagline || siteSettings.site_tagline)) 
                                ? (siteSettings.footer_tagline || siteSettings.site_tagline) 
                                : t('tagline_sub', 'Menempa masa depan manufaktur presisi melalui teknologi penempaan dingin dan pemesinan CNC kelas dunia.')}
                        </p>

                        {/* Contact details */}
                        <div className="space-y-2 pt-2 text-xs text-emerald-100/90">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{siteSettings.contact_address || t('footer_hq_addr', '〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan')}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Tel: <strong>{siteSettings.contact_phone || '0567-68-7077'}</strong></span>
                                {siteSettings.contact_fax && (
                                    <>
                                        <span className="text-emerald-500">|</span>
                                        <span>Fax: {siteSettings.contact_fax}</span>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{siteSettings.contact_email || 'info@sugiyama.co.id'}</span>
                            </div>
                        </div>

                        {/* Badges */}
                        {certsList.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {certsList.map((cert, cIdx) => (
                                    <span key={cIdx} className="px-2.5 py-1 rounded-md bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-[10px] font-bold">
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {/* Col 1 */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                {(lang === 'id' && siteSettings.footer_col1_title) ? siteSettings.footer_col1_title : t('footer_col1_title', 'Teknologi & Bisnis')}
                            </h4>
                            <ul className="space-y-2 text-xs text-emerald-200/80">
                                <li>
                                    <Link href="/technology" className="hover:text-white transition-colors">
                                        {t('tech_step_01', 'Desain dan Pengembangan')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/technology" className="hover:text-white transition-colors">
                                        {t('tech_step_02', 'Pemrosesan Presisi')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/technology" className="hover:text-white transition-colors">
                                        {t('tech_step_03', 'Kontrol Kualitas')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business" className="hover:text-white transition-colors">
                                        {t('biz_unit_01', 'Penempaan Dingin')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business" className="hover:text-white transition-colors">
                                        {t('biz_unit_02', 'Pemrosesan Pemotongan')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business" className="hover:text-white transition-colors">
                                        {t('biz_unit_03', 'Bisnis AV / 3D Printing')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 2 */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                {(lang === 'id' && siteSettings.footer_col2_title) ? siteSettings.footer_col2_title : t('footer_quick_links', 'Tautan Cepat')}
                            </h4>
                            <ul className="space-y-2 text-xs text-emerald-200/80">
                                <li>
                                    <Link href="/equipment" className="hover:text-white transition-colors">
                                        {t('nav_equipment', 'Peralatan & Fasilitas')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/production-process" className="hover:text-white transition-colors">
                                        {t('nav_production_process', 'Proses Produksi & QC')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="hover:text-white transition-colors">
                                        {t('nav_products', 'Katalog Produk')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about-us" className="hover:text-white transition-colors">
                                        {t('nav_about', 'Tentang Kami')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/news" className="hover:text-white transition-colors">
                                        {t('nav_news', 'Berita & Update')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="hover:text-white transition-colors">
                                        {t('nav_careers', 'Informasi Rekrutmen')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-white transition-colors">
                                        {t('nav_contact', 'Hubungi Kami')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Japan Headquarters & Aichi Plant */}
                        <div className="space-y-3 col-span-2 sm:col-span-1">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                {(lang === 'id' && siteSettings.footer_hq_title) ? siteSettings.footer_hq_title : t('footer_hq_title', 'Kantor Pusat & Pabrik Jepang (HQ)')}
                            </h4>
                            <p className="text-xs text-emerald-200/80 leading-relaxed">
                                {siteSettings.footer_hq_addr || t('footer_hq_addr', '〒498-0000 123-4 Kajiya-cho, Yatomi City, Prefektur Aichi, Jepang')}
                            </p>
                            <div className="space-y-1 text-xs text-emerald-300/90 pt-1">
                                <p className="font-mono">
                                    {t('footer_hq_tel', 'Tel: 0567-68-7077')}
                                </p>
                                <p className="font-mono">
                                    {t('footer_hq_fax', 'Fax: 0567-68-7080')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
                    <p>
                        {siteSettings.copyright_text || `© 2026 ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}. All Rights Reserved.`}
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                    >
                        <span>{t('back_to_top', 'Back to Top')}</span>
                        <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
