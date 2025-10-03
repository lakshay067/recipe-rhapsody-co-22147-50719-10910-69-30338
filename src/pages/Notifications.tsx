import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    icon: Calendar,
    title: 'Meal Plan Reminder',
    message: "Don't forget to plan your meals for next week!",
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: 'Shopping List Ready',
    message: 'Your shopping list for this week is ready to view',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 3,
    icon: Star,
    title: 'New Recipe Added',
    message: 'Check out our new "Summer Salad" recipe!',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 4,
    icon: Bell,
    title: 'Meal Time Reminder',
    message: "It's time to prepare your lunch!",
    time: '2 days ago',
    unread: false,
  },
];

export const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-6">
      <Header 
        title="Notifications" 
        showNotifications={false} 
        showBackButton={true}
        onBackClick={() => navigate(-1)}
      />
      
      <main className="px-4 py-6 max-w-2xl mx-auto">
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification, idx) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors animate-fade-up ${
                    notification.unread ? 'border-primary/30 bg-primary/5' : ''
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.unread ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        notification.unread ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {notification.unread && (
                          <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-semibold mb-2">No Notifications</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};
