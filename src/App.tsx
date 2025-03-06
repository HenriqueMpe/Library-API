
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BookProvider } from "./contexts/BookContext";

// paginas auth
import Login from "./pages/Login";
import Register from "./pages/Register";

// pagina protected
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import BookLoans from "./pages/BookLoans";
import ExtendLoan from "./pages/ExtendLoan";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BookProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* rota public */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* rota protected */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/book-loans" element={<BookLoans />} />
                <Route path="/extend-loan/:id" element={<ExtendLoan />} />
              </Route>
              
              {/* redireciona root pro dashboard ou login */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* 404 rota */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BookProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
