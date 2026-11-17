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
import {
  TELUGU_VOLUMES,
  TELUGU_WORK_META,
  TELUGU_YEAR_SUMMARIES,
} from './data/teluguTranslations';
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

  const isTe = langMode === 'te';

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

  useEffect(() => {
    document.documentElement.lang = isTe ? 'te' : 'en';
    document.title = isTe
      ? 'మన తిమ్మరాజుపేట — గ్రామ పంచాయతీ అభివృద్ధి పనులు (2021–2026)'
      : 'MANA THIMMARAJUPETA — Development Works 2021–2026';
  }, [isTe]);

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
      const teTitle = TELUGU_WORK_META[w.id]?.teTitle ?? '';
      return (
        w.enTitle.toLowerCase().includes(q) ||
        w.enSummary.toLowerCase().includes(q) ||
        teTitle.toLowerCase().includes(q) ||
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
      isTe
        ? `మన తిమ్మరాజుపేట (2021–2026) — అన్ని అభివృద్ధి పనులు, టైమ్‌లైన్ & ఫోటోలు: ${window.location.href}`
        : `MANA THIMMARAJUPETA (2021–2026) — All civic works, timeline & photos: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const getWorkTitle = (w: PanchayatWork) => {
    if (isTe) return TELUGU_WORK_META[w.id]?.teTitle || w.teDate;
    return w.enTitle;
  };

  const getWorkBody = (w: PanchayatWork) => {
    if (isTe) {
      return (
        w.teText ||
        `${w.teDate} నాటి క్షేత్ర స్థాయి ఫోటోగ్రాఫ్ రికార్డు (${TELUGU_VOLUMES[w.volume].shortLabel}).`
      );
    }
    return w.enSummary;
  };

  const getWorkHighlight = (w: PanchayatWork) => {
    if (!w.highlightMetric) return undefined;
    if (isTe) return TELUGU_WORK_META[w.id]?.teHighlight || w.highlightMetric;
    return w.highlightMetric;
  };

  const getWorkDate = (w: PanchayatWork) => (isTe ? w.teDate : w.dateLabel);

  const getVolumeLabel = (v: VolumeId) =>
    isTe ? TELUGU_VOLUMES[v].shortLabel : VOLUMES[v].shortLabel;

  return (
    <div className="min-h-screen bg-[#FFFDF4] text-[#27120B] dark:bg-[#090A09] dark:text-[#F5F5F4] transition-colors duration-200">
      {/* Strict 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 border-b border-[#F3E4AF] dark:border-[#1E291E] bg-[#FFFDF4]/95 dark:bg-[#090A09]/95 backdrop-blur-md no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#top"
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#B91C1C] dark:text-[#F97316] whitespace-nowrap shrink-0"
          >
            {isTe ? 'మన తిమ్మరాజుపేట' : 'MANA THIMMARAJUPETA'}
          </a>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav
            aria-label={isTe ? 'ప్రధాన నావిగేషన్' : 'Primary navigation'}
            className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-[#5C2818] dark:text-[#D6D3D1]"
          >
            <a
              href="#featured"
              className="hover:text-[#B91C1C] dark:hover:text-[#FB923C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {isTe ? 'ప్రధాన పనులు' : 'Featured'}
            </a>
            <a
              href="#categories"
              className="hover:text-[#B91C1C] dark:hover:text-[#FB923C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {isTe ? 'విభాగాలు' : 'Categories'}
            </a>
            <a
              href="#timeline"
              className="hover:text-[#B91C1C] dark:hover:text-[#FB923C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {isTe ? 'టైమ్‌లైన్' : 'Timeline'}
            </a>
            <a
              href="#archives"
              className="hover:text-[#B91C1C] dark:hover:text-[#FB923C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {isTe ? 'మూల డైరీలు' : 'Archives'}
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
                  <span>{isTe ? 'లింక్ కాపీ అయింది' : 'Link Copied'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  <span>{isTe ? 'షేర్ చేయండి' : 'Share Page'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Section + Utility Bar (Theme Toggle & Language Mode) */}
        <section className="border-b border-[#F3E4AF] dark:border-[#1E291E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pb-16">
            {/* Utility Bar: Explicit Theme Toggle + Language Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#F3E4AF] dark:border-[#1E291E] no-print">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#7C2D12] dark:text-[#4ADE80] whitespace-nowrap shrink-0">
                  {isTe ? 'రంగుల థీమ్' : 'Color Theme'}
                </span>
                <div
                  role="group"
                  aria-label={isTe ? 'రంగుల థీమ్ ఎంపిక' : 'Theme switcher'}
                  className="inline-flex items-center p-1 rounded-lg bg-[#FEF7DA] dark:bg-[#141814] border border-[#EFE0A8] dark:border-[#243224]"
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
                    <span>{isTe ? 'లైట్ · పసుపు & ఎరుపు' : 'Light · Yellow & Red'}</span>
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
                    <span>{isTe ? 'డార్క్ · నలుపు, ఆరెంజ్ & ఆకుపచ్చ' : 'Dark · Black, Orange & Green'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#7C2D12] dark:text-[#4ADE80] whitespace-nowrap shrink-0">
                  {isTe ? 'భాష' : 'Language'}
                </span>
                <div
                  role="group"
                  aria-label={isTe ? 'భాష ఎంపిక' : 'Display language'}
                  className="inline-flex items-center p-1 rounded-lg bg-[#FEF7DA] dark:bg-[#141814] border border-[#EFE0A8] dark:border-[#243224]"
                >
                  {(
                    [
                      ['bilingual', isTe ? 'ద్విభాష' : 'Bilingual'],
                      ['en', isTe ? 'ఆంగ్లం' : 'English'],
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
                    {isTe
                      ? 'అచ్యుతాపురం మండలం · ప్రజా అభివృద్ధి పనుల నివేదిక · 2021–2026'
                      : 'Atchutapuram Mandal · Public Works Archive · 2021–2026'}
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.565rem] font-semibold leading-[1.15] tracking-tight text-[#27120B] dark:text-[#FAFAF9] [text-wrap:balance]">
                    {isTe
                      ? 'మన తిమ్మరాజుపేట'
                      : 'MANA THIMMARAJUPETA'}
                  </h1>
                  {langMode === 'bilingual' && (
                    <p className="font-telugu text-base sm:text-lg font-medium text-[#7C2D12] dark:text-[#FB923C]">
                      మన తిమ్మరాజుపేట · గ్రామ పంచాయతీ అభివృద్ధి పనుల సంపూర్ణ నివేదిక (2021–2026)
                    </p>
                  )}
                  <p className="text-base leading-relaxed text-[#4A2013] dark:text-[#D6D3D1] max-w-2xl">
                    {isTe
                      ? 'సర్పంచ్ శరగడం భాగ్యలక్ష్మి శివబాపునాయుడు గారు, ఉపసర్పంచ్ భీశెట్టి రాము గారు, వార్డు సభ్యులు, గ్రామ ఉత్సవ కమిటీ, యువజన సంఘాలు మరియు దాతల సహకారంతో 2021 నుంచి 2026 వరకు మూడు బ్లాగ్ డైరీలలో నమోదు చేసిన సమగ్ర అభివృద్ధి పనుల జాబితా.'
                      : 'A unified, shareable public ledger combining all three Grama Development Diaries (2021–2022, 2022–2023, and 2024–2026) under Sarpanch Saragadam Bhagyalakshmi Siva Bapu Naidu, Vice Sarpanch Beesetti Ramu, Panchayat Ward Members, Utsava Committee, Youth Associations, and Village Donors.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 no-print">
                  <a
                    href="#timeline"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>{isTe ? '2021–2026 టైమ్‌లైన్ చూడండి' : 'Explore 2021–2026 Timeline'}</span>
                  </a>
                  <a
                    href="#categories"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border border-[#B91C1C]/35 text-[#991B1B] bg-[#FEF7DA]/80 hover:bg-[#FEF7DA] dark:border-[#22C55E]/40 dark:text-[#4ADE80] dark:bg-[#131A13] dark:hover:bg-[#192419] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{isTe ? 'విభాగాల వారీగా చూడండి' : 'Browse by Category'}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-[260px] lg:min-h-[340px]">
                  {(['2021-08', '2021-27', '2022-04', '2024-2026-33'] as const).map((heroId) => {
                    const heroWork = PANCHAYAT_WORKS.find((w) => w.id === heroId);
                    if (!heroWork || heroWork.images.length === 0) return null;
                    const heroTitle = getWorkTitle(heroWork);
                    const heroDate = getWorkDate(heroWork);
                    return (
                      <button
                        key={heroWork.id}
                        type="button"
                        onClick={() => setActiveWork(heroWork)}
                        className="relative overflow-hidden rounded-xl border border-[#EFE0A8] dark:border-[#263326] bg-[#FEF7DA] dark:bg-[#121612] group text-left min-h-[130px]"
                        aria-label={heroTitle}
                      >
                        <ResilientImage
                          src={heroWork.images[0]}
                          alt={heroTitle}
                          fallbackLabel={heroDate}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5">
                          <p className="text-[13px] font-mono-tabular text-white/95 font-medium truncate">
                            {heroDate}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[#6B3423] dark:text-[#A8A29E] italic mt-2.5">
                  {isTe
                    ? '2021–2026 గ్రామ డెవలప్మెంట్ డైరీల నుండి సేకరించిన అసలు క్షేత్ర ఫోటోలు. పూర్తి వివరాలకు ఫోటోపై క్లిక్ చేయండి.'
                    : 'Field photographs archived directly from the 2021–2026 Grama Development Diaries. Click any photo to inspect its record.'}
                </p>
              </div>
            </div>

            {/* 4-Column Institutional Summary Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-[#F3E4AF] dark:border-[#1E291E]">
              <div className="p-4 rounded-xl bg-white/90 dark:bg-[#121512] border border-[#F3E4AF] dark:border-[#222D22]">
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B91C1C] dark:text-[#F97316]">
                  {writtenWorksCount}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#4A2013] dark:text-[#D6D3D1] mt-1">
                  {isTe ? 'నమోదు చేసిన అభివృద్ధి పనులు' : 'Documented Civic Works'}
                </p>
                <p className="text-xs text-[#7C2D12]/80 dark:text-[#A8A29E] mt-0.5">
                  {isTe
                    ? `మొత్తం ${PANCHAYAT_WORKS.length} తేదీల రికార్డులు`
                    : `${PANCHAYAT_WORKS.length} total dated records`}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/90 dark:bg-[#121512] border border-[#F3E4AF] dark:border-[#222D22]">
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B91C1C] dark:text-[#4ADE80]">
                  {TOTAL_PHOTO_COUNT}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#4A2013] dark:text-[#D6D3D1] mt-1">
                  {isTe ? 'సేకరించిన క్షేత్ర ఫోటోలు' : 'Field Photographs Archived'}
                </p>
                <p className="text-xs text-[#7C2D12]/80 dark:text-[#A8A29E] mt-0.5">
                  {isTe ? 'డైరీల నుండి నేరుగా సేకరించినవి' : 'Linked directly from field logs'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/90 dark:bg-[#121512] border border-[#F3E4AF] dark:border-[#222D22]">
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B91C1C] dark:text-[#F97316]">
                  {isTe ? '6 ఏళ్లు' : '6 Years'}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#4A2013] dark:text-[#D6D3D1] mt-1">
                  {isTe ? 'నిరంతర అభివృద్ధి నివేదిక' : 'Continuous Record'}
                </p>
                <p className="text-xs text-[#7C2D12]/80 dark:text-[#A8A29E] mt-0.5">
                  {isTe ? 'ఫిబ్రవరి 2021 – సెప్టెంబర్ 2026' : 'Feb 2021 – Sep 2026'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/90 dark:bg-[#121512] border border-[#F3E4AF] dark:border-[#222D22]">
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B91C1C] dark:text-[#4ADE80]">
                  {isTe ? '3 డైరీలు' : '3 Diaries'}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#4A2013] dark:text-[#D6D3D1] mt-1">
                  {isTe ? 'మూడు బ్లాగ్‌స్పాట్ సంపుటాలు' : 'Unified Blogspot Volumes'}
                </p>
                <p className="text-xs text-[#7C2D12]/80 dark:text-[#A8A29E] mt-0.5">
                  {isTe ? 'సంపుటం 1, 2 & 3 అనుసంధానం' : 'Vol. I, II & III linked in full'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: FEATURED WORKS (5 Significant Milestones) */}
        <section id="featured" className="border-b border-[#F3E4AF] dark:border-[#1E291E] bg-[#FFFBEF] dark:bg-[#0D0F0D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="max-w-3xl space-y-2 mb-10">
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                {isTe ? 'విభాగం 01 · ప్రధాన మైలురాళ్ళు' : 'Section 01 · Landmark Milestones'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#27120B] dark:text-[#FAFAF9] [text-wrap:balance]">
                {isTe ? 'ప్రధాన అభివృద్ధి పనులు' : 'Featured Works'}
              </h2>
              <p className="text-base text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                {isTe
                  ? '2021–2026 అభివృద్ధి డైరీల నుండి ఎంపిక చేసిన ఐదు ముఖ్యమైన పనులు — ప్రధాన నిధులు, దశాబ్దాల సమస్యల పరిష్కారం, మంచినీటి విస్తరణ మరియు ఆలయ పునరుద్ధరణ.'
                  : 'Five transformative works selected across the 2021–2026 development diaries, representing major infrastructure grants, multi-decade civic resolutions, drinking water security, and temple restoration.'}
              </p>
            </div>

            {featuredWorks.length > 0 && (
              <div className="space-y-8">
                {/* Lead Featured Card */}
                {(() => {
                  const lead = featuredWorks[0];
                  const cat = CATEGORIES.find((c) => c.id === lead.category);
                  const cover = lead.images[0];
                  const leadHighlight = getWorkHighlight(lead);
                  return (
                    <article className="grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden bg-white dark:bg-[#131713] border border-[#EFE0A8] dark:border-[#243224] items-stretch">
                      <div className="lg:col-span-6 relative min-h-[240px] lg:min-h-[320px] bg-[#FEF7DA] dark:bg-[#0A0C0A]">
                        <ResilientImage
                          src={cover}
                          alt={getWorkTitle(lead)}
                          fallbackLabel={getWorkTitle(lead)}
                          className="w-full h-full lg:h-full object-cover"
                        />
                      </div>
                      <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C2D12] dark:text-[#4ADE80] font-medium">
                            {leadHighlight && (
                              <>
                                <span className="font-mono-tabular font-semibold text-[#B91C1C] dark:text-[#FB923C]">
                                  {leadHighlight}
                                </span>
                                <span aria-hidden="true">·</span>
                              </>
                            )}
                            <span className="font-mono-tabular">{getWorkDate(lead)}</span>
                            <span aria-hidden="true">·</span>
                            <span>{isTe ? cat?.teName : cat?.name}</span>
                          </div>
                          <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-snug text-[#27120B] dark:text-[#FAFAF9]">
                            {getWorkTitle(lead)}
                          </h3>
                          <p className="text-base leading-relaxed text-[#4A2013] dark:text-[#D6D3D1]">
                            {getWorkBody(lead)}
                          </p>
                          {langMode === 'bilingual' && lead.teText && (
                            <p className="font-telugu text-sm leading-relaxed text-[#6B3423] dark:text-[#A8A29E] pt-1 line-clamp-3">
                              {lead.teText}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F3E4AF] dark:border-[#222D22]">
                          <button
                            type="button"
                            onClick={() => setActiveWork(lead)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
                          >
                            <Camera className="w-4 h-4" aria-hidden="true" />
                            <span>
                              {isTe
                                ? `రికార్డు & ఫోటోలు (${lead.images.length})`
                                : `View Record & Photos (${lead.images.length})`}
                            </span>
                          </button>
                          <a
                            href={lead.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#991B1B] dark:text-[#4ADE80] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                          >
                            <span>{isTe ? 'అసలు బ్లాగ్‌స్పాట్ పోస్ట్' : 'Original Blogspot Post'}</span>
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
                    const cover = work.images[0];
                    const workHighlight = getWorkHighlight(work);
                    return (
                      <article
                        key={work.id}
                        className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#131713] border border-[#EFE0A8] dark:border-[#243224]"
                      >
                        {cover && (
                          <div className="aspect-[16/9] w-full overflow-hidden bg-[#FEF7DA] dark:bg-[#0A0C0A] border-b border-[#F3E4AF] dark:border-[#222D22]">
                            <ResilientImage
                              src={cover}
                              alt={getWorkTitle(work)}
                              fallbackLabel={getWorkTitle(work)}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2.5">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C2D12] dark:text-[#4ADE80] font-medium">
                              {workHighlight && (
                                <>
                                  <span className="font-mono-tabular font-semibold text-[#B91C1C] dark:text-[#FB923C]">
                                    {workHighlight}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                </>
                              )}
                              <span className="font-mono-tabular">{getWorkDate(work)}</span>
                              <span aria-hidden="true">·</span>
                              <span>{isTe ? cat?.teName : cat?.name}</span>
                            </div>
                            <h3 className="font-display text-xl font-semibold leading-snug text-[#27120B] dark:text-[#FAFAF9]">
                              {getWorkTitle(work)}
                            </h3>
                            <p className="text-sm leading-relaxed text-[#4A2013] dark:text-[#D6D3D1]">
                              {getWorkBody(work)}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F3E4AF] dark:border-[#222D22]">
                            <button
                              type="button"
                              onClick={() => setActiveWork(work)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#FEF7DA] text-[#991B1B] hover:bg-[#FDE68A] dark:bg-[#1B241B] dark:text-[#4ADE80] dark:hover:bg-[#233223] transition-colors whitespace-nowrap shrink-0"
                            >
                              <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>
                                {isTe
                                  ? `చూడండి (${work.images.length} ఫోటోలు)`
                                  : `Inspect (${work.images.length} photos)`}
                              </span>
                            </button>
                            <a
                              href={work.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#7C2D12] dark:text-[#FB923C] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                            >
                              <span>{isTe ? 'మూల డైరీ' : 'Source Diary'}</span>
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
        <section id="categories" className="border-b border-[#F3E4AF] dark:border-[#1E291E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                  {isTe ? 'విభాగం 02 · విభాగాల వారీగా పనుల సూచిక' : 'Section 02 · Organized Civic Index'}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                  {isTe ? 'విభాగాల వారీగా అభివృద్ధి పనులు' : 'Works Organized by Category'}
                </h2>
                <p className="text-base text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                  {isTe
                    ? 'మూడు డైరీలలోని ప్రతి పనిని ఏడు ప్రజా విభాగాలుగా వర్గీకరించబడింది. తెలుగులో వెతకండి, డైరీ సంపుటం వారీగా ఫిల్టర్ చేయండి లేదా పూర్తి వివరాలకు క్లిక్ చేయండి.'
                    : 'Every recorded project across all three diaries grouped into seven civic categories. Search in English or Telugu, filter by diary volume, or click any work for full records and photographs.'}
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
                    placeholder={
                      isTe
                        ? 'పనులను వెతకండి (పేరు లేదా తేదీ)...'
                        : 'Search works (Telugu or English)...'
                    }
                    aria-label={isTe ? 'అభివృద్ధి పనులను వెతకండి' : 'Search development works'}
                    className="w-full sm:w-64 pl-9 pr-3 py-2.5 rounded-lg text-sm bg-white dark:bg-[#131713] border border-[#EFE0A8] dark:border-[#2A372A] text-[#27120B] dark:text-[#F5F5F4] placeholder:text-[#9A6B56] dark:placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#B91C1C] dark:focus:ring-[#F97316]"
                  />
                </div>
                <select
                  value={selectedVolume}
                  onChange={(e) => setSelectedVolume(e.target.value as VolumeId | 'all')}
                  aria-label={isTe ? 'డైరీ సంపుటం వారీగా ఫిల్టర్' : 'Filter by diary volume'}
                  className="px-3.5 py-2.5 rounded-lg text-sm font-medium bg-white dark:bg-[#131713] border border-[#EFE0A8] dark:border-[#2A372A] text-[#27120B] dark:text-[#F5F5F4] focus:outline-none focus:ring-2 focus:ring-[#B91C1C] dark:focus:ring-[#F97316]"
                >
                  <option value="all">{isTe ? 'అన్ని 3 డైరీ సంపుటాలు' : 'All 3 Diary Volumes'}</option>
                  <option value="2021">{isTe ? 'సంపుటం 1 (2021–2022)' : 'Vol. I (2021–2022)'}</option>
                  <option value="2022">{isTe ? 'సంపుటం 2 (2022–2023)' : 'Vol. II (2022–2023)'}</option>
                  <option value="2024-2026">{isTe ? 'సంపుటం 3 (2024–2026)' : 'Vol. III (2024–2026)'}</option>
                </select>
              </div>
            </div>

            {/* Interactive Category Tabs */}
            <div
              role="tablist"
              aria-label={isTe ? 'విభాగాల వారీగా ఫిల్టర్' : 'Filter works by category'}
              className="flex flex-wrap items-center gap-2 pb-8 border-b border-[#F3E4AF] dark:border-[#1E291E] no-print"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#B91C1C] text-white dark:bg-[#EA580C] dark:text-white'
                    : 'bg-[#FEF7DA]/80 text-[#5C2818] hover:bg-[#FEF7DA] dark:bg-[#131813] dark:text-[#D6D3D1] dark:hover:bg-[#1B241B]'
                }`}
              >
                {isTe
                  ? `అన్ని విభాగాలు (${filteredDirectoryWorks.length})`
                  : `All Categories (${filteredDirectoryWorks.length})`}
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
                        : 'bg-[#FEF7DA]/80 text-[#5C2818] hover:bg-[#FEF7DA] dark:bg-[#131813] dark:text-[#D6D3D1] dark:hover:bg-[#1B241B]'
                    }`}
                  >
                    {isTe ? cat.teName : cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Category Sections */}
            {filteredDirectoryWorks.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <p className="text-base font-medium text-[#5C2818] dark:text-[#D6D3D1]">
                  {isTe
                    ? `“${searchQuery}” కు సరిపోయే పనులు కనుగొనబడలేదు.`
                    : `No recorded works match “${searchQuery}”.`}
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
                  {isTe ? 'ఫిల్టర్లు రీసెట్ చేయండి' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#F3E4AF] dark:divide-[#1E291E]">
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
                              {isTe ? cat.teName : cat.name}
                            </h3>
                            <span className="font-mono-tabular text-xs font-semibold text-[#7C2D12] dark:text-[#FB923C]">
                              · {items.length}{' '}
                              {isTe ? 'పనులు' : items.length === 1 ? 'work' : 'works'}
                            </span>
                          </div>
                          {langMode === 'bilingual' && (
                            <p className="font-telugu text-xs font-medium text-[#7C2D12] dark:text-[#A8A29E]">
                              {cat.teName}
                            </p>
                          )}
                          <p className="text-sm text-[#4A2013] dark:text-[#D6D3D1] leading-relaxed">
                            {isTe ? cat.teDescription : cat.description}
                          </p>
                        </div>

                        {selectedCategory === 'all' && !searchQuery.trim() && items.length > 6 && (
                          <button
                            type="button"
                            onClick={() => toggleCategoryExpand(cat.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-[#EFE0A8] dark:border-[#2A382A] bg-white dark:bg-[#131713] text-[#991B1B] dark:text-[#4ADE80] hover:bg-[#FEF7DA] dark:hover:bg-[#1B241B] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                          >
                            {isExpanded ? (
                              <>
                                <span>{isTe ? 'తక్కువ చూపించు' : 'Show Fewer'}</span>
                                <ChevronUp className="w-4 h-4" aria-hidden="true" />
                              </>
                            ) : (
                              <>
                                <span>
                                  {isTe
                                    ? `అన్ని ${items.length} పనులు చూపించు`
                                    : `Show All ${items.length} Works`}
                                </span>
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
                            className="flex flex-col justify-between overflow-hidden rounded-xl bg-white dark:bg-[#131713] border border-[#F3E4AF] dark:border-[#222D22] hover:border-[#B91C1C]/60 dark:hover:border-[#F97316]/60 transition-colors"
                          >
                            <div>
                              {work.images.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => setActiveWork(work)}
                                  className="block w-full aspect-[16/9] overflow-hidden bg-[#FEF7DA] dark:bg-[#0A0C0A] border-b border-[#F3E4AF] dark:border-[#222D22] group"
                                  aria-label={getWorkTitle(work)}
                                >
                                  <ResilientImage
                                    src={work.images[0]}
                                    alt={getWorkTitle(work)}
                                    fallbackLabel={getWorkDate(work)}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  />
                                </button>
                              )}
                              <div className="p-5 space-y-2.5">
                                <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C2D12] dark:text-[#A8A29E]">
                                  <span className="font-mono-tabular font-semibold text-[#B91C1C] dark:text-[#FB923C]">
                                    {getWorkDate(work)}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span>{getVolumeLabel(work.volume)}</span>
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
                                  <p className="font-telugu text-xs leading-relaxed text-[#7C2D12]/90 dark:text-[#A8A29E] line-clamp-2">
                                    {work.teText}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-3 border-t border-[#FEF7DA] dark:border-[#1E271E]">
                              <button
                                type="button"
                                onClick={() => setActiveWork(work)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B91C1C] dark:text-[#4ADE80] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                              >
                                <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>
                                  {work.images.length > 0
                                    ? isTe
                                      ? `చూడండి (${work.images.length} ఫోటోలు)`
                                      : `View (${work.images.length} photos)`
                                    : isTe
                                    ? 'వివరాలు చదవండి'
                                    : 'Read Record'}
                                </span>
                              </button>
                              <a
                                href={work.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#6B3423] dark:text-[#A8A29E] hover:text-[#B91C1C] dark:hover:text-[#FB923C] whitespace-nowrap shrink-0"
                              >
                                <span>{isTe ? 'బ్లాగ్‌స్పాట్' : 'Blogspot'}</span>
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
        <section id="timeline" className="border-b border-[#F3E4AF] dark:border-[#1E291E] bg-[#FFFBEF] dark:bg-[#0B0D0B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                  {isTe ? 'విభాగం 03 · కాలక్రమానుసార ప్రజా నివేదిక' : 'Section 03 · Chronological Public Ledger'}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                  {isTe
                    ? '2021–2026 కాలక్రమానుసార అభివృద్ధి టైమ్‌లైన్'
                    : 'Chronological Development Timeline (2021–2026)'}
                </h2>
                <p className="text-base text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                  {isTe
                    ? 'ఫిబ్రవరి 9, 2021 ఎన్నిక నుండి సెప్టెంబర్ 10, 2026 వరకు మూడు డైరీలలోని ప్రతి తేదీ వారీ కార్యక్రమం ముఖ్య మైలురాళ్ళతో సహా కాలక్రమానుసారంగా పొందుపరచబడింది.'
                    : 'Every dated record from the February 9, 2021 election through September 10, 2026 arranged chronologically across all three diaries, with key milestones highlighted.'}
                </p>
              </div>

              {/* Timeline Mode Controls */}
              <div
                role="group"
                aria-label={isTe ? 'టైమ్‌లైన్ ఫిల్టర్' : 'Timeline detail filter'}
                className="inline-flex flex-wrap items-center p-1 rounded-lg bg-[#FEF7DA] dark:bg-[#141814] border border-[#EFE0A8] dark:border-[#243224] no-print self-start lg:self-auto"
              >
                {(
                  [
                    [
                      'written',
                      isTe
                        ? `నమోదైన పనులు (${writtenWorksCount})`
                        : `Documented Works (${writtenWorksCount})`,
                    ],
                    ['milestones', isTe ? 'ముఖ్య మైలురాళ్ళు' : 'Key Milestones'],
                    [
                      'all',
                      isTe
                        ? `అన్ని నమోదులు + ఫోటోలు (${PANCHAYAT_WORKS.length})`
                        : `All Entries + Photo Logs (${PANCHAYAT_WORKS.length})`,
                    ],
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
            <div className="flex flex-wrap items-center gap-2 pb-10 border-b border-[#F3E4AF] dark:border-[#1E291E] no-print">
              <button
                type="button"
                onClick={() => setTimelineYear('all')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono-tabular font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  timelineYear === 'all'
                    ? 'bg-[#B91C1C] text-white dark:bg-[#16A34A] dark:text-[#050805]'
                    : 'bg-white text-[#5C2818] border border-[#EFE0A8] hover:bg-[#FEF7DA] dark:bg-[#131713] dark:text-[#D6D3D1] dark:border-[#243224] dark:hover:bg-[#1B241B]'
                }`}
              >
                {isTe ? 'అన్ని సంవత్సరాలు (2021–2026)' : 'All Years (2021–2026)'}
              </button>
              {timelineYears.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTimelineYear(yr)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono-tabular font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    timelineYear === yr
                      ? 'bg-[#B91C1C] text-white dark:bg-[#16A34A] dark:text-[#050805]'
                      : 'bg-white text-[#5C2818] border border-[#EFE0A8] hover:bg-[#FEF7DA] dark:bg-[#131713] dark:text-[#D6D3D1] dark:border-[#243224] dark:hover:bg-[#1B241B]'
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
                  <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-2 pb-4 lg:pb-0 border-b lg:border-b-0 border-[#F3E4AF] dark:border-[#1E291E]">
                    <p className="font-display text-4xl sm:text-5xl font-bold font-mono-tabular text-[#B91C1C] dark:text-[#F97316]">
                      {yr}
                    </p>
                    <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#7C2D12] dark:text-[#4ADE80] font-semibold">
                      {entries.length}{' '}
                      {isTe ? 'నమోదులు' : entries.length === 1 ? 'entry recorded' : 'entries recorded'}
                    </p>
                    <p className="text-xs text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                      {isTe
                        ? TELUGU_YEAR_SUMMARIES[yr]
                        : (
                            <>
                              {yr === 2021 &&
                                'Year 1 · Council Election, Streetlights, COVID-19 Oxygen Relief & Tulasi Kalyana Mandapam'}
                              {yr === 2022 &&
                                'Year 2 · Ward 6 40-Year Drain Resolution, Water Pipelines, Kolatam & 2,000 Saplings'}
                              {yr === 2023 &&
                                'Year 3 · SC Colony L-Drainage, Sri Ramalayam & Maridi Talli Temple Restorations'}
                              {yr === 2024 &&
                                'Year 4 · CC Roads, ₹4.5L Palle Panduga Platform & Anganwadi Sanitation'}
                              {yr === 2025 &&
                                'Year 5 · SC Colony Stage Modernization, Mandal Grant & Cyclone Bund Repair'}
                              {yr === 2026 &&
                                'Year 6 · Main Drain Desilting & SC Colony Open Well Restoration'}
                            </>
                          )}
                    </p>
                  </div>

                  {/* Chronological Entries List */}
                  <div className="lg:col-span-9 space-y-4">
                    {entries.map((work) => {
                      const cat = CATEGORIES.find((c) => c.id === work.category);
                      const isKey = Boolean(work.isMilestone || work.isFeatured);
                      const workHighlight = getWorkHighlight(work);
                      return (
                        <article
                          key={work.id}
                          className={`p-5 sm:p-6 rounded-xl border transition-colors ${
                            isKey
                              ? 'bg-white dark:bg-[#141A14] border-[#B91C1C]/45 dark:border-[#F97316]/55'
                              : 'bg-white/90 dark:bg-[#111411] border-[#F3E4AF] dark:border-[#202920]'
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
                                  {getWorkDate(work)}
                                </span>
                                <span className="text-[#9A6B56] dark:text-[#78716C]" aria-hidden="true">
                                  ·
                                </span>
                                <span className="text-[#6B3423] dark:text-[#A8A29E]">
                                  {isTe ? cat?.teName : cat?.name}
                                </span>
                                {workHighlight && (
                                  <>
                                    <span className="text-[#9A6B56] dark:text-[#78716C]" aria-hidden="true">
                                      ·
                                    </span>
                                    <span className="font-mono-tabular font-semibold text-[#B91C1C] dark:text-[#4ADE80]">
                                      {workHighlight}
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
                                <p className="font-telugu text-xs sm:text-sm leading-relaxed text-[#6B3423] dark:text-[#A8A29E] pt-0.5">
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
                                      ? isTe
                                        ? `${work.images.length} క్షేత్ర ఫోటోలు చూడండి`
                                        : `View ${work.images.length} Field ${
                                            work.images.length === 1 ? 'Photo' : 'Photos'
                                          }`
                                      : isTe
                                      ? 'వివరాలు చూడండి'
                                      : 'View Details'}
                                  </span>
                                </button>
                                <a
                                  href={work.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium text-[#6B3423] dark:text-[#A8A29E] hover:text-[#B91C1C] dark:hover:text-[#FB923C]"
                                >
                                  <span>{getVolumeLabel(work.volume)}</span>
                                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                </a>
                              </div>
                            </div>

                            {work.images.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setActiveWork(work)}
                                className="relative w-full sm:w-32 h-40 sm:h-24 shrink-0 rounded-lg overflow-hidden border border-[#EFE0A8] dark:border-[#243224] bg-[#FEF7DA] dark:bg-[#0A0C0A] group"
                                aria-label={getWorkTitle(work)}
                              >
                                <ResilientImage
                                  src={work.images[0]}
                                  alt={getWorkTitle(work)}
                                  fallbackLabel={getWorkDate(work)}
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
        <section id="archives" className="bg-[#FFFDF4] dark:bg-[#090A09]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-10">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#B91C1C] dark:text-[#4ADE80] font-semibold">
                {isTe ? 'విభాగం 04 · మూల డైరీలు & షేరింగ్' : 'Section 04 · Source Records & Sharing'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                {isTe ? 'అసలు బ్లాగ్‌స్పాట్ అభివృద్ధి డైరీలు' : 'Original Blogspot Development Diaries'}
              </h2>
              <p className="text-base text-[#5C2818] dark:text-[#A8A29E] leading-relaxed">
                {isTe
                  ? 'ఈ పేజీలో ఉన్న అన్ని పనులు, తేదీలు మరియు క్షేత్ర ఫోటోలు తిమ్మరాజుపేట గ్రామ పంచాయతీ మూడు అధికారిక బ్లాగ్‌స్పాట్ అభివృద్ధి డైరీల నుండి నేరుగా సేకరించబడినవి.'
                  : 'All works, dates, and field photographs listed on this page are compiled directly from the three official Thimmarajupeta Grama Panchayat Development Diary blog posts.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.values(VOLUMES) as typeof VOLUMES[VolumeId][]).map((vol) => {
                const volWorks = PANCHAYAT_WORKS.filter((w) => w.volume === vol.id);
                const volPhotos = volWorks.reduce((acc, w) => acc + w.images.length, 0);
                const volCoverWork = volWorks.find((w) => w.images.length > 0);
                const teVol = TELUGU_VOLUMES[vol.id];
                return (
                  <div
                    key={vol.id}
                    className="flex flex-col justify-between overflow-hidden rounded-xl bg-white dark:bg-[#131713] border border-[#EFE0A8] dark:border-[#243224]"
                  >
                    <div>
                      {volCoverWork && (
                        <button
                          type="button"
                          onClick={() => setActiveWork(volCoverWork)}
                          className="block w-full aspect-[16/9] overflow-hidden bg-[#FEF7DA] dark:bg-[#0A0C0A] border-b border-[#F3E4AF] dark:border-[#222D22] group"
                          aria-label={isTe ? vol.teTitle : vol.title}
                        >
                          <ResilientImage
                            src={volCoverWork.images[0]}
                            alt={isTe ? vol.teTitle : vol.title}
                            fallbackLabel={isTe ? teVol.shortLabel : vol.shortLabel}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </button>
                      )}
                      <div className="p-6 space-y-2.5">
                        <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#B91C1C] dark:text-[#FB923C] font-semibold">
                          {isTe ? `${teVol.shortLabel} · ${teVol.period}` : `${vol.shortLabel} · ${vol.period}`}
                        </p>
                        <h3 className="font-display text-xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                          {isTe ? vol.teTitle : vol.title}
                        </h3>
                        <p className="text-sm text-[#4A2013] dark:text-[#D6D3D1] leading-relaxed">
                          {isTe ? teVol.summary : vol.summary}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 px-6 pb-6 pt-4 border-t border-[#F3E4AF] dark:border-[#222D22]">
                      <div className="flex items-center gap-3 text-xs font-mono-tabular text-[#6B3423] dark:text-[#4ADE80]">
                        <span>
                          {volWorks.length} {isTe ? 'తేదీల నమోదులు' : 'dated entries'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {volPhotos} {isTe ? 'ఫోటోలు' : 'photos'}
                        </span>
                      </div>
                      <a
                        href={vol.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#FEF7DA] text-[#991B1B] hover:bg-[#FDE68A] dark:bg-[#1B241B] dark:text-[#4ADE80] dark:hover:bg-[#233223] transition-colors"
                      >
                        <span>{isTe ? 'అసలు డైరీని చూడండి' : 'Visit Original Diary'}</span>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shareable Actions Box */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#FEF7DA]/85 dark:bg-[#131813] border border-[#EFE0A8] dark:border-[#273627] flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
              <div className="space-y-1.5 max-w-xl">
                <h3 className="font-display text-xl font-semibold text-[#27120B] dark:text-[#FAFAF9]">
                  {isTe
                    ? 'మన తిమ్మరాజుపేట నివేదికను గ్రామస్తులతో షేర్ చేయండి'
                    : 'Share MANA THIMMARAJUPETA With Villagers & Well-Wishers'}
                </h3>
                <p className="text-sm text-[#4A2013] dark:text-[#D6D3D1]">
                  {isTe
                    ? 'వాట్సాప్ ద్వారా నేరుగా లింక్ పంపండి, వెబ్ చిరునామాను కాపీ చేయండి లేదా నోటీసు బోర్డు కోసం ప్రింట్ తీసుకోండి.'
                    : 'Send a direct link via WhatsApp, copy the web address, or print a clean summary for community noticeboards.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#B91C1C] text-white hover:bg-[#991B1B] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>
                    {copiedLink
                      ? isTe
                        ? 'కాపీ అయింది!'
                        : 'Copied!'
                      : isTe
                      ? 'షేర్ లింక్ కాపీ చేయండి'
                      : 'Copy Share Link'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#27120B] border border-[#EFE0A8] hover:bg-[#FFFDF4] dark:bg-[#16A34A] dark:text-[#050805] dark:border-[#16A34A] dark:hover:bg-[#22C55E] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{isTe ? 'వాట్సాప్‌లో షేర్ చేయండి' : 'Share via WhatsApp'}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#5C2818] border border-[#EFE0A8] hover:bg-[#FFFDF4] dark:bg-[#191D19] dark:text-[#E7E5E4] dark:border-[#2C382C] dark:hover:bg-[#222822] transition-colors whitespace-nowrap shrink-0"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>{isTe ? 'సారాంశం ప్రింట్ చేయండి' : 'Print Summary'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F3E4AF] dark:border-[#1E291E] bg-[#FFFBEF] dark:bg-[#070807] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6B3423] dark:text-[#A8A29E]">
          <div className="space-y-1">
            <p className="font-semibold text-[#27120B] dark:text-[#E7E5E4]">
              {isTe
                ? 'తిమ్మరాజుపేట గ్రామ పంచాయతీ · అచ్యుతాపురం మండలం'
                : 'Thimmarajupeta Grama Panchayat · Atchutapuram Mandal'}
            </p>
            <p>
              {isTe
                ? '2021–2026 గ్రామ డెవలప్మెంట్ డైరీల నుండి రూపొందించిన ప్రజా అభివృద్ధి నివేదిక.'
                : 'Public development archive compiled from the 2021–2026 Grama Development Diaries.'}
            </p>
            <p className="font-semibold text-[#B91C1C] dark:text-[#FB923C] pt-1">
              {isTe ? 'రచన & సంకలనం: శరగడం శంకర్' : 'BY: Saragadam Shakar'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#featured" className="hover:underline">
              {isTe ? 'ప్రధాన పనులు' : 'Featured'}
            </a>
            <a href="#categories" className="hover:underline">
              {isTe ? 'విభాగాలు' : 'Categories'}
            </a>
            <a href="#timeline" className="hover:underline">
              {isTe ? 'టైమ్‌లైన్' : 'Timeline'}
            </a>
            <a href="#archives" className="hover:underline">
              {isTe ? 'మూల డైరీలు' : 'Source Diaries'}
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
