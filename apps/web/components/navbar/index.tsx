import { Logo } from "../logo";
import { SearchSongModal } from "../modals/searchSongModal";
import { ThemeToggle } from "../themeToggle";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-between md:justify-end gap-2">
          <SearchSongModal />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
