import { useEffect, useState } from 'react';
import { ExternalLink, X, ChevronLeft, ChevronRight, Calendar, BookOpen } from 'lucide-react';
import { CATEGORIES, VOLUMES, type PanchayatWork } from '../data/panchayatWorks';
import { TELUGU_VOLUMES, TELUGU_WORK_META } from '../data/teluguTranslations';
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

  const isTe = langMode === 'te';
  const category = CATEGORIES.find((c) => c.id === work.category);
  const volume = VOLUMES[work.volume];
  const teVol = TELUGU_VOLUMES[work.volume];
  const teMeta = TELUGU_WORK_META[work.id];
  const allPhotos = work.images;

  const displayTitle = isTe ? teMeta?.teTitle || work.teDate : work.enTitle;
  const displayHighlight = isTe
    ? teMeta?.teHighlight || work.highlightMetric
    : work.highlightMetric;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#FFFDF8] dark:bg-[#111311] border border-[#EFE0A8] dark:border-[#273227] text-[#27120B] dark:text-[#F5F5F4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#FFFDF8]/95 dark:bg-[#111311]/95 backdrop-blur-sm border-b border-[#F3E4AF] dark:border-[#222B22]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C2D12] dark:text-[#4ADE80] font-medium">
            <span className="font-mono-tabular">{isTe ? work.teDate : work.dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{isTe ? category?.teName : category?.name}</span>
            <span aria-hidden="true">·</span>
            <span>{isTe ? teVol.shortLabel : volume.shortLabel}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#EFE0A8] dark:border-[#2D3A2D] text-[#27120B] dark:text-[#F5F5F4] hover:bg-[#FEF7DB] dark:hover:bg-[#1D241D] transition-colors focus-visible:outline-2 focus-visible:outline-[#B91C1C] dark:focus-visible:outline-[#F97316]"
            aria-label={isTe ? 'వివరాలు మూసివేయండి' : 'Close work details'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            {displayHighlight && (
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#FB923C] font-semibold">
                {displayHighlight}
              </p>
            )}
            <h3
              id="work-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-[#27120B] dark:text-[#FAFAF9]"
            >
              {displayTitle}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B3423] dark:text-[#A8A29E] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#F97316]" aria-hidden="true" />
                <span>
                  {isTe ? work.teDate : `${work.dateLabel} (${work.teDate})`}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#22C55E]" aria-hidden="true" />
                <span>{isTe ? volume.teTitle : volume.title}</span>
              </span>
            </div>
          </div>

          {allPhotos.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#F3E4AF] dark:border-[#243024] bg-[#FFFBEF] dark:bg-[#0A0C0A]">
                <ResilientImage
                  src={allPhotos[activePhotoIndex]}
                  alt={`${displayTitle} — ${activePhotoIndex + 1} / ${allPhotos.length}`}
                  fallbackLabel={displayTitle}
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
                      aria-label={isTe ? 'మునుపటి ఫోటో' : 'Previous photograph'}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex((prev) => (prev + 1) % allPhotos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/65 text-white hover:bg-black/85 inline-flex items-center justify-center transition-colors"
                      aria-label={isTe ? 'తదుపరి ఫోటో' : 'Next photograph'}
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
                            : 'border-[#EFE0A8] dark:border-[#273227] opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`${isTe ? 'ఫోటో' : 'Photo'} ${idx + 1}`}
                      >
                        <ResilientImage
                          src={imgUrl}
                          alt={`${idx + 1}`}
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

          <div className="space-y-4 pt-2 border-t border-[#F3E4AF] dark:border-[#222B22]">
            {!isTe && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-[#B91C1C] dark:text-[#FB923C] font-semibold">
                  English Summary
                </h4>
                <p className="text-base leading-relaxed text-[#27120B] dark:text-[#E7E5E4]">
                  {work.enSummary}
                </p>
              </div>
            )}

            {langMode !== 'en' && (
              <div className="space-y-1.5 pt-1">
                <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-[#7C2D12] dark:text-[#4ADE80] font-semibold">
                  {isTe ? 'పూర్తి వివరాలు' : 'తెలుగు రికార్డు (Original Telugu Record)'}
                </h4>
                <p className="font-telugu text-base leading-relaxed text-[#27120B] dark:text-[#E7E5E4]">
                  {work.teText ||
                    `${work.teDate} నాటి క్షేత్ర స్థాయి ఫోటోగ్రాఫ్ రికార్డు (${teVol.shortLabel}).`}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F3E4AF] dark:border-[#222B22]">
            <span className="text-xs font-mono-tabular text-[#6B3423] dark:text-[#A8A29E]">
              {isTe ? `నమోదు సంఖ్య: ${work.id}` : `Record ID: ${work.id}`}
            </span>
            <a
              href={work.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{isTe ? 'అసలు బ్లాగ్‌స్పాట్ పోస్ట్ తెరవండి' : 'Open Original Blogspot Post'}</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
