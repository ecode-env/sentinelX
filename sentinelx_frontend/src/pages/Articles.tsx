import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  Calendar, 
  Clock, 
  User,
  BookOpen,
  TrendingUp,
  Shield,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const articles = [
    {
      id: '1',
      title: 'Advanced Persistent Threats: Detection and Response Strategies',
      excerpt: 'Learn how to identify and respond to sophisticated cyber attacks that evade traditional security measures.',
      tags: ['APT', 'Threat Hunting', 'Incident Response'],
      category: 'Threat Intelligence',
      author: 'Sarah Chen',
      readTime: '8 min read',
      publishDate: '2024-01-15',
      featured: true,
      difficulty: 'Advanced'
    },
    {
      id: '2',
      title: 'Zero Trust Architecture: Implementation Best Practices',
      excerpt: 'A comprehensive guide to implementing Zero Trust security models in enterprise environments.',
      tags: ['Zero Trust', 'Architecture', 'Network Security'],
      category: 'Architecture',
      author: 'Michael Rodriguez',
      readTime: '12 min read',
      publishDate: '2024-01-10',
      featured: true,
      difficulty: 'Intermediate'
    },
    {
      id: '3',
      title: 'Web Application Security: Common Vulnerabilities and Fixes',
      excerpt: 'Explore the OWASP Top 10 vulnerabilities with practical examples and mitigation strategies.',
      tags: ['OWASP', 'Web Security', 'Vulnerabilities'],
      category: 'Web Security',
      author: 'Jennifer Park',
      readTime: '15 min read',
      publishDate: '2024-01-08',
      featured: false,
      difficulty: 'Beginner'
    },
    {
      id: '4',
      title: 'Cloud Security Fundamentals for AWS, Azure, and GCP',
      excerpt: 'Essential security practices for securing workloads across major cloud platforms.',
      tags: ['Cloud Security', 'AWS', 'Azure', 'GCP'],
      category: 'Cloud Security',
      author: 'David Kumar',
      readTime: '10 min read',
      publishDate: '2024-01-05',
      featured: false,
      difficulty: 'Intermediate'
    },
    {
      id: '5',
      title: 'Incident Response Playbooks: Building Effective Response Teams',
      excerpt: 'Step-by-step guide to creating and maintaining incident response procedures.',
      tags: ['Incident Response', 'Playbooks', 'Team Management'],
      category: 'Incident Response',
      author: 'Lisa Thompson',
      readTime: '11 min read',
      publishDate: '2024-01-03',
      featured: false,
      difficulty: 'Intermediate'
    },
    {
      id: '6',
      title: 'Phishing Prevention: Training Users to Recognize Social Engineering',
      excerpt: 'Effective strategies for educating employees about phishing and social engineering attacks.',
      tags: ['Phishing', 'Social Engineering', 'Training'],
      category: 'Awareness',
      author: 'Robert Johnson',
      readTime: '6 min read',
      publishDate: '2024-01-01',
      featured: false,
      difficulty: 'Beginner'
    }
  ];

  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));
  const categories = Array.from(new Set(articles.map(article => article.category)));

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredArticles = articles.filter(article => article.featured);

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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Knowledge Center</h1>
            <p className="text-muted-foreground">Expert insights and best practices in cybersecurity</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="pl-10"
            />
          </div>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && searchTerm === '' && selectedTag === 'all' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 text-primary mr-2" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => {
                const CategoryIcon = getCategoryIcon(article.category);
                return (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge className={getDifficultyColor(article.difficulty)}>
                          {article.difficulty}
                        </Badge>
                        <Badge variant="secondary">Featured</Badge>
                      </div>
                      <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                      <CardDescription className="text-base">{article.excerpt}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <Button className="w-full" asChild>
                        <Link to={`/articles/${article.id}`}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read Article
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {searchTerm || selectedTag !== 'all' ? 'Search Results' : 'All Articles'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const CategoryIcon = getCategoryIcon(article.category);
              return (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <CategoryIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{article.category}</span>
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                      </Badge>
                      {article.featured && <Badge variant="secondary">Featured</Badge>}
                    </div>
                    <CardTitle className="leading-tight">{article.title}</CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{article.author}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" size="sm" asChild>
                      <Link to={`/articles/${article.id}`}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Base Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{articles.length}</div>
                <div className="text-sm text-muted-foreground">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{featuredArticles.length}</div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2.4k</div>
                <div className="text-sm text-muted-foreground">Monthly Reads</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Articles;