import { Code, Smartphone, Cloud, Brain, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and best practices. Responsive, fast, and scalable solutions.",
      features: ["React & Next.js", "Full-stack Development", "E-commerce Solutions", "Progressive Web Apps"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
      features: ["React Native", "iOS & Android", "App Store Optimization", "Mobile UI/UX"],
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services powered by AWS, Azure, and Google Cloud Platform.",
      features: ["Cloud Migration", "DevOps & CI/CD", "Microservices", "Serverless Architecture"],
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Intelligent solutions leveraging artificial intelligence and machine learning to automate and optimize processes.",
      features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "AI Integration"],
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Robust data pipelines and analytics solutions to help you make data-driven decisions with confidence.",
      features: ["Data Warehousing", "ETL Pipelines", "Real-time Analytics", "Business Intelligence"],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.",
      features: ["Security Audits", "Penetration Testing", "Compliance Management", "Threat Monitoring"],
    },
  ];

  const process = [
    { step: "1", title: "Discovery", description: "Understanding your needs and goals" },
    { step: "2", title: "Planning", description: "Creating a detailed roadmap" },
    { step: "3", title: "Development", description: "Building your solution" },
    { step: "4", title: "Testing", description: "Ensuring quality and performance" },
    { step: "5", title: "Deployment", description: "Launching your project" },
    { step: "6", title: "Support", description: "Ongoing maintenance and updates" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive technology solutions tailored to drive your business forward.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card glass-card-hover p-8 rounded-2xl space-y-6"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground text-lg">A proven approach to deliver excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {process.map((item, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center space-y-6 bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Let's discuss how our services can help achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-card" asChild>
                <Link to="/projects">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
