import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Activity, 
  Search, 
  Shield, 
  Globe, 
  Lock, 
  FileSearch, 
  Network, 
  Bug,
  Smartphone,
  Database
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const toolCategories = [
    {
      name: 'Network Security',
      icon: Network,
      tools: [
        {
          id: 'port-scan',
          name: 'Port Scanner',
          description: 'Comprehensive port scanning with service detection and OS fingerprinting',
          category: 'Network',
          difficulty: 'Intermediate',
          inputTypes: ['IP', 'CIDR'],
          exampleInput: '192.168.1.0/24',
          features: ['TCP/UDP scanning', 'Service detection', 'Banner grabbing']
        },
        {
          id: 'dns-enum',
          name: 'DNS Enumeration',
          description: 'Discover subdomains and DNS records for reconnaissance',
          category: 'Network',
          difficulty: 'Beginner',
          inputTypes: ['Domain'],
          exampleInput: 'example.com',
          features: ['Subdomain discovery', 'DNS record analysis', 'Zone transfers']
        },
        {
          id: 'network-map',
          name: 'Network Mapper',
          description: 'Map network topology and identify live hosts',
          category: 'Network',
          difficulty: 'Advanced',
          inputTypes: ['IP Range'],
          exampleInput: '10.0.0.0/8',
          features: ['Host discovery', 'Topology mapping', 'Route tracing']
        }
      ]
    },
    {
      name: 'Web Security',
      icon: Globe,
      tools: [
        {
          id: 'ssl-check',
          name: 'SSL/TLS Checker',
          description: 'Analyze SSL certificates and TLS configuration for security issues',
          category: 'Web',
          difficulty: 'Beginner',
          inputTypes: ['URL', 'Domain'],
          exampleInput: 'https://example.com',
          features: ['Certificate validation', 'Cipher suite analysis', 'Protocol testing']
        },
        {
          id: 'header-audit',
          name: 'Security Headers Audit',
          description: 'Check HTTP security headers and web security configurations',
          category: 'Web',
          difficulty: 'Beginner',
          inputTypes: ['URL'],
          exampleInput: 'https://example.com',
          features: ['HSTS validation', 'CSP analysis', 'XSS protection check']
        },
        {
          id: 'web-vuln',
          name: 'Web Vulnerability Scanner',
          description: 'Automated scanning for common web application vulnerabilities',
          category: 'Web',
          difficulty: 'Intermediate',
          inputTypes: ['URL'],
          exampleInput: 'https://webapp.example.com',
          features: ['SQLi detection', 'XSS scanning', 'Directory traversal']
        }
      ]
    },
    {
      name: 'Threat Intelligence',
      icon: Shield,
      tools: [
        {
          id: 'phishing-check',
          name: 'Phishing Detector',
          description: 'Detect phishing indicators in URLs and email content',
          category: 'Threat',
          difficulty: 'Beginner',
          inputTypes: ['URL', 'Email'],
          exampleInput: 'https://suspicious-site.com',
          features: ['URL reputation check', 'Brand impersonation', 'Suspicious patterns']
        },
        {
          id: 'malware-scan',
          name: 'Malware Scanner',
          description: 'Scan files and URLs for malware and malicious content',
          category: 'Threat',
          difficulty: 'Intermediate',
          inputTypes: ['File', 'URL'],
          exampleInput: 'suspicious-file.exe',
          features: ['Multi-engine scanning', 'Behavioral analysis', 'Hash checking']
        },
        {
          id: 'ioc-lookup',
          name: 'IOC Intelligence',
          description: 'Lookup indicators of compromise against threat intelligence feeds',
          category: 'Threat',
          difficulty: 'Advanced',
          inputTypes: ['IP', 'Domain', 'Hash'],
          exampleInput: '1.2.3.4',
          features: ['Threat feed integration', 'Attribution analysis', 'Historical data']
        }
      ]
    }
  ];

  const filteredTools = toolCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Activity className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Security Tools</h1>
            <p className="text-muted-foreground">Comprehensive cybersecurity toolkit for threat detection and analysis</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tools..."
            className="pl-10"
          />
        </div>

        {/* Tool Categories */}
        {filteredTools.map((category) => (
          <div key={category.name} className="space-y-4">
            <div className="flex items-center space-x-3">
              <category.icon className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">{category.name}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <Badge className={getDifficultyColor(tool.difficulty)}>
                        {tool.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Input Types */}
                    <div>
                      <p className="text-sm font-medium mb-2">Accepts:</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.inputTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Example */}
                    <div>
                      <p className="text-sm font-medium mb-1">Example:</p>
                      <code className="text-xs bg-muted p-2 rounded block">{tool.exampleInput}</code>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="text-sm font-medium mb-2">Features:</p>
                      <ul className="space-y-1">
                        {tool.features.map((feature) => (
                          <li key={feature} className="text-xs text-muted-foreground flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Link to={`/scan?tool=${tool.id}`} className="flex-1">
                        <Button className="w-full">
                          <Search className="h-4 w-4 mr-2" />
                          Run Scan
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <FileSearch className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Tool Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Total Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Scans Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tools;