import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LogOut, FileText, Send, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  
  // Mock data - will be replaced with actual data from backend
  const [projectStatus, setProjectStatus] = useState<"pending" | "approved" | "declined" | null>("declined");
  const [feedback, setFeedback] = useState("The project topic is too broad. Please narrow down the scope and resubmit.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Project Submitted",
      description: "Your project has been submitted for review",
    });
    setProjectStatus("pending");
    setProjectTitle("");
    setProjectDescription("");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getStatusBadge = () => {
    switch (projectStatus) {
      case "approved":
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />Pending Review</Badge>;
      case "declined":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Declined</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Student Dashboard</h1>
              <p className="text-sm text-muted-foreground">Team Leader: John Doe</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project Submission Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Submit Project Proposal</CardTitle>
              <CardDescription>
                {projectStatus === "declined" 
                  ? "Your previous submission was declined. Please resubmit with a new topic."
                  : "Submit your project details for teacher approval"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your project title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project in detail..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={8}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Submit for Review
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Project Status */}
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                {projectStatus ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Status:</span>
                      {getStatusBadge()}
                    </div>
                    {projectStatus === "declined" && feedback && (
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <h4 className="font-semibold text-destructive mb-2">Teacher Feedback:</h4>
                        <p className="text-sm text-foreground">{feedback}</p>
                      </div>
                    )}
                    {projectStatus === "approved" && (
                      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                        <h4 className="font-semibold text-success mb-2">Congratulations!</h4>
                        <p className="text-sm text-foreground">Your project has been approved. You can now proceed with the implementation.</p>
                      </div>
                    )}
                    {projectStatus === "pending" && (
                      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                        <p className="text-sm text-foreground">Your project is under review. Please wait for teacher's response.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No project submitted yet</p>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Team Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Team Leader:</span>
                  <p className="font-medium">John Doe</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Members:</span>
                  <p className="font-medium">Jane Smith, Mike Johnson, Sarah Williams</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Year:</span>
                  <p className="font-medium">TE (Semester 5)</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Guide Teacher:</span>
                  <p className="font-medium">Dr. Rajesh Kumar</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
