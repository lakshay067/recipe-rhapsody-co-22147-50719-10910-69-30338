import { Bell, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  showProfile?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const Header = ({ title, showNotifications = true, showProfile = true, showBackButton = false, onBackClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-14 sm:h-16 md:h-16 px-3 sm:px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 min-w-0">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBackClick}
              className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          )}
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground truncate">{title}</h1>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {showNotifications && (
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
              </Button>
            </Link>
          )}
          
          {showProfile && (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
