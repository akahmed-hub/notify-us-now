import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CompanyCardProps {
  name: string;
  description: string;
  sector: string;
  stage: string;
  image: string;
  available: boolean;
  onNotifyMe: () => void;
}

const CompanyCard = ({ 
  name, 
  description, 
  sector, 
  stage, 
  image, 
  available, 
  onNotifyMe 
}: CompanyCardProps) => {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 overflow-hidden border-border bg-surface-elevated">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <Badge variant="secondary" className="text-xs font-medium">
            {stage}
          </Badge>
        </div>
        
        <p className="text-text-subtle text-sm mb-3 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {sector}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={onNotifyMe}
          disabled={available}
          variant={available ? "secondary" : "default"}
          className="w-full"
        >
          {available ? "Learn More" : "Notify Me"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;