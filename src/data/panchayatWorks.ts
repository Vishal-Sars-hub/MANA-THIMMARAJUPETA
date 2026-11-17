import { RAW_DIARY_DATA, type RawDiaryEntry } from './rawDiaryData';

export type CategoryId =
  | 'infrastructure'
  | 'water'
  | 'sanitation'
  | 'health'
  | 'education'
  | 'environment'
  | 'culture';

export type VolumeId = '2021' | '2022' | '2024-2026';

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  teName: string;
  description: string;
  teDescription: string;
}

export interface VolumeMeta {
  id: VolumeId;
  shortLabel: string;
  title: string;
  teTitle: string;
  period: string;
  url: string;
  summary: string;
}

export interface PanchayatWork {
  id: string;
  volume: VolumeId;
  sourceUrl: string;
  isoDate: string;
  year: number;
  dateLabel: string;
  teDate: string;
  category: CategoryId;
  enTitle: string;
  enSummary: string;
  teText: string;
  images: string[];
  highlightMetric?: string;
  isFeatured?: boolean;
  isMilestone?: boolean;
  isPhotoOnly?: boolean;
  featuredImage?: string;
}

export const VOLUMES: Record<VolumeId, VolumeMeta> = {
  '2021': {
    id: '2021',
    shortLabel: 'Volume I · 2021–2022',
    title: 'Thimmarajupeta Grama Development Diary 2021–2022',
    teTitle: 'అచ్యుతాపురం మండలం తిమ్మరాజుపేట గ్రామ డెవలప్మెంట్ డైరీ 2021-2022',
    period: 'Feb 2021 – Feb 2022',
    url: 'https://thimmarajupetapanchatdevelopment.blogspot.com/2021/05/may-2021.html',
    summary:
      'First year of the elected Panchayat body: village-wide streetlight restoration, COVID-19 oxygen & medical relief, ₹25L Tulasi Kalyana Mandapam inauguration, state-level Kabaddi, and foundational sanitation.',
  },
  '2022': {
    id: '2022',
    shortLabel: 'Volume II · 2022–2023',
    title: 'Thimmarajupeta Grama Development Diary 2022–2023',
    teTitle: 'అచ్యుతాపురం మండలం తిమ్మరాజుపేట గ్రామ డెవలప్మెంట్ డైరీ 2022-2023',
    period: 'Feb 2022 – Dec 2023',
    url: 'https://thimmarajupetapanchatdevelopment.blogspot.com/2022/01/2022.html',
    summary:
      'Second and third year works: resolving a 40-year Ward 6 drainage dispute, SC Colony L-shaped covered drains, multi-ward drinking water pipeline renewals, vermicompost revival, 2,000 saplings, and temple restorations.',
  },
  '2024-2026': {
    id: '2024-2026',
    shortLabel: 'Volume III · 2024–2026',
    title: 'Thimmarajupeta Grama Development Diary 2024–2026',
    teTitle: 'అచ్యుతాపురం మండలం తిమ్మరాజుపేట గ్రామ డెవలప్మెంట్ డైరీ 2024-2026',
    period: 'Jan 2024 – Sep 2026',
    url: 'https://thimmarajupetapanchatdevelopment.blogspot.com/2026/11/2024.html',
    summary:
      'Recent development works: CC roads in Karri Vari Street & Panchayat approach, ₹4.5L Palle Panduga platform, SC Colony stage modernization, Anganwadi & school sanitation, SC Colony well restoration, and cyclone bund repairs.',
  },
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'infrastructure',
    name: 'Roads, Drains & Civic Works',
    teName: 'రోడ్లు, డ్రైనేజీ & నిర్మాణాలు',
    description:
      'Concrete (CC) village roads, covered neighborhood drainage channels, public stages, Panchayat governance meetings, revenue drone surveys, and community halls.',
    teDescription:
      'సీసీ రోడ్లు, కవర్డ్ డ్రైనేజీ కాలువలు, కమ్యూనిటీ స్టేజిలు, కల్యాణ మండపం మరియు గ్రామ సభల వివరాలు.',
  },
  {
    id: 'water',
    name: 'Drinking Water & Pipelines',
    teName: 'మంచినీరు & పైప్‌లైన్ పనులు',
    description:
      'Replacement of corroded pipelines across wards, 15th Finance tap connections, overhead tank cleaning, SC Colony open-well restoration, and summer water kiosks.',
    teDescription:
      'పాత పైప్‌లైన్ల మార్పు, 15వ ఫైనాన్స్ కుళాయి కనెక్షన్లు, వాటర్ ట్యాంక్ శుభ్రత మరియు బావి పునరుద్ధరణ.',
  },
  {
    id: 'sanitation',
    name: 'Sanitation & Vector Control',
    teName: 'పారిశుద్ధ్యం & దోమల నివారణ',
    description:
      'JCB clearance of multi-year garbage dumps, drain desilting, Sampada Kendra vermicompost revival, donated dustbins, bleaching, and fogging drives.',
    teDescription:
      'చెత్త తరలింపు, డ్రైనేజీ పూడికతీత, వర్మీ కంపోస్ట్ షెడ్డు, చెత్తబుట్టల పంపిణీ మరియు దోమల నివారణ.',
  },
  {
    id: 'health',
    name: 'Public Health & Welfare',
    teName: 'ఆరోగ్యం & సామాజిక సంక్షేమం',
    description:
      'COVID-19 home oxygen concentrators and cylinders, door-to-door medical kits, RDSS oximeters and PPE, anti-illicit liquor campaigns, and winter blanket drives.',
    teDescription:
      'కోవిడ్ ఆక్సిజన్ సహాయం, మెడికల్ కిట్లు, నాటుసారా వ్యతిరేక ర్యాలీలు మరియు వృద్ధులకు దుప్పట్ల పంపిణీ.',
  },
  {
    id: 'education',
    name: 'Education, Youth & Sports',
    teName: 'విద్య, యువత & క్రీడలు',
    description:
      'MPP Primary School repairs and student merit awards, village library cleanup with TEA & YCY, state-level Kabaddi tournament, and national day youth programs.',
    teDescription:
      'ప్రభుత్వ పాఠశాల మరమ్మతులు, విద్యార్థులకు సత్కారాలు, గ్రామ గ్రంథాలయం మరియు రాష్ట్ర స్థాయి కబడ్డీ పోటీలు.',
  },
  {
    id: 'environment',
    name: 'Environment & Streetlights',
    teName: 'పర్యావరణం & వీధి దీపాలు',
    description:
      'Donor-supported street lighting across every lane, World Environment Day and biodiversity 2,000-sapling drives, branch trimming, and storm canal bund repairs.',
    teDescription:
      'వీధి దీపాల ఏర్పాటు మరియు మరమ్మతులు, 2,000 మొక్కల పంపిణీ, పచ్చదనం మరియు తుఫాన్ కాలువ గట్టు మరమ్మతులు.',
  },
  {
    id: 'culture',
    name: 'Temples, Heritage & Festivals',
    teName: 'ఆలయాలు, సంస్కృతి & ఉత్సవాలు',
    description:
      'Temple renovations and boundary walls, centralized Ramalayam PA speaker system, women’s Kolatam troupe, 33-day cultural showcases, and transparent festival accounts.',
    teDescription:
      'ఆలయ పునర్నిర్మాణం, మైక్ సెట్ ఏర్పాటు, మహిళా కోలాట బృందం మరియు పారదర్శక ఉత్సవ నిర్వహణ.',
  },
];

interface WorkEnrichment {
  isoDate: string;
  dateLabel: string;
  category: CategoryId;
  enTitle: string;
  enSummary: string;
  highlightMetric?: string;
  isFeatured?: boolean;
  isMilestone?: boolean;
  featuredImage?: string;
}

const ENRICHMENTS: Record<string, WorkEnrichment> = {
  // === VOLUME I: 2021-2022 ===
  '2021-02': {
    isoDate: '2021-02-09',
    dateLabel: 'Feb 9, 2021',
    category: 'infrastructure',
    enTitle: 'New Panchayat Council Elected',
    enSummary:
      'Saragadam Bhagyalakshmi Siva Bapu Naidu elected Sarpanch alongside the new Grama Panchayat council of Thimmarajupeta, launching this public development diary.',
    highlightMetric: 'Term Begins',
    isMilestone: true,
  },
  '2021-03': {
    isoDate: '2021-02-16',
    dateLabel: 'Feb 16, 2021',
    category: 'infrastructure',
    enTitle: 'Public Resting Benches Installed Across Village Landmarks',
    enSummary:
      'Adari Hari, Bhavirisetti Ravi Kumar, and friends raised community donations to install resting benches at the Panchayat office, Ramalayam, and Durgambika Temple.',
  },
  '2021-04': {
    isoDate: '2021-03-06',
    dateLabel: 'Mar 6, 2021',
    category: 'environment',
    enTitle: 'Every Street Lit Ahead of Maha Shivaratri',
    enSummary:
      'With EESL maintenance stalled, youth and elders pooled non-partisan donations to install LED streetlights on every lane plus spare fixtures for night-shift workers and farmers.',
    highlightMetric: 'All-Lane LED Drive',
    isMilestone: true,
  },
  '2021-05': {
    isoDate: '2021-03-07',
    dateLabel: 'Mar 7, 2021',
    category: 'sanitation',
    enTitle: '12-Worker Deep Clearance of 3-Year Waste & Drains',
    enSummary:
      'Engaged 12 sanitation workers to clear garbage and clogged drainage channels that had accumulated for two to three years across all corners of the village.',
  },
  '2021-06': {
    isoDate: '2021-03-11',
    dateLabel: 'Mar 11, 2021',
    category: 'culture',
    enTitle: 'Maha Shivaratri Rudrabhumi Puja & Cultural Night',
    enSummary:
      'Sarpanch garlanded the Rudrabhumi Shiva idol; SI Lakshmana Rao inaugurated community Annasamaradhana followed by Raviteja Union cultural programs at Rama Stage.',
  },
  '2021-07': {
    isoDate: '2021-03-27',
    dateLabel: 'Mar 27, 2021',
    category: 'culture',
    enTitle: 'Non-Partisan Village Utsava Committee Constituted',
    enSummary:
      'Villagers convened at Ramalayam to appoint a 16-member Village Festival Committee chaired by Bhavirisetti Ravi Kumar to organize celebrations inclusively.',
  },
  '2021-08': {
    isoDate: '2021-04-03',
    dateLabel: 'Apr 3, 2021',
    category: 'infrastructure',
    enTitle: 'Panchayat Council Swearing-In Ceremony',
    enSummary:
      'Formal oath-taking ceremony of Sarpanch Saragadam Bhagyalakshmi Siva Bapu Naidu, Vice Sarpanch Beesetti Ramu, and Ward Members.',
    isMilestone: true,
  },
  '2021-09': {
    isoDate: '2021-04-11',
    dateLabel: 'Apr 11, 2021',
    category: 'culture',
    enTitle: 'Ramalayam Premises Deep Cleaning',
    enSummary:
      'Volunteer cleanup of the Sri Ramalayam temple grounds ahead of Sri Rama Navami.',
  },
  '2021-10': {
    isoDate: '2021-04-16',
    dateLabel: 'Apr 16, 2021',
    category: 'culture',
    enTitle: '₹25,000 Centralized Village PA & Speaker System',
    enSummary:
      'Koilada Jagannadha Rao donated ₹25,000 in memory of his father Adinarayana to install a centralized microphone and street speaker network at Ramalayam, replacing traditional drum announcements.',
    highlightMetric: '₹25,000 Donation',
  },
  '2021-11': {
    isoDate: '2021-04-21',
    dateLabel: 'Apr 21, 2021',
    category: 'culture',
    enTitle: 'COVID-Safe Sri Rama Navami & Annasamaradhana',
    enSummary:
      'Sita Rama Kalyanam and noon community meal hosted at Ramalayam with masks, sanitizers, and four Utsava Committee volunteers managing physical distancing.',
  },
  '2021-12': {
    isoDate: '2021-05-05',
    dateLabel: 'May 5, 2021',
    category: 'sanitation',
    enTitle: '₹50,000 Mosquito Fogging Machine Donated & Launched',
    enSummary:
      'Sanapala Prasad (Srikakulam, friend of Vice President Beesetti Ramu) donated ₹50,000 to purchase a dedicated mosquito fogging machine for village-wide vector control.',
    highlightMetric: '₹50,000 Donation',
    isMilestone: true,
  },
  '2021-13': {
    isoDate: '2021-05-12',
    dateLabel: 'May 12, 2021',
    category: 'health',
    enTitle: 'Home Oxygen Concentrator Support for COVID Patient',
    enSummary:
      'Youth volunteers and Adari Hari arranged an emergency oxygen concentrator at home for villager Midathana Ramana during severe respiratory distress.',
  },
  '2021-14': {
    isoDate: '2021-05-17',
    dateLabel: 'May 17, 2021',
    category: 'health',
    enTitle: 'Door-to-Door COVID-19 Medical Kits Launched',
    enSummary:
      'Sarpanch and Manikanta Youth established an on-call home delivery service providing free COVID-19 medical kits to symptomatic families across the village.',
  },
  '2021-15': {
    isoDate: '2021-05-20',
    dateLabel: 'May 20, 2021',
    category: 'health',
    enTitle: 'Emergency Oxygen Cylinders, Bleaching & Fever Prevention',
    enSummary:
      'Reserved community oxygen cylinders (coordinated by Saragadam Nagarjuna) for home patients lacking hospital beds, alongside village-wide bleaching against typhoid and dengue.',
    highlightMetric: 'COVID Oxygen Reserve',
    isFeatured: true,
    isMilestone: true,
    featuredImage: '/src/assets/images/hero_thimmarajupeta_village_1794880861388.jpg',
  },
  '2021-16': {
    isoDate: '2021-05-22',
    dateLabel: 'May 22, 2021',
    category: 'culture',
    enTitle: 'Maridimamba Hundi Handover & Daily Worship Stewardship',
    enSummary:
      'Founder Saragadam Mahalakshmi Naidu handed ₹4,300 in temple hundi offerings to the Utsava Committee, entrusting them with daily rituals and transparent festival accounting.',
  },
  '2021-17': {
    isoDate: '2021-05-30',
    dateLabel: 'May 30, 2021',
    category: 'water',
    enTitle: 'Major Drinking Water Pipeline Leak Repair near Primary School',
    enSummary:
      'Repaired long-neglected underground water pipelines near Pedda Doddu beside the Primary School to stop severe water wastage.',
  },
  '2021-18': {
    isoDate: '2021-06-01',
    dateLabel: 'Jun 1, 2021',
    category: 'culture',
    enTitle: 'Brass Lamp Stand Offered at Abhaya Anjaneya Temple',
    enSummary:
      'Katakota Sambasiva Rao and family gifted a traditional Divva Simma (lamp stand) during Abhaya Anjaneya Swamy Jayanti celebrations.',
  },
  '2021-19': {
    isoDate: '2021-06-02',
    dateLabel: 'Jun 2, 2021',
    category: 'sanitation',
    enTitle: 'JCB Clearance of 5-Year Garbage Dump at Kalyana Mandapam',
    enSummary:
      'Deployed JCB excavators and tractors to haul away five years of accumulated waste near Tulasi Kalyana Mandapam and the Visakha Dairy Milk Society.',
  },
  '2021-20': {
    isoDate: '2021-06-04',
    dateLabel: 'Jun 4, 2021',
    category: 'culture',
    enTitle: 'Anjaneya Jayanti Sanitised Darshan & Prasadam Distribution',
    enSummary:
      'Manikanta Youth and Bala Vinayaka Sangham distributed masks, sanitizers, Annavaram prasadam, pulihora, and buttermilk following 9-day bhajans.',
  },
  '2021-21': {
    isoDate: '2021-06-05',
    dateLabel: 'Jun 5, 2021',
    category: 'environment',
    enTitle: 'World Environment Day: Saplings & 30 Donated Dustbins',
    enSummary:
      'Grama Abhyudaya Sangham planted saplings and educated households on wet/dry waste segregation; the Karri brothers donated 30 dustbins and pledged ₹1,000/month for sanitation workers.',
    highlightMetric: '30 Dustbins + ₹1k/mo',
  },
  '2021-22': {
    isoDate: '2021-06-09',
    dateLabel: 'Jun 9, 2021',
    category: 'infrastructure',
    enTitle: 'Panchayat Board Resolution Meeting',
    enSummary:
      'Sarpanch and ward members convened a formal Panchayat board meeting to pass resolutions on priority civic issues.',
  },
  '2021-23': {
    isoDate: '2021-06-16',
    dateLabel: 'Jun 16, 2021',
    category: 'culture',
    enTitle: 'Cement Platform Construction Around Pasaramalamma Neem Tree',
    enSummary:
      'Farmers, youth, and donors (including ₹2,000 from Polarpu Paru Naidu) contributed Shramadan labor to begin a cement platform around the sacred neem tree.',
  },
  '2021-24': {
    isoDate: '2021-06-27',
    dateLabel: 'Jun 27, 2021',
    category: 'education',
    enTitle: 'Young Chaitanya Youth Revives TEA Village Library',
    enSummary:
      'Young Chaitanya Youth (YCY) joined Thimmarajupeta Employees Association (TEA) and librarian Patnala Venkati to dust, clean, and plan upgrades for the self-funded village library.',
  },
  '2021-25': {
    isoDate: '2021-06-28',
    dateLabel: 'Jun 28, 2021',
    category: 'culture',
    enTitle: 'Community Shramadan at Pasala Maramma Shrine',
    enSummary:
      'Farmers, volunteers, and Panchayat leaders conducted collective Shramadan labor at the Pasala Maramma shrine.',
  },
  '2021-26': {
    isoDate: '2021-07-06',
    dateLabel: 'Jul 6, 2021',
    category: 'water',
    enTitle: 'Accelerated Platform Work & Dilapidated Tap Repair',
    enSummary:
      'Villagers accelerated construction of the shrine platform while repairing a broken public drinking water tap.',
  },
  '2021-27': {
    isoDate: '2021-07-07',
    dateLabel: 'Jul 7, 2021',
    category: 'infrastructure',
    enTitle: 'Tulasi Kalyana Mandapam Inaugurated (₹25 Lakh Facility)',
    enSummary:
      'Grand inauguration of the ₹25 Lakh Tulasi Kalyana Mandapam built with Visakha Dairy financial support, attended by Visakha Dairy MD N.V. Ramana and honoring Adari Tulasi Rao.',
    highlightMetric: '₹25 Lakh Facility',
    isFeatured: true,
    isMilestone: true,
    featuredImage: '/src/assets/images/featured_kalyana_mandapam_1794880861286.jpg',
  },
  '2021-28': {
    isoDate: '2021-07-09',
    dateLabel: 'Jul 9, 2021',
    category: 'infrastructure',
    enTitle: 'Grama Sabha Resolutions on Dumping Yard, Drains & Taps',
    enSummary:
      'Sachivalayam Secretary Deenabandhu read out village proposals in an open Grama Sabha passing resolutions on the dumping yard, drainage network, water taps, and village sweeper staffing.',
  },
  '2021-29': {
    isoDate: '2021-07-26',
    dateLabel: 'Jul 26, 2021',
    category: 'environment',
    enTitle: 'Almond Sapling Planted at Panchayat Office',
    enSummary:
      'Sarpanch led tree planting of an almond sapling at the Grama Panchayat office compound.',
  },
  '2021-30': {
    isoDate: '2021-07-29',
    dateLabel: 'Jul 29, 2021',
    category: 'culture',
    enTitle: 'Pasala Maramma Festival & Transparent Flexi Accounts Board',
    enSummary:
      'Celebrated Pasala Maramma festival atop the newly built platform and displayed every rupee of donations and expenses publicly on a transparent flexi board.',
  },
  '2021-31': {
    isoDate: '2021-08-05',
    dateLabel: 'Aug 5, 2021',
    category: 'culture',
    enTitle: 'Sri Durgambika Ammavari Festival',
    enSummary:
      'Traditional folk performances (Nela Veshalu) and evening rituals held for Sri Durgambika Ammavari festival.',
  },
  '2021-32': {
    isoDate: '2021-08-15',
    dateLabel: 'Aug 15, 2021',
    category: 'health',
    enTitle: '75th Independence Day, COVID Warriors Felicitated & RDSS Kits',
    enSummary:
      'Flag hoisting at Panchayat; Manikanta Youth honored medical staff and green volunteers; RDSS & Rythu Swarajya Vedika distributed pulse oximeters, glucometers, thermal scanners, sanitizers, and PPE kits.',
    highlightMetric: 'RDSS Medical Gear',
  },
  '2021-33': {
    isoDate: '2021-08-25',
    dateLabel: 'Aug 25, 2021',
    category: 'infrastructure',
    enTitle: 'CC Road Repair & Speed Breaker at Village Entrance',
    enSummary:
      'Repaired the damaged CC approach road near Tulasi Kalyana Mandapam and constructed a safety speed breaker at the village entry point.',
  },
  '2021-34': {
    isoDate: '2021-09-02',
    dateLabel: 'Sep 2, 2021',
    category: 'culture',
    enTitle: 'Maridi Mahalakshmi Festival & Digital Donor Ledger',
    enSummary:
      'Utsava Committee thanked all festival donors and published complete donor and expenditure records on a public digital display board.',
  },
  '2021-35': {
    isoDate: '2021-09-18',
    dateLabel: 'Sep 18, 2021',
    category: 'culture',
    enTitle: '9-Day Vinayaka Chavithi & Grand Anupu Procession',
    enSummary:
      'Revived the traditional 9-day Ganesh observance at Ramalayam culminating in a village-wide Anupu procession.',
  },
  '2021-36': {
    isoDate: '2021-10-02',
    dateLabel: 'Oct 2, 2021',
    category: 'environment',
    enTitle: 'Gandhi Jayanti Shramadan: Tree Plantation & Temple Roadside Cleanup',
    enSummary:
      'Following tributes to Mahatma Gandhi, Abhyudaya Sangham and volunteers planted trees at Tulasi Kalyana Mandapam and cleared the roadside near Anjaneya Temple.',
  },
  '2021-37': {
    isoDate: '2021-10-03',
    dateLabel: 'Oct 3, 2021',
    category: 'education',
    enTitle: 'Government School Steps & Drinking Tap Platform Built',
    enSummary:
      'Rebuilt long-dilapidated concrete stairs and a clean masonry platform around the drinking water tap inside the village government school.',
  },
  '2021-38': {
    isoDate: '2021-10-07',
    dateLabel: 'Oct 7, 2021',
    category: 'water',
    enTitle: 'Water Motor Leak Repaired near Kata',
    enSummary:
      'Fixed persistent water leakage at the community pump motor near Kata to preserve supply pressure.',
  },
  '2021-39': {
    isoDate: '2021-10-08',
    dateLabel: 'Oct 8, 2021',
    category: 'culture',
    enTitle: 'Zilla Parishad Vice Chair Visits Durga Bhavani Puja',
    enSummary:
      'Zilla Parishad Vice Chairman Beesetti Venkata Satyavati attended Durga Bhavani Navaratri prayers at the village Ramalayam.',
  },
  '2021-40': {
    isoDate: '2021-10-16',
    dateLabel: 'Oct 16, 2021',
    category: 'culture',
    enTitle: 'Dasara Navaratri Vote of Thanks & Gouri Utsav Call',
    enSummary:
      'Sarpanch thanked Bhavani devotees and villagers for successful Dasara festivities and invited unified support for Gouri Parameswara Utsavalu.',
  },
  '2021-41': {
    isoDate: '2021-11-06',
    dateLabel: 'Nov 6–8, 2021',
    category: 'education',
    enTitle: '3-Day State-Level Kabaddi Tournament Hosted in Thimmarajupeta',
    enSummary:
      'In partnership with Visakhapatnam Kabaddi Association (facilitated by Ramu Master), Panchayat, Utsava Committee, and youth clubs hosted a three-day state-level Kabaddi championship.',
    highlightMetric: 'State-Level Tournament',
    isMilestone: true,
  },
  '2021-42': {
    isoDate: '2021-11-18',
    dateLabel: 'Nov 18, 2021',
    category: 'culture',
    enTitle: 'Kartika Pournami Gouri Parameswara Procession',
    enSummary:
      'Monthly Kartika Pournami procession of Gouri Parameswara idols through all village streets with women, youth, and village elders.',
  },
  '2021-43': {
    isoDate: '2021-11-27',
    dateLabel: 'Nov 27, 2021',
    category: 'culture',
    enTitle: 'Historic 33-Day Children’s Cultural Showcase at Gouri Temple',
    enSummary:
      'For the first time in village history, Utsava Committee held 33 consecutive evenings of children’s Chidatalu & Valakalu folk performances, concluding with prizes.',
    highlightMetric: '33-Day Showcase',
  },
  '2021-44': {
    isoDate: '2021-12-05',
    dateLabel: 'Dec 5, 2021',
    category: 'environment',
    enTitle: 'Streetlights Restored from Visakha Dairy to Nalamaramma Temple',
    enSummary:
      'Repaired non-working streetlights along the entire corridor from Visakha Dairy Milk Center to Nalamaramma Talli Temple.',
  },
  '2021-45': {
    isoDate: '2021-12-07',
    dateLabel: 'Dec 7, 2021',
    category: 'health',
    enTitle: 'Primary School Hygiene Seminar & Kit Distribution',
    enSummary:
      'Creative Voluntary Organization with NACDIF-JICA conducted a good-health habits workshop at MPP Primary School and distributed masks, nail cutters, and soaps to students.',
  },
  '2021-46': {
    isoDate: '2021-12-23',
    dateLabel: 'Dec 23, 2021',
    category: 'sanitation',
    enTitle: 'Dumping Yard Cleared Near Tulasi Kalyana Mandapam',
    enSummary:
      'Cleared and hauled away accumulated waste from the dumping site beside Tulasi Kalyana Mandapam.',
  },
  '2021-47': {
    isoDate: '2022-01-02',
    dateLabel: 'Jan 2, 2022',
    category: 'health',
    enTitle: 'Village-Wide Anti-Illicit Liquor & Belt-Shop Rally',
    enSummary:
      'Panchayat council passed a formal resolution against illicit arrack and belt shops, followed by a joint awareness rally by women, youth, and Abhyudaya Sangham.',
    isMilestone: true,
  },
  '2021-48': {
    isoDate: '2022-01-07',
    dateLabel: 'Jan 7, 2022',
    category: 'culture',
    enTitle: 'School Sankranti Cultural Dress-Up, Bhogi & Rangoli',
    enSummary:
      'Primary school students celebrated traditional Bhogi bonfires, colorful muggulu rangoli, and heritage costumes alongside teachers, parents, and Panchayat leaders.',
  },
  '2021-49': {
    isoDate: '2022-01-10',
    dateLabel: 'Jan 10, 2022',
    category: 'water',
    enTitle: 'Overhead Drinking Water Tank Complete Cleaning',
    enSummary:
      'Full scrubbing and sanitization of the village overhead water storage tank ahead of Sankranti.',
  },
  '2021-50': {
    isoDate: '2022-01-12',
    dateLabel: 'Jan 12, 2022',
    category: 'sanitation',
    enTitle: 'Pre-Sankranti Village Bleaching & Mosquito Spraying',
    enSummary:
      'Applied bleaching powder and anti-mosquito spraying across every lane in the village prior to Sankranti.',
  },
  '2021-51': {
    isoDate: '2022-01-13',
    dateLabel: 'Jan 13–15, 2022',
    category: 'culture',
    enTitle: 'Sankranti Horse Races & Social Stage Plays',
    enSummary:
      'Manikanta Youth and Utsava Committee organized afternoon horse racing competitions followed by evening performances of two social plays (Asura Yagam & Antharmadhanam) on Drama Stage.',
  },
  '2021-52': {
    isoDate: '2022-01-26',
    dateLabel: 'Jan 26, 2022',
    category: 'education',
    enTitle: 'Republic Day Flag Hoisting at Grama Panchayat',
    enSummary:
      'Republic Day national flag unfurling and civic gathering at the Panchayat office.',
  },
  '2021-53': {
    isoDate: '2022-01-29',
    dateLabel: 'Jan 29, 2022',
    category: 'sanitation',
    enTitle: 'Silt & Earth Removal Across Village Drainage Channels',
    enSummary:
      'Manual desilting of mud-choked street drains across accessible stretches of the village.',
  },
  '2021-54': {
    isoDate: '2022-02-01',
    dateLabel: 'Feb 1, 2022',
    category: 'infrastructure',
    enTitle: 'New Drainage Construction Launched from Drama Stage Corner',
    enSummary:
      'Overcoming longstanding right-of-way hurdles, Sarpanch launched new CC drainage construction connecting homes from Drama Stage corner.',
  },
  '2021-55': {
    isoDate: '2022-02-07',
    dateLabel: 'Feb 7, 2022',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Feb 7, 2022',
    enSummary: 'Dated field photograph recorded in the 2021–2022 Development Diary.',
  },

  // === VOLUME II: 2022-2023 ===
  '2022-02': {
    isoDate: '2022-02-09',
    dateLabel: 'Feb 9, 2022',
    category: 'infrastructure',
    enTitle: 'One-Year Governance Anniversary Shramadan & Public Celebration',
    enSummary:
      'Marked one year in office with an 8 AM village-wide Shramadan sanitation drive and an evening public anniversary gathering at Heritage Milk Center.',
    isMilestone: true,
  },
  '2022-03': {
    isoDate: '2022-02-12',
    dateLabel: 'Feb 12, 2022',
    category: 'infrastructure',
    enTitle: 'New Concrete Drain Curing & Inspection',
    enSummary:
      'Sarpanch and council member Bhadra Rajulu personally watered and inspected the freshly laid concrete drainage line.',
  },
  '2022-04': {
    isoDate: '2022-02-13',
    dateLabel: 'Feb 13, 2022',
    category: 'infrastructure',
    enTitle: '40-Year Ward 6 Drainage Dispute Resolved & Drain Built',
    enSummary:
      'Peacefully mediated a four-decade dispute in Ward 6 to construct new drainage along Ward 6 and Ramalayam streets, with precast cover slabs planned.',
    highlightMetric: '40-Year Dispute Resolved',
    isFeatured: true,
    isMilestone: true,
    featuredImage: '/src/assets/images/featured_water_infra_1794880860588.jpg',
  },
  '2022-05': {
    isoDate: '2022-02-27',
    dateLabel: 'Feb 27, 2022',
    category: 'culture',
    enTitle: 'Shivaratri Rudrabhumi Shramadan, Annasamaradhana & Rudrabhishekam',
    enSummary:
      'Volunteers cleaned the Shiva shrine at the cremation ground, hosted afternoon community meals, and held night Rudrabhishekam prayers at Drama Stage.',
  },
  '2022-06': {
    isoDate: '2022-04-08',
    dateLabel: 'Apr 8, 2022',
    category: 'culture',
    enTitle: 'Ramalayam Cleaning for Sri Rama Navami',
    enSummary:
      'Full interior and courtyard cleaning of Sri Ramalayam ahead of Sita Rama Kalyana Mahotsavam.',
  },
  '2022-07': {
    isoDate: '2022-04-12',
    dateLabel: 'Apr 12, 2022',
    category: 'infrastructure',
    enTitle: 'Village Revenue Drone Land Survey Launched',
    enSummary:
      'Sarpanch, Vice President, VRO revenue staff, and Manikanta Youth inaugurated the official village revenue drone mapping survey.',
    highlightMetric: 'Revenue Drone Survey',
  },
  '2022-08': {
    isoDate: '2022-05-09',
    dateLabel: 'May 9, 2022',
    category: 'infrastructure',
    enTitle: 'Field Documentation — May 9, 2022',
    enSummary: 'Dated field photograph recorded in the 2022–2023 Development Diary.',
  },
  '2022-09': {
    isoDate: '2022-05-17',
    dateLabel: 'May 17, 2022',
    category: 'culture',
    enTitle: 'Anjaneya Jayanti Documentation — May 17, 2022',
    enSummary: 'Field photograph from Abhaya Anjaneya Swamy Jayanti week.',
  },
  '2022-10': {
    isoDate: '2022-05-17',
    dateLabel: 'May 17, 2022',
    category: 'culture',
    enTitle: 'Anjaneya Navaratri Kolatam Competitions',
    enSummary:
      'Traditional Kolatam folk dance competitions hosted during Abhaya Anjaneya Swamy Jayanti Navaratri with guest troupes from Paripallamma & Ava Rajam.',
  },
  '2022-11': {
    isoDate: '2022-05-20',
    dateLabel: 'May 20, 2022',
    category: 'health',
    enTitle: 'Stray Dog Control Drive with Anakapalli Municipal Team',
    enSummary:
      'Responding to multiple villager complaints about stray dogs, the Panchayat brought in specialized municipal capture staff from Anakapalli.',
  },
  '2022-12': {
    isoDate: '2022-05-22',
    dateLabel: 'May 22, 2022',
    category: 'sanitation',
    enTitle: 'SC Colony Road Sand & Debris Clearance',
    enSummary:
      'Cleared heavy sand accumulation obstructing movement along the SC Colony road.',
  },
  '2022-13': {
    isoDate: '2022-05-29',
    dateLabel: 'May 29, 2022',
    category: 'water',
    enTitle: 'New Drinking Water Pipelines Launched in Wards 2 & 8',
    enSummary:
      'Following ward-by-ward inspections with RWS JE Srinivas, Sarpanch broke ground to replace rusted pipelines from Saragadam Ramunaidu’s house to Yellapu Narsingarao’s house.',
    highlightMetric: 'Wards 2 & 8 Renewal',
    isMilestone: true,
  },
  '2022-14': {
    isoDate: '2022-06-08',
    dateLabel: 'Jun 8, 2022',
    category: 'sanitation',
    enTitle: 'Vermicompost Shed (Sampada Kendra) Cleared for Revival',
    enSummary:
      'Cleared legacy waste from the dormant wet/dry waste vermicompost shed to restart organic compost production.',
  },
  '2022-15': {
    isoDate: '2022-06-26',
    dateLabel: 'Jun 26, 2022',
    category: 'culture',
    enTitle: 'All-Party Village Meeting for Muthyamamba Temple Construction',
    enSummary:
      'Cross-party meeting at Ramalayam chaired by Utsava Committee head Bhavirisetti Ravi Kumar to plan Sri Muthyamamba Ammavari temple construction.',
  },
  '2022-16': {
    isoDate: '2022-06-28',
    dateLabel: 'Jun 28, 2022',
    category: 'education',
    enTitle: 'Amma Vodi Parent Awareness & Merit Prize Pledge + Pipeline Review',
    enSummary:
      'Addressed parents at MPP Primary School on welfare benefits and pledged merit awards for class toppers; inspected ongoing pipeline laying in Wards 2 & 3.',
  },
  '2022-17': {
    isoDate: '2022-07-02',
    dateLabel: 'Jul 2, 2022',
    category: 'infrastructure',
    enTitle: 'Grama Sabha Resolutions on Drinking Water & Sanitation',
    enSummary:
      'Afternoon Grama Sabha at Ramalayam recorded formal community resolutions on village drinking water and sanitation priorities.',
  },
  '2022-18': {
    isoDate: '2022-07-02',
    dateLabel: 'Jul 2, 2022',
    category: 'culture',
    enTitle: 'Village Women’s Kolatam Troupe Debuts at Andalapalli',
    enSummary:
      'Sarpanch inaugurated the newly trained Thimmarajupeta women’s Kolatam troupe (organized by Alamanda Sattibabu & Dadi Ramanababu), which performed 9 songs at Andalapalli.',
  },
  '2022-19': {
    isoDate: '2022-07-02',
    dateLabel: 'Jul 2, 2022',
    category: 'sanitation',
    enTitle: 'Garbage Shifted from Tulasi Kalyana Mandapam to Dump Yard',
    enSummary:
      'Sarpanch supervised clearing and hauling accumulated refuse near Tulasi Kalyana Mandapam to the designated dumping yard.',
  },
  '2022-20': {
    isoDate: '2022-07-03',
    dateLabel: 'Jul 3, 2022',
    category: 'infrastructure',
    enTitle: 'Rapid JCB Clearance of Pedapadu Approach Road',
    enSummary:
      'After 100 youths from Pedapadu, Kajipalem, and Jaggampeta reported overgrown bamboo thickets blocking the road, Sarpanch immediately deployed a JCB to clear the passage.',
  },
  '2022-21': {
    isoDate: '2022-07-05',
    dateLabel: 'Jul 5, 2022',
    category: 'environment',
    enTitle: 'Cremation Ground Weed Clearance & Memorial Coconut Grove',
    enSummary:
      'Cleared wild brush across the Smasana Vatika; inspired by Karri Ramu & Karri Naidu planting coconut saplings in their mother’s memory, opened space for memorial plantings.',
  },
  '2022-22': {
    isoDate: '2022-07-07',
    dateLabel: 'Jul 7, 2022',
    category: 'sanitation',
    enTitle: 'Drainage Earthwork Excavation Near Village School',
    enSummary:
      'Excavated roadside silt and earth near the school to establish unobstructed storm drainage.',
  },
  '2022-23': {
    isoDate: '2022-07-15',
    dateLabel: 'Jul 15, 2022',
    category: 'water',
    enTitle: '15th Finance Drinking Water Pipeline Extension to Wards 2, 4 & 8',
    enSummary:
      'Utilized 15th Finance Commission funds to extend public water tap lines behind Ramalayam serving households across Wards 2, 4, and 8.',
    highlightMetric: '15th Finance Grant',
    isFeatured: true,
    isMilestone: true,
  },
  '2022-24': {
    isoDate: '2022-07-18',
    dateLabel: 'Jul 18, 2022',
    category: 'infrastructure',
    enTitle: 'Ward 1 Cement Concrete Drain Construction Started',
    enSummary:
      'Initiated CC drainage canal construction in Ward 1 from Boddeda Raja Rao’s house to Saragadam Yellayyamma’s house.',
  },
  '2022-25': {
    isoDate: '2022-08-15',
    dateLabel: 'Aug 15, 2022',
    category: 'education',
    enTitle: '75th Independence Day Celebrations at MPP School & Panchayat',
    enSummary:
      'Flag hoisting at both MPP School (featuring children dressed as freedom fighters) and Grama Panchayat with youth clubs and village elders.',
  },
  '2022-26': {
    isoDate: '2022-08-16',
    dateLabel: 'Aug 16, 2022',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Aug 16, 2022',
    enSummary: 'Dated field photograph recorded in the 2022–2023 Development Diary.',
  },
  '2022-27': {
    isoDate: '2022-08-19',
    dateLabel: 'Aug 19, 2022',
    category: 'culture',
    enTitle: 'Durgambika Sangham Donates Floral Hairpieces to 40 Kolatam Dancers',
    enSummary:
      'Durgambika Sangham donated 40 traditional floral hair garlands to every member of the village women’s Kolatam troupe.',
  },
  '2022-28': {
    isoDate: '2022-08-26',
    dateLabel: 'Aug 26, 2022',
    category: 'education',
    enTitle: 'Maridi Talli Festival & Top 3 Class X Government School Scholars Honored',
    enSummary:
      'Manikanta Rural Development Society (with Vegi Balasubrahmanyam & Srilakshmi) felicitated Class 10 toppers Pilla Devaki, Aleti Kusumanjali Devi, and Bondala Drakshayani from the government school.',
    highlightMetric: 'Top 3 SSC Scholars',
  },
  '2022-29': {
    isoDate: '2022-08-30',
    dateLabel: 'Aug 30, 2022',
    category: 'infrastructure',
    enTitle: 'Precast Cement Slabs Installed Over Visakha Milk Center Road Drain',
    enSummary:
      'Placed new concrete cover slabs over open drains near Beesetti Apparao’s house and replaced broken slabs near Seeram Kamaraju’s house.',
  },
  '2022-30': {
    isoDate: '2022-09-05',
    dateLabel: 'Sep 5, 2022',
    category: 'culture',
    enTitle: '40-Member Sri Gouri Durga Bhavani Kolatam Troupe at Anupu',
    enSummary:
      'In just 60 days of training, 40 women and children mastered 20 songs to perform in matching uniforms during the Vinayaka Anupu Mahotsavam.',
    highlightMetric: '40 Performers · 20 Songs',
  },
  '2022-31': {
    isoDate: '2022-09-16',
    dateLabel: 'Sep 16, 2022',
    category: 'culture',
    enTitle: 'Muthyalamma Temple Stripped, Repainted & Idols Restored',
    enSummary:
      'Scraped decades of old whitewash from Muthyalamma Temple, applied fresh weatherproof paint, and repainted the sacred idols.',
  },
  '2022-32': {
    isoDate: '2022-09-20',
    dateLabel: 'Sep 20, 2022',
    category: 'infrastructure',
    enTitle: 'Ward 2 Stone Clearance & Full Streetlight Repair',
    enSummary:
      'Cleared excavated stones left from Ward 2 pipeline trenches and Kalyana Mandapam by tractor, and repaired all street lamps village-wide.',
  },
  '2022-33': {
    isoDate: '2022-09-21',
    dateLabel: 'Sep 21, 2022',
    category: 'culture',
    enTitle: 'Traditional Uyyala Kambalu Ceremony Revived',
    enSummary:
      'Revived the ancestral Uyyala Kambalu swing ritual ahead of the biennial Muthyalamma Ammavari festival.',
  },
  '2022-34': {
    isoDate: '2022-09-22',
    dateLabel: 'Sep 22, 2022',
    category: 'culture',
    enTitle: 'Biennial Sri Muthyalamma Grand Festival & Dance Attack 2022',
    enSummary:
      'Celebrated the once-in-two-years Muthyalamma festival with illuminated processions, Nela Veshalu, Durga Bhavani Kolatam, elephant procession, dappu drums, and cultural night.',
  },
  '2022-35': {
    isoDate: '2022-09-29',
    dateLabel: 'Sep 29, 2022',
    category: 'sanitation',
    enTitle: 'MPP School Drain Slabs & Earthworms Released at Sampada Kendra',
    enSummary:
      'Installed bridge slabs over the main road drain near MPP School, cleared brush around the waste center, and released composting earthworms with Atchutapuram EORD.',
    highlightMetric: 'Vermicompost Active',
    isMilestone: true,
  },
  '2022-36': {
    isoDate: '2022-10-08',
    dateLabel: 'Oct 8, 2022',
    category: 'culture',
    enTitle: 'Dasara Navaratri Bhavani Sangham Acknowledgments',
    enSummary:
      'Bhavani Sangham thanked idol donor Karri Gangu Naidu family, meal sponsors, Utsava Committee, and Panchayat leadership for a harmonious Navaratri.',
  },
  '2022-37': {
    isoDate: '2022-10-10',
    dateLabel: 'Oct 10, 2022',
    category: 'culture',
    enTitle: 'Gairamma Pournami Gouri Parameswara Procession',
    enSummary:
      'Evening 8 PM idol procession through all village streets marking Gairamma Pournami.',
  },
  '2022-38': {
    isoDate: '2022-10-20',
    dateLabel: 'Oct 20, 2022',
    category: 'water',
    enTitle: 'Water Tank Cleaning & Overhead Power Line Branch Trimming',
    enSummary:
      'Cleaned the village drinking water tank and trimmed tree branches encroaching on overhead electrical wires.',
  },
  '2022-39': {
    isoDate: '2022-10-23',
    dateLabel: 'Oct 23, 2022',
    category: 'environment',
    enTitle: 'Pre-Diwali Complete Streetlight Repair',
    enSummary:
      'Restored all non-functioning streetlights across the village ahead of Diwali celebrations.',
  },
  '2022-40': {
    isoDate: '2022-10-24',
    dateLabel: 'Oct 24, 2022',
    category: 'culture',
    enTitle: 'Kartika Masam Lamp-Lighting Channel Built at Anjaneya Temple',
    enSummary:
      'Constructed a safe masonry channel (Saitara Kalava) at Abhaya Anjaneya Temple so women could light Kartika lamps throughout the holy month.',
  },
  '2022-41': {
    isoDate: '2022-10-28',
    dateLabel: 'Oct 28, 2022',
    category: 'sanitation',
    enTitle: 'Rudrabhumi Shiva Courtyard Complete Cleanup',
    enSummary:
      'Cleaned and tidied the entire Rudrabhumi Shiva shrine courtyard.',
  },
  '2022-42': {
    isoDate: '2022-10-30',
    dateLabel: 'Oct 30, 2022',
    category: 'culture',
    enTitle: 'Nagula Chavithi Bleaching & Women’s Kolatam / Men’s Folk Satire',
    enSummary:
      'Sanitized streets with bleaching powder and hosted Nagula Chavithi cultural performances (women’s Kolatam and men’s Valakalu comedy) at Gouri Parameswara Temple.',
  },
  '2022-43': {
    isoDate: '2022-11-11',
    dateLabel: 'Nov 11, 2022',
    category: 'culture',
    enTitle: 'Folk Artists Honored with Prizes at Gouri Parameswara Temple',
    enSummary:
      'Felicitated Valakalu and Chidatalu folk performers with donor-sponsored prizes at Gouri Parameswara Temple.',
  },
  '2022-44': {
    isoDate: '2022-11-06',
    dateLabel: 'Nov 6, 2022',
    category: 'culture',
    enTitle: 'Muthyalamma Festival Accounts Published on Digital Board',
    enSummary:
      'All donor names and festival expenditures for Sri Muthyalamma Ammavari festival published transparently on the digital board.',
  },
  '2022-45': {
    isoDate: '2022-11-14',
    dateLabel: 'Nov 14, 2022',
    category: 'culture',
    enTitle: 'Gouri Parameswara Anupu Float Procession',
    enSummary:
      'Saturday night ceremonial procession featuring decorated carts and children and elders in mythological attire.',
  },
  '2022-46': {
    isoDate: '2022-11-15',
    dateLabel: 'Nov 15, 2022',
    category: 'sanitation',
    enTitle: '3-Day Village-Wide Drain Desilting Campaign',
    enSummary:
      'Executed a continuous three-day campaign removing accumulated silt from every drainage channel across the village.',
  },
  '2022-47': {
    isoDate: '2022-11-17',
    dateLabel: 'Nov 17, 2022',
    category: 'environment',
    enTitle: 'Biodiversity Drive: 2,000 Saplings Distributed to Households',
    enSummary:
      'With Biodiversity department support, planted trees at Rudrabhumi and distributed 2,000 saplings to villagers at the Panchayat office.',
    highlightMetric: '2,000 Saplings',
    isMilestone: true,
  },
  '2022-48': {
    isoDate: '2022-11-26',
    dateLabel: 'Nov 26, 2022',
    category: 'infrastructure',
    enTitle: 'Panchayat Rear Yard Cleared & Gravelled',
    enSummary:
      'Removed accumulated debris behind the Grama Panchayat office and laid fresh gravel surfacing.',
  },
  '2022-49': {
    isoDate: '2022-12-10',
    dateLabel: 'Dec 10, 2022',
    category: 'water',
    enTitle: 'SC Colony Water Tank Taps Repaired',
    enSummary:
      'Replaced and repaired damaged drinking water taps at the SC Colony water tank.',
  },
  '2022-50': {
    isoDate: '2022-12-13',
    dateLabel: 'Dec 13, 2022',
    category: 'water',
    enTitle: 'Rusted Water Pipe Repairs',
    enSummary:
      'Repaired burst and corroded household water supply lines.',
  },
  '2022-51': {
    isoDate: '2022-12-14',
    dateLabel: 'Dec 14, 2022',
    category: 'water',
    enTitle: 'Phased Pipeline Replacement: Peddoddu to Primary School Line',
    enSummary:
      'Began systematic replacement of village-wide corroded pipes starting with the main segment from Peddoddu to MPP Primary School.',
  },
  '2022-52': {
    isoDate: '2022-12-15',
    dateLabel: 'Dec 15, 2022',
    category: 'sanitation',
    enTitle: 'Accumulated Garbage Heap Cleared',
    enSummary:
      'Cleared and disposed of accumulated village waste piles.',
  },
  '2022-53': {
    isoDate: '2023-01-11',
    dateLabel: 'Jan 11, 2023',
    category: 'culture',
    enTitle: 'Bhogi Krishna Procession & Primary School Sankranti',
    enSummary:
      'Joined the Bhogi morning Krishna procession and celebrated Sankranti festivities with Primary School students.',
  },
  '2022-54': {
    isoDate: '2023-01-28',
    dateLabel: 'Jan 28, 2023',
    category: 'infrastructure',
    enTitle: 'SC Colony L-Shaped Covered Drainage Built to Ambedkar Statue',
    enSummary:
      'Fulfilling an election promise to end monsoon waterlogging in SC Colony, built an L-shaped CC drain from the Main Road to the Ambedkar Statue fitted with cover slabs.',
    highlightMetric: 'Election Pledge Fulfilled',
    isMilestone: true,
  },
  '2022-55': {
    isoDate: '2023-03-18',
    dateLabel: 'Mar 18, 2023',
    category: 'water',
    enTitle: 'Water Pipeline Repair',
    enSummary:
      'Completed scheduled repair on village drinking water supply lines.',
  },
  '2022-56': {
    isoDate: '2023-03-30',
    dateLabel: 'Mar 30, 2023',
    category: 'culture',
    enTitle: 'Sri Ramalayam Idols & Temple Fully Restored & Painted',
    enSummary:
      'Repaired aging idols and painted the entire Sri Ramalayam temple complex with modern finishes funded by generous villager donations.',
    highlightMetric: 'Temple Restoration',
    isFeatured: true,
    isMilestone: true,
    featuredImage: '/src/assets/images/featured_temple_culture_1794880866205.jpg',
  },
  '2022-57': {
    isoDate: '2023-07-16',
    dateLabel: 'Jul 16, 2023',
    category: 'culture',
    enTitle: 'Maridi Talli Temple Structural Repairs & Painting',
    enSummary:
      'Repaired weathered masonry structures and repainted Maridi Talli Ammavari temple.',
  },
  '2022-58': {
    isoDate: '2023-07-21',
    dateLabel: 'Jul 21, 2023',
    category: 'culture',
    enTitle: 'Field Documentation — Jul 21, 2023',
    enSummary: 'Dated field photograph recorded in the 2022–2023 Development Diary.',
  },
  '2022-59': {
    isoDate: '2023-08-15',
    dateLabel: 'Aug 2023',
    category: 'culture',
    enTitle: 'Maridi Talli Temple Compound Wall & Tiled Pradakshina Walkway',
    enSummary:
      'Replacing a crumbling foundation that hindered devotees, Friends Youth and villager donors built a new compound wall and tiled circumambulation path around Maridi Talli shrine.',
    highlightMetric: 'Compound Wall & Tiles',
  },
  '2022-60': {
    isoDate: '2023-10-09',
    dateLabel: 'Oct 9, 2023',
    category: 'culture',
    enTitle: 'Field Documentation — Oct 9, 2023',
    enSummary: 'Dated field photograph recorded in the 2022–2023 Development Diary.',
  },
  '2022-61': {
    isoDate: '2023-10-12',
    dateLabel: 'Oct 12, 2023',
    category: 'culture',
    enTitle: 'Field Documentation — Oct 12, 2023',
    enSummary: 'Dated field photograph recorded in the 2022–2023 Development Diary.',
  },
  '2022-62': {
    isoDate: '2023-11-09',
    dateLabel: 'Nov 9, 2023',
    category: 'culture',
    enTitle: 'Field Documentation — Nov 9, 2023',
    enSummary: 'Dated field photograph recorded in the 2022–2023 Development Diary.',
  },
  '2022-63': {
    isoDate: '2023-11-13',
    dateLabel: 'Nov 13, 2023',
    category: 'culture',
    enTitle: 'Saviteru Canal Cleaned for Kartika Masam Devotees',
    enSummary:
      'Cleared the Saviteru canal banks to provide a clean, safe waterfront space for Kartika Masam prayers.',
  },
  '2022-64': {
    isoDate: '2023-12-02',
    dateLabel: 'Dec 2, 2023',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Dec 2, 2023',
    enSummary: 'Dated field photograph recorded in the 2022–2023 Development Diary.',
  },
  '2022-65': {
    isoDate: '2023-12-12',
    dateLabel: 'Dec 12, 2023',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Dec 12, 2023',
    enSummary: 'Dated field photograph recorded in the 2022–2023 Development Diary.',
  },

  // === VOLUME III: 2024-2026 ===
  '2024-2026-01': {
    isoDate: '2024-01-12',
    dateLabel: 'Jan 12, 2024',
    category: 'culture',
    enTitle: 'Field Documentation — Jan 12, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-02': {
    isoDate: '2024-01-14',
    dateLabel: 'Jan 14, 2024',
    category: 'culture',
    enTitle: 'Field Documentation — Jan 14, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-03': {
    isoDate: '2024-03-18',
    dateLabel: 'Mar 18, 2024',
    category: 'infrastructure',
    enTitle: 'Karri Vari Street CC Road Completed',
    enSummary:
      'Constructed full Cement Concrete (CC) road surfacing across Karri Vari Street, fulfilling a key street-level pledge.',
    highlightMetric: 'CC Road Paved',
    isMilestone: true,
  },
  '2024-2026-04': {
    isoDate: '2024-03-10',
    dateLabel: 'Mar 2024',
    category: 'infrastructure',
    enTitle: 'Anjaneya Temple to Panchayat CC Road (MPP Funds)',
    enSummary:
      'Participated in laying the main approach road from Sri Anjaneya Swamy Temple to the Grama Panchayat office using MPP grant funds.',
    highlightMetric: 'MPP Grant Road',
  },
  '2024-2026-05': {
    isoDate: '2024-03-19',
    dateLabel: 'Mar 19, 2024',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Mar 19, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-06': {
    isoDate: '2024-03-21',
    dateLabel: 'Mar 21, 2024',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Mar 21, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-07': {
    isoDate: '2024-03-15',
    dateLabel: 'Mar 15, 2024',
    category: 'infrastructure',
    enTitle: 'Drainage Canal Built from Kaki Bapu Naidu House to Sachivalayam',
    enSummary:
      'Completed new drainage channel extending from Kaki Bapu Naidu’s residence to the end of the Village Secretariat (Sachivalayam).',
  },
  '2024-2026-08': {
    isoDate: '2024-04-16',
    dateLabel: 'Apr 16, 2024',
    category: 'culture',
    enTitle: 'Field Documentation — Apr 16, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-09': {
    isoDate: '2024-04-17',
    dateLabel: 'Apr 17, 2024',
    category: 'culture',
    enTitle: 'Sita Rama Kalyanam & Village-Wide Community Feast',
    enSummary:
      'During Sri Sita Rama Kalyana Mahotsavam at Ramalayam, the Sarpanch family personally sponsored noon community meals for villagers and elders.',
  },
  '2024-2026-10': {
    isoDate: '2024-04-18',
    dateLabel: 'Apr 18, 2024',
    category: 'sanitation',
    enTitle: 'Complete Village Drainage Desilting Drive',
    enSummary:
      'Conducted a focused sanitation drive clearing all street drainage channels across Thimmarajupeta.',
  },
  '2024-2026-11': {
    isoDate: '2024-04-29',
    dateLabel: 'Apr 29, 2024',
    category: 'water',
    enTitle: 'Summer Drinking Water Kiosk (Chalivendram) Opened',
    enSummary:
      'Set up a public Chalivendram water stall providing cool drinking water to commuters and villagers during peak summer heat.',
  },
  '2024-2026-12': {
    isoDate: '2024-05-03',
    dateLabel: 'May 3, 2024',
    category: 'education',
    enTitle: 'MPP Primary School Bathrooms Repaired for Students',
    enSummary:
      'Renovated and repaired toilet facilities at the village Primary School to ensure safe sanitation for children.',
  },
  '2024-2026-13': {
    isoDate: '2024-05-08',
    dateLabel: 'May 8, 2024',
    category: 'infrastructure',
    enTitle: 'Field Documentation — May 8, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-14': {
    isoDate: '2024-06-13',
    dateLabel: 'Jun 13, 2024',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jun 13, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-15': {
    isoDate: '2024-07-12',
    dateLabel: 'Jul 12, 2024',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jul 12, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-16': {
    isoDate: '2024-07-18',
    dateLabel: 'Jul 18, 2024',
    category: 'infrastructure',
    enTitle: 'Dual-Side Ramps Built Over Damaged Ward 2 Mid-Road Drain',
    enSummary:
      'Constructed concrete approach ramps on both sides of a damaged mid-road drainage crossing in Ward 2 to restore smooth commuter passage.',
  },
  '2024-2026-17': {
    isoDate: '2024-07-25',
    dateLabel: 'Jul 25, 2024',
    category: 'culture',
    enTitle: 'Pasuvula Maramma Shrine Worship',
    enSummary:
      'Annual village prayers performed for Pasuvula Maramma seeking livestock and agrarian prosperity.',
  },
  '2024-2026-18': {
    isoDate: '2024-07-26',
    dateLabel: 'Jul 26, 2024',
    category: 'water',
    enTitle: 'Main Road Drinking Water Pipeline Extended to Hospital',
    enSummary:
      'Extended the main road drinking water supply pipeline all the way up to Dr. Bhaskar Rao’s Hospital.',
  },
  '2024-2026-19': {
    isoDate: '2024-07-31',
    dateLabel: 'Jul 31, 2024',
    category: 'sanitation',
    enTitle: 'Monsoon Larvicide Spraying Along All Drains',
    enSummary:
      'Sprayed anti-mosquito larvicide along all drainage channels to curb monsoon vector breeding.',
  },
  '2024-2026-20': {
    isoDate: '2024-08-01',
    dateLabel: 'Aug 1, 2024',
    category: 'culture',
    enTitle: 'Durgamma Talli Festival & Traditional Nela Veshalu',
    enSummary:
      'Celebrated Sri Durgamma Talli festival with traditional folk arts and community participation.',
  },
  '2024-2026-21': {
    isoDate: '2024-08-15',
    dateLabel: 'Aug 15, 2024',
    category: 'education',
    enTitle: 'Independence Day Flag Hoisting & Student Planks/Books Gift',
    enSummary:
      'Sarpanch hoisted the national flag at the Panchayat and Primary School, distributing writing planks and books to all students.',
  },
  '2024-2026-22': {
    isoDate: '2024-08-29',
    dateLabel: 'Aug 29, 2024',
    category: 'sanitation',
    enTitle: 'Ward 6 Canal Cleared & Rusted Waste Carts Repaired',
    enSummary:
      'Cleared waste from the Ward 6 canal and refurbished rusted village garbage pushcarts for daily collection.',
  },
  '2024-2026-23': {
    isoDate: '2024-09-02',
    dateLabel: 'Sep 2, 2024',
    category: 'environment',
    enTitle: 'Swachh Survekshan: MLA Distributes Saplings & Eco Clay Idols',
    enSummary:
      'During Swachh Survekshan, the local MLA visited Thimmarajupeta to distribute saplings and eco-friendly clay Ganesha idols.',
  },
  '2024-2026-24': {
    isoDate: '2024-09-04',
    dateLabel: 'Sep 4, 2024',
    category: 'culture',
    enTitle: 'Field Documentation — Sep 4, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-25': {
    isoDate: '2024-09-05',
    dateLabel: 'Sep 5, 2024',
    category: 'culture',
    enTitle: 'Maridi Talli Festival Drama by Jabardasth Sattipandu',
    enSummary:
      'Cultural stage drama performed by Jabardasth Sattipandu during Sri Maridi Talli Ammavari festival.',
  },
  '2024-2026-26': {
    isoDate: '2024-09-08',
    dateLabel: 'Sep 8, 2024',
    category: 'sanitation',
    enTitle: 'Waste Clearance Near Visakha Dairy Milk Center',
    enSummary:
      'Cleared accumulated waste point near the Visakha Dairy collection center.',
  },
  '2024-2026-27': {
    isoDate: '2024-09-09',
    dateLabel: 'Sep 9, 2024',
    category: 'culture',
    enTitle: 'Vinayaka Anupu Mahotsavam',
    enSummary:
      'Village-wide ceremonial Vinayaka Anupu procession.',
  },
  '2024-2026-28': {
    isoDate: '2024-09-25',
    dateLabel: 'Sep 25, 2024',
    category: 'culture',
    enTitle: 'Muthyalamma Traditional Uyyala Swing Setup',
    enSummary:
      'Erected the traditional festive swing for Sri Muthyalamma Ammavari festival.',
  },
  '2024-2026-29': {
    isoDate: '2024-09-26',
    dateLabel: 'Sep 26, 2024',
    category: 'culture',
    enTitle: 'Muthyalamma Festival Mega Dance Show',
    enSummary:
      'Hosted an evening Mega Dance Show entertaining villagers during the Muthyalamma festival.',
  },
  '2024-2026-30': {
    isoDate: '2024-10-03',
    dateLabel: 'Oct 3, 2024',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Oct 3, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-31': {
    isoDate: '2024-10-07',
    dateLabel: 'Oct 7, 2024',
    category: 'infrastructure',
    enTitle: 'Panchayat Resolution to Restore SC Colony Stage',
    enSummary:
      'Passed formal Panchayat resolution approving complete renovation of the dilapidated SC Colony public stage.',
  },
  '2024-2026-32': {
    isoDate: '2024-10-09',
    dateLabel: 'Oct 9, 2024',
    category: 'sanitation',
    enTitle: 'Kalyana Mandapam Cleanup & Dustbin Awareness Campaign',
    enSummary:
      'Cleared waste near Kalyana Mandapam and led community awareness on using village dustbins properly.',
  },
  '2024-2026-33': {
    isoDate: '2024-10-18',
    dateLabel: 'Oct 18, 2024',
    category: 'infrastructure',
    enTitle: '₹4.5 Lakh Palle Panduga Platform Launched by MLA Vijay Kumar',
    enSummary:
      'Under Palle Panduga, MLA Sundarapu Vijay Kumar sanctioned ₹4,50,000 and broke ground for a permanent concrete platform from Rama Stage to Sri Ramalayam.',
    highlightMetric: '₹4.5 Lakh Grant',
    isFeatured: true,
    isMilestone: true,
  },
  '2024-2026-34': {
    isoDate: '2024-10-26',
    dateLabel: 'Oct 26, 2024',
    category: 'infrastructure',
    enTitle: 'Gramakantam Land Cleared & Leveled by JCB Beside Sachivalayam',
    enSummary:
      'Cleared overgrown weeds and leveled the public Gramakantam plot adjacent to the Village Secretariat using a JCB.',
  },
  '2024-2026-35': {
    isoDate: '2024-10-29',
    dateLabel: 'Oct 29, 2024',
    category: 'infrastructure',
    enTitle: 'Rama Stage to Gouri Parameswara Temple Courtyard Platform Completed',
    enSummary:
      'Completed paving the entire civic courtyard platform extending from Rama Stage to Gouri Parameswara Temple.',
    highlightMetric: 'Platform Completed',
  },
  '2024-2026-36': {
    isoDate: '2024-11-02',
    dateLabel: 'Nov 2, 2024',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Nov 2, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-37': {
    isoDate: '2024-11-06',
    dateLabel: 'Nov 6, 2024',
    category: 'education',
    enTitle: 'Bathroom Facility Built for Anganwadi Children',
    enSummary:
      'Constructed a dedicated bathroom at the Anganwadi center near Tulasi Kalyana Mandapam where young children previously lacked sanitation facilities.',
    highlightMetric: 'Anganwadi Sanitation',
  },
  '2024-2026-38': {
    isoDate: '2024-11-08',
    dateLabel: 'Nov 8, 2024',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Nov 8, 2024',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-39': {
    isoDate: '2024-11-23',
    dateLabel: 'Nov 23, 2024',
    category: 'culture',
    enTitle: 'Gouri Parameswara Anupu Mahotsavam',
    enSummary:
      'Annual ceremonial Gouri Parameswara immersion and Anupu procession.',
  },
  '2024-2026-40': {
    isoDate: '2025-01-24',
    dateLabel: 'Jan 24, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jan 24, 2025',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-41': {
    isoDate: '2025-01-26',
    dateLabel: 'Jan 26, 2025',
    category: 'education',
    enTitle: 'Republic Day 2025 Observance',
    enSummary: 'Republic Day flag hoisting field record from January 26, 2025.',
  },
  '2024-2026-42': {
    isoDate: '2025-01-28',
    dateLabel: 'Jan 28, 2025',
    category: 'sanitation',
    enTitle: 'SC Colony Roads & Drains Thoroughly Cleaned',
    enSummary:
      'Carried out deep cleaning of streets and drainage channels across SC Colony.',
  },
  '2024-2026-43': {
    isoDate: '2025-02-22',
    dateLabel: 'Feb 22, 2025',
    category: 'health',
    enTitle: 'Sarpanch Felicitated in Memory of Women’s Leader Karri Parvathamma',
    enSummary:
      'Karri Sundarayya and Karri Swamy honored Sarpanch Bhagyalakshmi Siva Bapu Naidu in memory of late women’s welfare advocate Karri Parvathamma.',
  },
  '2024-2026-44': {
    isoDate: '2025-02-26',
    dateLabel: 'Feb 26, 2025',
    category: 'culture',
    enTitle: 'Shivaratri Rudrabhumi Compound Wall Painted & Beautified',
    enSummary:
      'Cleaned Rudrabhumi for Shivaratri and, with community support, painted the entire surrounding compound wall.',
  },
  '2024-2026-45': {
    isoDate: '2025-03-13',
    dateLabel: 'Mar 13, 2025',
    category: 'infrastructure',
    enTitle: 'SC Colony Stage Modernized & Platform Grant Launched',
    enSummary:
      'Renovated and repainted the dilapidated SC Colony stage, then secured a Mandal Grant via MPP Kona Bujji to begin upgrading the adjoining platform as promised.',
    highlightMetric: 'Mandal Grant Secured',
    isMilestone: true,
  },
  '2024-2026-46': {
    isoDate: '2025-03-23',
    dateLabel: 'Mar 23, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Mar 23, 2025',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-47': {
    isoDate: '2025-04-06',
    dateLabel: 'Apr 6, 2025',
    category: 'culture',
    enTitle: 'Sri Sita Rama Kalyanam, MLA Visit & Evening Procession',
    enSummary:
      'Sarpanch and spouse hosted the ceremonial Sita Rama Kalyanam; villagers thanked the visiting MLA and joined the night street procession.',
  },
  '2024-2026-48': {
    isoDate: '2025-04-17',
    dateLabel: 'Apr 17, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Apr 17, 2025',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-49': {
    isoDate: '2025-05-10',
    dateLabel: 'May 10, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — May 10, 2025',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-50': {
    isoDate: '2025-05-29',
    dateLabel: 'May 29, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — May 29, 2025',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-51': {
    isoDate: '2025-06-21',
    dateLabel: 'Jun 21, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jun 21, 2025 (Part A)',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-52': {
    isoDate: '2025-06-21',
    dateLabel: 'Jun 21, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jun 21, 2025 (Part B)',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-53': {
    isoDate: '2025-06-28',
    dateLabel: 'Jun 28, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jun 28, 2025',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-54': {
    isoDate: '2025-07-06',
    dateLabel: 'Jul 6, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jul 6, 2025',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-55': {
    isoDate: '2025-07-23',
    dateLabel: 'Jul 23, 2025',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jul 23, 2025',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-56': {
    isoDate: '2025-08-31',
    dateLabel: 'Aug 31, 2025',
    category: 'culture',
    enTitle: 'Vinayaka Chavithi Community Feast by Manikanta Youth',
    enSummary:
      'Manikanta Youth organized a village-wide Annasamaradhana community meal for Vinayaka Chavithi.',
  },
  '2024-2026-57': {
    isoDate: '2025-09-01',
    dateLabel: 'Sep 1, 2025',
    category: 'culture',
    enTitle: 'Vinayaka Anupu Mahotsavam 2025',
    enSummary:
      'Ceremonial Ganesh Anupu procession through the village streets.',
  },
  '2024-2026-58': {
    isoDate: '2025-09-18',
    dateLabel: 'Sep 18, 2025',
    category: 'culture',
    enTitle: 'Maridi Talli Ammavari Festival 2025',
    enSummary:
      'Annual village celebrations honoring Sri Maridi Talli Ammavaru.',
  },
  '2024-2026-59': {
    isoDate: '2025-10-04',
    dateLabel: 'Oct 4, 2025',
    category: 'culture',
    enTitle: 'Dasara Ammavari Anupu Mahotsavam',
    enSummary:
      'Grand Dasara ceremonial procession concluding Navaratri observances.',
  },
  '2024-2026-60': {
    isoDate: '2025-10-17',
    dateLabel: 'Oct 17, 2025',
    category: 'culture',
    enTitle: 'Valakalu Folk Cultural Performance',
    enSummary:
      'Traditional Valakalu folk theatre performance documented in the village.',
  },
  '2024-2026-61': {
    isoDate: '2025-10-30',
    dateLabel: 'Oct 30, 2025',
    category: 'environment',
    enTitle: 'Emergency Cyclone Bund Repair on Kuli Kalava Canal',
    enSummary:
      'When cyclonic rain surges breached the Kuli Kalava irrigation canal bund, emergency repairs were immediately executed, protecting surrounding farmers’ fields.',
    highlightMetric: 'Cyclone Relief',
    isMilestone: true,
  },
  '2024-2026-62': {
    isoDate: '2026-01-16',
    dateLabel: 'Jan 16, 2026',
    category: 'health',
    enTitle: 'Sankranti Rangoli Prizes & Memorial Blankets for Elderly',
    enSummary:
      'Awarded prizes for the annual Sankranti muggulu contest alongside winter blanket distribution to elders by Suresh in memory of Saragadam Venkata Apparao.',
  },
  '2024-2026-63': {
    isoDate: '2026-01-26',
    dateLabel: 'Jan 26, 2026',
    category: 'education',
    enTitle: 'Republic Day 2026 Flag Hoisting',
    enSummary: '77th Republic Day flag unfurling and civic gathering.',
  },
  '2024-2026-64': {
    isoDate: '2026-02-15',
    dateLabel: 'Feb 15, 2026',
    category: 'culture',
    enTitle: 'Maha Shivaratri Rudrabhumi Cleanup & Children’s Cultural Night',
    enSummary:
      'Cleaned Rudrabhumi for Shivaratri worship, followed by an evening children’s cultural showcase led by Alamanda Sattibabu.',
  },
  '2024-2026-65': {
    isoDate: '2026-02-28',
    dateLabel: 'Feb 28, 2026',
    category: 'sanitation',
    enTitle: 'Full Drain Desilting from Visakha Dairy to Smasana Vatika',
    enSummary:
      'Cleared severe silt and solid waste blockage along the entire main drain running behind Visakha Dairy and Durgambika Temple to the cremation ground.',
    highlightMetric: 'Major Corridor Cleared',
  },
  '2024-2026-66': {
    isoDate: '2026-03-14',
    dateLabel: 'Mar 14, 2026',
    category: 'water',
    enTitle: 'SC Colony Open Well Restored, Platform Rebuilt & Covered',
    enSummary:
      'Pumped out stagnant unusable water from the community well near Korubilli fields & SC Colony, repaired its entire masonry apron, and installed a protective cover against debris.',
    highlightMetric: 'Well Restored & Covered',
    isMilestone: true,
  },
  '2024-2026-67': {
    isoDate: '2026-07-20',
    dateLabel: 'Jul 20, 2026',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jul 20, 2026',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-68': {
    isoDate: '2026-07-24',
    dateLabel: 'Jul 24, 2026',
    category: 'infrastructure',
    enTitle: 'Field Documentation — Jul 24, 2026',
    enSummary: 'Dated field photograph recorded in the 2024–2026 Development Diary.',
  },
  '2024-2026-69': {
    isoDate: '2026-09-10',
    dateLabel: 'Sep 10, 2026',
    category: 'culture',
    enTitle: 'Maridi Talli Ammavari Festival 2026',
    enSummary:
      'Latest recorded annual Maridi Talli Ammavari village festival entry.',
  },
};

function buildWorks(): PanchayatWork[] {
  const list: PanchayatWork[] = [];
  for (const raw of RAW_DIARY_DATA as RawDiaryEntry[]) {
    // Skip pure volume intro preambles (2021-01, 2022-01) from works timeline; volume summaries are shown in Volume Cards
    if (raw.id === '2021-01' || raw.id === '2022-01') continue;
    const meta = ENRICHMENTS[raw.id];
    if (!meta) continue;
    const year = Number(meta.isoDate.slice(0, 4));
    const isPhotoOnly = raw.teText.trim().length === 0;
    list.push({
      id: raw.id,
      volume: raw.volume,
      sourceUrl: VOLUMES[raw.volume].url,
      isoDate: meta.isoDate,
      year,
      dateLabel: meta.dateLabel,
      teDate: raw.teDate,
      category: meta.category,
      enTitle: meta.enTitle,
      enSummary: meta.enSummary,
      teText: raw.teText,
      images: raw.images,
      highlightMetric: meta.highlightMetric,
      isFeatured: meta.isFeatured,
      isMilestone: meta.isMilestone,
      isPhotoOnly,
      featuredImage: meta.featuredImage,
    });
  }
  return list.sort((a, b) => a.isoDate.localeCompare(b.isoDate));
}

export const PANCHAYAT_WORKS: PanchayatWork[] = buildWorks();
export const FEATURED_WORKS: PanchayatWork[] = PANCHAYAT_WORKS.filter((w) => w.isFeatured);
export const TOTAL_PHOTO_COUNT: number = PANCHAYAT_WORKS.reduce((acc, w) => acc + w.images.length, 0);
