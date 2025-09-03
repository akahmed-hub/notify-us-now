import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Company {
  name: string;
  selected: boolean;
  investmentAmount: string;
}

interface NotifyMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotifyMeModal = ({ isOpen, onClose }: NotifyMeModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([
    { name: "Apptronik", selected: false, investmentAmount: "" },
    { name: "Crusoe", selected: false, investmentAmount: "" },
    { name: "Lightmatter", selected: false, investmentAmount: "" },
  ]);
  const { toast } = useToast();

  const handleCompanyToggle = (index: number) => {
    setCompanies(prev => 
      prev.map((company, i) => 
        i === index ? { ...company, selected: !company.selected } : company
      )
    );
  };

  const handleInvestmentChange = (index: number, amount: string) => {
    setCompanies(prev => 
      prev.map((company, i) => 
        i === index ? { ...company, investmentAmount: amount } : company
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCompanies = companies.filter(company => company.selected);
    if (selectedCompanies.length === 0) {
      toast({
        title: "Please select at least one company",
        description: "Choose which companies you'd like to be notified about.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add to local storage for demo purposes
    const existingInterests = JSON.parse(localStorage.getItem("myInterests") || "[]");
    
    selectedCompanies.forEach(company => {
      const newInterest = {
        company: company.name,
        email,
        investmentAmount: company.investmentAmount,
        dateAdded: new Date().toISOString(),
      };
      
      if (!existingInterests.find((interest: any) => interest.company === company.name)) {
        existingInterests.push(newInterest);
      }
    });
    
    localStorage.setItem("myInterests", JSON.stringify(existingInterests));
    
    toast({
      title: "Success!",
      description: `You'll be notified when ${selectedCompanies.map(c => c.name).join(", ")} become${selectedCompanies.length === 1 ? 's' : ''} available.`,
    });
    
    // Reset form
    setEmail("");
    setCompanies(prev => prev.map(company => ({ ...company, selected: false, investmentAmount: "" })));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Investment Interest</DialogTitle>
          <DialogDescription>
            Select the companies you're interested in and your potential investment amounts.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Companies of Interest</Label>
            {companies.map((company, index) => (
              <div key={company.name} className="flex items-center space-x-4 p-3 border rounded-lg">
                <Checkbox
                  id={`company-${index}`}
                  checked={company.selected}
                  onCheckedChange={() => handleCompanyToggle(index)}
                />
                <Label htmlFor={`company-${index}`} className="flex-1 font-medium">
                  {company.name}
                </Label>
                {company.selected && (
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`investment-${index}`} className="text-sm text-muted-foreground">
                      Investment Amount:
                    </Label>
                    <Input
                      id={`investment-${index}`}
                      type="text"
                      value={company.investmentAmount}
                      onChange={(e) => handleInvestmentChange(index, e.target.value)}
                      placeholder="e.g., $10,000"
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Notify Me"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyMeModal;