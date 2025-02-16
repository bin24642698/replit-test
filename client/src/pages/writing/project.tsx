import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { BackButton } from "@/components/back-button";
import { ChapterList } from "@/components/chapter-list";
import { Editor } from "@/components/editor";
import { AITools } from "@/components/ai-tools";
import type { Project, Chapter } from "@shared/schema";

export default function ProjectPage() {
  const { id } = useParams();
  const projectId = parseInt(id!);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const { data: project } = useQuery<Project>({
    queryKey: [`/api/projects/${projectId}`],
    enabled: !!projectId,
  });

  const { data: chapters } = useQuery<Chapter[]>({
    queryKey: [`/api/projects/${projectId}/chapters`],
    enabled: !!projectId,
  });

  const { data: chapter } = useQuery<Chapter>({
    queryKey: [`/api/chapters/${selectedChapter?.id}`],
    enabled: !!selectedChapter?.id,
  });

  useEffect(() => {
    if (chapters?.length && !selectedChapter) {
      setSelectedChapter(chapters[0]);
    }
  }, [chapters, selectedChapter]);

  if (!project || !chapters) return <div>加载中...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <div className="h-14 bg-card border-b sticky top-0 z-50 backdrop-blur-md bg-background/80">
        <div className="container h-full mx-auto px-4 flex items-center gap-4">
          <BackButton />
          <h1 className="text-lg font-medium">{project.name}</h1>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4">
        <div className="flex gap-4 pt-4">
          <ChapterList 
            projectId={projectId} 
            chapters={chapters} 
            selectedChapterId={selectedChapter?.id}
            onSelectChapter={setSelectedChapter}
          />
          <div className="flex-1 flex gap-4">
            <div className="flex-1">
              <Editor 
                chapterId={selectedChapter?.id} 
                initialContent={chapter?.content || ''}
              />
            </div>
            <AITools selectedChapter={selectedChapter} />
          </div>
        </div>
      </div>
    </div>
  );
}