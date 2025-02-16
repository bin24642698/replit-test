import { BackButton } from "@/components/back-button";
import { Card, CardHeader } from "@/components/ui/card";
import { BookOpen, Users, Wand2, Globe, Sparkles } from "lucide-react";

const plotFeatures = [
  { icon: <BookOpen className="h-6 w-6" />, title: "大纲设计" },
  { icon: <Sparkles className="h-6 w-6" />, title: "细纲设计" },
  { icon: <Wand2 className="h-6 w-6" />, title: "金手指设计" },
  { icon: <Users className="h-6 w-6" />, title: "人物设计" },
  { icon: <Globe className="h-6 w-6" />, title: "世界观设计" },
];

export default function Plot() {
  return (
    <div className="min-h-screen bg-background p-8">
      <BackButton />
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">剧情设计</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plotFeatures.map((feature) => (
            <Card key={feature.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-primary">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">功能开发中</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
