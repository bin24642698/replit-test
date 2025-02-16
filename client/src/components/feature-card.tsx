import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
}

export function FeatureCard({ icon, title, description, disabled }: FeatureCardProps) {
  return (
    <Card className={cn(
      "transition-all duration-200 cursor-pointer hover:shadow-lg",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="text-primary">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
