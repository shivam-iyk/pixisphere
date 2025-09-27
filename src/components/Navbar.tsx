import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Navbar() {
  return (
    <div className="sticky top-0 left-0 w-full border-b border-input px-4 z-50 bg-background/50 backdrop-blur">
      <div className="flex justify-between items-center py-2 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="" width="50" height="50" />
          <span className="font-bold text-xl tracking-tight">PixiSphere</span>
        </Link>
        <Link href="/">
          <Button variant="ghost">Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
