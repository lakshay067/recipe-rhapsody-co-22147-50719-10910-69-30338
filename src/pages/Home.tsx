import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Plus, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-meal-planner.jpg';

const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const weekDaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mealTimes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

interface Meal {
  day: string;
  time: string;
  name: string;
}

const initialMeals: Meal[] = [
  { day: 'MONDAY', time: 'Breakfast', name: 'Coffee with toasts' },
  { day: 'MONDAY', time: 'Lunch', name: 'Pizza' },
  { day: 'MONDAY', time: 'Snack', name: 'Baby carrots with hummus' },
  { day: 'MONDAY', time: 'Dinner', name: 'Grilled chicken salad' },
];

export const Home = () => {
  const { isGuest } = useAuth();
  const [selectedDay, setSelectedDay] = useState(0);
  const [weekStart, setWeekStart] = useState(15);
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [addMealOpen, setAddMealOpen] = useState(false);
  const [changeWeekOpen, setChangeWeekOpen] = useState(false);
  const [selectedMealDay, setSelectedMealDay] = useState('');
  const [selectedMealTime, setSelectedMealTime] = useState('');
  const [mealName, setMealName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleAddMeal = () => {
    if (!mealName) {
      toast.error('Please enter a meal name');
      return;
    }
    
    const newMeal: Meal = {
      day: selectedMealDay,
      time: selectedMealTime,
      name: mealName,
    };
    
    setMeals([...meals, newMeal]);
    toast.success('Meal added successfully');
    setMealName('');
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

  const getMealsForDay = (day: string) => {
    return meals.filter(meal => meal.day === day);
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-24">
      <Header title="Meal Planner" />
      
      <main className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-7xl mx-auto">
        {/* Hero Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 h-40 sm:h-48 md:h-56 lg:h-64 animate-fade-in shadow-lg">
          <img 
            src={heroImage} 
            alt="Fresh vegetables" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 sm:p-6 md:p-8">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-1 sm:mb-2">
                Plan Your Week
              </h1>
              <p className="text-white/90 text-xs sm:text-sm md:text-base">
                {isGuest ? 'Guest Mode' : 'Welcome back!'}
              </p>
            </div>
          </div>
        </div>

        {/* Week Selector */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">This Week</h2>
          <Dialog open={changeWeekOpen} onOpenChange={setChangeWeekOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Change Week</span>
                <span className="sm:hidden">Week</span>
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

        {/* Days Tabs */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 mb-6 sm:mb-8">
          {weekDaysShort.map((day, idx) => (
            <button
              key={day}
              onClick={() => setSelectedDay(idx)}
              className={`flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 touch-manipulation ${
                idx === selectedDay 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:scale-95'
              }`}
            >
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold mb-0.5 sm:mb-1">{day}</span>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">{weekStart + idx}</span>
            </button>
          ))}
        </div>

        {/* Day Cards */}
        <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {weekDays.map((day, dayIdx) => {
            const dayMeals = getMealsForDay(day);
            
            return (
              <Card key={day} className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg animate-fade-up border-border/50 hover:shadow-xl transition-shadow">
                {/* Day Label */}
                <div className="bg-primary text-primary-foreground rounded-xl sm:rounded-2xl px-4 sm:px-6 py-1.5 sm:py-2 inline-block mb-4 sm:mb-6 font-bold text-xs sm:text-sm">
                  {day}
                </div>

                {/* Meal Sections */}
                <div className="space-y-3 sm:space-y-4">
                  {mealTimes.map((mealTime, idx) => {
                    const meal = dayMeals.find(m => m.time === mealTime);
                    
                    return (
                      <div key={mealTime}>
                        <div className="flex items-center justify-between py-2 sm:py-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground mb-1">
                              {mealTime}
                            </h3>
                            {meal ? (
                              <p className="text-sm sm:text-base text-foreground/80 truncate">{meal.name}</p>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary p-0 h-auto hover:bg-transparent"
                                onClick={() => {
                                  setSelectedMealDay(day);
                                  setSelectedMealTime(mealTime);
                                  setAddMealOpen(true);
                                }}
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                Add meal
                              </Button>
                            )}
                          </div>
                        </div>
                        {idx < mealTimes.length - 1 && (
                          <div className="border-t border-border/30" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Add Meal Dialog */}
      <Dialog open={addMealOpen} onOpenChange={setAddMealOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Meal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="meal-name">Meal Name</Label>
              <Input
                id="meal-name"
                placeholder="e.g., Grilled chicken salad"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Day</Label>
                <p className="text-sm text-foreground font-medium mt-1">{selectedMealDay}</p>
              </div>
              <div>
                <Label>Time</Label>
                <p className="text-sm text-foreground font-medium mt-1">{selectedMealTime}</p>
              </div>
            </div>
            <Button onClick={handleAddMeal} className="w-full">
              Add Meal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};
