import { supabase } from '@/lib/supabase'

export const blogService = {
  // Get all published blog posts with categories and tags
  async getBlogPosts(filters = {}) {
    const { category, tag, featured, limit = 10, offset = 0 } = filters
    
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_post_categories(
          blog_categories(*)
        ),
        blog_post_tags(
          blog_tags(*)
        )
      `)
      .eq('published', true)
      .order('publish_date', { ascending: false })
      .range(offset, offset + limit - 1)

    if (featured === true) {
      query = query.eq('featured', true)
    } else if (featured === false) {
      query = query.eq('featured', false)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }

    // Transform the data to flatten categories and tags
    let posts = data.map(post => ({
      ...post,
      categories: post.blog_post_categories?.map(pc => pc.blog_categories) || [],
      tags: post.blog_post_tags?.map(pt => pt.blog_tags) || []
    }))

    // Filter by category if specified
    if (category) {
      posts = posts.filter(post => 
        post.categories.some(cat => cat.slug === category)
      )
    }

    // Filter by tag if specified
    if (tag) {
      posts = posts.filter(post => 
        post.tags.some(t => t.slug === tag)
      )
    }

    return posts
  },

  // Get all blog posts (including unpublished) for admin
  async getAllBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_post_categories(
          blog_categories(*)
        ),
        blog_post_tags(
          blog_tags(*)
        )
      `)
      .order('publish_date', { ascending: false })

    if (error) {
      console.error('Error fetching all blog posts:', error)
      return []
    }

    return data.map(post => ({
      ...post,
      categories: post.blog_post_categories?.map(pc => pc.blog_categories) || [],
      tags: post.blog_post_tags?.map(pt => pt.blog_tags) || []
    }))
  },

  // Get a single blog post by slug
  async getBlogPostBySlug(slug) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_post_categories(
          blog_categories(*)
        ),
        blog_post_tags(
          blog_tags(*)
        )
      `)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    if (!data) {
      return null
    }

    return {
      ...data,
      categories: data.blog_post_categories?.map(pc => pc.blog_categories) || [],
      tags: data.blog_post_tags?.map(pt => pt.blog_tags) || []
    }
  },

  // Get a single blog post by ID (for admin)
  async getBlogPostById(id) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_post_categories(
          blog_categories(*)
        ),
        blog_post_tags(
          blog_tags(*)
        )
      `)
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    if (!data) {
      return null
    }

    return {
      ...data,
      categories: data.blog_post_categories?.map(pc => pc.blog_categories) || [],
      tags: data.blog_post_tags?.map(pt => pt.blog_tags) || []
    }
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data
  },

  // Get all tags
  async getTags() {
    const { data, error } = await supabase
      .from('blog_tags')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching tags:', error)
      return []
    }

    return data
  },

  // Search blog posts
  async searchBlogPosts(searchTerm) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_post_categories(
          blog_categories(*)
        ),
        blog_post_tags(
          blog_tags(*)
        )
      `)
      .eq('published', true)
      .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('publish_date', { ascending: false })

    if (error) {
      console.error('Error searching blog posts:', error)
      return []
    }

    return data.map(post => ({
      ...post,
      categories: post.blog_post_categories?.map(pc => pc.blog_categories) || [],
      tags: post.blog_post_tags?.map(pt => pt.blog_tags) || []
    }))
  },

  // Create a new blog post
  async createBlogPost(postData) {
    const { categories, tags, ...postFields } = postData

    // First, create the blog post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert([postFields])
      .select()
      .single()

    if (postError) {
      console.error('Error creating blog post:', postError)
      throw postError
    }

    // Then, create the category relationships
    if (categories && categories.length > 0) {
      const categoryRelations = categories.map(category => ({
        post_id: post.id,
        category_id: category.id
      }))

      const { error: categoryError } = await supabase
        .from('blog_post_categories')
        .insert(categoryRelations)

      if (categoryError) {
        console.error('Error creating category relationships:', categoryError)
        throw categoryError
      }
    }

    // Finally, create the tag relationships
    if (tags && tags.length > 0) {
      const tagRelations = tags.map(tag => ({
        post_id: post.id,
        tag_id: tag.id
      }))

      const { error: tagError } = await supabase
        .from('blog_post_tags')
        .insert(tagRelations)

      if (tagError) {
        console.error('Error creating tag relationships:', tagError)
        throw tagError
      }
    }

    return post
  },

  // Update a blog post
  async updateBlogPost(id, postData) {
    const { categories, tags, ...postFields } = postData

    // First, update the blog post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .update(postFields)
      .eq('id', id)
      .select()
      .single()

    if (postError) {
      console.error('Error updating blog post:', postError)
      throw postError
    }

    // Delete existing category relationships
    const { error: deleteCategoryError } = await supabase
      .from('blog_post_categories')
      .delete()
      .eq('post_id', id)

    if (deleteCategoryError) {
      console.error('Error deleting category relationships:', deleteCategoryError)
      throw deleteCategoryError
    }

    // Create new category relationships
    if (categories && categories.length > 0) {
      const categoryRelations = categories.map(category => ({
        post_id: id,
        category_id: category.id
      }))

      const { error: categoryError } = await supabase
        .from('blog_post_categories')
        .insert(categoryRelations)

      if (categoryError) {
        console.error('Error creating category relationships:', categoryError)
        throw categoryError
      }
    }

    // Delete existing tag relationships
    const { error: deleteTagError } = await supabase
      .from('blog_post_tags')
      .delete()
      .eq('post_id', id)

    if (deleteTagError) {
      console.error('Error deleting tag relationships:', deleteTagError)
      throw deleteTagError
    }

    // Create new tag relationships
    if (tags && tags.length > 0) {
      const tagRelations = tags.map(tag => ({
        post_id: id,
        tag_id: tag.id
      }))

      const { error: tagError } = await supabase
        .from('blog_post_tags')
        .insert(tagRelations)

      if (tagError) {
        console.error('Error creating tag relationships:', tagError)
        throw tagError
      }
    }

    return post
  },

  // Delete a blog post
  async deleteBlogPost(id) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting blog post:', error)
      throw error
    }

    return true
  },

  // Toggle post published status
  async togglePostStatus(id, published) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ published })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error toggling post status:', error)
      throw error
    }

    return data
  }
}
