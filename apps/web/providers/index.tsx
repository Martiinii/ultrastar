import type { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider } from "./themeProvider";

type ProvidersProps = {
  children: React.ReactNode;
  theme?: Omit<ThemeProviderProps, "children">;
};
export const Providers = ({ children, theme }: ProvidersProps) => {
  return <ThemeProvider {...theme}>{children}</ThemeProvider>;
};
