import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { useLanguage } from '../../Context/LanguageContext';
import { 
    Briefcase, User, Mail, Phone, Calendar, GraduationCap, 
    Upload, FileText, CheckCircle2, AlertCircle, ArrowLeft, 
    Send, Building2, DollarSign, Globe, ShieldCheck, Sparkles, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CareerApply({ careers = [], selectedCareer = null, preselectedPosition = '' }) {
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
    });

    const [fileError, setFileError] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [isDragging, setIsDragging] = useState(false);

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
            setFileError('Format file tidak didukung. Harap unggah file dokumen berformat PDF, DOC, atau DOCX.');
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
        post('/karir/lamar', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset('cv_file', 'cover_letter', 'portfolio_url');
                setFileName('');
                setFileSize('');
            }
        });
    };

    return (
        <AppLayout>
            <Head title={`${t('apply_header_title', 'Formulir Lamaran Pekerjaan')} | ${siteSettings.site_name || 'PT. Sugiyama Indonesia'}`} />

            {/* Header Banner */}
            <div className="bg-emerald-950 text-white pt-28 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-slate-950">
                    <img 
                        src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1920&auto=format&fit=crop" 
                        alt="Sugiyama Careers" 
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-slate-950/90" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-400/30 text-emerald-300 text-xs font-bold backdrop-blur-xs">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{t('apply_header_badge', 'Formulir Karir / 採用応募')}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                        {t('apply_header_title', 'Formulir Lamaran Pekerjaan PT. Sugiyama Indonesia')}
                    </h1>

                    <p className="text-emerald-200/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        {t('apply_header_desc', 'Silakan lengkapi biodata diri, riwayat pendidikan, pengalaman kerja, serta unggah dokumen CV/Resume terbaru Anda (Maksimal 2 MB).')}
                    </p>

                    <div className="pt-2">
                        <Link 
                            href="/karir"
                            className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white font-bold transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t('career_back_all', 'Kembali ke Semua Lowongan')}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <section className="py-12 sm:py-16 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Success Alert */}
                    <AnimatePresence>
                        {recentlySuccessful && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-8 p-6 rounded-3xl bg-emerald-800 text-white shadow-xl border border-emerald-600 flex items-start gap-4"
                            >
                                <div className="p-2 rounded-2xl bg-emerald-700 shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-base sm:text-lg">
                                        {t('apply_success_title', 'Lamaran Berhasil Terkirim!')}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                                        {t('apply_success_desc', 'Terima kasih telah melamar di PT. Sugiyama Indonesia. Tim HRD kami akan meninjau CV Anda dan menghubungi kandidat yang memenuhi kualifikasi.')}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/90">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            
                            {/* SECTION 1: DATA DIRI */}
                            <div className="space-y-5">
                                <div className="border-b border-slate-100 pb-3 flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                                        1
                                    </div>
                                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                                        {t('apply_sec_personal', 'Data Diri Pelamar')}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Position Select */}
                                    <div className="sm:col-span-2 space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_position_label', 'Posisi yang Dilamar')} <span className="text-rose-500">*</span></span>
                                        </label>
                                        <select
                                            value={data.career_id}
                                            onChange={handleCareerChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
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
                                        {errors.position_title && (
                                            <p className="text-xs text-rose-600 font-medium">{errors.position_title}</p>
                                        )}
                                    </div>

                                    {/* Full Name */}
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
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        />
                                        {errors.full_name && (
                                            <p className="text-xs text-rose-600 font-medium">{errors.full_name}</p>
                                        )}
                                    </div>

                                    {/* Email */}
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
                                            placeholder="name@email.com"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-rose-600 font-medium">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Phone / WA */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_phone_label', 'Nomor WhatsApp / Telepon')} <span className="text-rose-500">*</span></span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="081234567890"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        />
                                        {errors.phone && (
                                            <p className="text-xs text-rose-600 font-medium">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Date of Birth & Gender Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{t('apply_dob_label', 'Tanggal Lahir')}</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={data.date_of_birth}
                                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                                className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-800">
                                                {t('apply_gender_label', 'Jenis Kelamin')}
                                            </label>
                                            <select
                                                value={data.gender}
                                                onChange={(e) => setData('gender', e.target.value)}
                                                className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                            >
                                                <option value="Laki-laki">{t('apply_gender_male', 'Laki-laki')}</option>
                                                <option value="Perempuan">{t('apply_gender_female', 'Perempuan')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: PENDIDIKAN & PENGALAMAN */}
                            <div className="space-y-5">
                                <div className="border-b border-slate-100 pb-3 flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                                        2
                                    </div>
                                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                                        {t('apply_sec_background', 'Pendidikan & Pengalaman Kerja')}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Education */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_edu_label', 'Pendidikan Terakhir')}</span>
                                        </label>
                                        <select
                                            value={data.last_education}
                                            onChange={(e) => setData('last_education', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        >
                                            <option value="SMK/SMA">SMK / SMA Sederajat</option>
                                            <option value="Diploma (D3)">Diploma (D3)</option>
                                            <option value="Sarjana (D4/S1)">Sarjana (D4 / S1)</option>
                                            <option value="Magister (S2)">Magister (S2)</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>

                                    {/* Major */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800">
                                            {t('apply_major_label', 'Jurusan / Bidang Keahlian')}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.major}
                                            onChange={(e) => setData('major', e.target.value)}
                                            placeholder="Contoh: Teknik Mesin / Otomotif / Metalurgi"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        />
                                    </div>

                                    {/* Experience Years */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800">
                                            {t('apply_exp_label', 'Lama Pengalaman Kerja')}
                                        </label>
                                        <select
                                            value={data.years_of_experience}
                                            onChange={(e) => setData('years_of_experience', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        >
                                            <option value="Fresh Graduate">Fresh Graduate / Kurang dari 1 Tahun</option>
                                            <option value="1 - 3 Tahun">1 - 3 Tahun</option>
                                            <option value="3 - 5 Tahun">3 - 5 Tahun</option>
                                            <option value="Lebih dari 5 Tahun">&gt; 5 Tahun</option>
                                        </select>
                                    </div>

                                    {/* Current/Previous Company */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_company_label', 'Perusahaan Terakhir / Saat Ini')}</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.current_company}
                                            onChange={(e) => setData('current_company', e.target.value)}
                                            placeholder="Contoh: PT. Manufaktur Presisi"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        />
                                    </div>

                                    {/* Expected Salary */}
                                    <div className="sm:col-span-2 space-y-1.5">
                                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>{t('apply_salary_label', 'Ekspektasi Gaji / Bulan (Opsional)')}</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.expected_salary}
                                            onChange={(e) => setData('expected_salary', e.target.value)}
                                            placeholder="Contoh: Rp 6.000.000 - Rp 8.000.000 / Nego"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3: UPLOAD CV & DOKUMEN */}
                            <div className="space-y-5">
                                <div className="border-b border-slate-100 pb-3 flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                                        3
                                    </div>
                                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                                        {t('apply_sec_documents', 'Dokumen CV & Portofolio')}
                                    </h2>
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
                                                        ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01]' 
                                                        : 'border-slate-300 hover:border-emerald-500 bg-slate-50/70 hover:bg-emerald-50/30'
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
                                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                                                    <Upload className="w-6 h-6" />
                                                </div>
                                                <p className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                                                    {t('apply_cv_choose', 'Pilih File CV atau Drag & Drop ke sini')}
                                                </p>
                                                <p className="text-[11px] text-slate-500">
                                                    {t('apply_cv_hint', 'Format file yang diterima: PDF, DOC, DOCX. Maksimal ukuran file: 2 MB.')}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{fileName}</p>
                                                        <p className="text-[11px] text-emerald-700 font-mono">{fileSize}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                                    title="Hapus file"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}

                                        {fileError && (
                                            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                <span>{fileError}</span>
                                            </p>
                                        )}
                                        {errors.cv_file && (
                                            <p className="text-xs text-rose-600 font-medium">{errors.cv_file}</p>
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
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
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
                                            rows={4}
                                            value={data.cover_letter}
                                            onChange={(e) => setData('cover_letter', e.target.value)}
                                            placeholder="Ceritakan secara singkat keahlian utama, motivasi melamar di PT. Sugiyama Indonesia, atau sertifikasi keahlian yang dimiliki..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all"
                                        />
                                        {errors.cover_letter && (
                                            <p className="text-xs text-rose-600 font-medium">{errors.cover_letter}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Consent & Submit Button */}
                            <div className="pt-4 border-t border-slate-100 space-y-6">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed flex items-start gap-2.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                                    <p>{t('apply_consent_text', 'Dengan mengirimkan formulir ini, saya menyatakan bahwa seluruh data yang diisi adalah benar dan menyetujui data pribadi saya diproses untuk keperluan seleksi rekrutmen PT. Sugiyama Indonesia.')}</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
