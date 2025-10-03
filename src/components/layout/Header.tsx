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
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBackClick}
              className="h-8 w-8"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <h1 className="text-lg sm:text-xl font-heading font-bold text-foreground">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {showNotifications && (
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
              </Button>
            </Link>
          )}
          
          {showProfile && (
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
