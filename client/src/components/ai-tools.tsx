import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pen, BarChart2, Map, Copy, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIToolsProps {
  selectedChapter?: {
    id: number;
    title: string;
    content: string;
  };
}

export function AITools({ selectedChapter }: AIToolsProps) {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [showGeneratedContent, setShowGeneratedContent] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState("");

  const handleGenerate = () => {
    setIsStreaming(true);
    setShowGeneratedContent(true);
    setStreamContent("");

    // 模拟流式输出效果
    const content = "这是一段AI生成的测试内容，模拟流式输出效果。每个字符会逐个显示出来，创造打字机效果。";
    let index = 0;

    const timer = setInterval(() => {
      if (index < content.length) {
        setStreamContent(prev => prev + content[index]);
        index++;
      } else {
        clearInterval(timer);
        setIsStreaming(false);
        setGeneratedContent(content);
      }
    }, 50);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleBack = () => {
    setShowGeneratedContent(false);
  };

  const tools = [
    { id: "writing", icon: <Pen className="h-5 w-5" />, title: "写作" },
    { id: "analysis", icon: <BarChart2 className="h-5 w-5" />, title: "分析" },
    { id: "map", icon: <Map className="h-5 w-5" />, title: "创作地图" },
  ];

  return (
    <div className="w-64 border-l bg-card p-4">
      <div className="space-y-2">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant="outline"
            className="w-full justify-start gap-2 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:bg-primary/10"
            onClick={() => {
              setOpenDialog(tool.id);
              setShowGeneratedContent(false);
            }}
          >
            <div className="text-primary">{tool.icon}</div>
            <span>{tool.title}</span>
          </Button>
        ))}
      </div>

      <Dialog open={openDialog === "writing"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-6xl backdrop-blur-md bg-background/80">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center mb-6">AI写作助手</DialogTitle>
          </DialogHeader>

          {!showGeneratedContent ? (
            <>
              <div className="flex items-center justify-between mb-8 px-4 py-3 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Label className="font-medium">高级功能</Label>
                  <Switch
                    checked={advancedMode}
                    onCheckedChange={setAdvancedMode}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
                <span className="text-sm text-muted-foreground max-w-[70%]">
                  启用后可使用更多高级设置提升AI创作质量
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <div className="p-4 border-b bg-muted/50">
                    <h3 className="font-semibold">当前章节内容</h3>
                  </div>
                  <ScrollArea className="h-[500px] p-4">
                    <div className="prose prose-sm">
                      {selectedChapter?.content ||
                        <div className="text-muted-foreground text-center py-8">
                          请先选择一个章节
                        </div>
                      }
                    </div>
                  </ScrollArea>
                </Card>

                <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <div className="p-4 border-b bg-muted/50">
                    <h3 className="font-semibold">写作设置</h3>
                  </div>
                  <ScrollArea className="h-[500px]">
                    <div className="p-4 space-y-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">选择模型</Label>
                        <Select>
                          <SelectTrigger className="w-full transition-colors hover:border-primary focus:ring-primary">
                            <SelectValue placeholder="选择AI模型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">提示词设置</Label>
                        <Input
                          placeholder="输入提示词"
                          className="transition-colors hover:border-primary focus:ring-primary"
                        />
                      </div>

                      {advancedMode && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">人物设置</Label>
                            <Select>
                              <SelectTrigger className="w-full transition-colors hover:border-primary">
                                <SelectValue placeholder="选择角色" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="char1">角色1</SelectItem>
                                <SelectItem value="char2">角色2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">名词设置</Label>
                            <Select>
                              <SelectTrigger className="w-full transition-colors hover:border-primary">
                                <SelectValue placeholder="选择名词" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="term1">名词1</SelectItem>
                                <SelectItem value="term2">名词2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">关联章节</Label>
                            <Select>
                              <SelectTrigger className="w-full transition-colors hover:border-primary">
                                <SelectValue placeholder="选择关联章节" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="chapter1">章节1</SelectItem>
                                <SelectItem value="chapter2">章节2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">关联档案</Label>
                            <Select>
                              <SelectTrigger className="w-full transition-colors hover:border-primary">
                                <SelectValue placeholder="选择关联档案" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="file1">档案1</SelectItem>
                                <SelectItem value="file2">档案2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t bg-muted/50">
                    <Button
                      onClick={handleGenerate}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      开始生成
                    </Button>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="p-4 border-b bg-muted/50">
                  <h3 className="font-semibold">生成结果</h3>
                </div>
                <ScrollArea className="h-[500px] p-4">
                  <div className="prose prose-sm">
                    {isStreaming ? streamContent : generatedContent}
                    {isStreaming && (
                      <span className="inline-block w-1 h-4 ml-1 bg-primary animate-pulse" />
                    )}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-muted/50 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="hover:bg-primary/10 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回编辑
                  </Button>
                  <Button
                    onClick={handleCopy}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    复制内容
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "analysis"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-6xl backdrop-blur-md bg-background/80">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center mb-6">AI分析助手</DialogTitle>
          </DialogHeader>

          {!showGeneratedContent ? (
            <div className="grid grid-cols-2 gap-8">
              <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="p-4 border-b bg-muted/50">
                  <h3 className="font-semibold">当前章节内容</h3>
                </div>
                <ScrollArea className="h-[500px] p-4">
                  <div className="prose prose-sm">
                    {selectedChapter?.content ||
                      <div className="text-muted-foreground text-center py-8">
                        请先选择一个章节
                      </div>
                    }
                  </div>
                </ScrollArea>
              </Card>

              <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="p-4 border-b bg-muted/50">
                  <h3 className="font-semibold">分析设置</h3>
                </div>
                <ScrollArea className="h-[500px]">
                  <div className="p-4 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">选择模型</Label>
                      <Select>
                        <SelectTrigger className="w-full transition-colors hover:border-primary">
                          <SelectValue placeholder="选择AI模型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">分析方法</Label>
                      <Select>
                        <SelectTrigger className="w-full transition-colors hover:border-primary">
                          <SelectValue placeholder="选择分析方法" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakdown">拆书</SelectItem>
                          <SelectItem value="analysis">分析</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">提示词设置</Label>
                      <Input
                        placeholder="输入提示词"
                        className="transition-colors hover:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                </ScrollArea>

                <div className="p-4 border-t bg-muted/50">
                  <Button
                    onClick={handleGenerate}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    开始分析
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="p-4 border-b bg-muted/50">
                  <h3 className="font-semibold">分析结果</h3>
                </div>
                <ScrollArea className="h-[500px] p-4">
                  <div className="prose prose-sm">
                    {generatedContent}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-muted/50 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="hover:bg-primary/10 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回编辑
                  </Button>
                  <Button
                    onClick={handleCopy}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    复制内容
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "map"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="backdrop-blur-md bg-background/80">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center mb-6">创作地图</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <div className="text-center space-y-2">
              <Map className="h-12 w-12 mx-auto opacity-50" />
              <p>功能正在开发中，即将上线</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}