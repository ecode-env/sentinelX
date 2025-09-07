import axios from 'axios';

// Mock API base URL - replace with actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Types
export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ScanJob {
  job_id: string;
  target: string;
  tool: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress?: number;
  created_at: string;
  completed_at?: string;
}

export interface ScanResult {
  job_id: string;
  tool: string;
  target: string;
  status: string;
  findings: Finding[];
  summary: {
    total_findings: number;
    severity_breakdown: Record<string, number>;
    scan_duration: number;
  };
  raw_output?: string;
  created_at: string;
}

export interface Finding {
  id: string;
  title: string;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  evidence?: string;
  remediation?: string;
  references?: string[];
}

export interface SecurityTool {
  name: string;
  category: string;
  description: string;
  input_schema: {
    type: 'url' | 'file' | 'host';
    required_fields: string[];
    optional_fields?: string[];
  };
  requires_consent?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  created_at: string;
  author?: string;
  read_time?: number;
}

export interface ArticleDetail extends Article {
  body_markdown: string;
  content: string;
  category: string;
  difficulty: string;
  featured: boolean;
  publishDate: string;
  readTime: string;
  relatedArticles?: Article[];
}

// Mock data for development
export const mockTools: SecurityTool[] = [
  {
    name: 'nmap',
    category: 'Network Scanning',
    description: 'Network discovery and security auditing tool',
    input_schema: {
      type: 'host',
      required_fields: ['target'],
      optional_fields: ['ports', 'scan_type']
    },
    requires_consent: true
  },
  {
    name: 'ssl_check',
    category: 'Web Security',
    description: 'SSL/TLS certificate and configuration analysis',
    input_schema: {
      type: 'url',
      required_fields: ['target']
    }
  },
  {
    name: 'headers_audit',
    category: 'Web Security',
    description: 'HTTP security headers analysis',
    input_schema: {
      type: 'url',
      required_fields: ['target']
    }
  },
  {
    name: 'malware_scan',
    category: 'File Analysis',
    description: 'File malware detection and analysis',
    input_schema: {
      type: 'file',
      required_fields: ['file']
    }
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Understanding SSL/TLS Security',
    excerpt: 'Learn about SSL/TLS certificates, common vulnerabilities, and best practices for secure implementation.',
    tags: ['SSL', 'TLS', 'Web Security'],
    created_at: '2024-01-15T10:00:00Z',
    author: 'SentinelX Team',
    read_time: 8
  },
  {
    id: '2',
    title: 'Network Scanning Best Practices',
    excerpt: 'Comprehensive guide to ethical network scanning, tools, and methodologies for security professionals.',
    tags: ['Network Security', 'Scanning', 'Best Practices'],
    created_at: '2024-01-10T14:30:00Z',
    author: 'Security Research Team',
    read_time: 12
  },
  {
    id: '3',
    title: 'HTTP Security Headers Explained',
    excerpt: 'Deep dive into HTTP security headers and how they protect web applications from common attacks.',
    tags: ['HTTP', 'Web Security', 'Headers'],
    created_at: '2024-01-05T09:15:00Z',
    author: 'Web Security Team',
    read_time: 6
  }
];

// Mock API functions
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    // Mock login - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@sentinelx.com' && password === 'demo123') {
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('auth_token', token);
      return {
        ok: true,
        data: {
          token,
          user: { id: '1', email, name: 'Demo User', role: 'user' }
        }
      };
    }
    
    return {
      ok: false,
      error: 'Invalid credentials'
    };
  },

  register: async (email: string, password: string, name: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    // Mock registration - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('auth_token', token);
    
    return {
      ok: true,
      data: {
        token,
        user: { id: '2', email, name, role: 'user' }
      }
    };
  },

  logout: async (): Promise<ApiResponse<null>> => {
    localStorage.removeItem('auth_token');
    return { ok: true };
  }
};

export const scannerApi = {
  runScan: async (target: string, tool: string, inputType: string, consent: boolean): Promise<ApiResponse<ScanJob | ScanResult>> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock immediate result for some tools
    if (tool === 'ssl_check' || tool === 'headers_audit') {
      const mockResult: ScanResult = {
        job_id: 'job-' + Date.now(),
        tool,
        target,
        status: 'completed',
        findings: [
          {
            id: 'finding-1',
            title: 'Missing Security Header',
            severity: 'MEDIUM',
            description: 'The application is missing the X-Content-Type-Options header',
            evidence: 'HTTP response headers analysis',
            remediation: 'Add "X-Content-Type-Options: nosniff" header to prevent MIME type sniffing'
          },
          {
            id: 'finding-2',
            title: 'Weak SSL Configuration',
            severity: 'HIGH',
            description: 'TLS 1.0 is still enabled on the server',
            evidence: 'SSL/TLS configuration scan',
            remediation: 'Disable TLS 1.0 and 1.1, use only TLS 1.2 and above'
          }
        ],
        summary: {
          total_findings: 2,
          severity_breakdown: { HIGH: 1, MEDIUM: 1 },
          scan_duration: 3.2
        },
        created_at: new Date().toISOString()
      };
      
      return { ok: true, data: mockResult };
    }
    
    // Mock queued job for longer scans
    const mockJob: ScanJob = {
      job_id: 'job-' + Date.now(),
      target,
      tool,
      status: 'queued',
      created_at: new Date().toISOString()
    };
    
    return { ok: true, data: mockJob };
  },

  getJobStatus: async (jobId: string): Promise<ApiResponse<ScanJob>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      ok: true,
      data: {
        job_id: jobId,
        target: 'example.com',
        tool: 'nmap',
        status: 'running',
        progress: Math.floor(Math.random() * 100),
        created_at: new Date().toISOString()
      }
    };
  },

  getJobResults: async (jobId: string): Promise<ApiResponse<ScanResult>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockResult: ScanResult = {
      job_id: jobId,
      tool: 'nmap',
      target: 'example.com',
      status: 'completed',
      findings: [
        {
          id: 'finding-1',
          title: 'Open Port Detected',
          severity: 'INFO',
          description: 'Port 80 (HTTP) is open',
          evidence: 'Nmap scan results',
          remediation: 'Verify that this service is required and properly secured'
        },
        {
          id: 'finding-2',
          title: 'Outdated Service Version',
          severity: 'HIGH',
          description: 'Apache/2.2.15 detected - this version has known vulnerabilities',
          evidence: 'Service version detection',
          remediation: 'Update Apache to the latest stable version'
        }
      ],
      summary: {
        total_findings: 2,
        severity_breakdown: { HIGH: 1, INFO: 1 },
        scan_duration: 15.7
      },
      raw_output: 'Starting Nmap scan...\n\nPORT   STATE SERVICE VERSION\n80/tcp open  http    Apache httpd 2.2.15\n443/tcp open  ssl/http Apache httpd 2.2.15\n\nScan completed in 15.7 seconds',
      created_at: new Date().toISOString()
    };
    
    return { ok: true, data: mockResult };
  }
};

export const toolsApi = {
  getTools: async (): Promise<ApiResponse<SecurityTool[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ok: true, data: mockTools };
  }
};

export const articlesApi = {
  getArticles: async (): Promise<ApiResponse<Article[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ok: true, data: mockArticles };
  },

  getArticle: async (id: string): Promise<ApiResponse<ArticleDetail>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const article = mockArticles.find(a => a.id === id);
    if (!article) {
      return { ok: false, error: 'Article not found' };
    }
    
    const mockContent = `# ${article.title}

${article.excerpt}

## Introduction

This comprehensive guide covers the essential aspects of cybersecurity best practices. In today's digital landscape, understanding and implementing proper security measures is crucial for protecting your organization's assets.

## Key Concepts

### Security Fundamentals

- **Confidentiality**: Ensuring information is accessible only to authorized individuals
- **Integrity**: Maintaining accuracy and completeness of data
- **Availability**: Ensuring authorized users have access when needed

### Implementation Strategies

1. **Risk Assessment**: Identify potential threats and vulnerabilities
2. **Security Controls**: Implement appropriate countermeasures
3. **Monitoring**: Continuous surveillance of security posture
4. **Response**: Effective incident response procedures

## Best Practices

- Regular security audits and assessments
- Employee training and awareness programs
- Multi-factor authentication implementation
- Regular software updates and patch management

## Conclusion

Implementing these security measures will significantly improve your organization's security posture and reduce the risk of successful cyber attacks.

---

*This article is part of the SentinelX Knowledge Base. For more information, visit our documentation.*`;
    
    return {
      ok: true,
      data: {
        ...article,
        body_markdown: mockContent,
        content: mockContent,
        category: 'Web Security',
        difficulty: 'Intermediate',
        featured: false,
        publishDate: article.created_at,
        readTime: `${(article.read_time || 5)} min read`,
        relatedArticles: mockArticles.filter(a => a.id !== id).slice(0, 2)
      }
    };
  }
};