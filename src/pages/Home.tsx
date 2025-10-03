import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Plus, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-meal-planner.jpg';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mockMeals = [
  { day: 'Mon', meal: 'Grilled Chicken Salad', time: 'Lunch' },
  { day: 'Tue', meal: 'Spaghetti Carbonara', time: 'Dinner' },
  { day: 'Wed', meal: 'Avocado Toast', time: 'Breakfast' },
];

export const Home = () => {
  const { isAuthenticated, isGuest } = useAuth();
  const [selectedDay, setSelectedDay] = useState(0);
  const [weekStart, setWeekStart] = useState(15);
  const [meals, setMeals] = useState(mockMeals);
  const [addMealOpen, setAddMealOpen] = useState(false);
  const [changeWeekOpen, setChangeWeekOpen] = useState(false);
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleAddMeal = () => {
    if (!mealName || !mealTime) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const newMeal = {
      day: weekDays[selectedDay],
      meal: mealName,
      time: mealTime,
    };
    
    setMeals([...meals, newMeal]);
    toast.success('Meal added successfully');
    setMealName('');
    setMealTime('');
    setAddMealOpen(false);
  };

  const handleWeekChange = () => {
    if (selectedDate) {
      const day = selectedDate.getDate();
      setWeekStart(day);
      toast.success('Week changed successfully');
      setChangeWeekOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-20">
      <Header title="Meal Planner" />
      
      <main className="px-3 sm:px-4 py-4 sm:py-6 max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 h-40 sm:h-48 md:h-56 animate-fade-in">
          <img 
            src={heroImage} 
            alt="Fresh ingredients" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white mb-1">
                Plan Your Week
              </h2>
              <p className="text-white/90 text-xs sm:text-sm">
                {isGuest ? 'Guest Mode' : isAuthenticated ? 'Welcome back!' : 'Start planning meals'}
              </p>
            </div>
          </div>
        </div>

        {/* Week Selector */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold">This Week</h3>
          <Dialog open={changeWeekOpen} onOpenChange={setChangeWeekOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Change Week
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select a Week</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border mx-auto"
                />
                <Button onClick={handleWeekChange}>
                  Apply Week
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6">
          {weekDays.map((day, idx) => (
            <button
              key={day}
              onClick={() => setSelectedDay(idx)}
              className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-colors ${
                idx === selectedDay 
                  ? 'bg-primary text-white' 
                  : 'bg-card hover:bg-muted'
              }`}
            >
              <span className="text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1">{day}</span>
              <span className="text-base sm:text-lg font-semibold">{weekStart + idx}</span>
            </button>
          ))}
        </div>

        {/* Meals List */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold">Planned Meals</h3>
            <Dialog open={addMealOpen} onOpenChange={setAddMealOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Meal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Meal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="meal-name">Meal Name</Label>
                    <Input
                      id="meal-name"
                      placeholder="e.g., Grilled Chicken Salad"
                      value={mealName}
                      onChange={(e) => setMealName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meal-time">Meal Time</Label>
                    <Select value={mealTime} onValueChange={setMealTime}>
                      <SelectTrigger id="meal-time">
                        <SelectValue placeholder="Select meal time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Day</Label>
                    <p className="text-sm text-muted-foreground">{weekDays[selectedDay]}</p>
                  </div>
                  <Button onClick={handleAddMeal} className="w-full">
                    Add Meal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {meals.length > 0 ? (
            meals.map((meal, idx) => (
              <Card key={idx} className="p-4 glass-panel animate-fade-up">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {meal.day}
                      </span>
                      <span className="text-xs text-muted-foreground">{meal.time}</span>
                    </div>
                    <h4 className="font-semibold text-foreground">{meal.meal}</h4>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center glass-panel">
              <p className="text-muted-foreground">No meals planned yet</p>
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Meal
              </Button>
            </Card>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="p-4 text-center bg-primary/5 border-primary/20">
            <p className="text-2xl font-bold text-primary mb-1">{meals.length}</p>
            <p className="text-xs text-muted-foreground">Meals This Week</p>
          </Card>
          <Card className="p-4 text-center bg-secondary/5 border-secondary/20">
            <p className="text-2xl font-bold text-secondary mb-1">12</p>
            <p className="text-xs text-muted-foreground">Recipes Saved</p>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
