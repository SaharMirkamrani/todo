import Tabs from "@/components/Tabs";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div
      className={`${poppins.variable} items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-poppins)]`}
    >
      <div className="container w-[380px] shadow-md rounded-2xl">
        <Tabs />
      </div>
    </div>
  );
}
