import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Newspaper } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ExampleArticles = () => {
  const examples = [
    {
      title: "Authentic News Example",
      type: "authentic" as const,
      content: "Scientists at MIT have developed a new breakthrough in renewable energy storage technology. The research, published in Nature Energy journal, demonstrates a novel battery design that could increase energy density by 40% while reducing costs. The study was peer-reviewed and involved collaboration with researchers from three other universities over a two-year period.",
      source: "MIT Technology Review"
    },
    {
      title: "Suspicious Content Example", 
      type: "fake" as const,
      content: "BREAKING: Local doctors HATE this one simple trick that cures all diseases! A miracle cure discovered by a housewife in Nebraska is being SUPPRESSED by Big Pharma! Click here to learn the secret they don't want you to know. This remedy works 100% of the time and doctors are FURIOUS!",
      source: "Unknown Source"
    },
    {
      title: "Balanced Reporting Example",
      type: "authentic" as const,
      content: "The Federal Reserve announced a 0.25% interest rate adjustment following their monthly meeting. The decision, which affects lending rates nationwide, was made in response to current inflation data showing a 2.1% year-over-year increase. Financial analysts from major banks provided mixed reactions, with some citing concerns about economic growth while others praised the measured approach.",
      source: "Reuters"
    }
  ];

  const copyToAnalyzer = (content: string) => {
    // Scroll to analyzer and populate text
    const textarea = document.querySelector('#article') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = content;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
      
      toast({
        title: "Example copied!",
        description: "Article text has been added to the analyzer.",
      });
    }
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Newspaper className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Try These Examples
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test our AI detector with these sample articles to see how it identifies 
            authentic news from potential misinformation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <Card key={index} className="h-full flex flex-col bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg text-foreground">
                    {example.title}
                  </CardTitle>
                  <Badge 
                    variant={example.type === 'authentic' ? 'default' : 'destructive'}
                    className={example.type === 'authentic' 
                      ? 'bg-success/20 text-success border-success/30' 
                      : 'bg-destructive/20 text-destructive border-destructive/30'
                    }
                  >
                    {example.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Source: {example.source}
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                  {example.content}
                </p>
                <Button 
                  onClick={() => copyToAnalyzer(example.content)}
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Test This Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleArticles;