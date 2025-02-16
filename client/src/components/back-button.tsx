import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const [location, setLocation] = useLocation();

  const handleBack = () => {
    // 根据当前路径决定返回的目标路径
    if (location.startsWith('/writing/')) {
      setLocation('/writing');
    } else {
      setLocation('/');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 left-4"
      onClick={handleBack}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}