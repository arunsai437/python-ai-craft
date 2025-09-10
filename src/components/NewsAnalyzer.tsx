import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, AlertTriangle, Brain, ThumbsUp, ThumbsDown, Database } from "lucide-react";

interface AnalysisResult {
  prediction: 'authentic' | 'fake';
  confidence: number;
  keyFactors: string[];
}

interface SavedAnalysis {
  id: string;
  text: string;
  result: AnalysisResult;
  timestamp: number;
  userFeedback?: 'correct' | 'incorrect';
}

const NewsAnalyzer = () => {
  const [articleText, setArticleText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);

  // Load saved analyses from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('news-analyses');
    if (saved) {
      setSavedAnalyses(JSON.parse(saved));
    }
  }, []);

  // Save analyses to localStorage whenever savedAnalyses changes
  useEffect(() => {
    localStorage.setItem('news-analyses', JSON.stringify(savedAnalyses));
  }, [savedAnalyses]);

  const analyzeArticle = async () => {
    if (!articleText.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    // Generate unique ID for this analysis
    const analysisId = Date.now().toString();
    setCurrentAnalysisId(analysisId);
    
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
      
      // Save analysis
      const newAnalysis: SavedAnalysis = {
        id: analysisId,
        text: articleText.trim(),
        result: mockResult,
        timestamp: Date.now()
      };
      
      setSavedAnalyses(prev => [newAnalysis, ...prev]);
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const provideFeedback = (feedback: 'correct' | 'incorrect') => {
    if (!currentAnalysisId) return;
    
    setSavedAnalyses(prev => 
      prev.map(analysis => 
        analysis.id === currentAnalysisId 
          ? { ...analysis, userFeedback: feedback }
          : analysis
      )
    );
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

                  {/* Feedback Section */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="font-semibold mb-3 text-foreground">Was this analysis correct?</h4>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => provideFeedback('correct')}
                        className="flex items-center gap-2 hover:bg-success/10 hover:border-success"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Correct
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => provideFeedback('incorrect')}
                        className="flex items-center gap-2 hover:bg-destructive/10 hover:border-destructive"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Incorrect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
        
        {/* Analysis History */}
        {savedAnalyses.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Analysis History</h3>
              <Badge variant="secondary">{savedAnalyses.length}</Badge>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {savedAnalyses.map((analysis) => (
                <Card key={analysis.id} className="bg-card/30 backdrop-blur border-border/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {analysis.result.prediction === 'authentic' ? 
                            <CheckCircle className="w-4 h-4 text-success" /> : 
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                          }
                          <span className="font-semibold capitalize text-foreground">
                            {analysis.result.prediction}
                          </span>
                          <Badge 
                            variant={analysis.result.prediction === 'authentic' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {analysis.result.confidence}%
                          </Badge>
                          {analysis.userFeedback && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                analysis.userFeedback === 'correct' 
                                  ? 'text-success border-success' 
                                  : 'text-destructive border-destructive'
                              }`}
                            >
                              {analysis.userFeedback === 'correct' ? (
                                <>
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  Verified
                                </>
                              ) : (
                                <>
                                  <ThumbsDown className="w-3 h-3 mr-1" />
                                  Disputed
                                </>
                              )}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {analysis.text}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(analysis.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsAnalyzer;