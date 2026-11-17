import { useEffect, useMemo, useState } from 'react';
import {
  Sun,
  Moon,
  Share2,
  Check,
  Search,
  ExternalLink,
  Calendar,
  Camera,
  ArrowUpRight,
  Printer,
  ChevronDown,
  ChevronUp,
  Layers,
  Droplets,
  Sparkles,
  HeartPulse,
  GraduationCap,
  Trees,
  Landmark,
} from 'lucide-react';
import {
  CATEGORIES,
  PANCHAYAT_WORKS,
  TOTAL_PHOTO_COUNT,
  VOLUMES,
  type CategoryId,
  type PanchayatWork,
  type VolumeId,
} from './data/panchayatWorks';
import { ResilientImage } from './components/ResilientImage';
import { WorkDetailModal } from './components/WorkDetailModal';

type LangMode = 'bilingual' | 'en' | 'te';
type TimelineFilter = 'written' | 'milestones' | 'all';

const CATEGORY_ICONS: Record<CategoryId, typeof Layers> = {
  infrastructure: Layers,
  water: Droplets,
  sanitation: Sparkles,
  health: HeartPulse,
  education: GraduationCap,
  environment: Trees,
  culture: Landmark,
};

const FEATURED_IDS = [
  '2021-27', // Tulasi Kalyana Mandapam (₹25 Lakh)
  '2022-04', // 40-Year Ward 6 Drainage Dispute Resolved
  '2022-23', // 15th Finance Drinking Water Pipeline Extension
  '2022-56', // Sri Ramalayam Idols & Temple Restoration
  '2024-2026-33', // ₹4.5 Lakh Palle Panduga Platform
];

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('tp_theme') === 'dark';
  });
  const [langMode, setLangMode] = useState<LangMode>('bilingual');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedVolume, setSelectedVolume] = useState<VolumeId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [timelineYear, setTimelineYear] = useState<number | 'all'>('all');
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('written');
  const [activeWork, setActiveWork] = useState<PanchayatWork | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('tp_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('tp_theme', 'light');
    }
  }, [isDark]);

  const writtenWorksCount = useMemo(
    () => PANCHAYAT_WORKS.filter((w) => !w.isPhotoOnly).length,
    []
  );

  const featuredWorks = useMemo(() => {
    const map = new Map(PANCHAYAT_WORKS.map((w) => [w.id, w]));
    return FEATURED_IDS.map((id) => map.get(id)).filter((w): w is PanchayatWork => Boolean(w));
  }, []);

  const filteredDirectoryWorks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PANCHAYAT_WORKS.filter((w) => {
      if (w.isPhotoOnly && !q) return false;
      if (selectedVolume !== 'all' && w.volume !== selectedVolume) return false;
      if (selectedCategory !== 'all' && w.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        w.enTitle.toLowerCase().includes(q) ||
        w.enSummary.toLowerCase().includes(q) ||
        w.teText.toLowerCase().includes(q) ||
        w.dateLabel.toLowerCase().includes(q) ||
        w.teDate.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedVolume, selectedCategory]);

  const worksByCategory = useMemo(() => {
    const grouped: Record<CategoryId, PanchayatWork[]> = {
      infrastructure: [],
      water: [],
      sanitation: [],
      health: [],
      education: [],
      environment: [],
      culture: [],
    };
    for (const w of filteredDirectoryWorks) {
      grouped[w.category].push(w);
    }
    return grouped;
  }, [filteredDirectoryWorks]);

  const timelineYears = useMemo(() => [2021, 2022, 2023, 2024, 2025, 2026], []);

  const filteredTimelineWorks = useMemo(() => {
    return PANCHAYAT_WORKS.filter((w) => {
      if (timelineYear !== 'all' && w.year !== timelineYear) return false;
      if (timelineFilter === 'milestones') return Boolean(w.isMilestone || w.isFeatured);
      if (timelineFilter === 'written') return !w.isPhotoOnly;
      return true;
    });
  }, [timelineYear, timelineFilter]);

  const timelineGroupedByYear = useMemo(() => {
    const map = new Map<number, PanchayatWork[]>();
    for (const w of filteredTimelineWorks) {
      const list = map.get(w.year) ?? [];
      list.push(w);
      map.set(w.year, list);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [filteredTimelineWorks]);

  const handleCopyShareLink = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Thimmarajupeta Grama Panchayat Development Chronicle (2021–2026) — All civic works, timeline & photos: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const getWorkTitle = (w: PanchayatWork) => {
    if (langMode === 'te') return w.teDate;
    return w.enTitle;
  };

  const getWorkBody = (w: PanchayatWork) => {
    if (langMode === 'te') return w.teText || w.enSummary;
    return w.enSummary;
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#27120B] dark:bg-[#090A09] dark:text-[#F5F5F4] transition-colors duration-200">
      {/* Strict 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 border-b border-[#F3DF9E] dark:border-[#1E291E] bg-[#FFFBEB]/95 dark:bg-[#090A09]/95 backdrop-blur-md no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#top"
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#B91C1C] dark:text-[#F97316] whitespace-nowrap shrink-0"
          >
            Thimmarajupeta Chronicle
          </a>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5C2818] dark:text-[#D6D3D1]"
          >
            <a
              href="#featured"
              className="hover:text-[#B91C1C] dark:hover:text-[#FB923C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Featured
            </a>
            <a
              href="#categories"
              className="hover:text-[#B91C1C] dark:hover:text-[#FB923C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Categories
            </a>
            <a
              href="#timeline"
              className="hover:text-[#B91C1C] dark:hover:text-[#FB923C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Timeline
            </a>
            <a
              href="#archives"
              className="hover:text-[#B91C1C] dark:hover:text-[#FB923C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Archives
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C] dark:focus-visible:outline-[#F97316]"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  <span>Share Page</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Section + Utility Bar (Theme Toggle & Language Mode) */}
        <section className="border-b border-[#F3DF9E] dark:border-[#1E291E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pb-16">
            {/* Utility Bar: Explicit Theme Toggle + Language Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#F3DF9E] dark:border-[#1E291E] no-print">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#7C2D12] dark:text-[#4ADE80] whitespace-nowrap shrink-0">
                  Color Theme
                </span>
                <div
                  role="group"
                  aria-label="Theme switcher"
                  className="inline-flex items-center p-1 rounded-lg bg-[#FEF3C7] dark:bg-[#141814] border border-[#F5D08A] dark:border-[#243224]"
                >
                  <button
                    type="button"
                    onClick={() => setIsDark(false)}
                    aria-pressed={!isDark}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      !isDark
                        ? 'bg-[#B91C1C] text-white shadow-xs'
                        : 'text-[#D6D3D1] hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Light · Yellow &amp; Red</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDark(true)}
                    aria-pressed={isDark}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isDark
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'text-[#6B3423] hover:text-[#27120B]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Dark · Black, Orange &amp; Green</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#7C2D12] dark:text-[#4ADE80] whitespace-nowrap shrink-0">
                  Language
                </span>
                <div
                  role="group"
                  aria-label="Display language"
                  className="inline-flex items-center p-1 rounded-lg bg-[#FEF3C7] dark:bg-[#141814] border border-[#F5D08A] dark:border-[#243224]"
                >
                  {(
                    [
                      ['bilingual', 'Bilingual'],
                      ['en', 'English'],
                      ['te', 'తెలుగు'],
                    ] as const
                  ).map(([mode, label]) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setLangMode(mode)}
                      aria-pressed={langMode === mode}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        langMode === mode
                          ? 'bg-[#B91C1C] text-white dark:bg-[#16A34A] dark:text-[#050805]'
                          : 'text-[#6B3423] hover:text-[#27120B] dark:text-[#A8A29E] dark:hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2-Column Hero Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                    Atchutapuram Mandal · Public Works Archive · 2021–2026
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.1rem] font-semibold leading-[1.12] tracking-tight text-[#27120B] dark:text-[#FAFAF9] [text-wrap:balance]">
                    {langMode === 'te'
                      ? 'తిమ్మరాజుపేట గ్రామ పంచాయతీ అభివృద్ధి డైరీ (2021–2026)'
                      : 'Thimmarajupeta Panchayat Development Chronicle'}
                  </h1>
                  {langMode !== 'te' && (
                    <p className="text-base sm:text-lg font-medium text-[#7C2D12] dark:text-[#FB923C]">
                      తిమ్మరాజుపేట గ్రామ పంచాయతీ అభివృద్ధి పనుల సంపూర్ణ నివేదిక
                    </p>
                  )}
                  <p className="text-base leading-relaxed text-[#4A2013] dark:text-[#D6D3D1] max-w-2xl">
                    {langMode === 'te'
                      ? 'సర్పంచ్ శరగడం భాగ్యలక్ష్మి శివబాపునాయుడు గారు, ఉపసర్పంచ్ భీశెట్టి రాము గారు, పంచాయతీ పాలకవర్గం, గ్రామ ఉత్సవ కమిటీ, యువజన సంఘాలు మరియు దాతల సహకారంతో 2021 నుంచి 2026 వరకు మూడు బ్లాగ్ డైరీలలో నమోదు చేసిన సమగ్ర అభివృద్ధి పనుల జాబితా.'
                      : 'A unified, shareable public ledger combining all three Grama Development Diaries (2021–2022, 2022–2023, and 2024–2026) under Sarpanch Saragadam Bhagyalakshmi Siva Bapu Naidu, Vice Sarpanch Beesetti Ramu, Panchayat Ward Members, Utsava Committee, Youth Associations, and Village Donors.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 no-print">
                  <a
                    href="#timeline"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Explore 2021–2026 Timeline</span>
                  </a>
                  <a
                    href="#categories"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border border-[#B91C1C]/35 text-[#991B1B] bg-[#FEF3C7]/70 hover:bg-[#FEF3C7] dark:border-[#22C55E]/40 dark:text-[#4ADE80] dark:bg-[#131A13] dark:hover:bg-[#192419] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Browse by Category</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <div className="relative flex-1 min-h-[260px] lg:min-h-[340px] rounded-xl overflow-hidden border border-[#E5C97B] dark:border-[#263326] bg-[#FEF3C7] dark:bg-[#121612]">
                  <ResilientImage
                    src="/src/assets/images/hero_thimmarajupeta_village_1794880861388.jpg"
                    alt="Thimmarajupeta Grama Panchayat concrete street, streetlights, and civic plaza"
                    fallbackLabel="Thimmarajupeta Grama Panchayat"
                    className="w-full h-full lg:h-full object-cover"
                  />
                </div>
                <p className="text-xs text-[#6B3423] dark:text-[#A8A29E] italic mt-2.5">
                  Fig. 1 — Village main street CC road, roadside drainage, streetlights, and Grama Panchayat office representation.
                </p>
              </div>
            </div>

            {/* 4-Column Institutional Summary Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-[#F3DF9E] dark:border-[#1E291E]">
              <div className="p-4 rounded-xl bg-white/85 dark:bg-[#121512] border border-[#F3DF9E] dark:border-[#222D22]">
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B91C1C] dark:text-[#F97316]">
                  {writtenWorksCount}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#4A2013] dark:text-[#D6D3D1] mt-1">
                  Documented Civic Works
                </p>
                <p className="text-xs text-[#7C2D12]/80 dark:text-[#A8A29E] mt-0.5">
                  {PANCHAYAT_WORKS.length} total dated records
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/85 dark:bg-[#121512] border border-[#F3DF9E] dark:border-[#222D22]">
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B91C1C] dark:text-[#4ADE80]">
                  {TOTAL_PHOTO_COUNT}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#4A2013] dark:text-[#D6D3D1] mt-1">
                  Field Photographs Archived
                </p>
                <p className="text-xs text-[#7C2D12]/80 dark:text-[#A8A29E] mt-0.5">
                  Linked directly from field logs
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/85 dark:bg-[#121512] border border-[#F3DF9E] dark:border-[#222D22]">
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B91C1C] dark:text-[#F97316]">
                  6 Years
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#4A2013] dark:text-[#D6D3D1] mt-1">
                  Continuous Chronicle
                </p>
                <p className="text-xs text-[#7C2D12]/80 dark:text-[#A8A29E] mt-0.5">
                  Feb 2021 – Sep 2026
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/85 dark:bg-[#121512] border border-[#F3DF9E] dark:border-[#222D22]">
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B91C1C] dark:text-[#4ADE80]">
                  3 Diaries
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#4A2013] dark:text-[#D6D3D1] mt-1">
                  Unified Blogspot Volumes
                </p>
                <p className="text-xs text-[#7C2D12]/80 dark:text-[#A8A29E] mt-0.5">
                  Vol. I, II &amp; III linked in full
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: FEATURED WORKS (5 Significant Milestones) */}
        <section id="featured" className="border-b border-[#F3DF9E] dark:border-[#1E291E] bg-[#FEF9E7]/65 dark:bg-[#0D0F0D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="max-w-3xl space-y-2 mb-10">
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                Section 01 · Landmark Milestones
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#27120B] dark:text-[#FAFAF9] [text-wrap:balance]">
                {langMode === 'te' ? 'ప్రధాన అభివృద్ధి పనులు (Featured Works)' : 'Featured Works'}
              </h2>
              <p className="text-base text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                Five transformative works selected across the 2021–2026 development diaries, representing major infrastructure grants, multi-decade civic resolutions, drinking water security, and emergency pandemic relief.
              </p>
            </div>

            {featuredWorks.length > 0 && (
              <div className="space-y-8">
                {/* Lead Featured Card */}
                {(() => {
                  const lead = featuredWorks[0];
                  const cat = CATEGORIES.find((c) => c.id === lead.category);
                  const cover = lead.featuredImage || lead.images[0];
                  return (
                    <article className="grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden bg-white dark:bg-[#131713] border border-[#E5C97B] dark:border-[#243224] items-stretch">
                      <div className="lg:col-span-6 relative min-h-[240px] lg:min-h-[320px] bg-[#FEF3C7] dark:bg-[#0A0C0A]">
                        <ResilientImage
                          src={cover}
                          alt={lead.enTitle}
                          fallbackLabel={lead.enTitle}
                          className="w-full h-full lg:h-full object-cover"
                        />
                      </div>
                      <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C2D12] dark:text-[#4ADE80] font-medium">
                            <span className="font-mono-tabular font-semibold text-[#B91C1C] dark:text-[#FB923C]">
                              {lead.highlightMetric}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">{lead.dateLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{cat?.name}</span>
                          </div>
                          <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-snug text-[#27120B] dark:text-[#FAFAF9]">
                            {getWorkTitle(lead)}
                          </h3>
                          <p className="text-base leading-relaxed text-[#4A2013] dark:text-[#D6D3D1]">
                            {getWorkBody(lead)}
                          </p>
                          {langMode === 'bilingual' && lead.teText && (
                            <p className="text-sm leading-relaxed text-[#6B3423] dark:text-[#A8A29E] pt-1 line-clamp-3">
                              {lead.teText}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F3DF9E] dark:border-[#222D22]">
                          <button
                            type="button"
                            onClick={() => setActiveWork(lead)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
                          >
                            <Camera className="w-4 h-4" aria-hidden="true" />
                            <span>View Record &amp; Photos ({lead.images.length})</span>
                          </button>
                          <a
                            href={lead.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#991B1B] dark:text-[#4ADE80] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                          >
                            <span>Original Blogspot Post</span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })()}

                {/* Secondary 2x2 Grid of 4 Featured Works */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredWorks.slice(1, 5).map((work) => {
                    const cat = CATEGORIES.find((c) => c.id === work.category);
                    const cover = work.featuredImage || work.images[0];
                    return (
                      <article
                        key={work.id}
                        className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#131713] border border-[#E5C97B] dark:border-[#243224]"
                      >
                        {cover && (
                          <div className="aspect-[16/9] w-full overflow-hidden bg-[#FEF3C7] dark:bg-[#0A0C0A] border-b border-[#F3DF9E] dark:border-[#222D22]">
                            <ResilientImage
                              src={cover}
                              alt={work.enTitle}
                              fallbackLabel={work.enTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2.5">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C2D12] dark:text-[#4ADE80] font-medium">
                              {work.highlightMetric && (
                                <>
                                  <span className="font-mono-tabular font-semibold text-[#B91C1C] dark:text-[#FB923C]">
                                    {work.highlightMetric}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                </>
                              )}
                              <span className="font-mono-tabular">{work.dateLabel}</span>
                              <span aria-hidden="true">·</span>
                              <span>{cat?.name}</span>
                            </div>
                            <h3 className="font-display text-xl font-semibold leading-snug text-[#27120B] dark:text-[#FAFAF9]">
                              {getWorkTitle(work)}
                            </h3>
                            <p className="text-sm leading-relaxed text-[#4A2013] dark:text-[#D6D3D1]">
                              {getWorkBody(work)}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F3DF9E] dark:border-[#222D22]">
                            <button
                              type="button"
                              onClick={() => setActiveWork(work)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#FEF3C7] text-[#991B1B] hover:bg-[#FDE68A] dark:bg-[#1B241B] dark:text-[#4ADE80] dark:hover:bg-[#233223] transition-colors whitespace-nowrap shrink-0"
                            >
                              <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Inspect ({work.images.length} photos)</span>
                            </button>
                            <a
                              href={work.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#7C2D12] dark:text-[#FB923C] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                            >
                              <span>Source Diary</span>
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: CATEGORIZED WORKS DIRECTORY */}
        <section id="categories" className="border-b border-[#F3DF9E] dark:border-[#1E291E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                  Section 02 · Organized Civic Index
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                  {langMode === 'te' ? 'విభాగాల వారీగా పనుల జాబితా' : 'Works Organized by Category'}
                </h2>
                <p className="text-base text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                  Every recorded project across all three diaries grouped into seven civic categories. Search in English or Telugu, filter by diary volume, or click any work for full records and photographs.
                </p>
              </div>

              {/* Search + Volume Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 no-print">
                <div className="relative">
                  <Search
                    className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C2D12] dark:text-[#A8A29E]"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search works (Telugu or English)..."
                    aria-label="Search development works"
                    className="w-full sm:w-64 pl-9 pr-3 py-2.5 rounded-lg text-sm bg-white dark:bg-[#131713] border border-[#E5C97B] dark:border-[#2A372A] text-[#27120B] dark:text-[#F5F5F4] placeholder:text-[#9A6B56] dark:placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#B91C1C] dark:focus:ring-[#F97316]"
                  />
                </div>
                <select
                  value={selectedVolume}
                  onChange={(e) => setSelectedVolume(e.target.value as VolumeId | 'all')}
                  aria-label="Filter by diary volume"
                  className="px-3.5 py-2.5 rounded-lg text-sm font-medium bg-white dark:bg-[#131713] border border-[#E5C97B] dark:border-[#2A372A] text-[#27120B] dark:text-[#F5F5F4] focus:outline-none focus:ring-2 focus:ring-[#B91C1C] dark:focus:ring-[#F97316]"
                >
                  <option value="all">All 3 Diary Volumes</option>
                  <option value="2021">Vol. I (2021–2022)</option>
                  <option value="2022">Vol. II (2022–2023)</option>
                  <option value="2024-2026">Vol. III (2024–2026)</option>
                </select>
              </div>
            </div>

            {/* Interactive Category Tabs */}
            <div
              role="tablist"
              aria-label="Filter works by category"
              className="flex flex-wrap items-center gap-2 pb-8 border-b border-[#F3DF9E] dark:border-[#1E291E] no-print"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#B91C1C] text-white dark:bg-[#EA580C] dark:text-white'
                    : 'bg-[#FEF3C7]/70 text-[#5C2818] hover:bg-[#FEF3C7] dark:bg-[#131813] dark:text-[#D6D3D1] dark:hover:bg-[#1B241B]'
                }`}
              >
                All Categories ({filteredDirectoryWorks.length})
              </button>
              {CATEGORIES.map((cat) => {
                const count = worksByCategory[cat.id].length;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#B91C1C] text-white dark:bg-[#EA580C] dark:text-white'
                        : 'bg-[#FEF3C7]/70 text-[#5C2818] hover:bg-[#FEF3C7] dark:bg-[#131813] dark:text-[#D6D3D1] dark:hover:bg-[#1B241B]'
                    }`}
                  >
                    {langMode === 'te' ? cat.teName : cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Category Sections */}
            {filteredDirectoryWorks.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <p className="text-base font-medium text-[#5C2818] dark:text-[#D6D3D1]">
                  No recorded works match “{searchQuery}”.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedVolume('all');
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#B91C1C] text-white dark:bg-[#EA580C]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#F3DF9E] dark:divide-[#1E291E]">
                {CATEGORIES.filter(
                  (c) => selectedCategory === 'all' || selectedCategory === c.id
                ).map((cat) => {
                  const items = worksByCategory[cat.id];
                  if (items.length === 0) return null;
                  const Icon = CATEGORY_ICONS[cat.id];
                  const isExpanded =
                    selectedCategory !== 'all' ||
                    Boolean(searchQuery.trim()) ||
                    Boolean(expandedCategories[cat.id]);
                  const visibleItems = isExpanded ? items : items.slice(0, 6);

                  return (
                    <div key={cat.id} className="py-10 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1.5 max-w-2xl">
                          <div className="flex items-center gap-2.5 text-[#B91C1C] dark:text-[#4ADE80]">
                            <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                              {langMode === 'te' ? cat.teName : cat.name}
                            </h3>
                            <span className="font-mono-tabular text-xs font-semibold text-[#7C2D12] dark:text-[#FB923C]">
                              · {items.length} {items.length === 1 ? 'work' : 'works'}
                            </span>
                          </div>
                          {langMode === 'bilingual' && (
                            <p className="text-xs font-medium text-[#7C2D12] dark:text-[#A8A29E]">
                              {cat.teName}
                            </p>
                          )}
                          <p className="text-sm text-[#4A2013] dark:text-[#D6D3D1] leading-relaxed">
                            {langMode === 'te' ? cat.teDescription : cat.description}
                          </p>
                        </div>

                        {selectedCategory === 'all' && !searchQuery.trim() && items.length > 6 && (
                          <button
                            type="button"
                            onClick={() => toggleCategoryExpand(cat.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-[#E5C97B] dark:border-[#2A382A] bg-white dark:bg-[#131713] text-[#991B1B] dark:text-[#4ADE80] hover:bg-[#FEF3C7] dark:hover:bg-[#1B241B] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                          >
                            {isExpanded ? (
                              <>
                                <span>Show Fewer</span>
                                <ChevronUp className="w-4 h-4" aria-hidden="true" />
                              </>
                            ) : (
                              <>
                                <span>Show All {items.length} Works</span>
                                <ChevronDown className="w-4 h-4" aria-hidden="true" />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visibleItems.map((work) => (
                          <article
                            key={work.id}
                            className="flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-[#131713] border border-[#F3DF9E] dark:border-[#222D22] hover:border-[#B91C1C]/60 dark:hover:border-[#F97316]/60 transition-colors"
                          >
                            <div className="space-y-2.5">
                              <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C2D12] dark:text-[#A8A29E]">
                                <span className="font-mono-tabular font-semibold text-[#B91C1C] dark:text-[#FB923C]">
                                  {work.dateLabel}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{VOLUMES[work.volume].shortLabel}</span>
                              </div>
                              <h4 className="font-display text-base sm:text-lg font-semibold leading-snug text-[#27120B] dark:text-[#FAFAF9]">
                                <button
                                  type="button"
                                  onClick={() => setActiveWork(work)}
                                  className="text-left hover:text-[#B91C1C] dark:hover:text-[#FB923C] transition-colors"
                                >
                                  {getWorkTitle(work)}
                                </button>
                              </h4>
                              <p className="text-sm leading-relaxed text-[#4A2013] dark:text-[#D6D3D1] line-clamp-3">
                                {getWorkBody(work)}
                              </p>
                              {langMode === 'bilingual' && work.teText && (
                                <p className="text-xs leading-relaxed text-[#7C2D12]/90 dark:text-[#A8A29E] line-clamp-2">
                                  {work.teText}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-[#FEF3C7] dark:border-[#1E271E]">
                              <button
                                type="button"
                                onClick={() => setActiveWork(work)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B91C1C] dark:text-[#4ADE80] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                              >
                                <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>
                                  {work.images.length > 0
                                    ? `View (${work.images.length} photos)`
                                    : 'Read Record'}
                                </span>
                              </button>
                              <a
                                href={work.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#6B3423] dark:text-[#A8A29E] hover:text-[#B91C1C] dark:hover:text-[#FB923C] whitespace-nowrap shrink-0"
                              >
                                <span>Blogspot</span>
                                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                              </a>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: CHRONOLOGICAL TIMELINE (2021 - 2026) */}
        <section id="timeline" className="border-b border-[#F3DF9E] dark:border-[#1E291E] bg-[#FEF9E7]/50 dark:bg-[#0B0D0B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                  Section 03 · Chronological Public Ledger
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                  {langMode === 'te'
                    ? '2021–2026 కాలక్రమానుసార అభివృద్ధి టైమ్‌లైన్'
                    : 'Chronological Development Timeline (2021–2026)'}
                </h2>
                <p className="text-base text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                  Every dated record from the February 9, 2021 election through September 10, 2026 arranged chronologically across all three diaries, with key milestones highlighted.
                </p>
              </div>

              {/* Timeline Mode Controls */}
              <div
                role="group"
                aria-label="Timeline detail filter"
                className="inline-flex flex-wrap items-center p-1 rounded-lg bg-[#FEF3C7] dark:bg-[#141814] border border-[#F5D08A] dark:border-[#243224] no-print self-start lg:self-auto"
              >
                {(
                  [
                    ['written', `Documented Works (${writtenWorksCount})`],
                    ['milestones', 'Key Milestones'],
                    ['all', `All Entries + Photo Logs (${PANCHAYAT_WORKS.length})`],
                  ] as const
                ).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTimelineFilter(mode)}
                    aria-pressed={timelineFilter === mode}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      timelineFilter === mode
                        ? 'bg-[#B91C1C] text-white dark:bg-[#EA580C] dark:text-white'
                        : 'text-[#6B3423] hover:text-[#27120B] dark:text-[#A8A29E] dark:hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Selector Rail */}
            <div className="flex flex-wrap items-center gap-2 pb-10 border-b border-[#F3DF9E] dark:border-[#1E291E] no-print">
              <button
                type="button"
                onClick={() => setTimelineYear('all')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono-tabular font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  timelineYear === 'all'
                    ? 'bg-[#B91C1C] text-white dark:bg-[#16A34A] dark:text-[#050805]'
                    : 'bg-white text-[#5C2818] border border-[#E5C97B] hover:bg-[#FEF3C7] dark:bg-[#131713] dark:text-[#D6D3D1] dark:border-[#243224] dark:hover:bg-[#1B241B]'
                }`}
              >
                All Years (2021–2026)
              </button>
              {timelineYears.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTimelineYear(yr)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono-tabular font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    timelineYear === yr
                      ? 'bg-[#B91C1C] text-white dark:bg-[#16A34A] dark:text-[#050805]'
                      : 'bg-white text-[#5C2818] border border-[#E5C97B] hover:bg-[#FEF3C7] dark:bg-[#131713] dark:text-[#D6D3D1] dark:border-[#243224] dark:hover:bg-[#1B241B]'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>

            {/* Year-Grouped Chronological Timeline */}
            <div className="space-y-12 pt-10">
              {timelineGroupedByYear.map(([yr, entries]) => (
                <div key={yr} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  {/* Year Rail Header */}
                  <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-2 pb-4 lg:pb-0 border-b lg:border-b-0 border-[#F3DF9E] dark:border-[#1E291E]">
                    <p className="font-display text-4xl sm:text-5xl font-bold font-mono-tabular text-[#B91C1C] dark:text-[#F97316]">
                      {yr}
                    </p>
                    <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#7C2D12] dark:text-[#4ADE80] font-semibold">
                      {entries.length} {entries.length === 1 ? 'entry' : 'entries'} recorded
                    </p>
                    <p className="text-xs text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                      {yr === 2021 && 'Year 1 · Council Election, Streetlights, COVID-19 Oxygen Relief & Tulasi Kalyana Mandapam'}
                      {yr === 2022 && 'Year 2 · Ward 6 40-Year Drain Resolution, Water Pipelines, Kolatam & 2,000 Saplings'}
                      {yr === 2023 && 'Year 3 · SC Colony L-Drainage, Sri Ramalayam & Maridi Talli Temple Restorations'}
                      {yr === 2024 && 'Year 4 · CC Roads, ₹4.5L Palle Panduga Platform & Anganwadi Sanitation'}
                      {yr === 2025 && 'Year 5 · SC Colony Stage Modernization, Mandal Grant & Cyclone Bund Repair'}
                      {yr === 2026 && 'Year 6 · Main Drain Desilting & SC Colony Open Well Restoration'}
                    </p>
                  </div>

                  {/* Chronological Entries List */}
                  <div className="lg:col-span-9 space-y-4">
                    {entries.map((work) => {
                      const cat = CATEGORIES.find((c) => c.id === work.category);
                      const isKey = Boolean(work.isMilestone || work.isFeatured);
                      return (
                        <article
                          key={work.id}
                          className={`p-5 sm:p-6 rounded-xl border transition-colors ${
                            isKey
                              ? 'bg-white dark:bg-[#141A14] border-[#B91C1C]/45 dark:border-[#F97316]/55'
                              : 'bg-white/85 dark:bg-[#111411] border-[#F3DF9E] dark:border-[#202920]'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span
                                  className={`font-mono-tabular font-semibold ${
                                    isKey
                                      ? 'text-[#B91C1C] dark:text-[#FB923C]'
                                      : 'text-[#7C2D12] dark:text-[#4ADE80]'
                                  }`}
                                >
                                  {work.dateLabel}
                                </span>
                                <span className="text-[#9A6B56] dark:text-[#78716C]" aria-hidden="true">
                                  ·
                                </span>
                                <span className="text-[#6B3423] dark:text-[#A8A29E]">
                                  {cat?.name}
                                </span>
                                {work.highlightMetric && (
                                  <>
                                    <span className="text-[#9A6B56] dark:text-[#78716C]" aria-hidden="true">
                                      ·
                                    </span>
                                    <span className="font-mono-tabular font-semibold text-[#B91C1C] dark:text-[#4ADE80]">
                                      {work.highlightMetric}
                                    </span>
                                  </>
                                )}
                              </div>

                              <h3 className="font-display text-lg sm:text-xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                                <button
                                  type="button"
                                  onClick={() => setActiveWork(work)}
                                  className="text-left hover:text-[#B91C1C] dark:hover:text-[#FB923C] transition-colors"
                                >
                                  {getWorkTitle(work)}
                                </button>
                              </h3>

                              <p className="text-sm leading-relaxed text-[#4A2013] dark:text-[#D6D3D1]">
                                {getWorkBody(work)}
                              </p>

                              {langMode === 'bilingual' && work.teText && (
                                <p className="text-xs sm:text-sm leading-relaxed text-[#6B3423] dark:text-[#A8A29E] pt-0.5">
                                  {work.teText}
                                </p>
                              )}

                              <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button
                                  type="button"
                                  onClick={() => setActiveWork(work)}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B91C1C] dark:text-[#4ADE80] hover:underline underline-offset-4"
                                >
                                  <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>
                                    {work.images.length > 0
                                      ? `View ${work.images.length} Field ${work.images.length === 1 ? 'Photo' : 'Photos'}`
                                      : 'View Details'}
                                  </span>
                                </button>
                                <a
                                  href={work.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium text-[#6B3423] dark:text-[#A8A29E] hover:text-[#B91C1C] dark:hover:text-[#FB923C]"
                                >
                                  <span>{VOLUMES[work.volume].shortLabel}</span>
                                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                </a>
                              </div>
                            </div>

                            {work.images.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setActiveWork(work)}
                                className="relative w-full sm:w-32 h-40 sm:h-24 shrink-0 rounded-lg overflow-hidden border border-[#E5C97B] dark:border-[#243224] bg-[#FEF3C7] dark:bg-[#0A0C0A] group"
                                aria-label={`Open ${work.images.length} photos for ${work.enTitle}`}
                              >
                                <ResilientImage
                                  src={work.images[0]}
                                  alt={work.enTitle}
                                  fallbackLabel={work.dateLabel}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              </button>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: ORIGINAL BLOGSPOT VOLUMES & SHAREABLE SUMMARY */}
        <section id="archives" className="bg-[#FFFBEB] dark:bg-[#090A09]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-10">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                Section 04 · Source Records &amp; Sharing
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                Original Blogspot Development Diaries
              </h2>
              <p className="text-base text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                All works, dates, and field photographs listed on this page are compiled directly from the three official Thimmarajupeta Grama Panchayat Development Diary blog posts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.values(VOLUMES) as typeof VOLUMES[VolumeId][]).map((vol) => {
                const volWorks = PANCHAYAT_WORKS.filter((w) => w.volume === vol.id);
                const volPhotos = volWorks.reduce((acc, w) => acc + w.images.length, 0);
                return (
                  <div
                    key={vol.id}
                    className="flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-[#131713] border border-[#E5C97B] dark:border-[#243224] space-y-5"
                  >
                    <div className="space-y-2.5">
                      <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#B91C1C] dark:text-[#FB923C] font-semibold">
                        {vol.shortLabel} · {vol.period}
                      </p>
                      <h3 className="font-display text-xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                        {langMode === 'te' ? vol.teTitle : vol.title}
                      </h3>
                      <p className="text-sm text-[#4A2013] dark:text-[#D6D3D1] leading-relaxed">
                        {vol.summary}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[#F3DF9E] dark:border-[#222D22]">
                      <div className="flex items-center gap-3 text-xs font-mono-tabular text-[#6B3423] dark:text-[#4ADE80]">
                        <span>{volWorks.length} dated entries</span>
                        <span aria-hidden="true">·</span>
                        <span>{volPhotos} photos</span>
                      </div>
                      <a
                        href={vol.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#FEF3C7] text-[#991B1B] hover:bg-[#FDE68A] dark:bg-[#1B241B] dark:text-[#4ADE80] dark:hover:bg-[#233223] transition-colors"
                      >
                        <span>Visit Original Diary</span>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shareable Actions Box */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#FEF3C7]/80 dark:bg-[#131813] border border-[#E5C97B] dark:border-[#273627] flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
              <div className="space-y-1.5 max-w-xl">
                <h3 className="font-display text-xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                  Share This Chronicle With Villagers &amp; Well-Wishers
                </h3>
                <p className="text-sm text-[#4A2013] dark:text-[#D6D3D1]">
                  Send a direct link via WhatsApp, copy the web address, or print a clean summary for community noticeboards.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Share Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#27120B] border border-[#E5C97B] hover:bg-[#FFFBEB] dark:bg-[#16A34A] dark:text-[#050805] dark:border-[#16A34A] dark:hover:bg-[#22C55E] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Share via WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#5C2818] border border-[#E5C97B] hover:bg-[#FFFBEB] dark:bg-[#191D19] dark:text-[#E7E5E4] dark:border-[#2C382C] dark:hover:bg-[#222822] transition-colors whitespace-nowrap shrink-0"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Print Summary</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F3DF9E] dark:border-[#1E291E] bg-[#FEF9E7] dark:bg-[#070807] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6B3423] dark:text-[#A8A29E]">
          <div>
            <p className="font-semibold text-[#27120B] dark:text-[#E7E5E4]">
              Thimmarajupeta Grama Panchayat · Atchutapuram Mandal
            </p>
            <p className="mt-0.5">
              Public development archive compiled from the 2021–2026 Grama Development Diaries.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#featured" className="hover:underline">
              Featured
            </a>
            <a href="#categories" className="hover:underline">
              Categories
            </a>
            <a href="#timeline" className="hover:underline">
              Timeline
            </a>
            <a href="#archives" className="hover:underline">
              Source Diaries
            </a>
          </div>
        </div>
      </footer>

      <WorkDetailModal
        work={activeWork}
        onClose={() => setActiveWork(null)}
        langMode={langMode}
      />
    </div>
  );
}
