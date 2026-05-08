// ─────────────────────────────────────────────────────────────────
//  ARGO FLY B2B — About Us page data
//  Edit ALL content here. Nothing is hard-coded in components.
// ─────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: 'About ARGO Fly B2B',
  headline: 'Power in Pricing ...\nConfidence in Execution',
  body: 'Designed for you, beyond booking, ahead of the curve',
  imageAlt: 'Commercial aircraft against blue sky',
};

export const whoWeAre = {
  eyebrow: 'Who We Are',
  headline: 'Built for the\nAviation Industry',
  paragraphs: [
    'ARGO Fly B2B is a global aviation technology company specialising in airline distribution, connectivity and booking infrastructure. We act as the critical link between airlines, low-cost carriers and the world\'s largest booking companies.',
    'Our platform processes millions of transactions every day — delivering real-time inventory, pricing intelligence and seamless booking workflows to partners in every major market.',
    'From full-service carriers to ultra-low-cost operators, ARGO Fly powers the commercial success of aviation businesses at every scale.',
  ],
};

export type ValueCard = {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
};

export const values: ValueCard[] = [
  {
    id: 'mission',
    eyebrow: 'Mission',
    headline: 'Connect Every Part of the Ecosystem',
    body: 'We exist to make aviation commerce effortless — linking airlines, carriers and booking platforms through precision-engineered connectivity.',
  },
  {
    id: 'vision',
    eyebrow: 'Vision',
    headline: 'The Backbone of Air Distribution',
    body: 'To become the single most trusted platform in global aviation distribution — the infrastructure layer every commercial aviation business relies upon.',
  },
  {
    id: 'values',
    eyebrow: 'Values',
    headline: 'Trust, Precision, Partnership',
    body: 'Every decision is guided by reliability for our partners, engineering precision in everything we build, and the belief that true success is always shared.',
  },
];

export type Stat = {
  prefix: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
};

export const stats: Stat[] = [
  { prefix: '+', value: 400,  suffix: '',  label: 'Airlines',            sublabel: 'Full-service & hybrid carriers' },
  { prefix: '+', value: 150,  suffix: '',  label: 'Low-Cost Carriers',   sublabel: 'LCC & ULCC partners worldwide'  },
  { prefix: '+', value: 1600, suffix: '',  label: 'Booking Companies',   sublabel: 'Travel agencies & OTAs'         },
  { prefix: '+', value: 2100, suffix: '',  label: 'Daily Bookings',      sublabel: 'Passenger transactions per day' },
];

export type Airline = {
  name: string;
  code: string;
};

export const airlinesRow1: Airline[] = [
  { name: 'Emirates',           code: 'EK' },
  { name: 'Lufthansa',          code: 'LH' },
  { name: 'Singapore Airlines', code: 'SQ' },
  { name: 'Qatar Airways',      code: 'QR' },
  { name: 'Turkish Airlines',   code: 'TK' },
  { name: 'British Airways',    code: 'BA' },
  { name: 'Air France',         code: 'AF' },
  { name: 'KLM',                code: 'KL' },
  { name: 'Delta Air Lines',    code: 'DL' },
  { name: 'Etihad Airways',     code: 'EY' },
];

export const airlinesRow2: Airline[] = [
  { name: 'Ryanair',    code: 'FR' },
  { name: 'easyJet',    code: 'U2' },
  { name: 'Wizz Air',   code: 'W6' },
  { name: 'IndiGo',     code: '6E' },
  { name: 'AirAsia',    code: 'AK' },
  { name: 'Vueling',    code: 'VY' },
  { name: 'flydubai',   code: 'FZ' },
  { name: 'LATAM',      code: 'LA' },
  { name: 'Norwegian',  code: 'DY' },
  { name: 'Transavia',  code: 'HV' },
];

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

export const timeline: Milestone[] = [
  {
    year: '2022',
    title: 'CAESAR ROAD was established and the Erbil branch was opened',
    body: '',
  },
  {
    year: '2023',
    title: 'We expanded by opening our second branch in Homs - Syria',
    body: '',
  },
  {
    year: '2024',
    title: 'Our third branch was opened in the UAE - Dubai, in a record time.',
    body: '',
  },
  {
    year: '2025',
    title:
      'ArgoFly Booking Platform was launched in a bold move to fulfill our unique and advanced vision in the world of flight reservations.',
    body: '',
  },
];

export const cta = {
  eyebrow: 'Company Resources',
  headline: 'Our company profile',
  body: 'Explore more about our journey, story, and achievements.',
  primaryLabel: 'Download Company Profile',
  secondaryLabel: 'Download User Guide',
  primaryHref: '/downloads/company-profile.pdf',
  secondaryHref: '/downloads/user-guide.pdf',
};

// Footer content
export type FooterColumn = {
  heading: string;
  lines: string[];
};

export type FooterContent = {
  columns: FooterColumn[];
  bottomBarLeft: string;
  bottomBarRight: string;
};

export const footer: FooterContent = {
  columns: [
    {
      heading: 'UAE',
      lines: [
        'Dubai - Al Barsha 1 Al Bidaya Building, 3rd',
        '+971 52 901 5091',
      ],
    },
    {
      heading: 'SYRIA',
      lines: [
        'Homs, - Al-Dablan Western Corniche',
        '+963 960 641 418',
      ],
    },
    {
      heading: 'ERBIL',
      lines: ['Erbil - Bakhtiari Street 20', '+964 776 094 8500'],
    },
    {
      heading: 'HOTLINE',
      lines: ['For More Information Please Contact:', '+971 52 901 5091'],
    },
  ],
  bottomBarLeft: '2026 Argo fly All rights reserved',
  bottomBarRight: 'Powered by Caesar Road',
};

// Features / benefits
export type Feature = {
  title: string;
  body: string;
  iconKey: 'intelligence' | 'flexibility' | 'coverage' | 'security' | 'analytics';
};

export const features: Feature[] = [
  {
    title: 'Technological Intelligence',
    body:
      "Argo's system integrates with over 400 airlines through GDS, NDC, and LCC channels, enabling agents to access the best fares and widest range of options within seconds.",
    iconKey: 'intelligence',
  },
  {
    title: 'Full Flexibility',
    body:
      "Whether you're a travel agent or a large enterprise, Argo provides customized interfaces, administrative permissions, and fully tailored dashboards to match the nature of your business.",
    iconKey: 'flexibility',
  },
  {
    title: 'Global Coverage',
    body:
      'The booking system is directly connected to airlines, hotels, and visa services, delivering an end-to-end travel experience - from departure to arrival - anywhere in the world.',
    iconKey: 'coverage',
  },
  {
    title: 'Security and Stability',
    body:
      'Argo is built on a robust infrastructure with top-level encryption to ensure the security of your information and the reliability of operations 24/7.',
    iconKey: 'security',
  },
  {
    title: 'Reports & Analytics',
    body:
      'An advanced dashboard allows you to track performance, bookings, sales, customers, and agents - helping you make data-driven decisions in real time.',
    iconKey: 'analytics'
  }
];

export type FeatureItem = {
  title: string;
  description: string;
  iconKey: Feature['iconKey'];
  highlight?: boolean;
};

export type FeaturesSection = {
  label?: string;
  heading: string;
  intro: string;
  items: FeatureItem[];
};

export const featuresSection: FeaturesSection = {
  label: 'WHY ARGO',
  heading: 'Built for modern travel businesses',
  intro:
    'Argo brings together powerful infrastructure and intuitive tools so travel teams can operate at global scale.',
  items: [
    {
      title: 'Technological Intelligence',
      description:
        "Argo's system integrates with over 400 airlines through GDS, NDC, and LCC channels, enabling agents to access the best fares and widest range of options within seconds.",
      iconKey: 'intelligence',
    },
    {
      title: 'Full Flexibility',
      description:
        "Whether you're a travel agent or a large enterprise, Argo provides customized interfaces, administrative permissions, and fully tailored dashboards to match the nature of your business.",
      iconKey: 'flexibility',
      highlight: true,
    },
    {
      title: 'Global Coverage',
      description:
        'The booking system is directly connected to airlines, hotels, and visa services, delivering an end-to-end travel experience - from departure to arrival - anywhere in the world.',
      iconKey: 'coverage',
    },
    {
      title: 'Security and Stability',
      description:
        'Argo is built on a robust infrastructure with top-level encryption to ensure the security of your information and the reliability of operations 24/7.',
      iconKey: 'security',
    },
    {
      title: 'Reports & Analytics',
      description:
        'An advanced dashboard allows you to track performance, bookings, sales, customers, and agents - helping you make data-driven decisions in real time.',
      iconKey: 'analytics',
    },
  ],
};

