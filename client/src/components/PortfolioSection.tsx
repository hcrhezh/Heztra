import { ArrowRight } from "lucide-react";
import { PortfolioItem } from "@/types";
import { motion } from "framer-motion";

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
}

export default function PortfolioSection({ portfolioItems }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Portfolio Showcase</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest projects and creative work that demonstrates our expertise in design and development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-medium transition-colors"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

function PortfolioCard({ item, index }: PortfolioCardProps) {
  return (
    <motion.div 
      className="card-hover rounded-xl overflow-hidden shadow-md bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <span className={`text-xs font-medium ${
          index % 2 === 0 ? 'text-primary' : 'text-secondary'
        } uppercase tracking-wider`}>
          {item.category}
        </span>
        <h3 className="text-xl font-heading font-bold mt-2 mb-3">{item.title}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {item.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <a 
            href={item.projectUrl} 
            className="text-primary hover:text-primary/80 font-medium flex items-center"
          >
            View Project <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
