import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/layout/Navigation";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import ScanResults from "./pages/ScanResults";
import Tools from "./pages/Tools";
import Articles from "./pages/Articles";
import Games from "./pages/Games";
import GamePlay from "./pages/GamePlay";
import ArticleDetail from "./pages/ArticleDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="dark min-h-screen bg-background text-foreground">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navigation />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/scan"
                  element={
                    <ProtectedRoute>
                      <Scan />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tools"
                  element={
                    <ProtectedRoute>
                      <Tools />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/articles"
                  element={
                    <ProtectedRoute>
                      <Articles />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/articles/:id"
                  element={
                    <ProtectedRoute>
                      <ArticleDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games"
                  element={
                    <ProtectedRoute>
                      <Games />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/:gameId"
                  element={
                    <ProtectedRoute>
                      <GamePlay />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/scan/:jobId"
                  element={
                    <ProtectedRoute>
                      <ScanResults />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
