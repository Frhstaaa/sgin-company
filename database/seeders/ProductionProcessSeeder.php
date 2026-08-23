<?php

namespace Database\Seeders;

use App\Models\ProductionProcess;
use Illuminate\Database\Seeder;

class ProductionProcessSeeder extends Seeder
{
    public function run(): void
    {
        $processes = [
            [
                'step_number' => '01',
                'category' => 'main_flow',
                'title_id' => 'Produksi Bahan Baku Tempa di Pabrik Pusat Jepang',
                'title_jp' => '日本本社工場での鍛造ブランク材の生産',
                'title_en' => 'Production of Forged Blank at Japan Factory',
                'description_id' => 'Bahan baku tempa (forged blank) berstandar presisi tinggi diproduksi langsung di kantor pusat Sugiyama di Aichi, Jepang dengan mesin cold former berkapasitas besar dan formula logam optimal berstandar JIS.',
                'description_jp' => '高精度の冷間鍛造ブランク材は、愛知県の日本本社工場において最新鋭のフォーマーマシンと最適な金属配合で一貫生産されます。',
                'description_en' => 'High-precision cold forged blanks are produced directly at our Japan headquarters in Aichi using multi-station former machines under strict JIS metal standards.',
                'location_badge' => '🇯🇵 Aichi, Jepang',
                'icon' => 'factory',
                'image_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    'Bahan baku penempaan dingin standar JIS Jepang',
                    'Kontrol struktur mikro logam sebelum ekspor',
                    'Konsistensi dimensi awal nol cacat (Zero Defect Target)'
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'step_number' => '02',
                'category' => 'main_flow',
                'title_id' => 'Pengiriman Bahan Baku melalui Jalur Laut (Shipping by Sea)',
                'title_jp' => '海上輸送による原材料の輸送',
                'title_en' => 'Shipping of Forged Blanks by Sea Freight',
                'description_id' => 'Bahan baku tempa dikemas dengan proteksi anti-korosi dan diangkut melalui jalur logistik laut secara terjadwal ke pabrik PT. Sugiyama Indonesia di Karawang untuk menjamin efisiensi rantai pasok dan pasokan bahan yang stabil.',
                'description_jp' => '防錆処理を施したブランク材は定期コンテナ船でインドネシア（カラワン工場）へ海上輸送され、安定したサプライチェーンとコスト削減を実現します。',
                'description_en' => 'Anti-corrosion protected forged blanks are shipped via ocean container freight to our Karawang plant in Indonesia, ensuring supply continuity and competitive costs.',
                'location_badge' => '🚢 Jalur Logistik Laut Asia',
                'icon' => 'ship',
                'image_url' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    'Pengemasan pelindung anti-oksidasi VCI teruji',
                    'Jadwal pengiriman kontainer berkala dan terkelola',
                    'Optimalisasi biaya produksi bagi mitra industri'
                ],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'step_number' => '03',
                'category' => 'main_flow',
                'title_id' => 'Pemesinan CNC, Pemotongan & Penggulungan Ulir di Indonesia',
                'title_jp' => 'インドネシア工場での精密切削・転造・二次加工',
                'title_en' => 'Precision CNC Machining, Thread Rolling & Secondary Processing in Indonesia',
                'description_id' => 'Di pabrik PT. Sugiyama Indonesia, bahan tempa diproses melalui pemotongan presisi tinggi, pemesinan bubut CNC multi-sumbu, thread rolling ulir, serta pencucian ultrasonik untuk menghasilkan komponen akhir bernilai tinggi.',
                'description_jp' => 'カラワン工場にて、高精度CNC旋盤加工、転造加工、超音波洗浄などの二次加工を実施し、お客様のご要望に応じた高精度部品を仕上げます。',
                'description_en' => 'At our Karawang facility, blanks undergo high-precision CNC turning, thread rolling, ultrasonic cleaning, and secondary operations to deliver finished components.',
                'location_badge' => '🇮🇩 Karawang, Indonesia',
                'icon' => 'cog',
                'image_url' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    'Mesin CNC turning & milling akurasi toleransi mikro',
                    'Thread rolling presisi tinggi untuk komponen otomotif',
                    'Proses pencucian otomatis bebas kontaminasi partikel'
                ],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'step_number' => '04',
                'category' => 'qc',
                'title_id' => 'Pemeriksaan & Kontrol Kualitas Menyeluruh Standar Jepang',
                'title_jp' => '日本本社と同等の徹底した品質検査・外観選別',
                'title_en' => 'Comprehensive Quality Inspection & Visual Selection (Japan Standard)',
                'description_id' => 'Kami melakukan inspeksi visual 100% dengan loop pembesar optik, pengukuran dimensi menggunakan mikrometer digital berakurasi sub-mikron, serta pengujian ketat yang identik dengan kantor pusat di Jepang sebelum pengiriman.',
                'description_jp' => '拡大鏡を用いた全数外観目視検査、デジタルマイクロメーターによる寸法測定など、日本本社と同一水準の厳格な品質保証体制を徹底しています。',
                'description_en' => 'We perform 100% visual inspection with optical magnifiers, sub-micron digital micrometer measurements, and rigorous testing matching Japanese standards.',
                'location_badge' => '🔍 Lab QC & Ruang Bersih',
                'icon' => 'shield-check',
                'image_url' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    '100% inspeksi visual manual dengan lampu pembesar khusus',
                    'Pengukuran mikrometer digital dan dial gauge presisi',
                    'Standar mutu sertifikasi ISO 9001 / IATF 16949'
                ],
                'order' => 4,
                'is_active' => true,
            ],
            [
                'step_number' => '05',
                'category' => 'main_flow',
                'title_id' => 'Pengemasan Rapi & Pengiriman Domestik serta Ekspor Asia',
                'title_jp' => '確実な梱包とインドネシア国内およびアジア各国への出荷',
                'title_en' => 'Export Packaging & Delivery Across Indonesia and Asian Countries',
                'description_id' => 'Komponen yang telah lolos QC dikemas rapi dalam palet berstandar industri otomotif dan siap dikirimkan tepat waktu (JIT) ke pelanggan di seluruh Indonesia serta diekspor ke berbagai negara di kawasan Asia.',
                'description_jp' => '検査合格品は自動車基準のパレット梱包を施し、インドネシア国内の主要自動車メーカーおよびアジア各国へジャストインタイムで出荷されます。',
                'description_en' => 'Inspected components are packed into automotive-grade pallets and delivered on time (JIT) to clients throughout Indonesia and exported across Asia.',
                'location_badge' => '🌏 Distribusi Domestik & Asia',
                'icon' => 'package-check',
                'image_url' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    'Kemasan palet kokoh dengan proteksi benturan',
                    'Sistem pelabelan barcode & ketertelusuran lot produksi',
                    'Jaminan pengiriman tepat waktu (Just-In-Time)'
                ],
                'order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($processes as $proc) {
            ProductionProcess::updateOrCreate(
                ['step_number' => $proc['step_number']],
                $proc
            );
        }
    }
}
