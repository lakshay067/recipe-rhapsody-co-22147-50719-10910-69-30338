import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Camera } from 'lucide-react';
import { toast } from 'sonner';

export const Profile = () => {
  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Profile" showProfile={false} />
      
      <main className="px-4 py-6 max-w-2xl mx-auto">
        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Profile Form */}
        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder="Tell us about yourself..." className="mt-1.5" />
            </div>
          </div>
        </Card>

        {/* Dietary Preferences */}
        <Card className="p-6 mb-6">
          <h3 className="font-heading font-semibold mb-4">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto'].map((pref) => (
              <Button key={pref} variant="outline" size="sm" className="rounded-full">
                {pref}
              </Button>
            ))}
          </div>
        </Card>

        <Button onClick={handleSave} className="w-full h-12">
          Save Changes
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};
