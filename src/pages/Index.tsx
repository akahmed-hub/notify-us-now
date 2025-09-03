import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import AccordionCompanyCard from "@/components/AccordionCompanyCard";
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
    detailedDescription: "Apptronik is revolutionizing the robotics industry with their general-purpose humanoid robots designed for both commercial and industrial applications. Their cutting-edge technology focuses on creating robots that can seamlessly integrate into human environments, performing complex tasks with precision and reliability. The company's innovative approach combines advanced AI, sophisticated sensors, and robust mechanical engineering to deliver robots that are not only functional but also safe to work alongside humans. With applications ranging from warehouse automation to healthcare assistance, Apptronik is positioned to transform multiple industries through their groundbreaking robotic solutions.",
    sector: "Robotics",
    stage: "Series B",
    image: apptronikImage,
  },
  {
    name: "Crusoe",
    description: "Sustainable data center infrastructure powered by stranded energy sources, enabling efficient cloud computing.",
    detailedDescription: "Crusoe is pioneering a new approach to cloud computing by building sustainable data center infrastructure that harnesses stranded energy sources. Their innovative model reduces both environmental impact and operational costs by utilizing energy that would otherwise be wasted, such as flared natural gas or excess renewable energy. This approach enables them to provide high-performance computing services while significantly reducing the carbon footprint typically associated with data centers. Their technology stack is optimized for energy efficiency and can dynamically scale based on available energy resources, making them a leader in sustainable cloud infrastructure solutions.",
    sector: "Energy Tech",
    stage: "Series C",
    image: crusoeImage,
  },
  {
    name: "Lightmatter",
    description: "Photonic computing pioneer creating AI accelerators using light to dramatically reduce power consumption.",
    detailedDescription: "Lightmatter is at the forefront of photonic computing technology, developing revolutionary AI accelerators that use light instead of electrons to process information. This breakthrough approach dramatically reduces power consumption while significantly increasing computational speed, making it ideal for AI and machine learning applications. Their photonic chips can perform complex calculations at the speed of light with minimal heat generation, solving one of the biggest challenges in modern computing. The company's technology has applications across data centers, edge computing, and autonomous systems, positioning them to lead the next generation of computing infrastructure.",
    sector: "Hardware",
    stage: "Series D",
    image: lightmatterImage,
  },
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleNotifyMe = () => {
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

      {/* Investment Opportunities Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Investment Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover pioneering companies at the forefront of robotics, sustainable energy, 
              and next-generation computing.
            </p>
          </div>
          
          <div className="space-y-6 mb-12">
            {companies.map((company, index) => (
              <AccordionCompanyCard
                key={company.name}
                {...company}
                index={index}
              />
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleNotifyMe}
              className="group bg-primary hover:bg-primary-hover"
            >
              Get Notified About Investment Opportunities
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
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
      />
    </div>
  );
};

export default Index;