import { getPayload } from 'payload'
import config from '@payload-config'
import type { Recipe, Category, Media } from '@/payload-types'

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

interface GetRecipesOptions {
  limit?: number
  page?: number
  categorySlug?: string
  sort?: SortOption
}

/**
 * Fetch all published recipes with optional filtering and pagination
 */
export async function getAllRecipes({
  limit = 10,
  page = 1,
  categorySlug,
  sort = 'newest',
}: GetRecipesOptions = {}): Promise<Recipe[]> {
  try {
    const payload = await getPayload({ config: await config })

    // Build where clause
    const where: any = {
      status: {
        equals: 'published',
      },
    }

    if (categorySlug) {
      where['category.slug'] = {
        equals: categorySlug,
      }
    }

    // Determine sort order
    let sortField: string = '-createdAt'
    if (sort === 'oldest') {
      sortField = 'createdAt'
    } else if (sort === 'title-asc') {
      sortField = 'title'
    } else if (sort === 'title-desc') {
      sortField = '-title'
    }

    const result = await payload.find({
      collection: 'recipes',
      where,
      limit,
      sort: sortField,
      depth: 2,
    })

    return result.docs as Recipe[]
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

/**
 * Fetch a single published recipe by slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    if (!slug) {
      console.error('getRecipeBySlug called with empty slug')
      return null
    }

    const payload = await getPayload({ config: await config })

    const result = await payload.find({
      collection: 'recipes',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
      depth: 2,
    })

    return result.docs.length > 0 ? (result.docs[0] as Recipe) : null
  } catch (error) {
    console.error(`Error fetching recipe with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch all categories
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const payload = await getPayload({ config: await config })

    const result = await payload.find({
      collection: 'categories',
      limit: 100,
      sort: 'name',
    })

    return result.docs as Category[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Fetch recipes by category slug with pagination
 */
export async function getRecipesByCategory(
  categorySlug: string,
  { limit = 10, page = 1 }: { limit?: number; page?: number } = {},
): Promise<Recipe[]> {
  try {
    const payload = await getPayload({ config: await config })

    const result = await payload.find({
      collection: 'recipes',
      where: {
        'category.slug': {
          equals: categorySlug,
        },
        status: {
          equals: 'published',
        },
      },
      limit,
      sort: '-createdAt',
      depth: 2,
    })

    return result.docs as Recipe[]
  } catch (error) {
    console.error(`Error fetching recipes for category "${categorySlug}":`, error)
    return []
  }
}

/**
 * Fetch related recipes from the same category (excluding current recipe)
 */
export async function getRelatedRecipes(
  currentRecipeId: number,
  categoryId: number,
  limit = 4,
): Promise<Recipe[]> {
  try {
    const payload = await getPayload({ config: await config })

    const result = await payload.find({
      collection: 'recipes',
      where: {
        category: {
          equals: categoryId,
        },
        id: {
          not_equals: currentRecipeId,
        },
        status: {
          equals: 'published',
        },
      },
      limit,
      sort: '-createdAt',
      depth: 2,
    })

    return result.docs as Recipe[]
  } catch (error) {
    console.error('Error fetching related recipes:', error)
    return []
  }
}
