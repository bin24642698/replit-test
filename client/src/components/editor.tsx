import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import debounce from "lodash/debounce";

interface EditorProps {
  chapterId?: number;
  initialContent: string;
}

export function Editor({ chapterId, initialContent }: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const queryClient = useQueryClient();

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const updateChapter = useMutation({
    mutationFn: async (newContent: string) => {
      if (!chapterId) return;
      await apiRequest("PATCH", `/api/chapters/${chapterId}`, {
        content: newContent,
      });
    },
    onSuccess: () => {
      if (chapterId) {
        queryClient.invalidateQueries({ queryKey: [`/api/chapters/${chapterId}`] });
      }
    },
  });

  // 使用防抖优化保存操作
  const debouncedUpdate = useCallback(
    debounce((newContent: string) => {
      updateChapter.mutate(newContent);
    }, 500),
    [updateChapter]
  );

  return (
    <Card className="h-[calc(100vh-8rem)] shadow-sm hover:shadow-md transition-shadow duration-200">
      <textarea
        className="w-full h-full p-6 resize-none border-0 focus:outline-none bg-transparent"
        value={content}
        onChange={(e) => {
          const newContent = e.target.value;
          setContent(newContent);
          debouncedUpdate(newContent);
        }}
        placeholder="开始写作..."
        style={{
          fontSize: '16px',
          lineHeight: '1.75',
        }}
      />
    </Card>
  );
}