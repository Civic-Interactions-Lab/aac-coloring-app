import Link from "next/link";
import React from "react";

export default function Navbar() {
    return (
        <nav className="w-full flex border-b justify-between">
            <div className="font-poppins text-4xl font-semibold px-4 py-5 border-r">
                <Link href="/">AAC Coloring Book</Link>
            </div>
            <Link href="/coloring-book" className="font-inter text-xl border-l flex flex-col justify-center min-h-full px-4 hover:bg-slate-100 ">
                View All Coloring Pages
            </Link>
        </nav>
    );
}
