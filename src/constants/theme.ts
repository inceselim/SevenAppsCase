import '@/global.css';

export const Colors = {
  light: {
    background: "#F8FAFC",
    card: "#FFFFFF",
    primary: "#6366F1",
    text: "#0F172A",
    textSecondary: "#64748B",
    border: "#E2E8F0"
  },
  dark: {
    primary: "#818CF8",
    background: "#020617",
    card: "#0F172A",
    text: "#F8FAFC",
    textSecondary: "#94A3B8",
    border: "#1E293B",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
