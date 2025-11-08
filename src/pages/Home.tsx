import { ArrowRight, Sparkles, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Innovation First",
      description: "Cutting-edge solutions powered by the latest technology",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for seamless user experience",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated professionals committed to your success",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "Mastersolis transformed our digital presence. Their expertise and dedication are unmatched.",
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateLabs",
      content: "The team delivered beyond our expectations. Highly recommended for any tech project.",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, StartupXYZ",
      content: "Professional, innovative, and results-driven. A pleasure to work with.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full glass-card text-sm font-medium">
                Welcome to the Future
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Build Something
              <br />
              <span className="gradient-text">Extraordinary</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We craft innovative digital solutions that transform businesses and create lasting impact in the modern world.
            </p>

            {/* ✅✅ Get Started Button Updated Only */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 transition-all group"
                asChild
              >
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="glass-card glass-card-hover" asChild>
                <Link to="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg">Excellence in every aspect of our service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card glass-card-hover p-6 rounded-2xl space-y-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Comprehensive Solutions for Your Business
                </h2>
                <p className="text-muted-foreground text-lg">
                  From web development to cloud solutions, we provide end-to-end services tailored to your needs.
                </p>
                <Button className="bg-gradient-to-r from-primary to-accent" asChild>
                  <Link to="/services">
                    Explore Services
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Web Development", "Mobile Apps", "Cloud Solutions", "AI Integration"].map((service, i) => (
                  <div key={i} className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform">
                    <p className="font-semibold">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">Trusted by industry leaders worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card glass-card-hover p-8 rounded-2xl space-y-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center space-y-6 bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life with our innovative solutions.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 transition-all" asChild>
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
