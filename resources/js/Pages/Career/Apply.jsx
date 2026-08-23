import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { 
    Briefcase, User, Mail, Phone, Calendar, GraduationCap, 
    Upload, FileText, CheckCircle2, AlertCircle, ArrowLeft, 
    Send, Building2, DollarSign, Globe, ShieldCheck, Sparkles, X,
    RefreshCw, ShieldAlert, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CareerApply({ careers = [], selectedCareer = null, preselectedPosition = '', captchaSvg = '' }) {
    const { props = {} } = usePage();
    const siteSettings = props.siteSettings || {};
    const { t, lang, translateModel } = useLanguage();

    const initialCareerId = selectedCareer?.id || (careers.length === 1 ? careers[0].id : '');
    const initialPositionTitle = selectedCareer?.title || '';

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        career_id: initialCareerId,
        position_title: initialPositionTitle || 'Lamaran Umum',
        full_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: 'Laki-laki',
        last_education: 'SMK/SMA',
        major: '',
        years_of_experience: 'Fresh Graduate',
        current_company: '',
        expected_salary: '',
        portfolio_url: '',
        cover_letter: '',
        cv_file: null,
        captcha_code: '',
        honeypot_trap: '', // Invisible bot trap
    });

    const [currentCaptchaSvg, setCurrentCaptchaSvg] = useState(captchaSvg);
    const [isRefreshingCaptcha, setIsRefreshingCaptcha] = useState(false);
    const [fileError, setFileError] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const refreshCaptcha = async () => {
        setIsRefreshingCaptcha(true);
        try {
            const res = await fetch('/karir/captcha/refresh');
            const json = await res.json();
            if (json.captcha_svg) {
                setCurrentCaptchaSvg(json.captcha_svg);
                setData('captcha_code', '');
            }
        } catch (err) {
            console.error('Failed to refresh captcha', err);
        } finally {
            setIsRefreshingCaptcha(false);
        }
    };

    const handleCareerChange = (e) => {
        const val = e.target.value;
        if (!val) {
            setData((prev) => ({ ...prev, career_id: '', position_title: 'Lamaran Umum' }));
            return;
        }
        const found = careers.find((c) => String(c.id) === String(val));
        setData((prev) => ({
            ...prev,
            career_id: val,
            position_title: found ? found.title : 'Lamaran Umum',
        }));
    };

    const validateAndSetFile = (file) => {
        setFileError('');
        if (!file) return;

        // Check file size (2 MB = 2 * 1024 * 1024 bytes = 2097152 bytes)
        const maxBytes = 2 * 1024 * 1024;
        if (file.size > maxBytes) {
            setFileError(`Ukuran file terlalu besar (${(file.size / (1024 * 1024)).toFixed(2)} MB). Maksimal ukuran file CV adalah 2 MB.`);
            setData('cv_file', null);
            setFileName('');
            setFileSize('');
            return;
        }

        // Check file extension
        const allowedExtensions = ['pdf', 'doc', 'docx'];
        const ext = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            setFileError('Format file tidak didukung. Harap unggah berkas berekstensi PDF, DOC, atau DOCX.');
            setData('cv_file', null);
            setFileName('');
            setFileSize('');
            return;
        }

        setData('cv_file', file);
        setFileName(file.name);
        setFileSize((file.size / 1024).toFixed(1) + ' KB');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        validateAndSetFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const removeFile = () => {
        setData('cv_file', null);
        setFileName('');
        setFileSize('');
        setFileError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.cv_file) {
            setFileError('Dokumen CV / Resume wajib diunggah.');
            return;
        }
        if (!data.captcha_code) {
            return;
        }
        post('/karir/lamar', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset('cv_file', 'cover_letter', 'portfolio_url', 'captcha_code');
                setFileName('');
                setFileSize('');
                refreshCaptcha();
            },
            onError: () => {
                refreshCaptcha();
            }
        });
    };

    return (
        <AppLayout>
            <Head title={`${t('apply_header_title', 'Formulir Lamaran Pekerjaan')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            {/* Header Banner */}
            <div className="bg-slate-950 text-white pt-28 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-slate-950">
                    <img 
                        src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1920&auto=format&fit=crop" 
                        alt="Sugiyama Careers" 
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-emerald-950/80 to-slate-950" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg backdrop-blur-md">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t('apply_header_badge', 'Formulir Karir / 採用応募')}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                        {t('apply_header_title', 'Formulir Lamaran Pekerjaan PT. Sugiyama Indonesia')}
                    </h1>

                    <p className="text-emerald-200/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        {t('apply_header_desc', 'Silakan lengkapi biodata diri, riwayat pendidikan, pengalaman kerja, serta unggah dokumen CV/Resume terbaru Anda (Maksimal 2 MB).')}
                    </p>

                    <div className="pt-2">
                        <Link 
                            href="/karir"
                            className="inline-flex items-center gap-2 text-xs text-emerald-300 hover:text-white font-bold transition-all px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t('career_back_all', 'Kembali ke Semua Lowongan')}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <section className="py-12 sm:py-16 bg-slate-100/70 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Success Alert */}
                    <AnimatePresence>
                        {recentlySuccessful && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-8 p-6 rounded-3xl bg-emerald-900 text-white shadow-2xl border border-emerald-700/60 flex items-start gap-4"
                            >
                                <div className="p-2.5 rounded-2xl bg-emerald-800 shrink-0 shadow-inner">
                                    <CheckCircle2 className="w-7 h-7 text-emerald-300" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-extrabold text-base sm:text-lg text-white">
                                        {t('apply_success_title', 'Lamaran Berhasil Terkirim!')}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                                        {t('apply_success_desc', 'Terima kasih telah melamar di PT. Sugiyama Indonesia. Tim HRD kami akan meninjau CV Anda dan menghubungi kandidat yang memenuhi kualifikasi.')}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            
                            {/* BOT HONEYPOT (Invisible to humans) */}
                            <div className="hidden" aria-hidden="true" style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}>
                                <input
                                    type="text"
                                    name="honeypot_trap"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={data.honeypot_trap}
                                    onChange={(e) => setData('honeypot_trap', e.target.value)}
                                />
                            </div>

                            {/* SECTION 1: DATA DIRI */}
                            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-7 space-y-5">
                                <div className="border-b border-slate-200/70 pb-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                                            1
                                        </div>
                                        <div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                                                {t('apply_sec_personal', 'Data Diri Pelamar')}
                                            </h2>
                                            <p className="text-[11px] text-slate-500 font-medium">Informasi identitas dan kontak aktif kandidat</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                                        Wajib Lengkap
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {/* Position Select */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_position_label', 'Posisi yang Dilamar')} <span className="text-rose-500">*</span></span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={data.career_id}
                                                onChange={handleCareerChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            >
                                                <option value="">{t('apply_position_general', '-- Lamaran Umum / Posisi Lainnya --')}</option>
                                                {careers.map((c) => {
                                                    const translatedCareer = translateModel(c, 'career');
                                                    return (
                                                        <option key={c.id} value={c.id}>
                                                            {translatedCareer.title} ({c.department} - {c.location})
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        {errors.position_title && (
                                            <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                <span>{errors.position_title}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Full Name & Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{t('apply_fullname_label', 'Nama Lengkap (Sesuai KTP)')} <span className="text-rose-500">*</span></span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.full_name}
                                                onChange={(e) => setData('full_name', e.target.value)}
                                                placeholder="Contoh: Budi Santoso"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            />
                                            {errors.full_name && (
                                                <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                    <span>{errors.full_name}</span>
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{t('apply_email_label', 'Alamat Email Aktif')} <span className="text-rose-500">*</span></span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="budi.santoso@email.com"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                    <span>{errors.email}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone, Date of Birth, Gender Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{t('apply_phone_label', 'Nomor WhatsApp / HP')} <span className="text-rose-500">*</span></span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="081234567890"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            />
                                            {errors.phone && (
                                                <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                    <span>{errors.phone}</span>
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{t('apply_dob_label', 'Tanggal Lahir')}</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={data.date_of_birth}
                                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{t('apply_gender_label', 'Jenis Kelamin')}</span>
                                            </label>
                                            <select
                                                value={data.gender}
                                                onChange={(e) => setData('gender', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            >
                                                <option value="Laki-laki">{t('apply_gender_male', 'Laki-laki')}</option>
                                                <option value="Perempuan">{t('apply_gender_female', 'Perempuan')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: PENDIDIKAN & PENGALAMAN */}
                            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-7 space-y-5">
                                <div className="border-b border-slate-200/70 pb-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                                            2
                                        </div>
                                        <div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                                                {t('apply_sec_background', 'Pendidikan & Pengalaman Kerja')}
                                            </h2>
                                            <p className="text-[11px] text-slate-500 font-medium">Latar belakang akademik dan riwayat karir profesional</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Education & Major */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{t('apply_edu_label', 'Pendidikan Terakhir')}</span>
                                            </label>
                                            <select
                                                value={data.last_education}
                                                onChange={(e) => setData('last_education', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            >
                                                <option value="SMK/SMA">SMK / SMA Sederajat</option>
                                                <option value="Diploma (D3)">Diploma (D3)</option>
                                                <option value="Sarjana (D4/S1)">Sarjana (D4 / S1)</option>
                                                <option value="Magister (S2)">Magister (S2)</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800">
                                                {t('apply_major_label', 'Jurusan / Bidang Keahlian')}
                                            </label>
                                            <input
                                                type="text"
                                                value={data.major}
                                                onChange={(e) => setData('major', e.target.value)}
                                                placeholder="Contoh: Teknik Mesin / Otomotif / Mekatronika"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Experience Years & Company */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800">
                                                {t('apply_exp_label', 'Lama Pengalaman Kerja')}
                                            </label>
                                            <select
                                                value={data.years_of_experience}
                                                onChange={(e) => setData('years_of_experience', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            >
                                                <option value="Fresh Graduate">Fresh Graduate / Kurang dari 1 Tahun</option>
                                                <option value="1 - 3 Tahun">1 - 3 Tahun</option>
                                                <option value="3 - 5 Tahun">3 - 5 Tahun</option>
                                                <option value="Lebih dari 5 Tahun">&gt; 5 Tahun</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{t('apply_company_label', 'Perusahaan Terakhir / Saat Ini')}</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.current_company}
                                                onChange={(e) => setData('current_company', e.target.value)}
                                                placeholder="Contoh: PT. Manufaktur Otomotif"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Expected Salary */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_salary_label', 'Ekspektasi Gaji / Bulan (Opsional)')}</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.expected_salary}
                                            onChange={(e) => setData('expected_salary', e.target.value)}
                                            placeholder="Contoh: Rp 6.000.000 - Rp 8.000.000 / Nego"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3: UPLOAD CV & DOKUMEN */}
                            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-7 space-y-5">
                                <div className="border-b border-slate-200/70 pb-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                                            3
                                        </div>
                                        <div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                                                {t('apply_sec_documents', 'Dokumen CV & Portofolio')}
                                            </h2>
                                            <p className="text-[11px] text-slate-500 font-medium">Unggah berkas CV terbaru (PDF / DOC / DOCX, Max 2 MB)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Drag & Drop CV Area */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <FileText className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_cv_label', 'Unggah Berkas CV / Resume (Wajib, Max 2 MB)')} <span className="text-rose-500">*</span></span>
                                        </label>

                                        {!fileName ? (
                                            <div
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                                                    isDragging 
                                                        ? 'border-emerald-600 bg-emerald-50 scale-[1.01]' 
                                                        : 'border-slate-300 hover:border-emerald-600 bg-white hover:bg-emerald-50/40'
                                                }`}
                                                onClick={() => document.getElementById('cv_upload_input').click()}
                                            >
                                                <input
                                                    id="cv_upload_input"
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <div className="w-14 h-14 rounded-2xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-xs">
                                                    <Upload className="w-7 h-7" />
                                                </div>
                                                <p className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                                                    {t('apply_cv_choose', 'Pilih File CV atau Drag & Drop ke sini')}
                                                </p>
                                                <p className="text-[11px] text-slate-500 font-medium">
                                                    {t('apply_cv_hint', 'Format file yang diterima: PDF, DOC, DOCX. Maksimal ukuran file: 2 MB.')}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 flex items-center justify-between shadow-xs">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="w-11 h-11 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{fileName}</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-[11px] text-emerald-800 font-mono font-bold bg-emerald-200/80 px-2 py-0.5 rounded-md">
                                                                {fileSize}
                                                            </span>
                                                            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                                                                <Check className="w-3.5 h-3.5 text-emerald-600" /> Siap diunggah
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-100 transition-colors"
                                                    title="Hapus file"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}

                                        {fileError && (
                                            <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5 mt-1.5">
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                <span>{fileError}</span>
                                            </p>
                                        )}
                                        {errors.cv_file && (
                                            <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5 mt-1.5">
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                <span>{errors.cv_file}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Portfolio / LinkedIn */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <Globe className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_portfolio_label', 'Tautan LinkedIn / Portofolio (Opsional)')}</span>
                                        </label>
                                        <input
                                            type="url"
                                            value={data.portfolio_url}
                                            onChange={(e) => setData('portfolio_url', e.target.value)}
                                            placeholder="https://linkedin.com/in/username atau link portofolio"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                        />
                                        {errors.portfolio_url && (
                                            <p className="text-xs text-rose-600 font-medium">{errors.portfolio_url}</p>
                                        )}
                                    </div>

                                    {/* Cover Letter */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800">
                                            {t('apply_cover_label', 'Surat Pengantar / Catatan Tambahan (Opsional)')}
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={data.cover_letter}
                                            onChange={(e) => setData('cover_letter', e.target.value)}
                                            placeholder="Ceritakan secara singkat keahlian utama, motivasi melamar di PT. Sugiyama Indonesia, atau sertifikasi keahlian yang dimiliki..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                        />
                                        {errors.cover_letter && (
                                            <p className="text-xs text-rose-600 font-medium">{errors.cover_letter}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 4: CAPTCHA SECURITY VERIFICATION */}
                            <div className="bg-emerald-950/5 border border-emerald-800/20 rounded-2xl p-5 sm:p-7 space-y-4">
                                <div className="border-b border-emerald-900/10 pb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                                            4
                                        </div>
                                        <div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                                                <span>{t('apply_sec_verification', 'Verifikasi Keamanan (Anti-Spam)')}</span>
                                                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                                            </h2>
                                            <p className="text-[11px] text-slate-500 font-medium">
                                                {t('apply_captcha_hint', 'Ketik huruf & angka yang terlihat pada gambar untuk memastikan Anda bukan robot.')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                                    {/* Captcha Visual Box */}
                                    <div className="sm:col-span-6 flex items-center gap-3">
                                        <div 
                                            className="bg-slate-900 p-1.5 rounded-2xl shadow-inner border border-slate-800 inline-block overflow-hidden"
                                            dangerouslySetInnerHTML={{ __html: currentCaptchaSvg }}
                                        />
                                        <button
                                            type="button"
                                            onClick={refreshCaptcha}
                                            disabled={isRefreshingCaptcha}
                                            className="p-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-xs hover:text-emerald-800 transition-all flex items-center gap-1.5 text-xs font-bold shrink-0 cursor-pointer disabled:opacity-50"
                                            title={t('apply_captcha_refresh', 'Ganti Kode / Refresh')}
                                        >
                                            <RefreshCw className={`w-4 h-4 ${isRefreshingCaptcha ? 'animate-spin text-emerald-700' : ''}`} />
                                            <span className="hidden sm:inline text-[11px]">{t('apply_captcha_refresh', 'Ganti Kode')}</span>
                                        </button>
                                    </div>

                                    {/* Captcha Input */}
                                    <div className="sm:col-span-6 space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <span>{t('apply_captcha_label', 'Masukkan Kode Keamanan (Captcha)')} <span className="text-rose-500">*</span></span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={6}
                                            autoComplete="off"
                                            value={data.captcha_code}
                                            onChange={(e) => setData('captcha_code', e.target.value.toUpperCase())}
                                            placeholder={t('apply_captcha_placeholder', 'Ketik 5 digit kode di atas')}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-mono font-bold tracking-widest uppercase bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                                        />
                                        {errors.captcha_code && (
                                            <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                <span>{errors.captcha_code}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Consent & Submit Button */}
                            <div className="pt-2 border-t border-slate-200 space-y-6">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-3 shadow-2xs">
                                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                                    <p>{t('apply_consent_text', 'Dengan mengirimkan formulir ini, saya menyatakan bahwa seluruh data yang diisi adalah benar dan menyetujui data pribadi saya diproses untuk keperluan seleksi rekrutmen PT. Sugiyama Indonesia.')}</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 hover:from-emerald-800 hover:to-emerald-700 active:scale-[0.99] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-900/30 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{processing ? t('apply_submitting_btn', 'Mengirimkan Lamaran & CV...') : t('apply_submit_btn', 'Kirim Lamaran Kerja Sekarang')}</span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
