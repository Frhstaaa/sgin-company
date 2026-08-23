<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SiteSetting;
use App\Models\HeroSlide;
use App\Models\CompanyStat;
use App\Models\Technology;
use App\Models\BusinessUnit;
use App\Models\Equipment;
use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\CompanyProfile;
use App\Models\News;
use App\Models\Career;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default Admin User
        User::updateOrCreate(
            ['email' => 'admin@sugiyama.co.id'],
            [
                'name' => 'Administrator Sugiyama',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        // Also keep fallback admin login for compatibility
        User::updateOrCreate(
            ['email' => 'admin@sagayama.co.jp'],
            [
                'name' => 'Administrator Sugiyama',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Site Settings
        $settings = [
            'site_name' => 'PT. Sugiyama Indonesia',
            'site_name_jp' => '株式会社スギヤマ',
            'site_tagline' => '技術を鍛え 未来を造る - Menempa Teknologi, Membangun Masa Depan',
            'contact_phone' => '0567-68-7077',
            'contact_fax' => '0567-68-7080',
            'contact_email' => 'info@sugiyama.co.id',
            'contact_address' => '〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan',
            'contact_address_id' => 'Kawasan Industri GIIC Blok AA-12, Kota Deltamas, Cikarang Pusat, Bekasi 17530, Jawa Barat, Indonesia',
            'whatsapp_number' => '+6281234567890',
            'office_hours' => 'Senin - Jumat: 08:00 - 17:00 JST / WIB',
            'copyright_text' => '© 2026 PT. Sugiyama Indonesia. All Rights Reserved.',
            'google_maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104523.82910714777!2d136.7501!3d35.1124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDA2JzQ0LjYiTiAxMzbCsDQ1JzAwLjQiRQ!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => 'general', 'type' => 'text']
            );
        }

        // 3. Hero Slides
        HeroSlide::updateOrCreate(
            ['title_id' => 'Menempa Teknologi, Membangun Masa Depan'],
            [
                'title_jp' => '技術を鍛え 未来を造る',
                'subtitle' => 'Sebagai seorang ahli penempaan dan manufaktur presisi, kami merevolusi kualitas industri global melalui keterampilan teknis kelas dunia.',
                'image_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop',
                'button_text' => 'Hubungi Kami',
                'button_link' => '/kontak',
                'order' => 1,
                'is_active' => true,
            ]
        );

        // 4. Company Stats
        $stats = [
            [
                'title_jp' => '創業年',
                'title_id' => 'Tahun Berdiri',
                'value' => '1952',
                'unit' => '年',
                'subtext' => 'Lebih dari 70 tahun dedikasi presisi',
                'icon' => 'calendar',
                'order' => 1,
            ],
            [
                'title_jp' => '拠点数',
                'title_id' => 'Basis Operasional',
                'value' => '日本 3 海外 1',
                'unit' => '',
                'subtext' => '3 Pabrik di Jepang & 1 di Indonesia',
                'icon' => 'globe',
                'order' => 2,
            ],
            [
                'title_jp' => '年間生産数',
                'title_id' => 'Produksi Tahunan',
                'value' => '約 5,000',
                'unit' => '万個',
                'subtext' => 'Hingga 50 juta pcs komponen presisi/tahun',
                'icon' => 'cpu',
                'order' => 3,
            ],
        ];

        foreach ($stats as $st) {
            CompanyStat::updateOrCreate(
                ['title_id' => $st['title_id']],
                $st
            );
        }

        // 5. Technologies
        $technologies = [
            [
                'slug' => 'desain-dan-pengembangan',
                'step_number' => '01',
                'title' => 'Desain dan Pengembangan',
                'title_jp' => '設計・開発',
                'short_description' => 'Optimalisasi cetakan dan simulasi penempaan menggunakan perangkat lunak CAD/CAM 3D mutakhir untuk efisiensi produksi maksimal.',
                'content' => 'Melalui teknologi rekayasa simulasi CAE (Computer Aided Engineering) dan finite element analysis (FEA), tim insinyur kami menguji aliran deformasi material penempaan dingin sebelum pembuatan die cetakan nyata, mengeliminasi cacat material dan mempercepat waktu peluncuran produk.',
                'features' => ['3D CAD/CAM Modeling', 'Forging Flow Simulation (CAE)', 'Die Tooling Optimization', 'Rapid Prototyping'],
                'image_url' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
                'icon' => 'pen-tool',
                'order' => 1,
            ],
            [
                'slug' => 'pemrosesan-presisi',
                'step_number' => '02',
                'title' => 'Pemrosesan presisi',
                'title_jp' => '精密加工',
                'short_description' => 'Pengerjaan komponen toleransi mikro (±0.005mm) dengan mesin penempa multi-station berkecepatan tinggi dan CNC 5-Axis.',
                'content' => 'Kombinasi teknologi penempaan dingin net-shape dengan pemotongan CNC presisi multi-sumbu memungkinkan kami memproduksi suku cadang berkekuatan mekanik tinggi dengan efisiensi material hingga 95% dibandingkan metode pemotongan konvensional.',
                'features' => ['Multi-station Cold Forging (6-Die)', 'CNC 5-Axis Turning & Milling', 'High-Speed Precision Grinding', 'Zero-defect High Yield'],
                'image_url' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
                'icon' => 'cpu',
                'order' => 2,
            ],
            [
                'slug' => 'kontrol-kualitas',
                'step_number' => '03',
                'title' => 'Kontrol kualitas',
                'title_jp' => '品質管理',
                'short_description' => 'Standar jaminan mutu komprehensif ISO 9001 & IATF 16949 didukung ruang ukur ber-AC dan mesin CMM optik otomatis.',
                'content' => 'Setiap lot produksi melewati inspeksi dimensional otomatis beresolusi tinggi menggunakan Coordinate Measuring Machines (CMM), pengukur kebulatan permukaan (Roundtest), dan pengujian kekerasan mikro Vickers untuk memastikan 100% kepatuhan spesifikasi.',
                'features' => ['Coordinate Measuring Machine (CMM)', 'Optical Vision Inspection System', 'Surface Roughness & Roundness Tester', 'IATF 16949 / ISO 9001 Standard'],
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1200&auto=format&fit=crop',
                'icon' => 'check-circle-2',
                'order' => 3,
            ],
        ];

        foreach ($technologies as $tech) {
            Technology::updateOrCreate(
                ['slug' => $tech['slug']],
                $tech
            );
        }

        // 6. Business Units
        $businesses = [
            [
                'slug' => 'penempaan-dingin',
                'title' => 'Penempaan dingin',
                'title_jp' => '冷間鍛造',
                'description' => 'Kami menciptakan produk dengan penempaan dingin presisi tinggi tanpa panas, mempertahankan orientasi serat material baja untuk kekuatan mekanik superior.',
                'content' => 'Penempaan dingin (Cold Forging) adalah keahlian inti PT. Sugiyama Indonesia selama puluhan tahun. Kami memproses baja karbon, baja paduan, aluminium, dan tembaga menjadi geometri rumit dengan kekuatan tarik maksimal dan permukaan halus tanpa memerlukan pemesinan sekunder yang boros.',
                'image_url' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
                'tag' => 'Core Capability',
                'order' => 1,
            ],
            [
                'slug' => 'pemrosesan-pemotongan',
                'title' => 'Pemrosesan pemotongan',
                'title_jp' => '切削加工',
                'description' => 'Kombinasi proses cold forging dengan machining CNC canggih menghadirkan toleransi mikron untuk komponen bergeometri kompleks.',
                'content' => 'Lini mesin bubut CNC otomatis dan machining center kami melayani proses pembubutan, frais, pemboran mikro, dan penguliran berkecepatan tinggi, memastikan hasil akhir yang sempurna untuk kebutuhan otomotif dan kedirgantaraan.',
                'image_url' => 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800&auto=format&fit=crop',
                'tag' => 'High Precision CNC',
                'order' => 2,
            ],
            [
                'slug' => 'bisnis-av-pencetakan-3d',
                'title' => 'Bisnis AV / pencetakan 3D',
                'title_jp' => 'AV・3Dプリント事業',
                'description' => 'Teknologi peredam getaran dan akustik serta pencetakan 3D aditif untuk prototipe cepat dan komponen kustom generasi terbaru.',
                'content' => 'Mengintegrasikan keahlian metalurgi kami ke dalam industri audio-visual premium (AV vibration dampeners, connectors) dan aditif manufaktur 3D logam/polimer untuk melayani riset R&D kustom dan kebutuhan industri masa depan.',
                'image_url' => 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format&fit=crop',
                'tag' => 'Innovation & R&D',
                'order' => 3,
            ],
        ];

        foreach ($businesses as $b) {
            BusinessUnit::updateOrCreate(
                ['slug' => $b['slug']],
                $b
            );
        }

        // 7. Equipment
        $equipments = [
            [
                'category' => 'Cold Forging',
                'name' => 'Multi-Station Cold Former 6-Die',
                'model_number' => 'BP-660SS',
                'manufacturer' => 'Sakamura Machine Works',
                'specs' => ['Kapasitas Penempaan: 250 Ton', 'Kecepatan Produksi: 180 pcs/menit', 'Diameter Kawat Maks: 22 mm', 'Panjang Potong Maks: 150 mm'],
                'quantity' => 8,
                'image_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
                'description' => 'Mesin penempa dingin 6 stasiun berkecepatan tinggi untuk komponen otomotif massal.',
                'order' => 1,
            ],
            [
                'category' => 'Cold Forging',
                'name' => 'Part Former 5-Die Precision',
                'model_number' => 'PF-520',
                'manufacturer' => 'Asahi Sunac Corporation',
                'specs' => ['Kapasitas Penempaan: 160 Ton', 'Kecepatan Produksi: 220 pcs/menit', 'Toleransi Dimensi: ±0.01 mm'],
                'quantity' => 12,
                'image_url' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
                'description' => 'Mesin part former presisi tinggi untuk komponen pinion gear dan spline shaft.',
                'order' => 2,
            ],
            [
                'category' => 'CNC Cutting',
                'name' => '5-Axis CNC Turning Center',
                'model_number' => 'NLX 2500 | 700',
                'manufacturer' => 'DMG MORI',
                'specs' => ['Spindle Speed: 4,000 RPM', 'Turret: 12-station BMT', 'Toleransi Pemotongan: ±0.003 mm'],
                'quantity' => 15,
                'image_url' => 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800&auto=format&fit=crop',
                'description' => 'Pusat pembubutan presisi tinggi dengan kemampuan milling sinkron untuk part kompleks.',
                'order' => 3,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'CNC Coordinate Measuring Machine (CMM)',
                'model_number' => 'CRYSTA-Apex V7106',
                'manufacturer' => 'Mitutoyo Corporation',
                'specs' => ['Rentang Ukur: 700 x 1000 x 600 mm', 'Akurasi Pengukuran: (1.7+3L/1000) µm', 'Probe: Scanning Renishaw SP25M'],
                'quantity' => 4,
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop',
                'description' => 'Mesin pengukur koordinat 3D otomatis dalam ruang suhu terkontrol 20°C ±0.5°C.',
                'order' => 4,
            ],
            [
                'category' => '3D Printing & Tooling',
                'name' => 'Industrial Metal 3D Printer & Wire EDM',
                'model_number' => 'SLM 280 2.0 / MV2400-S',
                'manufacturer' => 'Mitsubishi Electric / SLM',
                'specs' => ['Laser Power: Dual 700W Fiber Laser', 'Precision EDM: Sub-micron finish', 'Material: Maraging Steel, Inconel, Ti6Al4V'],
                'quantity' => 3,
                'image_url' => 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format&fit=crop',
                'description' => 'Fasilitas manufaktur aditif & die tooling internal untuk pembuatan cetakan tahan aus.',
                'order' => 5,
            ],
        ];

        foreach ($equipments as $eq) {
            Equipment::updateOrCreate(
                ['name' => $eq['name']],
                $eq
            );
        }

        // 8. Product Categories & Products
        $catAuto = ProductCategory::updateOrCreate(
            ['slug' => 'otomotif-transmisi'],
            [
                'name' => 'Komponen Otomotif & Transmisi',
                'name_jp' => '自動車・トランスミッション部品',
                'description' => 'Komponen transmisi, powertrain, steering, dan suspensi kendaraan dengan kekuatan torsi tinggi.',
                'image_url' => 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop',
                'order' => 1,
            ]
        );

        $catEV = ProductCategory::updateOrCreate(
            ['slug' => 'ev-elektronik-presisi'],
            [
                'name' => 'Komponen EV & Elektronik Presisi',
                'name_jp' => 'EV・精密電子部品',
                'description' => 'Terminal tembaga murni, shaft rotor EV, dan konektor konduktivitas tinggi tahan panas.',
                'image_url' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
                'order' => 2,
            ]
        );

        $catIndustrial = ProductCategory::updateOrCreate(
            ['slug' => 'fastener-industrial-kustom'],
            [
                'name' => 'Fastener & Poros Khusus Industri',
                'name_jp' => '産業用特殊ファスナー・シャフト',
                'description' => 'Baut bertingkat khusus, hollow shaft, bushing mikro, dan pin presisi bertoleransi ketat.',
                'image_url' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
                'order' => 3,
            ]
        );

        $products = [
            [
                'category_id' => $catAuto->id,
                'slug' => 'precision-flange-shaft-pinion',
                'sku' => 'SGN-FS-435',
                'name' => 'Precision Flange Shaft Pinion',
                'name_jp' => '高強度フランジシャフト',
                'material' => 'SCM435H Alloy Steel',
                'application' => 'Transmisi Otomatis (AT/CVT) & Penggerak Roda Belakang',
                'tolerance' => '±0.005 mm',
                'specs' => [
                    'Diameter Luar' => '32.0 mm',
                    'Panjang Total' => '115.0 mm',
                    'Kekerasan Permukaan' => 'HRC 58-62 (Carburized)',
                    'Metode Manufaktur' => 'Cold Forging 6-Die + Hard Turning CNC',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'category_id' => $catAuto->id,
                'slug' => 'hollow-stepped-rivet-shaft',
                'sku' => 'SGN-HR-201',
                'name' => 'Hollow Stepped Rivet Shaft',
                'name_jp' => '中空段付きシャフト',
                'material' => 'SWCH10R Carbon Steel',
                'application' => 'Sistem Steering Kolom & Electronic Power Steering (EPS)',
                'tolerance' => '±0.008 mm',
                'specs' => [
                    'Diameter Luar' => '18.5 mm',
                    'Diameter Lubang Dalam' => '9.2 mm',
                    'Reduksi Berat' => '38% dibanding Solid Shaft',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'category_id' => $catEV->id,
                'slug' => 'ev-inverter-copper-busbar-terminal',
                'sku' => 'SGN-EV-CU01',
                'name' => 'EV Inverter Copper Terminal',
                'name_jp' => 'EVインバータ用高純度銅端子',
                'material' => 'C1100 Oxygen-Free Copper (OFC)',
                'application' => 'Inverter Module Mobil Listrik & Sistem Battery Pack',
                'tolerance' => '±0.005 mm',
                'specs' => [
                    'Konduktivitas Listrik' => '> 100% IACS',
                    'Lapisan Permukaan' => 'Pure Silver Plating 5µm',
                    'Uji Ketahanan Panas' => '180°C continuous operation',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop',
                'is_featured' => true,
                'order' => 3,
            ],
            [
                'category_id' => $catIndustrial->id,
                'slug' => 'ultra-precision-micro-gear-blank',
                'sku' => 'SGN-MG-SUS',
                'name' => 'Ultra-Precision Micro Gear Blank',
                'name_jp' => '精密マイクロギヤブランク',
                'material' => 'SUS304 / SUS420J2 Stainless Steel',
                'application' => 'Aktuator Robotik & Motor Servo Industri Presisi',
                'tolerance' => '±0.003 mm',
                'specs' => [
                    'Modul Gigi' => '0.3 - 0.8',
                    'Kebulatan (Roundness)' => '< 1.5 µm',
                    'Kekasaran Permukaan' => 'Ra 0.2 µm',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop',
                'is_featured' => true,
                'order' => 4,
            ],
        ];

        foreach ($products as $p) {
            Product::updateOrCreate(
                ['slug' => $p['slug']],
                $p
            );
        }

        // 9. Company Profile
        CompanyProfile::updateOrCreate(
            ['company_name' => 'PT. Sugiyama Indonesia'],
            [
                'company_name_jp' => '株式会社スギヤマ',
                'president_name' => 'Takeshi Sugiyama',
                'president_message' => 'Sejak didirikan pada tahun 1952, PT. Sugiyama Indonesia (Sugiyama Group) terus berkomitmen menempa batas kemampuan teknik manufaktur presisi. Di era elektrifikasi kendaraan dan otomasi cerdas saat ini, dedikasi kami terhadap toleransi mikron, integritas metalurgi, dan inovasi ramah lingkungan tetap menjadi fondasi kepercayaan mitra global kami di Jepang, Asia Tenggara, dan seluruh dunia.',
                'president_photo_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
                'philosophy' => 'Menempa kualitas terbaik melalui penguasaan teknologi, dedikasi karyawan, dan kepuasan pelanggan yang berkelanjutan.',
                'vision' => 'Menjadi tolok ukur global dalam teknologi penempaan dingin dan komponen presisi masa depan.',
                'mission' => 'Menghadirkan produk presisi bernilai tambah tinggi dengan efisiensi sumber daya maksimal untuk mendukung kemajuan industri dunia.',
                'capital' => '50,000,000 JPY (¥50 Juta)',
                'established_date' => 'Maret 1952',
                'employees_count' => '280 Karyawan (Global Group)',
                'history_timeline' => [
                    ['year' => '1952', 'event' => 'Didirikan sebagai bengkel penempaan logam presisi di Yatomi, Prefektur Aichi, Jepang.'],
                    ['year' => '1970', 'event' => 'Mengembangkan mesin multi-station cold former pertama untuk industri otomotif Jepang.'],
                    ['year' => '1995', 'event' => 'Meraih sertifikasi ISO 9001 untuk seluruh fasilitas produksi manufaktur.'],
                    ['year' => '2008', 'event' => 'Ekspansi fasilitas pabrik kedua di Mie Prefecture khusus CNC machining 5-axis.'],
                    ['year' => '2016', 'event' => 'Mendirikan PT. Sugiyama Indonesia di GIIC Cikarang untuk melayani pasar ASEAN.'],
                    ['year' => '2023', 'event' => 'Memulai divisi komponen EV & aditif 3D printing logam generasi terbaru.'],
                ],
                'certifications' => [
                    ['name' => 'IATF 16949:2016', 'issuer' => 'Automotive Quality Management System', 'year' => '2024'],
                    ['name' => 'ISO 9001:2015', 'issuer' => 'Quality Management Standards', 'year' => '2023'],
                    ['name' => 'ISO 14001:2015', 'issuer' => 'Environmental Management System', 'year' => '2023'],
                ],
                'branches' => [
                    ['name' => 'Kantor Pusat & Pabrik Aichi (Jepang)', 'address' => '123-4 Kajiya-cho, Yatomi City, Aichi Prefecture', 'role' => 'Headquarter & Core Cold Forging Plant'],
                    ['name' => 'Pabrik Mie Tech Center (Jepang)', 'address' => '45-2 Takara-cho, Kuwana City, Mie Prefecture', 'role' => 'CNC Precision Machining & Tooling R&D'],
                    ['name' => 'Kantor Cabang Tokyo (Jepang)', 'address' => 'Otemachi Financial City, Chiyoda-ku, Tokyo', 'role' => 'Global Sales & Technical Support'],
                    ['name' => 'PT. Sugiyama Indonesia', 'address' => 'Kawasan Industri GIIC Blok AA-12, Kota Deltamas, Cikarang Pusat, Jawa Barat, Indonesia', 'role' => 'ASEAN Production & Assembly Hub'],
                ],
            ]
        );

        // 10. News Articles
        $news = [
            [
                'slug' => 'penambahan-mesin-former-6-die-terbaru',
                'category' => 'Teknologi',
                'title' => 'Investasi Mesin Multi-Station Cold Former 6-Die Terbaru untuk Komponen EV',
                'excerpt' => 'Guna memenuhi lonjakan permintaan komponen transmisi kendaraan listrik, kami mengoperasikan lini mesin penempa dingin 6 stasiun berkecepatan tinggi.',
                'content' => 'Sugiyama Precision Co., Ltd. mengumumkan penyelesaian instalasi dan pengoperasian mesin penempa multi-station cold former Sakamura 6-Die terbaru di pabrik Aichi. Mesin ini meningkatkan kapasitas produksi tahunan sebesar 15% sekaligus meningkatkan efisiensi energi hingga 20%.',
                'cover_image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
                'published_at' => '2026-08-15',
                'is_published' => true,
            ],
            [
                'slug' => 'partisipasi-pameran-manufaktur-tokyo-2026',
                'category' => 'Pameran',
                'title' => 'Partisipasi dalam Tokyo Manufacturing Tech Expo (M-Tech 2026)',
                'excerpt' => 'Kunjungi booth kami di Tokyo Big Sight untuk menyaksikan demonstrasi langsung teknologi penempaan net-shape dan komponen EV ultra presisi.',
                'content' => 'Kami mengundang para mitra dan rekan industri untuk mengunjungi booth PT. Sugiyama Indonesia di Tokyo Big Sight. Kami akan memamerkan inovasi hollow stepped rivet shaft dan terminal busbar tembaga murni untuk industri otomotif masa depan.',
                'cover_image' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
                'published_at' => '2026-07-28',
                'is_published' => true,
            ],
            [
                'slug' => 'perbaruan-sertifikasi-iatf-16949-audit-sempurna',
                'category' => 'Pemberitahuan',
                'title' => 'Berhasil Memperbarui Sertifikasi IATF 16949:2016 dengan Nilai Audit Nol Temuan',
                'excerpt' => 'Audit resertifikasi sistem manajemen mutu otomotif internasional berhasil diselesaikan dengan hasil luar biasa tanpa temuan minor maupun mayor.',
                'content' => 'Dedikasi terhadap zero defect dan perbaikan berkelanjutan (Kaizen) terbukti lewat kelulusan audit resertifikasi IATF 16949:2016 yang dilakukan oleh lembaga sertifikasi independen. Ini memperkuat komitmen kami sebagai Tier-1/Tier-2 supplier otomotif terpercaya.',
                'cover_image' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1200&auto=format&fit=crop',
                'published_at' => '2026-06-10',
                'is_published' => true,
            ],
            [
                'slug' => 'program-pelatihan-insinyur-muda-sugiyama-2026',
                'category' => 'Media',
                'title' => 'Peluncuran Program Akselerasi Karir Insinyur Muda PT. Sugiyama Indonesia 2026',
                'excerpt' => 'Program pertukaran insinyur teknik antara pabrik Jepang dan Indonesia untuk mentransfer keahlian die-making dan simulasi CAD/CAE.',
                'content' => 'Dalam rangka memperkuat sinergi global, PT. Sugiyama Indonesia meluncurkan program pertukaran dan pelatihan insinyur muda selama 1 tahun di Jepang. Program ini membekali peserta dengan keterampilan tingkat lanjut dalam perancangan cetakan penempaan dingin.',
                'cover_image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
                'published_at' => '2026-05-18',
                'is_published' => true,
            ],
        ];

        foreach ($news as $n) {
            News::updateOrCreate(
                ['slug' => $n['slug']],
                $n
            );
        }

        // 11. Career Openings
        $careers = [
            [
                'slug' => 'cnc-precision-machining-engineer',
                'title' => 'CNC Precision Machining Engineer',
                'department' => 'Engineering & Production',
                'employment_type' => 'Full-time',
                'location' => 'Pabrik GIIC Cikarang / Aichi Tech Center',
                'requirements' => [
                    'Pendidikan min. D3 / S1 Teknik Mesin / Mekatronika',
                    'Pengalaman min. 2 tahun mengoperasikan CNC Lathe / 5-Axis Milling (DMG Mori / Mazak)',
                    'Mampu membaca gambar teknik 2D/3D (GD&T) dan menggunakan alat ukur presisi (Micrometer, CMM)',
                    'Memiliki kemampuan bahasa Jepang (JLPT N3/N4) menjadi nilai tambah',
                ],
                'responsibilities' => [
                    'Melakukan setup mesin, programming CAM, dan tooling change untuk lot produksi baru',
                    'Memantau kestabilan proses pemesinan dan menjaga toleransi dalam batas ±0.005mm',
                    'Melakukan perawatan berkala mesin CNC dan pemeliharaan alat potong',
                ],
                'benefits' => [
                    'Gaji kompetitif + Tunjangan keahlian teknis',
                    'Asuransi kesehatan lengkap (BPJS + Swasta)',
                    'Kesempatan pelatihan kerja langsung di pabrik Jepang',
                    'Fasilitas antar-jemput & makan siang',
                ],
                'salary_range' => 'Rp 9.000.000 - Rp 15.000.000 / bulan',
                'deadline' => '2026-10-31',
                'is_active' => true,
            ],
            [
                'slug' => 'quality-assurance-cmm-specialist',
                'title' => 'Quality Assurance & CMM Specialist',
                'department' => 'Quality Control',
                'employment_type' => 'Full-time',
                'location' => 'Pabrik GIIC Cikarang',
                'requirements' => [
                    'Pendidikan min. SMK Teknik / D3 Teknik Mesin / Industri',
                    'Pengalaman min. 2 tahun dalam pengoperasian CMM (Mitutoyo / Zeiss)',
                    'Memahami standar IATF 16949, SPC, FMEA, dan Control Plan otomotif',
                    'Kritis, teliti, dan memiliki integritas tinggi dalam evaluasi kualitas',
                ],
                'responsibilities' => [
                    'Melakukan pengukuran berkala produk jadi dan komponen first-piece approval',
                    'Membuat laporan inspeksi dimensional (FAI/PPAP) untuk pelanggan otomotif',
                    'Menganalisis tren deviasi proses menggunakan software SPC',
                ],
                'benefits' => [
                    'Gaji kompetitif & bonus tahunan',
                    'BPJS Kesehatan & Ketenagakerjaan',
                    'Program sertifikasi profesi metrologi',
                ],
                'salary_range' => 'Rp 8.000.000 - Rp 13.000.000 / bulan',
                'deadline' => '2026-11-15',
                'is_active' => true,
            ],
        ];

        foreach ($careers as $c) {
            Career::updateOrCreate(
                ['slug' => $c['slug']],
                $c
            );
        }

        // 12. Production Processes
        $this->call(ProductionProcessSeeder::class);

        // 13. Roles & Permissions (Spatie)
        $this->call(RolePermissionSeeder::class);
    }
}
