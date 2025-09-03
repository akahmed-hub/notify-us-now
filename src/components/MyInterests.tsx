import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Interest {
  company: string;
  email: string;
  dateAdded: string;
}

const MyInterests = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedInterests = JSON.parse(localStorage.getItem("myInterests") || "[]");
    setInterests(savedInterests);
  }, []);

  const removeInterest = (companyName: string) => {
    const updatedInterests = interests.filter(interest => interest.company !== companyName);
    setInterests(updatedInterests);
    localStorage.setItem("myInterests", JSON.stringify(updatedInterests));
    
    toast({
      title: "Removed",
      description: `Removed ${companyName} from your interests.`,
    });
  };

  if (interests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          You haven't signed up for any notifications yet.
        </p>
        <p className="text-sm text-text-subtle mt-2">
          Browse companies and click "Notify Me" to get updates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6">My Interests</h2>
      
      <div className="grid gap-4">
        {interests.map((interest) => (
          <Card key={interest.company} className="border-border bg-surface-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">
                    {interest.company}
                  </h3>
                  <p className="text-sm text-text-subtle mb-2">
                    Notification email: {interest.email}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Added {new Date(interest.dateAdded).toLocaleDateString()}
                  </Badge>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInterest(interest.company)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyInterests;