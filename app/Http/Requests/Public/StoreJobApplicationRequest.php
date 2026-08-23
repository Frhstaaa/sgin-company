<?php

namespace App\Http\Requests\Public;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'career_id' => 'nullable|exists:careers,id',
            'position_title' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email:rfc,dns|max:255',
            'phone' => 'required|string|max:30',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:Laki-laki,Perempuan,Lainnya',
            'last_education' => 'nullable|string|max:100',
            'major' => 'nullable|string|max:255',
            'years_of_experience' => 'nullable|string|max:100',
            'current_company' => 'nullable|string|max:255',
            'expected_salary' => 'nullable|string|max:100',
            'portfolio_url' => 'nullable|url|max:255',
            'cover_letter' => 'nullable|string|max:5000',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:2048', // Strictly Max 2 MB
        ];
    }

    public function messages(): array
    {
        return [
            'cv_file.required' => 'Dokumen CV / Resume wajib diunggah.',
            'cv_file.mimes' => 'Format file CV harus berupa PDF, DOC, atau DOCX.',
            'cv_file.max' => 'Ukuran file CV maksimal adalah 2 MB.',
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Alamat email aktif wajib diisi.',
            'email.email' => 'Format alamat email tidak valid.',
            'phone.required' => 'Nomor WhatsApp / telepon wajib diisi.',
            'position_title.required' => 'Posisi pekerjaan yang dilamar wajib dipilih.',
        ];
    }
}
