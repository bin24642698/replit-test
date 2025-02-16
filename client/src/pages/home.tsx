import { Link } from "wouter";
import { FeatureCard } from "@/components/feature-card";
import { Pencil, Book, Archive, Image } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">知夏写作网</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link href="/writing">
            <FeatureCard
              icon={<Pencil className="h-8 w-8" />}
              title="开始写作"
              description="创建新项目或继续已有作品"
            />
          </Link>
          <Link href="/plot">
            <FeatureCard
              icon={<Book className="h-8 w-8" />}
              title="剧情设计"
              description="大纲、人物、世界观设计"
            />
          </Link>
          <FeatureCard
            icon={<Archive className="h-8 w-8" />}
            title="档案管理"
            description="功能开发中"
            disabled
          />
          <FeatureCard
            icon={<Image className="h-8 w-8" />}
            title="制作封面"
            description="功能开发中"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
