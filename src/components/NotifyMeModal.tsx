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
import { useToast } from "@/hooks/use-toast";

interface NotifyMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

const NotifyMeModal = ({ isOpen, onClose, companyName }: NotifyMeModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add to local storage for demo purposes
    const existingInterests = JSON.parse(localStorage.getItem("myInterests") || "[]");
    const newInterest = {
      company: companyName,
      email,
      dateAdded: new Date().toISOString(),
    };
    
    if (!existingInterests.find((interest: any) => interest.company === companyName)) {
      existingInterests.push(newInterest);
      localStorage.setItem("myInterests", JSON.stringify(existingInterests));
    }
    
    toast({
      title: "Success!",
      description: `You'll be notified when ${companyName} becomes available.`,
    });
    
    setEmail("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Notified</DialogTitle>
          <DialogDescription>
            Enter your email to be notified when {companyName} becomes available for investment.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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