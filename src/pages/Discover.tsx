import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Clock, Users, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedRecipes } from '@/contexts/SavedRecipesContext';
import { useToast } from '@/hooks/use-toast';

const mockRecipes = [
  { id: 1, name: 'Grilled Chicken Salad', time: '25 min', servings: 2, image: '🥗' },
  { id: 2, name: 'Spaghetti Carbonara', time: '30 min', servings: 4, image: '🍝' },
  { id: 3, name: 'Avocado Toast', time: '10 min', servings: 1, image: '🥑' },
  { id: 4, name: 'Veggie Stir Fry', time: '20 min', servings: 3, image: '🥘' },
  { id: 5, name: 'Margherita Pizza', time: '45 min', servings: 4, image: '🍕' },
  { id: 6, name: 'Caesar Salad', time: '15 min', servings: 2, image: '🥗' },
  { id: 7, name: 'Beef Tacos', time: '35 min', servings: 4, image: '🌮' },
  { id: 8, name: 'Chocolate Cake', time: '60 min', servings: 8, image: '🍰' },
];

export const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { saveRecipe, unsaveRecipe, isRecipeSaved, createdRecipes } = useSavedRecipes();
  const { toast } = useToast();

  // Combine mock recipes with user-created recipes
  const allRecipes = [...createdRecipes, ...mockRecipes];

  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveToggle = (recipe: typeof mockRecipes[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isRecipeSaved(recipe.id)) {
      unsaveRecipe(recipe.id);
      toast({
        title: "Recipe removed",
        description: `${recipe.name} removed from your recipes`,
      });
    } else {
      saveRecipe(recipe);
      toast({
        title: "Recipe saved!",
        description: `${recipe.name} added to your recipes`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-20">
      <Header title="Discover" />
      
      <main className="px-3 sm:px-4 py-4 sm:py-6 max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-6 animate-fade-in">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Recipes Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold mb-4">
            All Recipes ({filteredRecipes.length})
          </h3>
          <div className="grid gap-4">
            {filteredRecipes.map((recipe, idx) => {
              const isSaved = isRecipeSaved(recipe.id);
              return (
                <Card 
                  key={recipe.id}
                  className="p-4 hover:shadow-lg transition-shadow animate-fade-up" 
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <Link to={`/recipe/${recipe.id}`} className="block">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center text-4xl">
                        {recipe.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{recipe.name}</h4>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {recipe.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {recipe.servings} servings
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={isSaved ? "default" : "outline"}
                        size="icon"
                        className="shrink-0"
                        onClick={(e) => handleSaveToggle(recipe, e)}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
