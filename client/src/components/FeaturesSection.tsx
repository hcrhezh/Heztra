import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Palette, 
  Code, 
  FlaskRound, 
  Rocket, 
  Headphones 
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Lightbulb className="text-primary text-xl" />,
      title: "Discovery & Planning",
      description: "We start by understanding your goals, audience, and requirements to create a strategic roadmap."
    },
    {
      icon: <Palette className="text-primary text-xl" />,
      title: "UI/UX Design",
      description: "Our designers create intuitive and visually appealing interfaces that enhance user experience."
    },
    {
      icon: <Code className="text-primary text-xl" />,
      title: "Development",
      description: "Our engineers write clean, efficient code that brings your designs to life with optimal performance."
    },
    {
      icon: <FlaskRound className="text-primary text-xl" />,
      title: "Testing & QA",
      description: "Rigorous testing ensures your application works flawlessly across all devices and platforms."
    },
    {
      icon: <Rocket className="text-primary text-xl" />,
      title: "Deployment",
      description: "We handle the launch process to ensure a smooth transition from development to production."
    },
    {
      icon: <Headphones className="text-primary text-xl" />,
      title: "Support & Maintenance",
      description: "Our relationship continues after launch with ongoing support and updates to keep everything running smoothly."
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Development Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We follow a comprehensive approach to ensure your project is delivered with the highest quality standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
