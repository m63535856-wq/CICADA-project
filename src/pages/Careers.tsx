import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const openings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / Tech City",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Join our engineering team to build scalable web applications using React, Node.js, and cloud technologies.",
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Tech City",
      type: "Full-time",
      salary: "$90k - $120k",
      description: "Create beautiful, intuitive user experiences for our clients' products and internal tools.",
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $150k",
      description: "Manage and optimize our cloud infrastructure, CI/CD pipelines, and deployment processes.",
    },
    {
      title: "Data Scientist",
      department: "AI/ML",
      location: "Tech City / Remote",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Develop machine learning models and data solutions to solve complex business problems.",
    },
  ];

  const benefits = [
    { title: "Competitive Salary", description: "Industry-leading compensation packages" },
    { title: "Health Insurance", description: "Comprehensive health, dental, and vision coverage" },
    { title: "Remote Work", description: "Flexible work arrangements and remote options" },
    { title: "Learning Budget", description: "Annual budget for courses, conferences, and books" },
    { title: "Unlimited PTO", description: "Take time off when you need it" },
    { title: "401(k) Matching", description: "Generous retirement plan contributions" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Build the future with passionate innovators who love what they do.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-12 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Mastersolis?</h2>
            <p className="text-muted-foreground text-lg">Perks and benefits that matter</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-card glass-card-hover p-6 rounded-2xl text-center">
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground text-lg">Find your next opportunity</p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {openings.map((job, index) => (
              <div key={index} className="glass-card glass-card-hover p-6 md:p-8 rounded-2xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                      <p className="text-primary font-medium">{job.department}</p>
                    </div>
                    <p className="text-muted-foreground">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all md:ml-4">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center space-y-6">
            <Briefcase className="w-16 h-16 mx-auto text-primary animate-float" />
            <h2 className="text-3xl md:text-5xl font-bold">Don't See a Perfect Fit?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and let's talk about future opportunities.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              Send Your Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
