import React from 'react';
import { Play, Video } from 'lucide-react';

/**
 * Extracts standard 11-char YouTube video ID from various URL patterns:
 * - https://www.youtube.com/watch?v=ABC123XYZ00
 * - https://youtu.be/ABC123XYZ00
 * - https://www.youtube.com/embed/ABC123XYZ00
 * - https://www.youtube.com/shorts/ABC123XYZ00
 */
export function getYouTubeVideoId(url) {
    if (!url || typeof url !== 'string') return null;
    const cleanUrl = url.trim();

    // Direct ID match (11 characters)
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
        return cleanUrl;
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = cleanUrl.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}

export default function YouTubeEmbed({ 
    url, 
    title = 'Video Dokumentasi & Proses PT. Sugiyama Indonesia',
    className = '',
    autoplay = true,
    mute = true,
    controls = true,
    aspectRatio = '16/9'
}) {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) return null;

    const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        mute: mute ? '1' : '0',
        loop: '1',
        playlist: videoId,
        controls: controls ? '1' : '0',
        rel: '0',
        modestbranding: '1',
        playsinline: '1',
        enablejsapi: '1',
    });

    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

    return (
        <div className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-950 group ${className}`}>
            <div className="relative w-full pb-[56.25%] bg-slate-900">
                <iframe
                    src={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                />
            </div>
        </div>
    );
}
