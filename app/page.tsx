import Content from "@/components/home/content";
import HomeCarrousel from "@/components/home/homeCarrousel";

export default function Home() {

  const images = ["/img/bg.webp", "/img/bg.webp"]

  return (
    <section className="flex flex-col ">
      <HomeCarrousel images={images} interval={5000} />
      <Content/>
    </section>
  );
}
