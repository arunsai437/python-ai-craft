import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Globe, Cpu, BarChart3, Shield } from "lucide-react";

const TechStack = () => {
  const technologies = [
    {
      category: "Machine Learning",
      icon: <Cpu className="w-6 h-6" />,
      techs: ["Scikit-learn", "Pandas", "NumPy", "NLTK", "TensorFlow"],
      description: "Advanced ML algorithms for text classification and pattern recognition"
    },
    {
      category: "Backend Development", 
      icon: <Code2 className="w-6 h-6" />,
      techs: ["Python", "Flask", "REST API", "JWT Auth", "Gunicorn"],
      description: "Robust backend infrastructure for real-time news analysis"
    },
    {
      category: "Data Processing",
      icon: <Database className="w-6 h-6" />,
      techs: ["PostgreSQL", "Redis", "Data Pipeline", "ETL", "MongoDB"],
      description: "Efficient data storage and processing for large news datasets"
    },
    {
      category: "Frontend Interface",
      icon: <Globe className="w-6 h-6" />,
      techs: ["React", "TypeScript", "Tailwind CSS", "Vite", "Responsive Design"],
      description: "Modern, intuitive user interface for seamless interaction"
    },
    {
      category: "Analytics & Monitoring",
      icon: <BarChart3 className="w-6 h-6" />,
      techs: ["Model Metrics", "Performance Tracking", "A/B Testing", "Logging", "Alerts"],
      description: "Comprehensive monitoring and performance optimization"
    },
    {
      category: "Security & Deployment",
      icon: <Shield className="w-6 h-6" />,
      techs: ["Docker", "CI/CD", "SSL/TLS", "Rate Limiting", "Cloud Hosting"],
      description: "Secure, scalable deployment with enterprise-grade security"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-neural">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Code2 className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Technology Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge AI/ML technologies and modern development practices 
            for reliable, scalable fake news detection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-border/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {tech.icon}
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    {tech.category}
                  </CardTitle>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tech.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tech.techs.map((techName, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="outline" 
                      className="text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {techName}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-card/30 backdrop-blur border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Model Performance
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">&lt;500ms</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-glow mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Training Articles</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechStack;