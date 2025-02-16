import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, GripVertical, Trash2, Edit2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Chapter } from "@shared/schema";

interface ChapterListProps {
  projectId: number;
  chapters: Chapter[];
  selectedChapterId?: number | null;
  onSelectChapter: (chapter: Chapter) => void;
}

export function ChapterList({ projectId, chapters, selectedChapterId, onSelectChapter }: ChapterListProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const queryClient = useQueryClient();

  const createChapter = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/projects/${projectId}/chapters`, {
        title: "新章节",
        order: chapters.length,
        content: "",
        projectId,
      });
      return res.json();
    },
    onSuccess: (newChapter) => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/chapters`] });
      onSelectChapter(newChapter);
    },
  });

  const deleteChapter = useMutation({
    mutationFn: async (chapterId: number) => {
      await apiRequest("DELETE", `/api/chapters/${chapterId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/chapters`] });
    },
  });

  return (
    <div className="w-64 border-r bg-card">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" title="章节排序">
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            onClick={() => createChapter.mutate()}
            title="添加章节"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-2">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`p-3 rounded-md hover:bg-accent group flex items-center justify-between cursor-pointer ${
                selectedChapterId === chapter.id ? "bg-accent" : ""
              }`}
              onClick={() => onSelectChapter(chapter)}
            >
              <span className="flex-1">{chapter.title}</span>
              <div className="space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingTitle(true);
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChapter.mutate(chapter.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}