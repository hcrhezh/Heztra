import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Info, ShoppingCart, Download } from "lucide-react";
import { App } from "@/types";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <section id="app-store" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Discover Our Apps</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our collection of innovative mobile applications designed to enhance your daily life.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn px-5 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium transition-colors ${
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
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">No apps found in this category</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try selecting a different category</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-block bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-8 py-3 rounded-full font-medium transition-colors"
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
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <motion.div
      className="app-card bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md"
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
            <h3 className="text-xl font-heading font-bold dark:text-white">{app.name}</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">{app.category}</p>
          </div>
          <Badge className={`${
            app.isPaid 
              ? "bg-primary/10 text-primary dark:bg-primary/20" 
              : "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400"
          } px-3 py-1 rounded-full text-xs font-medium`}>
            {app.priceLabel}
          </Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{app.description}</p>
        
        <div className="flex items-center space-x-1 mb-4">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">{app.rating}</span>
          <span className="text-gray-400 dark:text-gray-500 text-xs">({app.reviews} reviews)</span>
          
          {app.version && (
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">v{app.version}</span>
          )}
        </div>
        
        {/* App details section (expandable) */}
        {showDetails && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="bg-gray-50 dark:bg-gray-600/50 p-3 rounded-lg mb-4">
              {app.features && app.features.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {app.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-1">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {app.developer && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Developer:</span> {app.developer}
                </div>
              )}
              
              {app.size && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Size:</span> {app.size}
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 dark:text-gray-300"
            onClick={toggleDetails}
          >
            <Info className="h-4 w-4 mr-1" />
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
          
          <div className="flex space-x-2">
            {app.isPaid ? (
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Buy
              </Button>
            ) : (
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
            
            <Link href={`/app/${app.id}`}>
              <Button variant="outline">
                View App
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
