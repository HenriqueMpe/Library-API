
import { useState, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  BookPlus, 
  Calendar, 
  Home, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    { path: "/add-book", icon: <BookPlus size={18} />, label: "Adicionar Livro" },
    { path: "/book-loans", icon: <BookOpen size={18} />, label: "Empréstimos" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://cdn-icons-png.flaticon.com/512/3330/3330314.png"
                  alt="Logo Biblioteca"
                />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Biblioteca CMCB
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="hidden md:flex md:items-center md:ml-6">
                <span className="text-sm font-medium text-gray-700 mr-4">
                  Olá, {user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 flex z-40 md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
            
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://cdn-icons-png.flaticon.com/512/3330/3330314.png"
                    alt="Logo Biblioteca"
                  />
                  <span className="ml-2 text-xl font-semibold text-gray-900">
                    Biblioteca CMCB
                  </span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`${
                        location.pathname === item.path
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      } group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Button onClick={handleLogout} variant="ghost" className="flex items-center w-full">
                  <LogOut size={16} className="mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`${
                        location.pathname === item.path
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        {user?.role === "ADMIN" ? "Administrador" : "Usuário"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden bg-gray-50">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
