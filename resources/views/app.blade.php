<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta name="theme-color" content="#005944">

    <!-- Anti-Cache Directives for Dynamic Content Realtime Sync -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">

    @php
        $siteFavicon = \App\Models\SiteSetting::getByKey('site_favicon') ?: \App\Models\SiteSetting::getByKey('site_logo');
        $faviconUrl = $siteFavicon ? (str_starts_with($siteFavicon, 'http') ? $siteFavicon : asset(ltrim($siteFavicon, '/'))) : asset('favicon.ico');
    @endphp
    <!-- Favicon & Brand Icons (Dynamic from Site Settings) -->
    <link rel="icon" id="dynamic-favicon" href="{{ $faviconUrl }}">
    <link rel="shortcut icon" href="{{ $faviconUrl }}">
    <link rel="apple-touch-icon" href="{{ $faviconUrl }}">

    <!-- Primary SEO Meta Tags -->
    <title inertia>PT. Sugiyama Indonesia | 株式会社スギヤマ - Presisi Penempaan Dingin & Manufaktur Otomotif</title>
    <meta name="description" content="PT. Sugiyama Indonesia (株式会社スギヤマ / Sugiyama) adalah produsen manufaktur presisi spesialis cold forging (penempaan dingin), pemesinan CNC multi-axis, komponen powertrain otomotif, terminal tembaga inverter EV, dan fastener industri bersertifikasi IATF 16949 & ISO 9001 di GIIC Cikarang & Aichi Jepang.">
    <meta name="keywords" content="PT Sugiyama Indonesia, PT Sugiyama, Sugiyama, 株式会社スギヤマ, Sugiyama Indonesia, Sugiyama Precision, cold forging Indonesia, penempaan dingin, suku cadang presisi otomotif, GIIC Cikarang, pabrik Cikarang, IATF 16949, ISO 9001, suku cadang EV, manufaktur presisi Jepang">
    <meta name="author" content="PT. Sugiyama Indonesia">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="PT. Sugiyama Indonesia (株式会社スギヤマ)">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="PT. Sugiyama Indonesia | 株式会社スギヤマ - Keahlian Presisi Penempaan Dingin">
    <meta property="og:description" content="Produsen manufaktur presisi spesialis cold forging, permesinan CNC, dan suku cadang otomotif & EV berstandar IATF 16949 di Kawasan Industri GIIC Cikarang.">
    <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="id_ID">
    <meta property="og:locale:alternate" content="ja_JP">
    <meta property="og:locale:alternate" content="en_US">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="PT. Sugiyama Indonesia | 株式会社スギヤマ">
    <meta name="twitter:description" content="Spesialis penempaan dingin (cold forging) dan manufaktur presisi berstandar mutu Jepang di GIIC Cikarang.">
    <meta name="twitter:image" content="{{ asset('images/og-image.jpg') }}">

    <!-- Schema.org JSON-LD Structured Data -->
    @verbatim
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Corporation",
          "@id": "https://sgin.co.id/#organization",
          "name": "PT. Sugiyama Indonesia",
          "alternateName": [
            "PT Sugiyama",
            "Sugiyama",
            "Sugiyama Indonesia",
            "株式会社スギヤマ",
            "Sugiyama Precision Co., Ltd.",
            "Sugiyama Group"
          ],
          "legalName": "PT. Sugiyama Indonesia",
          "url": "https://sgin.co.id",
          "logo": "https://sgin.co.id/favicon.ico",
          "foundingDate": "1952-03",
          "description": "PT. Sugiyama Indonesia adalah produsen presisi cold forging dan CNC machining otomotif berstandar internasional IATF 16949 & ISO 9001.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kawasan Greenland International Industrial Center (GIIC) Blok CF No. 10, Pasirranji, Cikarang Pusat",
            "addressLocality": "Kabupaten Bekasi",
            "addressRegion": "Jawa Barat",
            "postalCode": "17530",
            "addressCountry": "ID"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62-21-30032962",
            "contactType": "customer service",
            "availableLanguage": ["Indonesian", "Japanese", "English"]
          },
          "knowsAbout": [
            "Cold Forging",
            "Penempaan Dingin",
            "CNC Machining",
            "Automotive Precision Components",
            "IATF 16949",
            "ISO 9001"
          ]
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://sgin.co.id/#localbusiness",
          "name": "PT. Sugiyama Indonesia",
          "image": "https://sgin.co.id/favicon.ico",
          "url": "https://sgin.co.id",
          "telephone": "+62-21-30032962",
          "priceRange": "$$$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kawasan Greenland International Industrial Center (GIIC) Blok CF No. 10, Pasirranji, Cikarang Pusat",
            "addressLocality": "Kabupaten Bekasi",
            "addressRegion": "Jawa Barat",
            "postalCode": "17530",
            "addressCountry": "ID"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -6.3931805,
            "longitude": 107.1579642
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "08:00",
            "closes": "17:00"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://sgin.co.id/#website",
          "url": "https://sgin.co.id",
          "name": "PT. Sugiyama Indonesia",
          "alternateName": "Sugiyama",
          "publisher": {
            "@id": "https://sgin.co.id/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://sgin.co.id/produk?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    }
    </script>
    @endverbatim

    <!-- Google Fonts: Noto Sans JP + Plus Jakarta Sans + Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
    @inertia

    <script>
        // Automatic cleanup of any stale legacy ServiceWorkers or CacheStorage
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for (var i = 0; i < registrations.length; i++) {
                    registrations[i].unregister();
                }
            });
        }
    </script>
</body>
</html>
