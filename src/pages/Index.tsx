import Hero from "@/components/Hero";
import NewsAnalyzer from "@/components/NewsAnalyzer";
import ExampleArticles from "@/components/ExampleArticles";
import TechStack from "@/components/TechStack";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <NewsAnalyzer />
      <ExampleArticles />
      <TechStack />
    </div>
  );
};

export default Index;
