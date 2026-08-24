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
                'title_id' => 'Pasokan Bahan Baku (Material Supply dari Jepang & Thailand)',
                'title_jp' => '原材料の供給（日本本社・タイからの調達）',
                'title_en' => 'Material Supply from Sugiyama Co., Ltd. (Japan) & Thailand',
                'description_id' => 'Bahan baku batang kawat dan forged blanks berstandar presisi tinggi disuplai langsung oleh Sugiyama Co., Ltd. (Jepang) dan Daido Kogyo (Thailand) Co., Ltd. dengan formula metalurgi terbaik standar JIS.',
                'description_jp' => '高品質な線材および冷間鍛造用素材は、日本本社（Sugiyama Co., Ltd.）およびタイ（Daido Kogyo Thailand）から厳格な品質管理のもと安定調達されます。',
                'description_en' => 'High-precision cold forging wire and raw materials are supplied by Sugiyama Co., Ltd. (Japan) and Daido Kogyo (Thailand) Co., Ltd. under strict metallurgical standards.',
                'location_badge' => '🇯🇵 Sugiyama Co., Ltd. (Japan) & 🇹🇭 Daido Kogyo (Thailand)',
                'icon' => 'factory',
                'image_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    'Suplai dari Sugiyama Co., Ltd. (Jepang) & Daido Kogyo (Thailand)',
                    'Bahan baku penempaan dingin bersertifikasi standar mutu JIS',
                    'Inspeksi kontrol komposisi kimia & metalurgi material'
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'step_number' => '02',
                'category' => 'main_flow',
                'title_id' => 'Pengangkutan Logistik Laut (Marine Transport)',
                'title_jp' => '定期コンテナ船による海上輸送（Marine Transport）',
                'title_en' => 'Marine Transport & Maritime Container Logistics',
                'description_id' => 'Bahan baku dikemas dengan proteksi anti-oksidasi VCI dan dikapalkan secara terjadwal melalui rute laut dari pelabuhan Jepang dan Thailand menuju fasilitas manufaktur PT. Sugiyama Indonesia.',
                'description_jp' => '防錆処理（VCI）を施した原材料は定期コンテナ船で日本およびタイからインドネシアへ海上輸送され、安定したサプライチェーンを確立しています。',
                'description_en' => 'Raw materials with VCI anti-corrosion protection are shipped via scheduled ocean container freight to PT. Sugiyama Indonesia.',
                'location_badge' => '🚢 Rute Jalur Laut Asia Pasifik',
                'icon' => 'ship',
                'image_url' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    'Pengemasan pelindung anti-oksidasi VCI standar ekspor',
                    'Jadwal pengiriman kontainer laut berkala dan terkelola rapi',
                    'Efisiensi biaya logistik untuk rantai pasok otomotif'
                ],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'step_number' => '03',
                'category' => 'main_flow',
                'title_id' => 'Penempaan Dingin & Permesinan Presisi (Forging - Machining SGIN)',
                'title_jp' => 'インドネシア工場での冷間鍛造および精密切削加工（SGIN）',
                'title_en' => 'Forging & Precision Machining at SGIN Plant (GIIC Cikarang)',
                'description_id' => 'Di fasilitas PT. Sugiyama Indonesia (Kawasan Industri GIIC Cikarang), material diproses melalui mesin Cold Forging, armada 20 unit CNC Shimada, 8 unit CNC Murata, mesin Rolling Tsugami, pencucian ultrasonik Cleanvy, dan kontrol mutu 100%.',
                'description_jp' => 'SGIN（GIICチカラン工場）にて、冷間鍛造（Forging）、CNC旋盤（島田20台・村田8台）、転造（ツガミ6台）、超音波洗浄（Cleanvy）および精密検査を一貫実施します。',
                'description_en' => 'At SGIN GIIC Cikarang plant, raw materials undergo Cold Forging, CNC Turning (20-unit Shimada & 8-unit Murata), Tsugami Thread Rolling, Cleanvy Ultrasonic Washing, and rigorous QC.',
                'location_badge' => '🇮🇩 PT. Sugiyama Indonesia (GIIC Cikarang)',
                'icon' => 'cog',
                'image_url' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    'Cold Forging Machine & Part Former',
                    'CNC Shimada (20 unit) & CNC Murata Twin Spindle (8 unit)',
                    'Rolling Tsugami (6 unit), Cleanvy Washer & CMM Metrology'
                ],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'step_number' => '04',
                'category' => 'main_flow',
                'title_id' => 'Pengiriman Tepat Waktu ke Pelanggan (Delivery Domestik & Overseas)',
                'title_jp' => '国内外の主要顧客へのジャストインタイム納品（Delivery）',
                'title_en' => 'Delivery to Major Customers (Domestic & Overseas)',
                'description_id' => 'Produk jadi bersertifikasi ISO 9001:2015 dikirimkan tepat waktu (JIT) ke pelanggan domestik (PT Denso Indonesia) serta ekspor ke Niterra Co., Ltd. (Jepang), Niterra India Pvt. Ltd. (India), dan Daido Kogyo (Thailand).',
                'description_jp' => 'ISO 9001:2015認証の完成品は、国内（PT DENSO INDONESIA）および海外（日本NITERRA、インドNITERRA、タイDAIDO KOGYO）へタイムリーに納品されます。',
                'description_en' => 'Finished parts certified under ISO 9001:2015 are delivered JIT to domestic customers (PT Denso Indonesia) and overseas partners (Japan, India, Thailand).',
                'location_badge' => '🚛 Domestic & Global Supply Chain',
                'icon' => 'truck',
                'image_url' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
                'specs' => [
                    'Pelanggan Domestik: PT Denso Indonesia',
                    'Pelanggan Overseas: Niterra (Jepang), Niterra (India), Daido Kogyo (Thailand)',
                    'Pengiriman Just-In-Time (JIT) dengan kemasan palet standar otomotif'
                ],
                'order' => 4,
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
