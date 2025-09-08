import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, AlertTriangle, Brain } from "lucide-react";

interface AnalysisResult {
  prediction: 'authentic' | 'fake';
  confidence: number;
  keyFactors: string[];
}

const NewsAnalyzer = () => {
  const [articleText, setArticleText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeArticle = async () => {
    if (!articleText.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate ML analysis
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        prediction: Math.random() > 0.5 ? 'authentic' : 'fake',
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
        keyFactors: [
          "Source credibility analysis",
          "Language pattern recognition", 
          "Fact-checking cross-reference",
          "Sentiment analysis",
          "Writing style verification"
        ]
      };
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getResultColor = () => {
    if (!result) return '';
    return result.prediction === 'authentic' ? 'success' : 'destructive';
  };

  const getResultIcon = () => {
    if (!result) return null;
    return result.prediction === 'authentic' ? 
      <CheckCircle className="w-6 h-6" /> : 
      <AlertTriangle className="w-6 h-6" />;
  };

  return (
    <section id="analyzer" className="py-20 px-6 bg-gradient-neural">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Brain className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            AI News Analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Paste any news article below and our advanced NLP system will analyze 
            it for authenticity using machine learning algorithms
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="w-5 h-5 text-primary" />
              Article Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="article" className="block text-sm font-medium text-foreground mb-2">
                News Article Text
              </label>
              <Textarea
                id="article"
                placeholder="Paste the news article you want to analyze here..."
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
                className="min-h-32 bg-background/50 border-border resize-none"
              />
            </div>

            <Button 
              onClick={analyzeArticle}
              disabled={!articleText.trim() || isAnalyzing}
              variant="ai"
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Article...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze for Fake News
                </>
              )}
            </Button>

            {result && (
              <Card className={`border-2 ${
                result.prediction === 'authentic' 
                  ? 'border-success bg-success/5' 
                  : 'border-destructive bg-destructive/5'
              }`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getResultIcon()}
                      <div>
                        <h3 className="text-xl font-bold capitalize text-foreground">
                          {result.prediction} News
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Confidence: {result.confidence}%
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={result.prediction === 'authentic' ? 'default' : 'destructive'}
                      className={result.prediction === 'authentic' 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-destructive text-destructive-foreground'
                      }
                    >
                      {result.confidence}% Confidence
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Analysis Factors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.keyFactors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsAnalyzer;