import { Target, Eye, Heart, Award, Users2, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower businesses with innovative technology solutions that drive growth and create lasting value.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To be the leading technology partner for companies seeking to transform their digital presence.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Integrity, innovation, and excellence guide everything we do, ensuring the best outcomes for our clients.",
    },
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "150+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
    { number: "15+", label: "Years Experience" },
  ];

  const team = [
    { name: "Alex Thompson", role: "CEO & Founder", expertise: "15 years in tech leadership" },
    { name: "Jessica Miller", role: "CTO", expertise: "Cloud architecture expert" },
    { name: "David Lee", role: "Head of Design", expertise: "Award-winning UX designer" },
    { name: "Maria Garcia", role: "VP of Engineering", expertise: "AI/ML specialist" },
  ];

  const milestones = [
    { year: "2010", event: "Company Founded" },
    { year: "2013", event: "Reached 100 Clients" },
    { year: "2016", event: "Expanded Internationally" },
    { year: "2020", event: "Launched AI Division" },
    { year: "2023", event: "500+ Projects Milestone" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold">
              About <span className="gradient-text">Mastersolis</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Building the future of technology, one innovative solution at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="glass-card glass-card-hover p-8 rounded-2xl space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-4xl md:text-5xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-muted-foreground text-lg">Experts dedicated to your success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="glass-card glass-card-hover p-6 rounded-2xl space-y-4 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Users2 className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">Key milestones that shaped our story</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent opacity-20" />
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-1/2" />
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </div>
                  <div className="w-1/2 px-8">
                    <div className="glass-card glass-card-hover p-6 rounded-xl">
                      <div className="text-2xl font-bold gradient-text mb-2">{milestone.year}</div>
                      <div className="text-muted-foreground">{milestone.event}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center space-y-6">
            <Globe className="w-16 h-16 mx-auto text-primary animate-float" />
            <h2 className="text-3xl md:text-5xl font-bold">Global Presence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Serving clients across 25 countries with offices in major tech hubs worldwide.
              Our diverse team brings together the best talent from around the globe.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
