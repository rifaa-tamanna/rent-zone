/**
 * Shared gradient CTA styling for dashboard pages.
 * Mirrors the site's primary button (Navbar / hero) so every dashboard
 * action reads as part of the existing RentZone brand:
 * copper gradient + beige #F3DFC2 label (WCAG AA in light & dark).
 */
export const dashboardPrimaryCta =
  "inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-5 py-3 text-sm font-bold text-[#F3DFC2] shadow-[0_4px_10px_rgba(166,83,46,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[image:var(--rz-btn-gradient-hover)] hover:shadow-[0_7px_18px_rgba(166,83,46,0.25)]";

/** Secondary outline action, styled after the site's ghost/outline controls. */
export const dashboardSecondaryCta =
  "inline-flex items-center justify-center gap-2 rounded-[10px] border border-border bg-transparent px-5 py-3 text-sm font-semibold text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)] hover:text-[var(--rz-heading-hover)]";
