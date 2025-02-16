import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [, setLocation] = useLocation();
  const [newProjectName, setNewProjectName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const createProject = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiRequest("POST", "/api/projects", { name });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setNewProjectName("");
      setIsDialogOpen(false);
      // 创建成功后直接进入项目
      setLocation(`/writing/${data.id}`);
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
  });

  return (
    <div className="min-h-screen bg-background p-8">
      <BackButton />
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">我的项目</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="p-6 mb-6 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 justify-center">
                <Plus className="h-5 w-5" />
                <span>创建新项目</span>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建新项目</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="项目名称"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <Button
                onClick={() => createProject.mutate(newProjectName)}
                disabled={!newProjectName || createProject.isPending}
              >
                {createProject.isPending ? "创建中..." : "创建"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-lg text-muted-foreground">加载中...</p>
          </div>
        ) : projects?.length === 0 ? (
          <Card className="p-6">
            <div className="text-center text-muted-foreground">
              <p>还没有项目，创建一个新项目开始写作吧！</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map((project) => (
              <Card 
                key={project.id} 
                className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setLocation(`/writing/${project.id}`)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium hover:text-primary">
                    {project.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject.mutate(project.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}