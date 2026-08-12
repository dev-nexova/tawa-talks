import Image from 'next/image'
import { getRecipeBySlug, getRelatedRecipes } from '@/lib/recipes'
import RecipeCard from '@/components/RecipeCard'
import IngredientsList from '@/components/IngredientsList'
import StepsList from '@/components/StepsList'
import '../recipes.css'
import './recipe-detail.css'
import { notFound } from 'next/navigation'

interface RecipeDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: RecipeDetailPageProps) {
  const resolvedParams = await params
  const recipe = await getRecipeBySlug(resolvedParams.slug)

  if (!recipe) {
    return {
      title: 'Recipe Not Found | Tawa Talks',
    }
  }

  return {
    title: `${recipe.title} | Tawa Talks`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
    },
  }
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const resolvedParams = await params
  const recipe = await getRecipeBySlug(resolvedParams.slug)

  if (!recipe) {
    notFound()
  }

  const categoryId = typeof recipe.category === 'object' ? recipe.category.id : 0
  const relatedRecipes = await getRelatedRecipes(recipe.id, categoryId, 4)

  return (
    <article className="recipe-detail-container">
      {/* Header */}
      <header className="recipe-hero">
        <div className="recipe-hero-content">
          <div className="recipe-breadcrumb">
            <a href="/recipes">Recipes</a>
            {typeof recipe.category === 'object' && (
              <>
                <span>/</span>
                <a href={`/recipes?category=${recipe.category.slug}`}>{recipe.category.name}</a>
              </>
            )}
          </div>

          <h1>{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>

          {/* Quick Info */}
          <div className="recipe-quick-info">
            {recipe.prepTime && (
              <div className="info-item">
                <span className="label">Prep</span>
                <span className="value">{recipe.prepTime} min</span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="info-item">
                <span className="label">Cook</span>
                <span className="value">{recipe.cookTime} min</span>
              </div>
            )}
            {recipe.totalTime && (
              <div className="info-item">
                <span className="label">Total</span>
                <span className="value">{recipe.totalTime} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="info-item">
                <span className="label">Servings</span>
                <span className="value">{recipe.servings}</span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="info-item">
                <span className="label">Difficulty</span>
                <span className="value difficulty">{recipe.difficulty}</span>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {typeof recipe.featuredImage === 'object' && (
          <div className="recipe-hero-image">
            <img
              src={recipe.featuredImage.url || ''}
              alt={recipe.featuredImage.alt || recipe.title}
              width={600}
              height={400}
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="recipe-body">
        <div className="recipe-main-content">
          {/* Ingredients */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <section className="recipe-section">
              <h2>Ingredients</h2>
              <IngredientsList ingredients={recipe.ingredients} servings={recipe.servings} />
            </section>
          )}

          {/* Steps */}
          {recipe.steps && recipe.steps.length > 0 && (
            <section className="recipe-section">
              <h2>Instructions</h2>
              <StepsList steps={recipe.steps} />
            </section>
          )}

          {/* Notes */}
          {recipe.notes && (
            <section className="recipe-section recipe-notes">
              <h2>Notes & Tips</h2>
              <div className="notes-content">{/* Rich text rendered as HTML */}</div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="recipe-sidebar">
          {/* Nutrition Info */}
          {recipe.nutritionInfo && (
            <div className="nutrition-card">
              <h3>Nutrition per serving</h3>
              <div className="nutrition-grid">
                {recipe.nutritionInfo.calories && (
                  <div className="nutrition-item">
                    <div className="nutrition-value">{recipe.nutritionInfo.calories}</div>
                    <div className="nutrition-label">Calories</div>
                  </div>
                )}
                {recipe.nutritionInfo.protein && (
                  <div className="nutrition-item">
                    <div className="nutrition-value">{recipe.nutritionInfo.protein}g</div>
                    <div className="nutrition-label">Protein</div>
                  </div>
                )}
                {recipe.nutritionInfo.carbs && (
                  <div className="nutrition-item">
                    <div className="nutrition-value">{recipe.nutritionInfo.carbs}g</div>
                    <div className="nutrition-label">Carbs</div>
                  </div>
                )}
                {recipe.nutritionInfo.fat && (
                  <div className="nutrition-item">
                    <div className="nutrition-value">{recipe.nutritionInfo.fat}g</div>
                    <div className="nutrition-label">Fat</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* YouTube Video */}
          {recipe.youtubeUrl && (
            <div className="video-card">
              <h3>Video Recipe</h3>
              <a href={recipe.youtubeUrl} target="_blank" rel="noopener noreferrer" className="video-link">
                Watch on YouTube →
              </a>
            </div>
          )}

          {/* Recipe Details */}
          <div className="details-card">
            <h3>Details</h3>
            <dl className="details-list">
              {recipe.difficulty && (
                <>
                  <dt>Difficulty</dt>
                  <dd className="difficulty">{recipe.difficulty}</dd>
                </>
              )}
              {recipe.cuisine && (
                <>
                  <dt>Cuisine</dt>
                  <dd>{recipe.cuisine}</dd>
                </>
              )}
              {typeof recipe.category === 'object' && (
                <>
                  <dt>Category</dt>
                  <dd>{recipe.category.name}</dd>
                </>
              )}
            </dl>
          </div>
        </aside>
      </div>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="recipe-related">
          <h2>You Might Also Like</h2>
          <div className="recipes-grid">
            {relatedRecipes.map((relatedRecipe) => (
              <RecipeCard key={relatedRecipe.id} recipe={relatedRecipe} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
