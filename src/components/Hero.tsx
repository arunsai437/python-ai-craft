import { Button } from "@/components/ui/button";
import heroImage from "@/assets/ai-hero-background.jpg";

const Hero = () => {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTechStack = () => {
    console.log('Scrolling to tech stack...');
    const element = document.getElementById('tech-stack');
    console.log('Tech stack element found:', element);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-neural overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-primary-glow rounded-full animate-pulse opacity-40 delay-300" />
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-primary rounded-full animate-pulse opacity-50 delay-700" />
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-primary-glow rounded-full animate-pulse opacity-70 delay-1000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-ai bg-clip-text text-transparent leading-tight">
            Fake News Detector
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed">
            Advanced NLP-powered classification system
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leverage machine learning and natural language processing to identify 
            misinformation with <span className="text-primary font-semibold">95% accuracy</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={scrollToAnalyzer}
            variant="ai"
            size="lg" 
            className="text-lg px-8 py-6"
          >
            Analyze News Article
          </Button>
          <Button 
            onClick={scrollToTechStack}
            variant="outline" 
            size="lg" 
            className="border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 text-lg px-8 py-6"
          >
            View Technology
          </Button>
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {['Python', 'Scikit-learn', 'Flask', 'NLP', 'Pandas', 'Machine Learning'].map((tech) => (
            <button 
              key={tech}
              onClick={scrollToTechStack}
              className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;