import { useState } from "react";
import { ExternalLink, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = ["all", "web", "mobile", "cloud", "ai"];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description: "A comprehensive online marketplace with advanced search and personalization features.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "🛍️",
    },
    {
      id: 2,
      title: "Healthcare Mobile App",
      category: "mobile",
      description: "HIPAA-compliant telemedicine platform connecting patients with healthcare providers.",
      tags: ["React Native", "WebRTC", "AWS", "FHIR"],
      image: "🏥",
    },
    {
      id: 3,
      title: "Cloud Migration Suite",
      category: "cloud",
      description: "Enterprise-scale migration from on-premise to multi-cloud infrastructure.",
      tags: ["AWS", "Kubernetes", "Terraform", "Docker"],
      image: "☁️",
    },
    {
      id: 4,
      title: "AI Content Generator",
      category: "ai",
      description: "ML-powered platform for automated content creation and optimization.",
      tags: ["Python", "TensorFlow", "GPT", "FastAPI"],
      image: "🤖",
    },
    {
      id: 5,
      title: "Financial Dashboard",
      category: "web",
      description: "Real-time analytics dashboard for financial data visualization and reporting.",
      tags: ["Next.js", "D3.js", "Redis", "WebSocket"],
      image: "📊",
    },
    {
      id: 6,
      title: "Smart Home App",
      category: "mobile",
      description: "IoT platform for managing and automating smart home devices.",
      tags: ["Flutter", "Firebase", "MQTT", "IoT"],
      image: "🏠",
    },
    {
      id: 7,
      title: "Video Streaming Platform",
      category: "cloud",
      description: "Scalable video streaming service with adaptive bitrate and CDN integration.",
      tags: ["GCP", "Kubernetes", "FFmpeg", "CDN"],
      image: "📹",
    },
    {
      id: 8,
      title: "Predictive Analytics Tool",
      category: "ai",
      description: "Machine learning solution for business forecasting and trend analysis.",
      tags: ["Python", "Scikit-learn", "Apache Spark", "Tableau"],
      image: "📈",
    },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Showcasing innovative solutions that drive real business results.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className={activeFilter === category ? "bg-gradient-to-r from-primary to-accent" : "glass-card"}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center group/btn"
                  >
                    View Project
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                <div className="text-muted-foreground">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">98%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">25+</div>
                <div className="text-muted-foreground">Countries Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">15+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
