import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CompanyCard from "@/components/CompanyCard";
import NotifyMeModal from "@/components/NotifyMeModal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import apptronikImage from "@/assets/apptronik-hero.jpg";
import crusoeImage from "@/assets/crusoe-hero.jpg";
import lightmatterImage from "@/assets/lightmatter-hero.jpg";

const companies = [
  {
    name: "Apptronik",
    description: "Advanced robotics company developing general-purpose humanoid robots for commercial and industrial applications.",
    sector: "Robotics",
    stage: "Series B",
    image: apptronikImage,
    available: false,
  },
  {
    name: "Crusoe",
    description: "Sustainable data center infrastructure powered by stranded energy sources, enabling efficient cloud computing.",
    sector: "Energy Tech",
    stage: "Series C",
    image: crusoeImage,
    available: false,
  },
  {
    name: "Lightmatter",
    description: "Photonic computing pioneer creating AI accelerators using light to dramatically reduce power consumption.",
    sector: "Hardware",
    stage: "Series D",
    image: lightmatterImage,
    available: false,
  },
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleNotifyMe = (companyName: string) => {
    setSelectedCompany(companyName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Invest in the Future
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Access exclusive investment opportunities in cutting-edge technology companies 
            shaping tomorrow's world.
          </p>
          <Link to="/profile">
            <Button size="lg" className="group">
              View My Profile
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Investment Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover pioneering companies at the forefront of robotics, sustainable energy, 
              and next-generation computing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <CompanyCard
                key={company.name}
                {...company}
                onNotifyMe={() => handleNotifyMe(company.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-surface-elevated">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-muted-foreground mb-8">
            Get notified when new investment opportunities become available
          </p>
          <Link to="/profile">
            <Button variant="outline" size="lg">
              Manage My Interests
            </Button>
          </Link>
        </div>
      </section>

      <NotifyMeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        companyName={selectedCompany}
      />
    </div>
  );
};

export default Index;