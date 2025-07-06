import Content from "@/components/Home/Content";
import HomeCarrousel from "@/components/Home/HomeCarrousel";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {

  return (
    <section className="flex flex-col ">
      <SpeedInsights/>
      <HomeCarrousel/>
      <Content/>
    </section>
  );
}
