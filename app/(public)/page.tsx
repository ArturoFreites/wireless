import Content from "@/components/Home/Content";
import HomeCarrousel from "@/components/Home/HomeCarrousel";

export default function Home() {

  const images = ["/img/bg.webp", "/img/bg1.webp"]
  const imagesMobile = ["/img/bg-mobile.webp", "/img/bg-mobile1.webp"]

  return (
    <section className="flex flex-col ">
      <HomeCarrousel imagesMobile={imagesMobile} images={images} interval={5000} />
      <Content/>
    </section>
  );
}
