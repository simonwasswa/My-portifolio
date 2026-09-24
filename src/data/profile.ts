/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to personalise the site.
 *  All personal details, skills and experience live here.
 * ─────────────────────────────────────────────────────────────
 */
import {
  FiGithub,
  FiMail,
  FiPhone,
  FiGlobe,
  FiLayout,
  FiTv,
  FiSmartphone,
  FiDatabase,
} from 'react-icons/fi';
import { FaJava, FaWhatsapp } from 'react-icons/fa';
import { MdKeyboard } from 'react-icons/md';
import {
  SiDart,
  SiFlutter,
  SiKotlin,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVite,
  SiSolid,
  SiLit,
} from 'react-icons/si';
import { TbBolt, TbBrandReactNative } from 'react-icons/tb';
import type { Capability, Experience, NavItem, Profile, SkillGroup } from '../types';

// Your GitHub username (no @, no URL) — projects are fetched from it.
const GITHUB_USERNAME = 'simonwasswa';
const EMAIL = 'simonwasswa33@gmail.com';
// WhatsApp number in international format, digits only (no +, no spaces).
const WHATSAPP = '256776570198';

export const profile: Profile = {
  name: 'Wasswa Simon',
  title: 'Front-End Developer',
  tagline: 'I build web, TV and mobile apps that people enjoy using.',
  summary:
    "I'm a front-end developer with 5 years of experience building web apps, websites, TV apps, and mobile apps. " +
    "I'm passionate about crafting clean, functional, and delightful user interfaces, and I genuinely love this craft: " +
    'turning ideas into interactive products people enjoy using.',
  githubUsername: GITHUB_USERNAME,
  photoUrl: '/profile.jpg',
  bannerUrl: '/banner.jpg',
  // Drop your CV into /public/resume.pdf (or point this at any URL).
  resumeUrl: '/resume.pdf',
  yearsOfExperience: 5,
  // Shown in the Contact section.
  contactInfo: {
    email: EMAIL,
    // Formspree form ID: the part after /f/ in https://formspree.io/f/xgavyjqp
    formspreeId: 'xgavyjqp',
    whatsappNumber: WHATSAPP,
    location: 'Uganda (EAT, UTC+3) · open to remote work',
    availability: 'Open to full-time roles and freelance projects',
  },
  // Remove any entry you don't want to show.
  contacts: [
    { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, icon: FiMail },
    { label: 'GitHub', value: `@${GITHUB_USERNAME}`, href: `https://github.com/${GITHUB_USERNAME}`, icon: FiGithub },
    { label: 'Phone', value: '+256 731 631 882', href: 'tel:+256731631882', icon: FiPhone },
    // wa.me links open a WhatsApp chat directly (number without + or spaces)
    { label: 'WhatsApp', value: '+256 776 570 198', href: `https://wa.me/${WHATSAPP}`, icon: FaWhatsapp },
  ],
};

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const capabilities: Capability[] = [
  { title: 'Web Applications', description: 'Interactive, data-driven apps with modern frameworks.', icon: FiLayout },
  { title: 'Websites', description: 'Fast, responsive and accessible marketing & content sites.', icon: FiGlobe },
  { title: 'TV Apps', description: 'Remote-friendly, 10-foot UIs for smart TVs and set-top boxes.', icon: FiTv },
  { title: 'Mobile Apps', description: 'Cross-platform and native Android apps with smooth UX.', icon: FiSmartphone },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Frameworks',
    skills: [
      { name: 'Dart', icon: SiDart, note: 'Strongest', featured: true },
      { name: 'Flutter', icon: SiFlutter, note: 'Strongest', featured: true },
      { name: 'Kotlin', icon: SiKotlin },
      { name: 'Java', icon: FaJava },
      { name: 'React', icon: SiReact },
      { name: 'React Native', icon: TbBrandReactNative, note: 'Mobile' },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Solid.js', icon: SiSolid },
      { name: 'Lit', icon: SiLit, note: 'Web Components' },
      { name: 'Lightning JS', icon: TbBolt, note: 'TV apps' },
    ],
  },
  {
    title: 'Tooling & Styling',
    skills: [
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Vite', icon: SiVite },
    ],
  },
  {
    title: 'Other Skills',
    skills: [
      { name: 'Data Entry', icon: FiDatabase },
      { name: 'Fast, Accurate Typing', icon: MdKeyboard },
    ],
  },
];

export const experiences: Experience[] = [
  {
    role: 'Front-End Developer',
    company: 'Hyde Innovations Ltd',
    period: '5 years of experience', // TODO: e.g. "2021 - Present"
    // TODO: replace with 1–2 sentences about your role and impact.
    description:
      'Building and shipping user-facing products across web, TV and mobile, from first prototype to production release.',
    highlights: [
      'Developed cross-platform mobile apps with Flutter and native Android features in Kotlin.',
      'Built TV app interfaces optimised for remote-control navigation using Lightning JS and Lit.',
      'Delivered responsive web apps and websites with React, TypeScript, Tailwind CSS and Solid.js.',
    ],
    tech: ['Flutter', 'Dart', 'Kotlin', 'React', 'TypeScript', 'Solid.js', 'Lit', 'Lightning JS'],
  },
];
