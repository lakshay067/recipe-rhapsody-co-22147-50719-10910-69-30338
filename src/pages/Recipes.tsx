import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Clock, Users, BookmarkX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedRecipes } from '@/contexts/SavedRecipesContext';
import { useToast } from '@/hooks/use-toast';

export const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { savedRecipes, unsaveRecipe } = useSavedRecipes();
  const { toast } = useToast();

  // Filter saved recipes based on search query
  const filteredRecipes = savedRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnsave = (recipeId: number, recipeName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    unsaveRecipe(recipeId);
    toast({
      title: "Recipe removed",
      description: `${recipeName} removed from your recipes`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-20">
      <Header title="Recipes" />
      
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

        {/* Action Buttons */}
        <div className="mb-6">
          <Link to="/recipe-builder">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span className="text-sm font-semibold">Create Recipe</span>
            </Button>
          </Link>
        </div>

        {/* Recipes Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold mb-4">
            {searchQuery ? `Search Results (${filteredRecipes.length})` : 'Saved Recipes'}
          </h3>
          {filteredRecipes.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `No recipes found matching "${searchQuery}"` 
                  : 'No saved recipes yet. Go to Discover to save some recipes!'}
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredRecipes.map((recipe, idx) => (
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
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        onClick={(e) => handleUnsave(recipe.id, recipe.name, e)}
                      >
                        <BookmarkX className="w-4 h-4" />
                      </Button>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
