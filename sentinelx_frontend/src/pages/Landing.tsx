import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Search, 
  FileText, 
  Activity, 
  CheckCircle, 
  ArrowRight,
  Globe,
  Lock,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Vulnerability Scanning',
    description: 'Comprehensive security scans with industry-standard tools like Nmap, SSL analyzers, and custom scanners.'
  },
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Live scan progress tracking with detailed results and actionable remediation recommendations.'
  },
  {
    icon: FileText,
    title: 'Security Knowledge Base',
    description: 'Access expert articles, best practices, and the latest cybersecurity insights from our research team.'
  },
  {
    icon: Globe,
    title: 'Web Security Analysis',
    description: 'HTTP header audits, SSL/TLS configuration checks, and web application security assessments.'
  },
  {
    icon: Lock,
    title: 'File Analysis',
    description: 'Malware detection and file security analysis with detailed threat intelligence reports.'
  },
  {
    icon: Zap,
    title: 'Interactive Training',
    description: 'Security awareness games and quizzes to strengthen your team\'s cybersecurity knowledge.'
  }
];

const benefits = [
  'Professional-grade security tools',
  'Intuitive interface for all skill levels',
  'Comprehensive reporting and analytics',
  'Regular updates and new tools',
  'Expert-curated knowledge base',
  'Secure and compliant infrastructure'
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-cyber">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-2xl bg-primary/10 shadow-glow">
                <Shield className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                SentinelX
              </span>
              <br />
              <span className="text-foreground">Cybersecurity Toolkit</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional security scanning and analysis platform. Run comprehensive vulnerability assessments, 
              analyze security posture, and strengthen your digital defenses with enterprise-grade tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-cyber text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground">
              <p className="mb-2">🔒 Only scan assets you own or have written permission to test</p>
              <p>Trusted by security professionals worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Security Arsenal</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to assess, monitor, and improve your security posture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-elevated">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose SentinelX?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Built by security experts for security professionals. Our platform combines powerful 
                scanning capabilities with an intuitive interface that makes advanced security testing 
                accessible to teams of all sizes.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-xl"></div>
              <Card className="relative bg-card/80 border-primary/20 shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>Live Security Dashboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Scans</span>
                      <span className="text-primary font-mono">1,247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Critical Findings</span>
                      <span className="text-destructive font-mono">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Security Score</span>
                      <span className="text-success font-mono">94/100</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-scan rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Real-time security metrics and progress tracking
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Strengthen Your Security?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of security professionals who trust SentinelX for their cybersecurity needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6">
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial • Enterprise support available
          </p>
        </div>
      </section>
    </div>
  );
}