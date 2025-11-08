import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "The Future of AI in Enterprise Software",
      excerpt: "Exploring how artificial intelligence is transforming business operations and creating new opportunities for innovation.",
      author: "Alex Thompson",
      date: "Mar 15, 2024",
      category: "AI & ML",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Best Practices for Cloud Migration",
      excerpt: "A comprehensive guide to successfully migrating your infrastructure to the cloud with minimal disruption.",
      author: "Jessica Miller",
      date: "Mar 10, 2024",
      category: "Cloud",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Building Scalable Microservices",
      excerpt: "Learn the principles and patterns for designing microservices architectures that can handle millions of requests.",
      author: "David Lee",
      date: "Mar 5, 2024",
      category: "Architecture",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Modern Web Development Trends 2024",
      excerpt: "Stay ahead of the curve with the latest trends and technologies shaping web development this year.",
      author: "Maria Garcia",
      date: "Feb 28, 2024",
      category: "Web Dev",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Cybersecurity in the Age of Remote Work",
      excerpt: "Essential strategies for protecting your organization's data in a distributed workforce environment.",
      author: "Alex Thompson",
      date: "Feb 20, 2024",
      category: "Security",
      readTime: "10 min read",
    },
    {
      id: 6,
      title: "The Rise of Low-Code Development",
      excerpt: "How low-code platforms are democratizing software development and accelerating digital transformation.",
      author: "Jessica Miller",
      date: "Feb 15, 2024",
      category: "Development",
      readTime: "5 min read",
    },
  ];

  const featured = posts[0];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, tutorials, and industry news from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 pb-12">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto glass-card glass-card-hover rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-6xl">
                🚀
              </div>
              <div className="space-y-4 flex flex-col justify-center">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary w-fit">
                  Featured Post
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">{featured.title}</h2>
                <p className="text-muted-foreground">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{featured.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featured.date}</span>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-primary to-accent w-fit group">
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Recent Articles</h2>
            <p className="text-muted-foreground text-lg">Latest insights from our team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {posts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">
                  {["💡", "☁️", "🔧", "🌐", "🔒"][index]}
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold">Stay Updated</h2>
            <p className="text-muted-foreground text-lg">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-gradient-to-r from-primary to-accent">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
