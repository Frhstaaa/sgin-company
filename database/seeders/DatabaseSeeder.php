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
        $placeholder = '/images/sgin-placeholder.png';

        // Mass update all existing image columns to placeholder
        \Illuminate\Support\Facades\DB::table('products')->update(['image_url' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('product_categories')->update(['image_url' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('equipment')->update(['image_url' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('technologies')->update(['image_url' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('business_units')->update(['image_url' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('hero_slides')->update(['image_url' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('news')->update(['cover_image' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('company_profiles')->update(['president_photo_url' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('production_processes')->update(['image_url' => $placeholder]);
        \Illuminate\Support\Facades\DB::table('site_settings')->whereIn('key', [
            'home_about_image', 'home_facility_image', 'home_process_image',
            'banner_home', 'banner_about', 'banner_tech', 'banner_business',
            'banner_equipment', 'banner_production_process', 'banner_products',
            'banner_news', 'banner_careers', 'banner_contact', 'site_logo', 'site_favicon'
        ])->update(['value' => $placeholder]);

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
            'site_logo' => $placeholder,
            'site_favicon' => $placeholder,
            'contact_phone' => '0567-68-7077',
            'contact_fax' => '0567-68-7080',
            'contact_email' => 'info@sugiyama.co.id',
            'contact_address' => '〒498-0000 123-4 Kajiya-cho, Yatomi City, Aichi Prefecture, Japan',
            'contact_address_id' => 'Kawasan Industri GIIC Kota Deltamas Blok CF No.10, Cikarang Pusat, Bekasi, Jawa Barat 17530, Indonesia',
            'whatsapp_number' => '+6281234567890',
            'office_hours' => 'Senin - Jumat: 08:00 - 17:00 WIB / JST',
            'copyright_text' => '© 2026 PT. Sugiyama Indonesia. All Rights Reserved.',
            'footer_tagline' => 'Menempa masa depan manufaktur presisi melalui teknologi penempaan dingin dan pemesinan CNC kelas dunia.',
            'footer_certifications' => 'ISO 9001:2015, IATF 16949:2016, ISO 14001:2015',
            'footer_col1_title' => 'Teknologi & Bisnis',
            'footer_col2_title' => 'Tautan Cepat',
            'footer_factory_title' => 'Pabrik Indonesia (ASEAN HUB)',
            'footer_factory_phone' => '',
            'google_maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5!2d107.18!3d-6.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjEnMDAuMCJTIDEwN8KwMTAnNDguMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid',
            
            // Factsheet Extras from Company Profile PDF
            'factsheet_site_area' => '7,582 m²',
            'factsheet_building_area' => '3,913 m²',
            'factsheet_shareholders' => 'Sugiyama Co., Ltd. (98.33%), Takahide Sugiyama (1.67%)',
            'factsheet_business_scope' => 'Manufacturing and Sales for Automotive Parts [Forging, Machining]',
            'factsheet_customers' => 'PT Denso Indonesia, Niterra Co., Ltd. (Japan), Niterra India Pvt. Ltd. (India), Daido Kogyo (Thailand) Co., Ltd.',
            'factsheet_certifications' => 'ISO 9001:2015 & IATF 16949:2016 (On Progress)',
            
            // Home highlights & Visuals
            'about_stat1_label' => 'Berdiri',
            'about_stat1_value' => '9 Apr 2012',
            'about_stat2_label' => 'Sertifikasi',
            'about_stat2_value' => 'ISO 9001:2015',
            'about_stat3_label' => 'Karyawan',
            'about_stat3_value' => '93 Karyawan',
            'about_stat4_label' => 'Lokasi Pabrik',
            'about_stat4_value' => 'GIIC Deltamas',
            'about_president_tag' => 'President Director',
            'about_president_role' => 'Presiden Direktur PT. Sugiyama Indonesia',
            
            // Dynamic Cards on Home & Banners
            'home_about_image' => $placeholder,
            'home_facility_image' => $placeholder,
            'home_process_image' => $placeholder,
            'banner_home' => $placeholder,
            'banner_about' => $placeholder,
            'banner_tech' => $placeholder,
            'banner_business' => $placeholder,
            'banner_equipment' => $placeholder,
            'banner_production_process' => $placeholder,
            'banner_products' => $placeholder,
            'banner_news' => $placeholder,
            'banner_careers' => $placeholder,
            'banner_contact' => $placeholder,
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
                'subtitle' => 'Sebagai seorang ahli penempaan dan manufaktur presisi suku cadang otomotif, kami merevolusi kualitas industri global melalui Best Quality & Best Value.',
                'image_url' => $placeholder,
                'button_text' => 'Hubungi Kami',
                'button_link' => '/kontak',
                'order' => 1,
                'is_active' => true,
            ]
        );

        // 4. Company Stats (From PDF Profile)
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
                'subtext' => '3 Pabrik di Jepang & 1 di Indonesia (GIIC)',
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
                'image_url' => $placeholder,
                'icon' => 'pen-tool',
                'order' => 1,
            ],
            [
                'slug' => 'pemrosesan-presisi',
                'step_number' => '02',
                'title' => 'Pemrosesan presisi',
                'title_jp' => '精密加工',
                'short_description' => 'Pengerjaan komponen toleransi mikro (±0.005mm) dengan mesin penempa dingin dan armada CNC Shimada 20 unit & Murata 8 unit.',
                'content' => 'Kombinasi teknologi penempaan dingin net-shape dengan pemotongan CNC presisi multi-sumbu memungkinkan kami memproduksi suku cadang berkekuatan mekanik tinggi dengan efisiensi material hingga 95% dibandingkan metode pemotongan konvensional.',
                'features' => ['Cold Forging Machine', 'CNC Shimada (20 Unit)', 'CNC Murata Twin Spindle (8 Unit)', 'Rolling Tsugami & Broaching'],
                'image_url' => $placeholder,
                'icon' => 'cpu',
                'order' => 2,
            ],
            [
                'slug' => 'kontrol-kualitas',
                'step_number' => '03',
                'title' => 'Kontrol kualitas',
                'title_jp' => '品質管理',
                'short_description' => 'Standar mutu komprehensif ISO 9001:2015 & IATF 16949 didukung mesin CMM Mitutoyo, Keyence 4K Digital Microscope, dan Contracer.',
                'content' => 'Setiap lot produksi melewati inspeksi dimensional otomatis beresolusi tinggi menggunakan Coordinate Measuring Machines (CMM Mitutoyo Crysta Apex S574), Keyence VHX-7000 Digital Microscope, Mitutoyo Contracer CV-3200, dan instrumen metrologi standar Jepang untuk memastikan 100% kepatuhan spesifikasi.',
                'features' => ['CNC CMM Mitutoyo Crysta Apex S574', 'Keyence 4K Digital Microscope VHX-7000', 'Mitutoyo Contracer & Profile Projector', 'ISO 9001:2015 SGS Certified'],
                'image_url' => $placeholder,
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
                'image_url' => $placeholder,
                'tag' => 'Core Capability',
                'order' => 1,
            ],
            [
                'slug' => 'pemrosesan-pemotongan',
                'title' => 'Pemrosesan pemotongan',
                'title_jp' => '切削加工',
                'description' => 'Kombinasi proses cold forging dengan machining CNC canggih (Shimada & Murata) menghadirkan toleransi mikron untuk komponen otomotif kompleks.',
                'content' => 'Lini mesin bubut CNC otomatis 20 unit Shimada dan 8 unit Murata kami melayani proses pembubutan, frais, pemboran mikro, dan penguliran berkecepatan tinggi, memastikan hasil akhir yang sempurna untuk kebutuhan sensor housing, boss rotor, dan suku cadang otomotif global.',
                'image_url' => $placeholder,
                'tag' => 'High Precision CNC',
                'order' => 2,
            ],
            [
                'slug' => 'bisnis-av-pencetakan-3d',
                'title' => 'Bisnis AV / pencetakan 3D',
                'title_jp' => 'AV・3Dプリント事業',
                'description' => 'Teknologi peredam getaran dan akustik serta pencetakan 3D aditif untuk prototipe cepat dan komponen kustom generasi terbaru.',
                'content' => 'Mengintegrasikan keahlian metalurgi kami ke dalam industri audio-visual premium (AV vibration dampeners, connectors) dan aditif manufaktur 3D logam/polimer untuk melayani riset R&D kustom dan kebutuhan industri masa depan.',
                'image_url' => $placeholder,
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

        // 7. Equipment (Aligned with Page 8 & 9 of Company Profile PDF)
        $equipments = [
            // Page 8: Machine & Production Equipment
            [
                'category' => 'Cold Forging',
                'name' => 'Cold Forging Machine',
                'model_number' => 'Forging Header Former M/C',
                'manufacturer' => 'Sugiyama Engineering',
                'specs' => ['Kapasitas: Precision Cold Forging', 'Fungsi: Pembentukan net-shape tanpa pemanasan', 'Aplikasi: Oxygen Sensor Housing & Rotor Blank'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Mesin penempa dingin utama untuk produksi massal komponen presisi otomotif.',
                'order' => 1,
            ],
            [
                'category' => 'CNC Cutting',
                'name' => 'CNC Lathe Shimada Turning Machine',
                'model_number' => 'Shimada Precision CNC Lathe',
                'manufacturer' => 'Shimada Machinery Co., Ltd.',
                'specs' => ['Jumlah Armada: 20 Unit', 'Toleransi Pemesinan: ±0.005 mm', 'Aplikasi: High-Speed Precision Turning'],
                'quantity' => 20,
                'image_url' => $placeholder,
                'description' => 'Lini 20 unit mesin bubut CNC Shimada untuk pengerjaan finishing presisi tinggi.',
                'order' => 2,
            ],
            [
                'category' => 'CNC Cutting',
                'name' => 'CNC Murata Twin Spindle Lathe',
                'model_number' => 'Muratec MW Series Twin Spindle',
                'manufacturer' => 'Murata Machinery, Ltd.',
                'specs' => ['Jumlah Armada: 8 Unit', 'Fitur: Twin Spindle Automated CNC Turning', 'Kapasitas: Produksi Massal Berkecepatan Tinggi'],
                'quantity' => 8,
                'image_url' => $placeholder,
                'description' => 'Mesin bubut CNC ganda otomatis Murata untuk efisiensi siklus pemesinan optimal.',
                'order' => 3,
            ],
            [
                'category' => 'CNC Cutting',
                'name' => 'Rolling Machine Tsugami',
                'model_number' => 'Tsugami Precision Thread Rolling M/C',
                'manufacturer' => 'Tsugami Corporation',
                'specs' => ['Jumlah Armada: 6 Unit', 'Proses: Thread & Spline Rolling', 'Akurasi Penguliran: Standar Kelas JIS/ISO'],
                'quantity' => 6,
                'image_url' => $placeholder,
                'description' => 'Lini 6 unit mesin rolling Tsugami untuk pembentukan ulir dan spline berkekuatan tinggi.',
                'order' => 4,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Automated Inspection Sorting Machine',
                'model_number' => 'Inspection M/C High-Speed Sorter',
                'manufacturer' => 'Sugiyama Optical / Automated Sorter',
                'specs' => ['Jumlah Armada: 6 Unit', 'Fungsi: 100% Automatic Dimensional & Defect Sorting', 'Kecepatan: High-Speed Inline Sorting'],
                'quantity' => 6,
                'image_url' => $placeholder,
                'description' => 'Armada 6 unit mesin inspeksi otomatis untuk menyortir 100% produk tanpa cacat.',
                'order' => 5,
            ],
            [
                'category' => 'CNC Cutting',
                'name' => 'Brother CNC Machining / Tapping Center',
                'model_number' => 'Brother SPEEDIO / Compact Center',
                'manufacturer' => 'Brother Industries, Ltd.',
                'specs' => ['Jumlah: 2 Unit', 'Kecepatan Spindle: High-Speed Tapping & Milling', 'Aplikasi: Pembuatan Lubang & Driling Presisi'],
                'quantity' => 2,
                'image_url' => $placeholder,
                'description' => 'Pusat pemesinan kompak berkecepatan tinggi Brother untuk proses bor dan tapping.',
                'order' => 6,
            ],
            [
                'category' => 'CNC Cutting',
                'name' => 'Broaching Machine',
                'model_number' => 'Precision Broaching M/C',
                'manufacturer' => 'Precision Broach Maker',
                'specs' => ['Jumlah: 2 Unit', 'Proses: Keyway, Internal Spline & Serration', 'Akurasi: Sub-mikron'],
                'quantity' => 2,
                'image_url' => $placeholder,
                'description' => 'Mesin broaching presisi untuk pembentukan alur internal dan splines.',
                'order' => 7,
            ],
            [
                'category' => 'Cold Forging',
                'name' => 'Cleanvy Ultrasonic Washing Machine',
                'model_number' => 'Cleanvy Multi-Stage Ultrasonic Washer',
                'manufacturer' => 'Cleanvy Co., Ltd.',
                'specs' => ['Jumlah: 2 Unit', 'Metode: Multi-Stage Ultrasonic Degreasing & Drying', 'Hasil: Bebas residu oli dan partikel gram'],
                'quantity' => 2,
                'image_url' => $placeholder,
                'description' => 'Lini pencucian ultrasonik multi-tahap Cleanvy untuk memastikan kebersihan komponen 100%.',
                'order' => 8,
            ],
            [
                'category' => 'Cold Forging',
                'name' => 'Burrytorry Deburring & Chamfering Machine',
                'model_number' => 'Burrytorry Automated Deburring M/C',
                'manufacturer' => 'Burrytorry System',
                'specs' => ['Jumlah: 2 Unit', 'Fungsi: Automated Edge Deburring & Chamfering', 'Kualitas: Menghilangkan geram tajam'],
                'quantity' => 2,
                'image_url' => $placeholder,
                'description' => 'Mesin deburring otomatis untuk memastikan ujung permukaan halus dan aman.',
                'order' => 9,
            ],

            // Page 9: QC/QA Metrology Equipment
            [
                'category' => 'Inspection & Quality',
                'name' => 'CNC 3D CMM Mitutoyo Crysta Apex S574',
                'model_number' => 'CRYSTA-Apex S574',
                'manufacturer' => 'Mitutoyo Corporation (Japan)',
                'specs' => ['Rentang Ukur: 500 x 700 x 400 mm', 'Akurasi: E0,MPE = (1.7+3L/1000) µm', 'Fungsi: 3D Coordinate Measuring Machine Otomatis'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Instrumen pengukur koordinat 3D CMM Mitutoyo otomatis untuk verifikasi geometrik 3D.',
                'order' => 10,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Keyence Digital Microscope 4K VHX-7000',
                'model_number' => 'VHX-7000 Ultra-High Resolution',
                'manufacturer' => 'Keyence Corporation (Japan)',
                'specs' => ['Resolusi: 4K High Resolution Optical System', 'Perbesaran: Hingga 6000x', 'Fitur: 3D Surface Analysis & Metallurgical Inspection'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Mikroskop digital 4K resolusi tinggi Keyence untuk analisa metalurgi dan struktur mikro.',
                'order' => 11,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Mitutoyo Profile Projector PJ-H30',
                'model_number' => 'PJ-H30 Optical Projector',
                'manufacturer' => 'Mitutoyo Corporation (Japan)',
                'specs' => ['Layar Proyeksi: 300 mm Diameter', 'Akurasi: ±0.05% Kontur', 'Fungsi: Inspeksi Proyeksi Profil 2D Presisi'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Proyektor profil optik Mitutoyo untuk pengujian kontur 2D dan sudut presisi.',
                'order' => 12,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Mitutoyo Contracer CV-3200',
                'model_number' => 'Contracer CV-3200 Form Measurement',
                'manufacturer' => 'Mitutoyo Corporation (Japan)',
                'specs' => ['Fungsi: Contour & Surface Profile Measuring', 'Resolusi Z-axis: 0.02 µm', 'Akurasi Linear: ±(0.8+2L/100) µm'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Alat ukur kontur dan bentuk kurva kontinyu permukaan Mitutoyo CV-3200.',
                'order' => 13,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Keyence Image Measuring 6020',
                'model_number' => 'IM-6020 Instant Dimension System',
                'manufacturer' => 'Keyence Corporation (Japan)',
                'specs' => ['Metode: Place-and-Press Instant Measurement', 'Waktu Ukur: < 3 detik untuk 99 titik', 'Akurasi: ±2 µm'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Sistem pengukuran optik instan Keyence untuk inspeksi cepat dimensi komponen.',
                'order' => 14,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Mitutoyo Hardness Testing Machine',
                'model_number' => 'Mitutoyo Hardness Tester M/C',
                'manufacturer' => 'Mitutoyo Corporation (Japan)',
                'specs' => ['Skala: Rockwell (HRC/HRB) & Vickers', 'Akurasi: Standar JIS B 7726', 'Aplikasi: Pengujian Kekerasan Material Penempaan'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Mesin penguji kekerasan material untuk memvalidasi kekuatan mekanik komponen.',
                'order' => 15,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Nikon Measuring Microscope MM-40',
                'model_number' => 'MM-40 Toolmakers Microscope',
                'manufacturer' => 'Nikon Corporation (Japan)',
                'specs' => ['Sistem Optik: Nikon High-Resolution Metrology', 'Digital Readout: 0.1 µm', 'Aplikasi: Pengukuran Mikro Geometrik'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Mikroskop pengukur Nikon MM-40 untuk verifikasi dimensi mikroskopis.',
                'order' => 16,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Mitutoyo Surface Roughness Tester SJ-410',
                'model_number' => 'Surftest SJ-410 Series',
                'manufacturer' => 'Mitutoyo Corporation (Japan)',
                'specs' => ['Parameter: Ra, Rz, Rq, Ry (JIS/ISO)', 'Resolusi: 0.0001 µm', 'Kemampuan: Pengukuran Kekasaran Permukaan Halus'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Instrumen metrologi kekasaran permukaan Mitutoyo SJ-410.',
                'order' => 17,
            ],
            [
                'category' => 'Inspection & Quality',
                'name' => 'Horiba Oil Content Analyzer',
                'model_number' => 'OCMA Series Oil Content Analyzer',
                'manufacturer' => 'HORIBA, Ltd. (Japan)',
                'specs' => ['Metode: Non-Dispersive Infrared (NDIR)', 'Rentang: 0 - 200 mg/L', 'Fungsi: Pengukuran Kadar Residu Oli & Kebersihan'],
                'quantity' => 1,
                'image_url' => $placeholder,
                'description' => 'Penganalisis kandungan residu oli Horiba untuk menjamin kebersihan degreasing suku cadang.',
                'order' => 18,
            ],
        ];

        foreach ($equipments as $eq) {
            Equipment::updateOrCreate(
                ['name' => $eq['name']],
                $eq
            );
        }

        // 8. Product Categories & Products (From Page 6 of PDF)
        $catAuto = ProductCategory::updateOrCreate(
            ['slug' => 'otomotif-transmisi'],
            [
                'name' => 'Komponen Otomotif & Transmisi',
                'name_jp' => '自動車・トランスミッション部品',
                'description' => 'Komponen utama sensor oksigen (Oxygen Sensor Housing), rotor alternator (Boss Rotor), dan suku cadang presisi otomotif.',
                'image_url' => $placeholder,
                'order' => 1,
            ]
        );

        $catEV = ProductCategory::updateOrCreate(
            ['slug' => 'ev-elektronik-presisi'],
            [
                'name' => 'Komponen EV & Elektronik Presisi',
                'name_jp' => 'EV・精密電子部品',
                'description' => 'Terminal tembaga murni, shaft rotor EV, dan konektor konduktivitas tinggi tahan panas.',
                'image_url' => $placeholder,
                'order' => 2,
            ]
        );

        $catIndustrial = ProductCategory::updateOrCreate(
            ['slug' => 'fastener-industrial-kustom'],
            [
                'name' => 'Fastener & Poros Khusus Industri',
                'name_jp' => '産業用特殊ファスナー・シャフト',
                'description' => 'Baut bertingkat khusus, hollow shaft, bushing mikro, dan pin presisi bertoleransi ketat.',
                'image_url' => $placeholder,
                'order' => 3,
            ]
        );

        $products = [
            // Page 6 Product 1: Oxygen Sensor Housing
            [
                'category_id' => $catAuto->id,
                'slug' => 'oxygen-sensor-housing-shell',
                'sku' => 'SGN-O2S-01',
                'name' => 'Oxygen Sensor Housing Shell',
                'name_jp' => 'O2センサー用ハウジングシェル',
                'material' => 'SWCH / SUS Precision Cold Forged Steel',
                'application' => 'The shell or housing component of the Oxygen Sensor (Komponen cangkang sensor oksigen sistem gas buang & emisi otomotif)',
                'tolerance' => '±0.005 mm',
                'specs' => [
                    'Komponen Inti' => 'Oxygen Sensor Shell / Housing Component',
                    'Metode Manufaktur' => 'Precision Net-Shape Cold Forging + High-Speed CNC Turning',
                    'Pelanggan Utama' => 'PT Denso Indonesia, Niterra Co., Ltd. (Japan), Niterra India',
                    'Sertifikasi Mutu' => 'ISO 9001:2015 SGS Certified (ID15/03091)',
                ],
                'image_url' => $placeholder,
                'is_featured' => true,
                'order' => 1,
            ],
            // Page 6 Product 2: Boss Rotor
            [
                'category_id' => $catAuto->id,
                'slug' => 'boss-rotor-alternator',
                'sku' => 'SGN-BR-01',
                'name' => 'Boss Rotor (Alternator Magnetic Rotor Boss)',
                'name_jp' => 'オルタネーター用ローターボス',
                'material' => 'High-Permeability Low Carbon Cold Forged Steel',
                'application' => 'The rotor boss is a part of the moving rotor component which serves to provide a magnetic field to the alternator (Pembangkit medan magnet alternator otomotif)',
                'tolerance' => '±0.005 mm',
                'specs' => [
                    'Komponen Inti' => 'Moving Rotor Component for Automotive Alternator',
                    'Fungsi Mekanikal' => 'Provides magnetic field stability to the vehicle alternator',
                    'Metode Manufaktur' => 'Cold Forging + Multi-Axis CNC Turning Shimada & Murata',
                    'Sertifikasi Mutu' => 'ISO 9001:2015 SGS Certified (ID15/03091)',
                ],
                'image_url' => $placeholder,
                'is_featured' => true,
                'order' => 2,
            ],
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
                    'Metode Manufaktur' => 'Cold Forging + Hard Turning CNC',
                ],
                'image_url' => $placeholder,
                'is_featured' => true,
                'order' => 3,
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
                'image_url' => $placeholder,
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

        // 9. Company Profile (From Page 2, 3, 4, 5, 11 of Company Profile PDF)
        CompanyProfile::updateOrCreate(
            ['company_name' => 'PT. Sugiyama Indonesia'],
            [
                'company_name_jp' => '株式会社スギヤマ',
                'president_name' => 'Yuichi Sugiyama',
                'president_message' => 'Sebagai perusahaan manufaktur suku cadang otomotif spesialis penempaan dingin (cold forging) dan pemesinan CNC presisi, PT. Sugiyama Indonesia berdedikasi untuk memberikan "Best Quality & Best Value" kepada seluruh mitra industri kami di Indonesia, Jepang, Thailand, dan India. Dengan komitmen terhadap standar mutu internasional ISO 9001:2015 dan IATF 16949, kami terus meningkatkan kapabilitas rekayasa, kepuasan pelanggan, serta efisiensi manufaktur yang berkelanjutan.',
                'president_photo_url' => $placeholder,
                'philosophy' => 'Best Quality & Best Value - Mengutamakan kepuasan pelanggan melalui standar manufaktur presisi penempaan dingin dan perbaikan mutu berkelanjutan.',
                'vision' => 'To become a company that is globally competitive based on Best Quality and Best Value (Menjadi perusahaan yang berdaya saing global berbasiskan Kualitas Terbaik dan Nilai Terbaik).',
                'mission' => "1. Oriented to customer satisfaction by implementing good product principles as a whole (Berorientasi pada kepuasan pelanggan dengan menerapkan prinsip produk bermutu tinggi secara menyeluruh).\n2. Implementing the best standards to ensure product quality with continuous quality improvement (Menerapkan standar terbaik untuk menjamin kualitas produk dengan perbaikan mutu berkelanjutan).",
                'capital' => 'USD 3,750,000',
                'established_date' => '9 April 2012 (Mulai Produksi: November 2012)',
                'employees_count' => '93 Karyawan (90 Karyawan Lokal & 3 Expatriate - per Des 2024)',
                
                // Page 3 History Timeline
                'history_timeline' => [
                    ['year' => 'Nov 2012', 'event' => 'Established in Karawang, Indonesia (Didirikan dan memulai persiapan fasilitas manufaktur di Indonesia).'],
                    ['year' => 'Jan 2013', 'event' => 'Starting Mass Production for Thailand (Memulai produksi massal komponen presisi untuk pasar Thailand).'],
                    ['year' => 'Agu 2013', 'event' => 'Starting Mass Production for PT Denso Indonesia (Memulai kemitraan dan produksi massal untuk PT Denso Indonesia).'],
                    ['year' => 'Agu 2014', 'event' => 'Starting Mass Production for Japan (Memulai ekspor komponen presisi ke Jepang).'],
                    ['year' => 'Agu 2015', 'event' => 'Factory Move on to Kawasan Industri GIIC Blok CF No.10, Cikarang Pusat, Bekasi (Relokasi dan perluasan pabrik terpadu di GIIC Deltamas).'],
                    ['year' => 'Nov 2018', 'event' => 'Starting Mass Production for India (Memulai ekspansi pengapalan dan produksi massal untuk pasar India).'],
                ],
                
                // Page 5 Certifications
                'certifications' => [
                    ['name' => 'ISO 9001:2015', 'issuer' => 'SGS United Kingdom (No. ID15/03091 - Manufacture of Sensor Housing & Boss Rotor)', 'year' => 'Sejak 25 Feb 2015'],
                    ['name' => 'IATF 16949:2016', 'issuer' => 'Implementation of Quality Management System (On Progress)', 'year' => '2024'],
                ],
                
                // Page 11 Global Network
                'branches' => [
                    ['name' => 'PT. Sugiyama Indonesia (Pabrik Indonesia)', 'address' => 'Kawasan Industri GIIC Kota Deltamas Blok CF No.10, Cikarang Pusat, Bekasi 17530, Jawa Barat, Indonesia', 'role' => 'Main Manufacturing Plant & ASEAN Sales Hub (Forging & Machining)'],
                    ['name' => 'Sugiyama Co., Ltd. (Kisosaki Plant-1 & Head Office)', 'address' => 'Kisosaki, Mie Prefecture / Aichi, Japan', 'role' => 'Head Office & Core Cold Forging Facility'],
                    ['name' => 'Sugiyama Co., Ltd. (Kisosaki Plant-2)', 'address' => 'Kisosaki, Mie Prefecture, Japan', 'role' => 'Production Facility Japan'],
                    ['name' => 'Sugiyama Co., Ltd. (Kanie Plant)', 'address' => 'Kanie, Aichi Prefecture, Japan', 'role' => 'Production Facility Japan'],
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
                'cover_image' => $placeholder,
                'published_at' => '2026-08-15',
                'is_published' => true,
            ],
            [
                'slug' => 'partisipasi-pameran-manufaktur-tokyo-2026',
                'category' => 'Pameran',
                'title' => 'Partisipasi dalam Tokyo Manufacturing Tech Expo (M-Tech 2026)',
                'excerpt' => 'Kunjungi booth kami di Tokyo Big Sight untuk menyaksikan demonstrasi langsung teknologi penempaan net-shape dan komponen EV ultra presisi.',
                'content' => 'Kami mengundang para mitra dan rekan industri untuk mengunjungi booth PT. Sugiyama Indonesia di Tokyo Big Sight. Kami akan memamerkan inovasi hollow stepped rivet shaft dan terminal busbar tembaga murni untuk industri otomotif masa depan.',
                'cover_image' => $placeholder,
                'published_at' => '2026-07-28',
                'is_published' => true,
            ],
            [
                'slug' => 'perbaruan-sertifikasi-iatf-16949-audit-sempurna',
                'category' => 'Pemberitahuan',
                'title' => 'Implementasi Sistem Manajemen Mutu Otomotif Internasional IATF 16949:2016',
                'excerpt' => 'Kick-off dan implementasi standar sistem manajemen mutu otomotif global IATF 16949:2016 untuk memperkuat jaminan zero-defect.',
                'content' => 'Dedikasi terhadap zero defect dan perbaikan mutu berkelanjutan (Kaizen) terus diperkuat melalui implementasi sistem manajemen mutu otomotif berstandar IATF 16949:2016, melengkapi sertifikasi ISO 9001:2015 yang telah diraih sejak 2015.',
                'cover_image' => $placeholder,
                'published_at' => '2026-06-10',
                'is_published' => true,
            ],
            [
                'slug' => 'program-pelatihan-insinyur-muda-sugiyama-2026',
                'category' => 'Media',
                'title' => 'Peluncuran Program Akselerasi Karir Insinyur Muda PT. Sugiyama Indonesia 2026',
                'excerpt' => 'Program pertukaran insinyur teknik antara pabrik Jepang dan Indonesia untuk mentransfer keahlian die-making dan simulasi CAD/CAE.',
                'content' => 'Dalam rangka memperkuat sinergi global, PT. Sugiyama Indonesia meluncurkan program pertukaran dan pelatihan insinyur muda selama 1 tahun di Jepang. Program ini membekali peserta dengan keterampilan tingkat lanjut dalam perancangan cetakan penempaan dingin.',
                'cover_image' => $placeholder,
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
                'location' => 'Pabrik GIIC Cikarang',
                'requirements' => [
                    'Pendidikan min. D3 / S1 Teknik Mesin / Mekatronika',
                    'Pengalaman min. 2 tahun mengoperasikan CNC Lathe Turning (Shimada / Murata)',
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
                    'Kesempatan pelatihan kerja di pabrik Jepang',
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
                    'Pengalaman min. 2 tahun dalam pengoperasian 3D CMM (Mitutoyo Crysta Apex)',
                    'Memahami standar ISO 9001, IATF 16949, SPC, dan Control Plan otomotif',
                    'Kritis, teliti, dan memiliki integritas tinggi dalam evaluasi kualitas',
                ],
                'responsibilities' => [
                    'Melakukan pengukuran berkala produk jadi (Sensor Housing & Boss Rotor)',
                    'Membuat laporan inspeksi dimensional (FAI/PPAP) untuk pelanggan otomotif',
                    'Menganalisis tren deviasi proses menggunakan software SPC & Keyence VHX',
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
