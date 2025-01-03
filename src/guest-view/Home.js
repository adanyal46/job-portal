import Faq from "./home/Faq";
import Founder from "./home/Founder";
import Hero from "./home/Hero";
import LogoList from "./home/LogoList";
import LogoList2 from "./home/LogoList2";
import ReadMentor from "./home/ReadMentor";
import Testimonials from "./home/Tesimonials";
import WhyFuse from "./home/WhyFuse";

const Home = () => {
  return (
    <div>
      <Hero />
      <LogoList />
      <Founder />
      <WhyFuse />
      <ReadMentor />
      <Testimonials />
      <LogoList2 />
      <Faq />
    </div>
  );
};

export default Home;
