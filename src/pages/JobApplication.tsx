import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Loader2, CheckCircle } from "lucide-react";

const JobApplication = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const jobTitle = searchParams.get("job") || "Position";
  const department = searchParams.get("dept") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    portfolio: "",
    experience: "",
    coverLetter: "",
    resumeFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("Resume file must be less than 5MB");
        return;
      }
      // Validate file type
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a PDF or Word document");
        return;
      }
      setFormData((prev) => ({ ...prev, resumeFile: file }));
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.phone || !formData.resumeFile) {
        setError("Please fill in all required fields and upload your resume");
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("location", formData.location);
      submitData.append("linkedIn", formData.linkedIn);
      submitData.append("portfolio", formData.portfolio);
      submitData.append("experience", formData.experience);
      submitData.append("coverLetter", formData.coverLetter);
      submitData.append("jobTitle", jobTitle);
      submitData.append("department", department);
      submitData.append("resume", formData.resumeFile);

      const response = await fetch("http://127.0.0.1:5000/api/applications", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      setSuccess(true);
      
      // Redirect to careers page after 3 seconds
      setTimeout(() => {
        navigate("/careers");
      }, 3000);

    } catch (err) {
      console.error("Application error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="glass-card rounded-3xl p-12 text-center space-y-6 max-w-2xl animate-fade-in-up">
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-bold">Application Submitted!</h2>
          <p className="text-muted-foreground text-lg">
            Thank you for applying for <span className="text-primary font-semibold">{jobTitle}</span>.
            <br />
            We've received your application and will review it shortly.
          </p>
          <p className="text-sm text-muted-foreground">
            Check your email for confirmation. Redirecting to careers page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/careers")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Apply for <span className="gradient-text">{jobTitle}</span>
          </h1>
          {department && (
            <p className="text-lg text-muted-foreground">{department} Department</p>
          )}
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Professional Links</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Portfolio Website</label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-2">Years of Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Select experience level</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Resume/CV <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label
                htmlFor="resume"
                className="cursor-pointer text-primary hover:underline font-medium"
              >
                Click to upload resume
              </label>
              <p className="text-sm text-muted-foreground mt-2">
                PDF, DOC, or DOCX (max 5MB)
              </p>
              {formData.resumeFile && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  ✓ {formData.resumeFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium mb-2">Cover Letter (Optional)</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none resize-none"
              placeholder="Tell us why you're a great fit for this role..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg 
                     hover:shadow-primary/50 transition-all text-lg py-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;