import Tabs from "@/components/Tabs";
import { createTheme, ThemeProvider } from '@mui/material';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

export default function Home() {
  return (
    <div
      className={`${poppins.variable} items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-poppins)]`}
    >
      <ThemeProvider theme={theme}>
          <div className="container w-[380px] shadow-md rounded-2xl">
            <Tabs />
          </div>
      </ThemeProvider>

    </div>
  );
}
