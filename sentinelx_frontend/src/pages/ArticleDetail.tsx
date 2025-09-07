import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark,
  FileText,
  Shield,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  Lightbulb
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '@/lib/api';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesApi.getArticle(id!),
    enabled: !!id
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Threat Intelligence': return Shield;
      case 'Architecture': return BookOpen;
      case 'Web Security': return AlertTriangle;
      case 'Cloud Security': return TrendingUp;
      case 'Incident Response': return Lightbulb;
      default: return FileText;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article?.data) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/articles')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const articleData = article.data;
  const CategoryIcon = getCategoryIcon(articleData.category);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto p-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/articles')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CategoryIcon className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">{articleData.category}</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight">{articleData.title}</h1>
            
            <p className="text-xl text-muted-foreground">{articleData.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{articleData.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(articleData.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{articleData.readTime}</span>
                </div>
              </div>
              
              <Badge className={getDifficultyColor(articleData.difficulty)}>
                {articleData.difficulty}
              </Badge>
              
              {articleData.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {articleData.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articleData.relatedArticles?.map((related) => (
              <Card key={related.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/articles/${related.id}`)}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{related.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{related.excerpt}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{related.author}</span>
                    <span>•</span>
                    <span>{related.read_time} min read</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;