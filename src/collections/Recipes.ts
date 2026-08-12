import type { CollectionConfig } from 'payload'

export const Recipes: CollectionConfig = {
  slug: 'recipes',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    // Core fields
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Auto-generated from title, but can be edited',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short summary for recipe cards and SEO',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      admin: {
        description: 'Link to YouTube video (optional)',
      },
    },

    // Recipe details
    {
      name: 'prepTime',
      type: 'number',
      admin: {
        description: 'Preparation time in minutes',
      },
    },
    {
      name: 'cookTime',
      type: 'number',
      admin: {
        description: 'Cooking time in minutes',
      },
    },
    {
      name: 'totalTime',
      type: 'number',
      admin: {
        description: 'Total time in minutes (or auto-calculated from prep + cook)',
      },
    },
    {
      name: 'servings',
      type: 'number',
      admin: {
        description: 'Number of servings',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
      ],
    },
    {
      name: 'cuisine',
      type: 'select',
      options: [
        { label: 'Indian', value: 'indian' },
        { label: 'Italian', value: 'italian' },
        { label: 'Chinese', value: 'chinese' },
        { label: 'Continental', value: 'continental' },
        { label: 'Mexican', value: 'mexican' },
        { label: 'Thai', value: 'thai' },
        { label: 'Japanese', value: 'japanese' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Cuisine type for the recipe',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },

    // Recipe content
    {
      name: 'ingredients',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'quantity',
          type: 'text',
          required: true,
        },
        {
          name: 'unit',
          type: 'text',
          admin: {
            description: 'e.g., cups, tsp, g, ml',
          },
        },
        {
          name: 'notes',
          type: 'text',
          admin: {
            description: 'Optional notes like "finely chopped"',
          },
        },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'stepNumber',
          type: 'number',
          required: true,
          admin: {
            description: 'Step number (auto-incremented)',
          },
        },
        {
          name: 'instruction',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional image for this step',
          },
        },
      ],
    },
    {
      name: 'notes',
      type: 'richText',
      admin: {
        description: 'Tips, substitutions, storage instructions, etc.',
      },
    },

    // Nutrition info (group)
    {
      name: 'nutritionInfo',
      type: 'group',
      fields: [
        {
          name: 'calories',
          type: 'number',
          admin: {
            description: 'Per serving',
          },
        },
        {
          name: 'protein',
          type: 'number',
          admin: {
            description: 'In grams',
          },
        },
        {
          name: 'carbs',
          type: 'number',
          admin: {
            description: 'In grams',
          },
        },
        {
          name: 'fat',
          type: 'number',
          admin: {
            description: 'In grams',
          },
        },
      ],
    },

    // SEO (group)
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'SEO title (recommended 50-60 characters)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'SEO description (recommended 150-160 characters)',
          },
        },
        {
          name: 'metaImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Image for social media sharing',
          },
        },
      ],
    },

    // Publishing
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        description: 'Date when the recipe was published',
      },
    },
  ],

  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Auto-generate slug from title
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
        }

        // Auto-calculate totalTime
        if (data.prepTime && data.cookTime && !data.totalTime) {
          data.totalTime = data.prepTime + data.cookTime
        }

        // Auto-number steps
        if (data.steps && Array.isArray(data.steps)) {
          data.steps = data.steps.map((step, index) => ({
            ...step,
            stepNumber: index + 1,
          }))
        }

        return data
      },
    ],
  },
}
