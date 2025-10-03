import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SavedRecipesProvider } from "@/contexts/SavedRecipesContext";
import { ThemeProvider } from "next-themes";

// Pages
import { Splash } from "./pages/Splash";
import { Onboarding } from "./pages/Onboarding";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Recipes } from "./pages/Recipes";
import { Discover } from "./pages/Discover";
import { RecipeDetail } from "./pages/RecipeDetail";
import { RecipeBuilder } from "./pages/RecipeBuilder";
import { Shopping } from "./pages/Shopping";
import { More } from "./pages/More";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Premium } from "./pages/Premium";
import { Notifications } from "./pages/Notifications";
import { Help } from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isGuest } = useAuth();
  
  if (!isAuthenticated && !isGuest) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
      <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
      <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
      <Route path="/recipe-builder" element={<ProtectedRoute><RecipeBuilder /></ProtectedRoute>} />
      <Route path="/shopping" element={<ProtectedRoute><Shopping /></ProtectedRoute>} />
      <Route path="/more" element={<ProtectedRoute><More /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      storageKey="meal-planner-theme"
      enableSystem={false}
      themes={[
        'light', 
        'dark', 
        'comic', 
        'comic-dark', 
        'clean-minimalist', 
        'clean-minimalist-dark',
        'cozy-rustic',
        'cozy-rustic-dark',
        'vibrant-healthy',
        'vibrant-healthy-dark',
        'gourmet-elegant',
        'gourmet-elegant-dark',
        'playful-fun',
        'playful-fun-dark'
      ]}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <SavedRecipesProvider>
              <AppRoutes />
            </SavedRecipesProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
