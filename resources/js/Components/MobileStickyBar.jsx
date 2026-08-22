import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useLanguage } from '../Context/LanguageContext';
import { Phone, MessageSquare, Send, FileText } from 'lucide-react';

export default function MobileStickyBar() {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t } = useLanguage();
    
    const phone = siteSettings.contact_phone || '0567-68-7077';
    const whatsapp = siteSettings.whatsapp_number || '+6281234567890';

    return (
        <aside 
            aria-label="Kontak Cepat Mobile"
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg"
        >
            <div className="grid grid-cols-3 gap-2">
                <a
                    href={`tel:${phone}`}
                    className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-[11px] font-semibold transition-colors"
                >
                    <Phone className="w-4 h-4 text-emerald-700 mb-0.5" />
                    <span>{t('sticky_call', 'Telepon')}</span>
                </a>

                <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20PT.%20Sugiyama%20Indonesia,%20saya%20ingin%20berkonsultasi.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[11px] font-semibold transition-colors border border-emerald-200"
                >
                    <MessageSquare className="w-4 h-4 text-emerald-700 mb-0.5" />
                    <span>{t('sticky_wa', 'WhatsApp')}</span>
                </a>

                <Link
                    href="/kontak?type=rfq"
                    className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-[11px] font-bold shadow-xs transition-colors"
                >
                    <Send className="w-4 h-4 mb-0.5" />
                    <span>{t('sticky_rfq', 'Minta RFQ')}</span>
                </Link>
            </div>
        </aside>
    );
}
