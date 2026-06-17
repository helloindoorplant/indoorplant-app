'use client';

import { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface BlogShareButtonsProps {
  title: string;
  url: string;
}

export function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Use native Web Share API if available (mobile browsers)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        // User cancelled or error — ignore
      }
      return;
    }

    // Desktop fallback: open WhatsApp share in new tab
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    window.open(
      `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      '_blank'
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex items-center gap-3 relative">
      {/* Share Button */}
      <button
        onClick={handleShare}
        title="Share article"
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Copy Link Button */}
      <div className="relative">
        <button
          onClick={handleCopyLink}
          title="Copy link"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
            copied
              ? 'border-emerald-400 bg-emerald-50 text-emerald-600'
              : 'border-gray-200 text-gray-500 hover:text-primary hover:border-primary'
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
        </button>

        {/* Tooltip */}
        {copied && (
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg pointer-events-none shadow-lg">
            Link copied!
          </span>
        )}
      </div>
    </div>
  );
}
