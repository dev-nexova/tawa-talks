import Link from 'next/link'
import type { Recipe } from '@/payload-types'
import './RecipeCard.css'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const categoryName = typeof recipe.category === 'object' ? recipe.category.name : 'Recipe'
  const imageUrl =
    typeof recipe.featuredImage === 'object'
      ? recipe.featuredImage.url || '/placeholder.jpg'
      : '/placeholder.jpg'
  const imageAlt =
    typeof recipe.featuredImage === 'object' ? recipe.featuredImage.alt || recipe.title : recipe.title

  return (
    <article className="recipe-card">
      <Link href={`/recipes/${recipe.slug}`} className="recipe-card-link">
        <div className="recipe-card-image">
          <img src={imageUrl} alt={imageAlt} loading="lazy" />
          {recipe.difficulty && <span className="recipe-difficulty">{recipe.difficulty}</span>}
        </div>

        <div className="recipe-card-content">
          <div className="recipe-card-category">{categoryName}</div>

          <h3 className="recipe-card-title">{recipe.title}</h3>

          <p className="recipe-card-description">{recipe.description}</p>

          <div className="recipe-card-meta">
            {recipe.prepTime && recipe.cookTime && (
              <div className="meta-item">
                <span className="icon">⏱️</span>
                <span>
                  {recipe.prepTime + recipe.cookTime} min
                </span>
              </div>
            )}
            {recipe.servings && (
              <div className="meta-item">
                <span className="icon">🍽️</span>
                <span>{recipe.servings} servings</span>
              </div>
            )}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="meta-item">
                <span className="icon">📝</span>
                <span>{recipe.ingredients.length} ingredients</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
