import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AccordionCompanyCardProps {
  name: string;
  description: string;
  detailedDescription: string;
  sector: string;
  stage: string;
  image: string;
  index: number;
}

const AccordionCompanyCard = ({
  name,
  description,
  detailedDescription,
  sector,
  stage,
  image,
  index,
}: AccordionCompanyCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getGradientClass = (companyName: string) => {
    switch (companyName.toLowerCase()) {
      case "apptronik":
        return "bg-gradient-to-br from-blue-400/80 via-purple-500/80 to-pink-400/80";
      case "crusoe":
        return "bg-gradient-to-br from-green-400/80 via-teal-500/80 to-blue-400/80";
      case "lightmatter":
        return "bg-gradient-to-br from-yellow-400/80 via-orange-500/80 to-red-400/80";
      default:
        return "bg-gradient-to-br from-gray-400/80 via-gray-500/80 to-gray-600/80";
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative min-h-[200px] overflow-hidden rounded-lg group">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-sm" />
          <div className={`absolute inset-0 ${getGradientClass(name)}`} />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 text-white h-full flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-6xl font-bold opacity-50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-3xl font-bold mb-2">{name}</h3>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {sector}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {stage}
                  </Badge>
                </div>
                <p className="text-lg text-white/90 max-w-2xl">{description}</p>
              </div>
            </div>

            <CollapsibleTrigger asChild>
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                {isOpen ? (
                  <Minus className="w-6 h-6 text-white" />
                ) : (
                  <Plus className="w-6 h-6 text-white" />
                )}
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="pt-6">
            <div className="border-t border-white/20 pt-6">
              <p className="text-white/90 text-base leading-relaxed max-w-4xl">
                {detailedDescription}
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  );
};

export default AccordionCompanyCard;