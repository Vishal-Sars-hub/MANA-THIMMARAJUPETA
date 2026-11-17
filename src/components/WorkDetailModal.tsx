import { useEffect, useState } from 'react';
import { ExternalLink, X, ChevronLeft, ChevronRight, Calendar, BookOpen } from 'lucide-react';
import { CATEGORIES, VOLUMES, type PanchayatWork } from '../data/panchayatWorks';
import { ResilientImage } from './ResilientImage';

interface WorkDetailModalProps {
  work: PanchayatWork | null;
  onClose: () => void;
  langMode: 'bilingual' | 'en' | 'te';
}

export function WorkDetailModal({ work, onClose, langMode }: WorkDetailModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    setActivePhotoIndex(0);
  }, [work?.id]);

  useEffect(() => {
    if (!work) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (work.images.length > 1) {
        if (e.key === 'ArrowRight') {
          setActivePhotoIndex((prev) => (prev + 1) % work.images.length);
        } else if (e.key === 'ArrowLeft') {
          setActivePhotoIndex((prev) => (prev - 1 + work.images.length) % work.images.length);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [work, onClose]);

  if (!work) return null;

  const category = CATEGORIES.find((c) => c.id === work.category);
  const volume = VOLUMES[work.volume];
  const allPhotos = work.images.length > 0 ? work.images : work.featuredImage ? [work.featuredImage] : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#FFFDF7] dark:bg-[#111311] border border-[#E5C97B] dark:border-[#273227] text-[#27120B] dark:text-[#F5F5F4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#FFFDF7]/95 dark:bg-[#111311]/95 backdrop-blur-sm border-b border-[#F3DF9E] dark:border-[#222B22]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C2D12] dark:text-[#4ADE80] font-medium">
            <span className="font-mono-tabular">{work.dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{category?.name}</span>
            <span aria-hidden="true">·</span>
            <span>{volume.shortLabel}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E5C97B] dark:border-[#2D3A2D] text-[#27120B] dark:text-[#F5F5F4] hover:bg-[#FEF3C7] dark:hover:bg-[#1D241D] transition-colors focus-visible:outline-2 focus-visible:outline-[#B91C1C] dark:focus-visible:outline-[#F97316]"
            aria-label="Close work details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            {work.highlightMetric && (
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#FB923C] font-semibold">
                {work.highlightMetric}
              </p>
            )}
            <h3
              id="work-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-[#27120B] dark:text-[#FAFAF9]"
            >
              {langMode === 'te' ? `${work.teDate} — ${work.enTitle}` : work.enTitle}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B3423] dark:text-[#A8A29E] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#F97316]" aria-hidden="true" />
                <span>
                  {work.dateLabel} ({work.teDate})
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#22C55E]" aria-hidden="true" />
                <span>{volume.title}</span>
              </span>
            </div>
          </div>

          {allPhotos.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#F3DF9E] dark:border-[#243024] bg-[#FEF9E7] dark:bg-[#0A0C0A]">
                <ResilientImage
                  src={allPhotos[activePhotoIndex]}
                  alt={`${work.enTitle} — photograph ${activePhotoIndex + 1} of ${allPhotos.length}`}
                  fallbackLabel={work.enTitle}
                  className="w-full h-full object-contain"
                />
                {allPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/65 text-white hover:bg-black/85 inline-flex items-center justify-center transition-colors"
                      aria-label="Previous photograph"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex((prev) => (prev + 1) % allPhotos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/65 text-white hover:bg-black/85 inline-flex items-center justify-center transition-colors"
                      aria-label="Next photograph"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {allPhotos.length > 1 && (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {allPhotos.map((imgUrl, idx) => (
                      <button
                        key={imgUrl + idx}
                        type="button"
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-16 h-12 shrink-0 overflow-hidden rounded-md border transition-all ${
                          idx === activePhotoIndex
                            ? 'border-[#B91C1C] dark:border-[#F97316] ring-2 ring-[#B91C1C]/30 dark:ring-[#F97316]/30'
                            : 'border-[#E5C97B] dark:border-[#273227] opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <ResilientImage
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-mono-tabular text-[#6B3423] dark:text-[#A8A29E] shrink-0">
                    {activePhotoIndex + 1} / {allPhotos.length}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 pt-2 border-t border-[#F3DF9E] dark:border-[#222B22]">
            {langMode !== 'te' && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-[#B91C1C] dark:text-[#FB923C] font-semibold">
                  English Summary
                </h4>
                <p className="text-base leading-relaxed text-[#27120B] dark:text-[#E7E5E4]">
                  {work.enSummary}
                </p>
              </div>
            )}

            {work.teText && langMode !== 'en' && (
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-[#7C2D12] dark:text-[#4ADE80] font-semibold">
                  తెలుగు రికార్డు (Original Telugu Record)
                </h4>
                <p className="text-base leading-relaxed text-[#27120B] dark:text-[#E7E5E4]">
                  {work.teText}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F3DF9E] dark:border-[#222B22]">
            <span className="text-xs font-mono-tabular text-[#6B3423] dark:text-[#A8A29E]">
              Record ID: {work.id}
            </span>
            <a
              href={work.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open Original Blogspot Post</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
