import type { IconType } from 'react-icons';

/** Navigation entry that maps to a section `id` on the page. */
export interface NavItem {
  id: string;
  label: string;
}

/** A single contact channel. Every field except `label`/`href` is optional. */
export interface ContactLink {
  label: string;
  /** Visible text, e.g. the email address itself. */
  value: string;
  href: string;
  icon: IconType;
}

/** Details shown in the Contact section. */
export interface ContactInfo {
  /** Plain email address, shown in the contact list. */
  email: string;
  /**
   * Formspree form ID (the part after /f/ in your form's endpoint, e.g. "xyzabcde").
   * Messages from the contact form are delivered to your inbox through Formspree.
   */
  formspreeId: string;
  /** WhatsApp number in international format, digits only (e.g. 256776570198). */
  whatsappNumber: string;
  location: string;
  /** What kind of work you're open to. */
  availability: string;
}

/** Everything personal lives in one object so the site can be re-used by editing one file. */
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  githubUsername: string;
  /** Portrait shown in the hero. Path relative to /public, or any URL. */
  photoUrl: string;
  /** Animated background image for the hero banner. */
  bannerUrl: string;
  resumeUrl: string;
  yearsOfExperience: number;
  contactInfo: ContactInfo;
  contacts: ContactLink[];
}

export interface Skill {
  name: string;
  icon: IconType;
  /** Optional short note shown under the name (e.g. "Strongest"). */
  note?: string;
  /** Highlights the skill as a primary strength. */
  featured?: boolean;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

/** Types of products built — shown in the About section. */
export interface Capability {
  title: string;
  description: string;
  icon: IconType;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
}

/**
 * Subset of the GitHub REST API repository object that we actually use.
 * Full schema: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
}

/** Discriminated union describing the state of an async request. */
export type FetchState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: T };
