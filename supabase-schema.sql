-- Supabase Blog Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Nitin Bharti',
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER DEFAULT 5, -- in minutes
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_categories table
CREATE TABLE blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#10b981',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_tags table
CREATE TABLE blog_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create junction table for blog_posts and blog_categories
CREATE TABLE blog_post_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  UNIQUE(post_id, category_id)
);

-- Create junction table for blog_posts and blog_tags
CREATE TABLE blog_post_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  UNIQUE(post_id, tag_id)
);

-- Insert sample categories
INSERT INTO blog_categories (name, slug, description, color) VALUES
('Tutorial', 'tutorial', 'Step-by-step guides and tutorials', '#10b981'),
('Development', 'development', 'Development insights and best practices', '#3b82f6'),
('Career', 'career', 'Career advice and personal experiences', '#f59e0b'),
('Projects', 'projects', 'Project deep dives and case studies', '#8b5cf6'),
('Technology', 'technology', 'Technology trends and updates', '#06b6d4'),
('Web Development', 'web-development', 'Web development specific content', '#84cc16');

-- Insert sample tags
INSERT INTO blog_tags (name, slug) VALUES
('React', 'react'),
('JavaScript', 'javascript'),
('MERN Stack', 'mern-stack'),
('Supabase', 'supabase'),
('Web Development', 'web-development'),
('Tutorial', 'tutorial'),
('Career', 'career'),
('Node.js', 'nodejs'),
('MongoDB', 'mongodb'),
('AI', 'ai'),
('Frontend', 'frontend'),
('Backend', 'backend'),
('Full Stack', 'full-stack'),
('CSS', 'css'),
('HTML', 'html'),
('TypeScript', 'typescript'),
('Next.js', 'nextjs'),
('Vue.js', 'vuejs'),
('Angular', 'angular'),
('Python', 'python'),
('Java', 'java'),
('PHP', 'php'),
('Database', 'database'),
('API', 'api'),
('DevOps', 'devops'),
('UI/UX', 'ui-ux'),
('Design', 'design'),
('Mobile', 'mobile'),
('iOS', 'ios'),
('Android', 'android');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, featured, cover_image, published) VALUES
('Getting Started with React: A Complete Guide', 'getting-started-with-react', 'Learn the fundamentals of React development and build your first component with this comprehensive guide.', '# Getting Started with React: A Complete Guide

React has revolutionized how we build user interfaces. In this comprehensive guide, we''ll explore the fundamentals of React development.

## What is React?

React is a JavaScript library for building user interfaces, particularly web applications. It was created by Facebook and is now maintained by Meta and the community.

## Key Concepts

### Components
React applications are built using components - reusable pieces of UI that can be composed together.

### JSX
JSX is a syntax extension that allows you to write HTML-like code in your JavaScript.

### State
State allows components to manage and update their data over time.

## Getting Started

To create a new React application, you can use Create React App or Vite:

```bash
npx create-react-app my-app
# or
npm create vite@latest my-app -- --template react
```

## Conclusion

React is a powerful tool for building modern web applications. With its component-based architecture and rich ecosystem, it''s an excellent choice for developers of all skill levels.', 'Nitin Bharti', true, '/blog/react-guide.jpg', true),

('MERN Stack Best Practices for Production Apps', 'mern-stack-best-practices', 'Essential practices for building scalable MERN stack applications that can handle real-world traffic.', '# MERN Stack Best Practices for Production Apps

Building production-ready applications requires careful planning and adherence to best practices. Here are the essential practices for MERN stack development.

## Database Design

### MongoDB Schema Design
- Use proper indexing for frequently queried fields
- Design schemas that minimize data redundancy
- Use references instead of embedding when appropriate

### Data Validation
- Implement server-side validation using Mongoose
- Use Joi or Yup for request validation
- Sanitize user inputs to prevent injection attacks

## Backend Development

### Express.js Best Practices
- Use middleware for common functionality
- Implement proper error handling
- Use environment variables for configuration
- Implement rate limiting and security headers

### API Design
- Follow RESTful conventions
- Use proper HTTP status codes
- Implement pagination for large datasets
- Version your APIs

## Frontend Development

### React Best Practices
- Use functional components with hooks
- Implement proper state management
- Use React.memo for performance optimization
- Implement proper error boundaries

### State Management
- Use Context API for simple state
- Implement Redux for complex state management
- Use React Query for server state

## Security Considerations

- Implement proper authentication and authorization
- Use HTTPS in production
- Sanitize user inputs
- Implement CORS properly
- Use environment variables for sensitive data

## Performance Optimization

- Implement code splitting
- Use lazy loading for components
- Optimize images and assets
- Implement caching strategies
- Use CDN for static assets

## Conclusion

Following these best practices will help you build robust, scalable MERN stack applications that can handle production workloads effectively.', 'Nitin Bharti', false, '/blog/mern-practices.jpg', true),

('My Journey from Intern to Software Developer', 'journey-intern-to-developer', 'A personal reflection on the challenges, learnings, and growth experienced during my transition from intern to full-time developer.', '# My Journey from Intern to Software Developer

Transitioning from an intern to a full-time software developer has been an incredible journey filled with challenges, learning opportunities, and personal growth.

## The Beginning

Starting as an intern at Salesqueen Software Solutions, I was eager to learn but had limited real-world experience. The first few weeks were overwhelming, but I quickly realized that asking questions and being proactive were key to success.

## Key Learnings

### Technical Skills
- **Frontend Development**: Mastered HTML, CSS, JavaScript, and Bootstrap
- **UI/UX Design**: Learned to create user-friendly interfaces
- **Code Quality**: Understood the importance of clean, maintainable code
- **Version Control**: Became proficient with Git and GitHub

### Soft Skills
- **Communication**: Learned to effectively communicate with team members
- **Problem Solving**: Developed a systematic approach to debugging
- **Time Management**: Learned to prioritize tasks and meet deadlines
- **Continuous Learning**: Embraced the mindset of lifelong learning

## Challenges Faced

### Technical Challenges
- Understanding complex codebases
- Debugging difficult issues
- Learning new technologies quickly
- Balancing learning with productivity

### Professional Challenges
- Building confidence in my abilities
- Communicating effectively with senior developers
- Managing expectations and deadlines
- Adapting to different work environments

## Growth and Development

### At Ventures Grow
- Expanded skills to full-stack development
- Worked on multiple MERN stack projects
- Learned modern development practices
- Gained experience with deployment and DevOps

### At Bluespace Studio
- Focused on business-oriented solutions
- Explored no-code/low-code platforms
- Worked on AI integration projects
- Developed expertise in rapid prototyping

## Lessons Learned

1. **Never Stop Learning**: Technology evolves rapidly, and staying updated is crucial
2. **Ask Questions**: It''s better to ask and learn than to struggle silently
3. **Build Projects**: Hands-on experience is invaluable
4. **Network**: Connect with other developers and learn from their experiences
5. **Be Patient**: Growth takes time, and everyone learns at their own pace

## Advice for New Developers

- Start with the fundamentals and build a strong foundation
- Don''t be afraid to make mistakes - they''re learning opportunities
- Build projects to apply what you learn
- Contribute to open source projects
- Find a mentor or join developer communities
- Focus on problem-solving rather than just syntax

## Looking Forward

The journey doesn''t end here. I''m excited to continue learning, growing, and contributing to the tech community. The field of software development offers endless opportunities for growth and innovation.

## Conclusion

The transition from intern to developer has been challenging but incredibly rewarding. The key is to stay curious, keep learning, and never give up on your passion for technology.', 'Nitin Bharti', true, '/blog/career-journey.jpg', true);

-- Add categories and tags to the sample posts
INSERT INTO blog_post_categories (post_id, category_id) 
SELECT bp.id, bc.id 
FROM blog_posts bp, blog_categories bc 
WHERE bp.slug = 'getting-started-with-react' AND bc.slug = 'tutorial';

INSERT INTO blog_post_categories (post_id, category_id) 
SELECT bp.id, bc.id 
FROM blog_posts bp, blog_categories bc 
WHERE bp.slug = 'mern-stack-best-practices' AND bc.slug = 'development';

INSERT INTO blog_post_categories (post_id, category_id) 
SELECT bp.id, bc.id 
FROM blog_posts bp, blog_categories bc 
WHERE bp.slug = 'journey-intern-to-developer' AND bc.slug = 'career';

INSERT INTO blog_post_tags (post_id, tag_id) 
SELECT bp.id, bt.id 
FROM blog_posts bp, blog_tags bt 
WHERE bp.slug = 'getting-started-with-react' AND bt.slug IN ('react', 'javascript', 'tutorial', 'frontend');

INSERT INTO blog_post_tags (post_id, tag_id) 
SELECT bp.id, bt.id 
FROM blog_posts bp, blog_tags bt 
WHERE bp.slug = 'mern-stack-best-practices' AND bt.slug IN ('mern-stack', 'nodejs', 'mongodb', 'react', 'javascript', 'full-stack');

INSERT INTO blog_post_tags (post_id, tag_id) 
SELECT bp.id, bt.id 
FROM blog_posts bp, blog_tags bt 
WHERE bp.slug = 'journey-intern-to-developer' AND bt.slug IN ('career', 'web-development', 'javascript', 'react');

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_published ON blog_posts(published, publish_date DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured, publish_date DESC);
CREATE INDEX idx_blog_posts_author ON blog_posts(author);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published posts
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view tags" ON blog_tags
  FOR SELECT USING (true);

CREATE POLICY "Public can view post categories" ON blog_post_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view post tags" ON blog_post_tags
  FOR SELECT USING (true);

-- Create policies for authenticated users to manage posts (you'll need to adjust based on your auth setup)
CREATE POLICY "Authenticated users can manage posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage categories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage tags" ON blog_tags
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage post categories" ON blog_post_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage post tags" ON blog_post_tags
  FOR ALL USING (auth.role() = 'authenticated');
