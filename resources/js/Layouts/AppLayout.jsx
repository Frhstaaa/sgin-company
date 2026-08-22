import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import MobileStickyBar from '../Components/MobileStickyBar';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AppLayout({ children }) {
    const { props = {} } = usePage();
    const flash = props.flash || {};
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setToast({ type: 'success', message: flash.success });
            const timer = setTimeout(() => setToast(null), 6000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setToast({ type: 'error', message: flash.error });
            const timer = setTimeout(() => setToast(null), 6000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-emerald-700 selection:text-white">
            {/* Top Navbar */}
            <Navbar />

            {/* Flash Notification Toast */}
            {toast && (
                <div className="fixed top-20 right-4 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className={`p-4 rounded-xl shadow-xl flex items-start gap-3 border ${
                        toast.type === 'success' 
                            ? 'bg-emerald-50 text-emerald-950 border-emerald-200' 
                            : 'bg-rose-50 text-rose-950 border-rose-200'
                    }`}>
                        {toast.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 text-xs font-semibold leading-relaxed">
                            {toast.message}
                        </div>
                        <button
                            onClick={() => setToast(null)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content with Page Transitions */}
            <AnimatePresence mode="wait">
                <motion.main 
                    key={props.url || 'default'}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex-1"
                >
                    {children}
                </motion.main>
            </AnimatePresence>

            {/* Mobile Bottom Bar */}
            <MobileStickyBar />

            {/* Footer */}
            <Footer />
        </div>
    );
}
