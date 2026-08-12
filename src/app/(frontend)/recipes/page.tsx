import { getAllRecipes, getAllCategories } from '@/lib/recipes'
import RecipeCard from '@/components/RecipeCard'
import './recipes.css'

interface SearchParams {
  category?: string
}

export const metadata = {
  title: 'Recipes | Tawa Talks',
  description: 'Discover delicious recipes from our collection',
}

export default async function RecipesPage({ searchParams }: { searchParams: SearchParams }) {
  const categorySlug = searchParams.category
  const recipes = await getAllRecipes({
    limit: 50,
    categorySlug: categorySlug || undefined,
    sort: 'newest',
  })
  const categories = await getAllCategories()

  return (
    <div className="recipes-container">
      <header className="recipes-header">
        <h1>Our Recipes</h1>
        <p>Discover delicious recipes from our collection</p>
      </header>

      <div className="recipes-content">
        {/* Sidebar with categories */}
        <aside className="recipes-sidebar">
          <h3>Categories</h3>
          <nav className="category-nav">
            <a href="/recipes" className={categorySlug ? '' : 'active'}>
              All Recipes
            </a>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/recipes?category=${category.slug}`}
                className={categorySlug === category.slug ? 'active' : ''}
              >
                {category.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="recipes-main">
          {recipes.length > 0 ? (
            <div className="recipes-grid">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="no-recipes">
              <p>No recipes found in this category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
