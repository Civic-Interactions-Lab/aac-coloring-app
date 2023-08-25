import Navbar from "@/components/LandingPage/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <Navbar />
            <div className="w-[1280px] mx-auto"></div>
        </main>
    );
}
