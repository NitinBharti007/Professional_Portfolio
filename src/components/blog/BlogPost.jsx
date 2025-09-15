import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogService } from '@/services/blogService';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [slug]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadPost = async () => {
    try {
      const postData = await blogService.getBlogPostBySlug(slug);
      setPost(postData);
    } catch (error) {
      console.error('Error loading blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
            <Button onClick={() => navigate('/blog')} className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main>
        {/* Blog Header - Content Height */}
        <div className="w-full pt-28 pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="w-full px-4 sm:px-6 md:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Cover Image */}
                {post.cover_image && (
                  <div className="mb-6 sm:mb-8 w-full">
                    <img 
                      src={post.cover_image} 
                      alt={post.title}
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover object-center rounded-lg sm:rounded-xl shadow-lg"
                      style={{ objectPosition: 'center' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                {(post.categories || []).map(category => (
                  <Badge 
                    key={category.id} 
                    variant="secondary"
                    className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium h-6 sm:h-7 flex items-center"
                    style={{ backgroundColor: category.color + '15', color: category.color, borderColor: category.color + '30' }}
                  >
                    {category.name}
                  </Badge>
                ))}
                {post.featured && (
                  <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg h-6 sm:h-7 flex items-center">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>
              
              {/* Excerpt */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-4xl">
                {post.excerpt}
              </p>
              
              {/* Author & Meta Info */}
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Written by</p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{post.author}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm md:text-base font-medium">{formatDate(post.publish_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm md:text-base font-medium">{post.read_time} min read</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleShare} 
                  className="group relative inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">Share Article</span>
                </Button>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {(post.tags || []).map(tag => (
                  <Badge key={tag.id} variant="outline" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 md:mr-2" />
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="w-full py-8 sm:py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg sm:prose-xl max-w-none prose-gray dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-headings:font-bold prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 dark:prose-blockquote:bg-emerald-900/20">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    // Custom styling for code blocks
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      ) : (
                        <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      );
                    },
                    // Custom styling for headings
                    h1: ({ children }) => {
                      // Skip the first H1 if it matches the post title (to avoid duplication)
                      const titleText = children?.toString() || '';
                      if (titleText === post.title) {
                        return null;
                      }
                      return (
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 mt-8 first:mt-0">
                          {children}
                        </h1>
                      );
                    },
                    h2: ({ children }) => (
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-4">
                        {children}
                      </h3>
                    ),
                    // Custom styling for paragraphs
                    p: ({ children }) => (
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    // Custom styling for links
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline decoration-emerald-300 dark:decoration-emerald-600 hover:decoration-emerald-500 dark:hover:decoration-emerald-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    // Custom styling for blockquotes
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">
                        {children}
                      </blockquote>
                    ),
                    // Custom styling for lists
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                        {children}
                      </ol>
                    ),
                    // Custom styling for list items
                    li: ({ children }) => (
                      <li className="leading-relaxed">
                        {children}
                      </li>
                    ),
                    // Custom styling for strong/bold text
                    strong: ({ children }) => (
                      <strong className="font-bold text-gray-900 dark:text-white">
                        {children}
                      </strong>
                    ),
                    // Custom styling for emphasis/italic text
                    em: ({ children }) => (
                      <em className="italic text-gray-800 dark:text-gray-200">
                        {children}
                      </em>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
