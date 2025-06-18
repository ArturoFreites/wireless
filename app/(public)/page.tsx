import Content from "@/components/Home/Content";
import HomeCarrousel from "@/components/Home/HomeCarrousel";

export default function Home() {

  return (
    <section className="flex flex-col ">
      <HomeCarrousel/>
      <Content/>
    </section>
  );
}
