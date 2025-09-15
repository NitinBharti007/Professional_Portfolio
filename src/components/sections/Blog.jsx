import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Tag, ArrowRight, ExternalLink } from 'lucide-react';
import { blogService } from '@/services/blogService';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedPosts();
  }, []);

  const loadFeaturedPosts = async () => {
    try {
      const postsData = await blogService.getBlogPosts({ 
        featured: true, 
        limit: 3 
      });
      
      // If we have less than 3 featured posts, get regular posts to fill up to 3
      if (postsData.length < 3) {
        const remainingCount = 3 - postsData.length;
        const regularPosts = await blogService.getBlogPosts({ 
          limit: remainingCount,
          featured: false 
        });
        setPosts([...postsData, ...regularPosts]);
      } else {
        setPosts(postsData);
      }
    } catch (error) {
      console.error('Error loading featured posts:', error);
      // Fallback to regular posts if featured posts fail
      try {
        const postsData = await blogService.getBlogPosts({ limit: 3 });
        setPosts(postsData);
      } catch (fallbackError) {
        console.error('Error loading posts:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern - Matching Other Sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-cyan-50/30 dark:from-emerald-900/5 dark:via-transparent dark:to-cyan-900/5"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-emerald-100/20 to-transparent dark:from-emerald-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-cyan-100/20 to-transparent dark:from-cyan-800/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full mb-4 sm:mb-6">
            <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">Latest Articles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-white to-emerald-400 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent">
              Latest
            </span>
            <span className="bg-gradient-to-r from-white to-cyan-400 dark:from-gray-100 dark:to-cyan-400 bg-clip-text text-transparent">
              {" "}Blog Posts
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Thoughts, tutorials, and insights about web development, technology, and my journey as a software developer.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No posts yet</h3>
            <p className="text-gray-400 mb-6">Check back soon for new blog posts!</p>
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline"
            >
              Create First Post
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {posts.map(post => (
              <div key={post.id} className="group relative">
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                
                <Card 
                  className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 h-full flex flex-col"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  {/* Cover Image */}
                  {post.cover_image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={post.cover_image} 
                        alt={post.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="p-6 lg:p-8 flex-1 flex flex-col">
                    {/* Categories and Featured Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      {(post.categories || []).slice(0, 2).map(category => (
                        <Badge 
                          key={category.id} 
                          variant="secondary" 
                          className="text-xs px-3 py-1.5 rounded-full font-medium"
                          style={{ backgroundColor: category.color + '15', color: category.color, borderColor: category.color + '30' }}
                        >
                          {category.name}
                        </Badge>
                      ))}
                      {post.featured && (
                        <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                          ⭐ Featured
                        </Badge>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 text-base lg:text-lg leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="font-medium">{formatDate(post.publish_date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="font-medium">{post.read_time} min read</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(post.tags || []).slice(0, 2).map(tag => (
                        <Badge key={tag.id} variant="outline" className="text-xs px-3 py-1.5 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          <Tag className="w-3 h-3 mr-1.5" />
                          {tag.name}
                        </Badge>
                      ))}
                      {(post.tags || []).length > 2 && (
                        <Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                          +{(post.tags || []).length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Read More Button - Always at bottom */}
                    <div className="mt-auto">
                      <Button 
                        className="w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-emerald-500 hover:to-cyan-500 text-gray-700 dark:text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/blog/${post.slug}`);
                        }}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Explore More Articles</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Check out my complete blog collection with more insights and tutorials.
            </p>
            <button
              onClick={() => navigate('/blog')}
              className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">View All Posts</span>
            </button>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
