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
      admin: {
        description: 'Main recipe photo (recommended: 800x600px or wider)',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      admin: {
        description: 'YouTube video link (e.g., https://www.youtube.com/watch?v=...)',
      },
    },

    // Recipe details
    {
      name: 'prepTime',
      type: 'number',
      min: 0,
      admin: {
        description: 'Preparation time in minutes',
        width: '25%',
      },
    },
    {
      name: 'cookTime',
      type: 'number',
      min: 0,
      admin: {
        description: 'Cooking time in minutes',
        width: '25%',
      },
    },
    {
      name: 'totalTime',
      type: 'number',
      min: 0,
      admin: {
        description: 'Auto-calculated from prep + cook time. Edit to override.',
        width: '25%',
      },
    },
    {
      name: 'servings',
      type: 'number',
      min: 1,
      admin: {
        description: 'Number of servings',
        width: '25%',
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
      minRows: 1,
      admin: {
        description: 'Add all ingredients needed for this recipe',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'quantity',
          type: 'text',
          required: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'unit',
          type: 'select',
          hasMany: false,
          options: [
            { label: 'cups', value: 'cups' },
            { label: 'tsp', value: 'tsp' },
            { label: 'tbsp', value: 'tbsp' },
            { label: 'g', value: 'g' },
            { label: 'kg', value: 'kg' },
            { label: 'ml', value: 'ml' },
            { label: 'l', value: 'l' },
            { label: 'oz', value: 'oz' },
            { label: 'lb', value: 'lb' },
            { label: 'piece(s)', value: 'piece(s)' },
            { label: 'pinch', value: 'pinch' },
            { label: 'to taste', value: 'to taste' },
          ],
          admin: {
            width: '25%',
            description: 'Select a unit or leave blank',
          },
        },
        {
          name: 'notes',
          type: 'text',
          admin: {
            description: 'e.g., "finely chopped", "melted"',
          },
        },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      admin: {
        description: 'Step-by-step cooking instructions. Numbers are auto-assigned.',
      },
      fields: [
        {
          name: 'stepNumber',
          type: 'number',
          required: false,
          admin: {
            hidden: true,
          },
        },
        {
          name: 'instruction',
          type: 'richText',
          required: true,
          admin: {
            description: 'Enter the cooking instruction for this step',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload an optional image showing this step (recommended: 800x600px)',
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
      admin: {
        description: 'Optional nutrition facts per serving. Leave blank if not available.',
      },
      fields: [
        {
          name: 'calories',
          type: 'number',
          min: 0,
          admin: {
            description: 'Calories per serving',
            width: '25%',
          },
        },
        {
          name: 'protein',
          type: 'number',
          min: 0,
          admin: {
            description: 'Protein in grams',
            width: '25%',
          },
        },
        {
          name: 'carbs',
          type: 'number',
          min: 0,
          admin: {
            description: 'Carbohydrates in grams',
            width: '25%',
          },
        },
        {
          name: 'fat',
          type: 'number',
          min: 0,
          admin: {
            description: 'Fat in grams',
            width: '25%',
          },
        },
      ],
    },

    // SEO (group)
    {
      name: 'seo',
      type: 'group',
      admin: {
        description: 'Optional SEO metadata for search engines and social sharing',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'Page title for search results (50-60 chars recommended)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Meta description for search results (150-160 chars recommended)',
          },
        },
        {
          name: 'metaImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Image for social media sharing (recommended: 1200x630px)',
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
