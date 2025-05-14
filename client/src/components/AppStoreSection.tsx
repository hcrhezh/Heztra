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

interface AppCardProps {
  app: App;
  index: number;
}

// Compact app card for sponsored section
function AppCardCompact({ app, index }: AppCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center p-2 bg-white dark:bg-gray-800 rounded-lg"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img 
          src={app.imageUrl} 
          alt={app.name} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm dark:text-white">{app.name}</h4>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {app.category} • {app.isPaid ? app.price : "Free"}
        </div>
        <div className="flex items-center mt-1">
          <div className="text-xs text-gray-600 dark:text-gray-300 mr-1">{app.rating.toFixed(1)}</div>
          <div className="text-xs text-gray-400">★</div>
        </div>
      </div>
      <button 
        className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300"
      >
        {app.isPaid ? "Buy" : "Install"}
      </button>
    </motion.div>
  );
}

export default function AppStoreSection({ apps }: AppStoreSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", label: "For you" },
    { id: "topcharts", label: "Top charts" },
    { id: "children", label: "Children" },
    { id: "categories", label: "Categories" }
  ];
  
  const filteredApps = activeCategory === "all" 
    ? apps 
    : apps.filter(app => app.category.toLowerCase().includes(activeCategory));
  
  return (
    <section id="app-store" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">App Store</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover and download top-rated apps for your everyday needs
          </p>
        </div>
        
        {/* Category filters - Google Play Store style */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <div className="flex space-x-8 mx-auto">
            {categories.map(category => (
              <button
                key={category.id}
                className={`whitespace-nowrap py-2 px-1 text-gray-700 dark:text-gray-200 font-medium transition-colors border-b-2 ${
                  activeCategory === category.id 
                    ? 'border-blue-500 text-blue-500 dark:text-blue-400' 
                    : 'border-transparent'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sponsored section */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-8">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Sponsored • Suggested for you</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredApps.slice(0, 2).map((app, index) => (
              <AppCardCompact key={`sponsored-${app.id}`} app={app} index={index} />
            ))}
          </div>
        </div>
        
        {/* Main app list - Google Play style */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium dark:text-white">Recommended for you</h3>
            <a href="#" className="text-blue-500 dark:text-blue-400">
              <span className="mr-1">→</span>
            </a>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence>
              {filteredApps.map((app, index) => (
                <AppCardRow key={app.id} app={app} index={index} />
              ))}
            </AnimatePresence>
          </div>
          
          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">No apps found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try selecting a different category</p>
            </div>
          )}
        </div>
        
        {/* Bottom navigation - Google Play style */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3 z-40 md:hidden">
          <div className="container mx-auto">
            <div className="flex justify-around">
              <a href="#" className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                  <path d="M12 17v-6"></path>
                  <path d="M9 11l3-3 3 3"></path>
                </svg>
                <span className="text-xs mt-1">Games</span>
              </a>
              <a href="#" className="flex flex-col items-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span className="text-xs mt-1">Apps</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span className="text-xs mt-1">Search</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Google Play Style Row App Card
function AppCardRow({ app, index }: AppCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        layout: { type: "spring", damping: 20, stiffness: 100 }
      }}
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800"
    >
      <div className="p-3">
        <div className="flex items-start">
          <div className="h-16 w-16 rounded-xl bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0 mr-4">
            <img 
              src={app.imageUrl} 
              alt={app.name} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium mb-1 dark:text-white">{app.name}</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {app.category} • {app.developer || "Polifilo Inc"}
            </div>
            <div className="flex items-center">
              <div className="text-xs text-gray-600 dark:text-gray-300 mr-1">{app.rating.toFixed(1)}</div>
              <div className="text-xs text-gray-400">★</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">{app.size || "14 MB"}</div>
            </div>
          </div>
          <button 
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              app.isPaid 
                ? 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300' 
                : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300'
            }`}
          >
            {app.isPaid ? `${app.price}` : "Install"}
          </button>
        </div>
        
        <div className="mt-3">
          <button 
            className="text-blue-500 text-sm font-medium flex items-center focus:outline-none"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Details" : "Show Details"}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                {/* App details similar to Screenshot 2 */}
                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <div className="mr-6">
                      <div className="text-2xl font-medium dark:text-white">{app.rating.toFixed(1)}</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-3 w-3 ${i < Math.floor(app.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{app.reviews.toLocaleString()} reviews</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium dark:text-white">500M+</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Downloads</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-xs">
                      #{app.category}
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-xs">
                      Online marketplace
                    </div>
                  </div>
                  
                  <div className="bg-blue-500 text-white rounded-full py-2 text-center mb-4">
                    {app.isPaid ? `Buy ${app.price}` : "Install"}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{app.description}</p>
                  
                  {(app.screenshots && app.screenshots.length > 0) && (
                    <div className="mb-4">
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {app.screenshots.map((screenshot, i) => (
                          <div key={i} className="flex-shrink-0 w-32 h-60 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                            <img 
                              src={screenshot} 
                              alt={`${app.name} screenshot ${i+1}`} 
                              className="w-full h-full object-cover" 
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-2 dark:text-white">About this app</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {app.description}
                    </p>
                    
                    <h4 className="font-medium mb-2 dark:text-white">Rate this app</h4>
                    <div className="flex space-x-3 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="text-2xl text-gray-300 dark:text-gray-600">★</div>
                      ))}
                    </div>
                    
                    <button className="text-blue-500 text-sm">Write a review</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Card style app card for grid layouts
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
