import { Stars } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2 font-bold">
      <Stars /> UltraStar
    </Link>
  );
};
