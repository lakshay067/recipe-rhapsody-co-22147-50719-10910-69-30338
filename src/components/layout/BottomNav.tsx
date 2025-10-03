import { Home, BookOpen, ShoppingCart, MoreHorizontal, Compass } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/recipes', icon: BookOpen, label: 'Recipes' },
  { path: '/discover', icon: Compass, label: 'Discover' },
  { path: '/shopping', icon: ShoppingCart, label: 'Shopping' },
  { path: '/more', icon: MoreHorizontal, label: 'More' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50 safe-area-bottom shadow-lg">
      <div className="flex justify-around items-center h-16 sm:h-16 md:h-18 lg:h-20 max-w-4xl mx-auto px-1 sm:px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 py-2 gap-0.5 sm:gap-1 rounded-lg hover:scale-105",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0", isActive && "fill-primary/20")} />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium leading-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
