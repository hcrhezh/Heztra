import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import AppStoreSection from "@/components/AppStoreSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: portfolioData, isLoading: portfolioLoading } = useQuery<any[]>({
    queryKey: ['/api/portfolio'],
  });

  const { data: appsData, isLoading: appsLoading } = useQuery<any[]>({
    queryKey: ['/api/apps'],
  });

  // Update the document title
  useEffect(() => {
    document.title = "Polifilo - Portfolio & App Store";
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      <Navbar />
      <HeroSection />
      
      {/* App Store section - moved to top after hero */}
      {appsLoading ? (
        <div className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
            </div>
            <Skeleton className="h-10 w-full max-w-md mx-auto mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Skeleton className="h-6 w-32 mb-1" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <AppStoreSection apps={appsData || [] as any[]} />
          <div className="container mx-auto px-4 py-10 text-center bg-white dark:bg-gray-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Visit Our Full Play Store</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Check out our pure HTML/CSS/JS implementation of the Google Play Store with 50 featured apps</p>
            <a 
              href="/playstore.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Launch Play Store
            </a>
          </div>
        </>
      )}
      
      {portfolioLoading ? (
        <div className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-700">
                  <Skeleton className="w-full h-64" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <PortfolioSection portfolioItems={portfolioData || [] as any[]} />
      )}
      
      <AboutSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
