import Image from "next/image";
import { LandingPageComponent } from "@/components/landing-page";
import { div } from "framer-motion/client";
export default function Home() {
  return (
    <div>
      <LandingPageComponent />
    </div>
  );
}
