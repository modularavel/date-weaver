import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Search, Users, Bell, User, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import ThemeToggle from './ThemeToggle';

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
};

const Header = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const navItems: NavItem[] = [
    { label: 'Browse', path: '/', icon: <Search className="w-5 h-5" /> },
    { label: 'Messages', path: '/messages', icon: <MessageCircle className="w-5 h-5" />, badge: 11 },
    { label: 'Visitors', path: '/visitors', icon: <Users className="w-5 h-5" /> },
    { label: 'Favorites', path: '/favorites', icon: <Heart className="w-5 h-5" /> },
  ];
  
  const handleLogout = () => {
    toast.success('Logged out successfully');
    // In a real app, this would handle actual logout logic
  };
  
  return (
    <header className="sticky top-0 z-50 bg-date-primary/95 dark:bg-slate-900/95 text-white backdrop-blur-sm shadow-md animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-semibold text-xl transition-transform hover:scale-105"
          >
            <Heart className="w-6 h-6 fill-white" />
            <span>DateWeaver</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-date-accent rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          
          {/* User Menu */}
          <div className="relative flex items-center">
            <ThemeToggle />
            
            <button
              className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors ml-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="flex flex-col items-end">
                <span className="font-medium text-sm">Be Premium</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden border-2 border-white/30">
                <img
                  src="/lovable-uploads/7205855e-5f82-453b-9efb-b9cf8b67bbd3.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-slate-800 rounded-md shadow-xl z-50 animate-scale-in top-full">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => setShowDropdown(false)}
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
                <Link
                  to="/photos"
                  className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => setShowDropdown(false)}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  My Photos
                </Link>
                <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/10">
        <div className="grid grid-cols-4 gap-1 p-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 rounded-md ${
                location.pathname === item.path
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-semibold bg-date-accent rounded-full">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
