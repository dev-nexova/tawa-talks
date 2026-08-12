import type { Recipe } from '@/payload-types'
import './IngredientsList.css'

interface IngredientsListProps {
  ingredients: Recipe['ingredients']
  servings?: number | null
}

export default function IngredientsList({ ingredients, servings }: IngredientsListProps) {
  if (!ingredients || ingredients.length === 0) {
    return <p>No ingredients listed</p>
  }

  return (
    <div className="ingredients-list">
      {servings && (
        <div className="servings-note">
          <strong>Servings: {servings}</strong>
        </div>
      )}

      <ul className="ingredients-ul">
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.id || index} className="ingredient-item">
            <div className="ingredient-checkbox">
              <input type="checkbox" id={`ingredient-${index}`} />
              <label htmlFor={`ingredient-${index}`} />
            </div>

            <div className="ingredient-content">
              <span className="ingredient-name">{ingredient.name}</span>
              {ingredient.quantity && (
                <span className="ingredient-quantity">
                  {ingredient.quantity}
                  {ingredient.unit && <span className="ingredient-unit"> {ingredient.unit}</span>}
                </span>
              )}
              {ingredient.notes && <span className="ingredient-notes">({ingredient.notes})</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
