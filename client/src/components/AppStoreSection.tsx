import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { App } from "@/types";
import { Link } from "wouter";

interface AppStoreSectionProps {
  apps: App[];
}

export default function AppStoreSection({ apps }: AppStoreSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", label: "All Apps" },
    { id: "productivity", label: "Productivity" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "health", label: "Health & Fitness" },
    { id: "entertainment", label: "Entertainment" }
  ];
  
  const filteredApps = activeCategory === "all" 
    ? apps 
    : apps.filter(app => app.category.toLowerCase().includes(activeCategory));
  
  return (
    <section id="app-store" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Discover Our Apps</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of innovative mobile applications designed to enhance your daily life.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn px-5 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium transition-colors ${
                activeCategory === category.id ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* App grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredApps.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} />
            ))}
          </AnimatePresence>
          
          {filteredApps.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No apps found in this category</h3>
              <p className="text-gray-500 mt-2">Try selecting a different category</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-medium transition-colors"
          >
            View All Apps
          </a>
        </div>
      </div>
    </section>
  );
}

interface AppCardProps {
  app: App;
  index: number;
}

function AppCard({ app, index }: AppCardProps) {
  return (
    <motion.div
      className="app-card bg-white rounded-xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <img 
        src={app.imageUrl} 
        alt={app.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-heading font-bold">{app.name}</h3>
            <p className="text-gray-500 text-sm">{app.category}</p>
          </div>
          <span className={`${
            app.isPaid 
              ? "bg-primary/10 text-primary" 
              : "bg-success/10 text-success"
          } px-3 py-1 rounded-full text-xs font-medium`}>
            {app.priceLabel}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{app.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{app.rating}</span>
            <span className="text-gray-400 text-xs ml-1">({app.reviews} reviews)</span>
          </div>
          <Link href={`/app/${app.id}`}>
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Get App
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
