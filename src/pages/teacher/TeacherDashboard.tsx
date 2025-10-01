import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, Users, CheckCircle, XCircle, MessageSquare, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  teamLeader: string;
  teamMembers: string[];
  year: string;
  semester: string;
  title: string;
  description: string;
  domain: string;
  similarity: number;
  status: "pending" | "approved" | "declined";
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mock data - will be replaced with actual data from backend
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      teamLeader: "John Doe",
      teamMembers: ["Jane Smith", "Mike Johnson", "Sarah Williams"],
      year: "TE",
      semester: "5",
      title: "AI-Based Traffic Management System",
      description: "A comprehensive system to manage traffic using AI and ML algorithms...",
      domain: "AI/ML",
      similarity: 15,
      status: "pending",
    },
    {
      id: "2",
      teamLeader: "Alice Brown",
      teamMembers: ["Bob Wilson", "Charlie Davis"],
      year: "BE",
      semester: "7",
      title: "Smart Home Automation using IoT",
      description: "IoT-based home automation system with mobile app integration...",
      domain: "IoT",
      similarity: 32,
      status: "pending",
    },
  ]);

  const handleApprove = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, status: "approved" as const } : p
    ));
    toast({
      title: "Project Approved",
      description: "The student has been notified",
    });
  };

  const handleDecline = (projectId: string, feedbackText: string) => {
    if (!feedbackText.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback before declining",
        variant: "destructive",
      });
      return;
    }
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, status: "declined" as const } : p
    ));
    toast({
      title: "Project Declined",
      description: "Feedback has been sent to the student",
    });
    setFeedback("");
    setSelectedProject(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "declined":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Declined</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">Dr. Rajesh Kumar</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">
                {projects.filter(p => p.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {projects.filter(p => p.status === "approved").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <h2 className="text-2xl font-bold mb-6">Project Submissions</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{project.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <p><strong>Team Leader:</strong> {project.teamLeader}</p>
                      <p><strong>Members:</strong> {project.teamMembers.join(", ")}</p>
                      <p><strong>Year:</strong> {project.year} (Semester {project.semester})</p>
                    </CardDescription>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description:</h4>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex gap-4">
                  <Badge variant="outline">{project.domain}</Badge>
                  <Badge variant={project.similarity > 30 ? "destructive" : "secondary"}>
                    Similarity: {project.similarity}%
                  </Badge>
                </div>
                {project.status === "pending" && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                      onClick={() => handleApprove(project.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={() => setSelectedProject(project)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Decline
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Decline Project</DialogTitle>
                          <DialogDescription>
                            Provide feedback to help the student improve their proposal
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Enter your feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={6}
                          />
                          <Button
                            className="w-full"
                            onClick={() => selectedProject && handleDecline(selectedProject.id, feedback)}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Feedback & Decline
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
