import type { ThemeProviderProps } from "next-themes/dist/types";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "./themeProvider";

type ProvidersProps = {
  children: React.ReactNode;
  theme?: Omit<ThemeProviderProps, "children">;
};
export const Providers = ({ children, theme }: ProvidersProps) => {
  return <NuqsAdapter>
    <ThemeProvider {...theme}>{children}</ThemeProvider>
  </NuqsAdapter>;
};
