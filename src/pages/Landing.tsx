import { GraduationCap, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student",
      description: "Submit and manage your project proposals",
      icon: GraduationCap,
      path: "/student/auth",
      gradient: "from-primary to-accent",
    },
    {
      title: "Teacher",
      description: "Review and approve student projects",
      icon: Users,
      path: "/teacher/auth",
      gradient: "from-accent to-primary",
    },
    {
      title: "Admin",
      description: "Manage teachers and system settings",
      icon: Shield,
      path: "/admin/auth",
      gradient: "from-primary/80 to-accent/80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Project Management System
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            PVPPCOE - Streamline your academic project submissions and approvals
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Select Your Role</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {roles.map((role) => (
            <Card
              key={role.title}
              className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate(role.path)}
            >
              <CardContent className="pt-8 pb-6 text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                <p className="text-muted-foreground mb-6">{role.description}</p>
                <Button className="w-full" variant="outline">
                  Continue as {role.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 PVPPCOE Project Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
