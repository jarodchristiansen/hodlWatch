// Design tokens — single source of truth for Mesh UI

// Refined gold palette — premium, less "sports team" (Option A)
export const Colors = {
  primary: "#1A3E72", // Deep Navy Blue
  secondary: "#3A506B", // Muted Blue-Gray
  accent: "#D4A84B", // Refined gold (headings, primary CTAs)
  accentLight: "#F5E6B3", // Lighter gold tint for secondary highlights (stars, borders)
  accentMuted: "#C9A227", // Slightly deeper gold for hover/secondary accent
  gold: "#D4A84B", // Aligned with accent for premium accent use
  background: "#F5F7FA", // Light Gray
  midGray: "#828fab", // Mid-Gray
  cardShadow: "#E0E0E0", // Card shadow
  charcoal: "#101820", // Charcoal Black
  white: "#FFFFFC",
  black: "#000000",
  /** Inline link hover — aligned with palette (navy family), not legacy green */
  linkHover: "#3A506B",
  /** Secondary text on dark surfaces (asset cards, dashboards) */
  textMutedOnDark: "#B0B8C1",
};

/**
 * Dark-card surfaces (rgba) — use on /assets and dense data UI for consistency.
 */
export const Surfaces = {
  cardDark: "rgba(24, 26, 32, 0.98)",
  cardPanel: "rgba(30, 30, 40, 0.7)",
  cardPanelStrong: "rgba(24, 26, 32, 0.85)",
  /** Image well / ring gradient stops (slate aligned to secondary + charcoal) */
  imageWellFrom: "#23283A",
  imageWellTo: "#181C24",
};

/**
 * Chart series & semantic strokes — derived from navy/gold system; replaces ad-hoc purple/teal.
 */
export const ChartColors = {
  seriesMuted: "#6B8FC4", // second series (was #806cfe)
  seriesCool: "#5BA4B0", // teal-navy (was #00BFBF)
  seriesAlt: "#5B8FD8", // third series (was #0088FF)
  negative: "#C62828", // down / bearish (was #b30000)
  warning: "#9E8B2E", // caution / secondary trend (was #999900)
};

// Focus ring for keyboard accessibility (refined gold)
export const FocusRing = {
  color: "#D4A84B",
  width: "2px",
  offset: "2px",
  style: "solid",
};

export const Padding = {
  small: "4px",
  medium: "8px",
  large: "16px",
  xlarge: "32px",
  xxlarge: "48px",
  xxxlarge: "64px",
};

/**
 * Typography scale — use for hierarchy site-wide.
 * Exception: landing hero H1 may exceed `hero` (e.g. 3.4rem) for impact; keep body/subheads on scale.
 */
export const FontSize = {
  xsmall: "12px",
  small: "14px", // captions, labels
  medium: "16px", // body
  large: "24px", // H2
  xlarge: "32px", // H1
  xxlarge: "36px", // Large H1
  /** Section headings on light pages — between large (24) and xlarge (32) */
  pageSection: "28px",
  hero: "48px", // Hero headline baseline (hero section may go larger)
};

// Update FontFamily for professional look
export const FontFamily = {
  primary: "'Lato', 'Inter', Arial, sans-serif", // Body
  headline: "'Futura', 'Merriweather', Arial, sans-serif", // Headlines
};

export const FontWeight = {
  light: "300",
  regular: "400",
  bold: "700",
};

export const BorderRadius = {
  small: "4px",
  medium: "8px",
  large: "16px",
  xlarge: "32px",
  xxlarge: "64px",
};

export const BorderWidth = {
  small: "1px",
  medium: "2px",
  large: "4px",
  xlarge: "8px",
  xxlarge: "16px",
};

export const Opacity = {
  small: "0.25",
  medium: "0.5",
  large: "0.75",
  xlarge: "0.9",
  xxlarge: "1",
};

export const MediaQueries = {
  SM: "(min-width: 360px)",
  MD: "(min-width: 768px)",
  LG: "(min-width: 992px)",
  XL: "(min-width: 1200px)",
};

export const ChartDimensions = {
  height: 500,
  width: "100%",
};

// Elevation / shadows — consistent depth
export const Shadows = {
  card: "0 2px 8px 0 #E0E0E0",
  cardHover: "0 4px 16px 0 rgba(16, 24, 32, 0.12)",
  elevated: "0 4px 24px 0 rgba(16, 24, 32, 0.18)",
  elevatedHover: "0 8px 32px 0 rgba(16, 24, 32, 0.22)",
  focus: "0 0 0 2px #FFFFFC, 0 0 0 4px #D4A84B",
};

// Section / page rhythm — consistent spacing between sections
export const SectionSpacing = {
  compact: "32px",
  default: "48px",
  relaxed: "64px",
  loose: "80px",
  xxxlarge: "96px",
};

// Max content width for readable line length and alignment
export const ContentWidth = {
  narrow: "640px",
  default: "1200px",
  wide: "1400px",
};

// Transition timing for motion consistency
export const Transitions = {
  fast: "0.15s ease",
  default: "0.2s ease",
  slow: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};
