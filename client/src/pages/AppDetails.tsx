import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

export default function AppDetails() {
  const [, params] = useRoute("/app/:id");
  const appId = params?.id;

  const { data: app, isLoading } = useQuery({
    queryKey: ['/api/apps', appId],
  });

  // Update document title when app data is loaded
  useEffect(() => {
    if (app) {
      document.title = `${app.name} - Polifilo App Store`;
    }
  }, [app]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 mt-16">
        <div className="container mx-auto max-w-5xl">
          <Link href="/#app-store" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to App Store
          </Link>
          
          {isLoading ? (
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <Skeleton className="w-full md:w-64 h-48 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex items-center gap-2 mb-4">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>
            </div>
          ) : app ? (
            <>
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 h-48 overflow-hidden rounded-lg bg-gray-100">
                      <img 
                        src={app.imageUrl} 
                        alt={app.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1">{app.name}</h1>
                      <p className="text-gray-500 mb-4">{app.category}</p>
                      <p className="text-gray-700 mb-6">{app.description}</p>
                      
                      <div className="flex items-center mb-6">
                        <div className="flex items-center mr-4">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="font-medium">{app.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({app.reviews} reviews)</span>
                        </div>
                        {app.version && (
                          <div className="text-sm text-gray-500">
                            Version {app.version}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Button className="px-6">
                          <Download className="mr-2 h-4 w-4" />
                          {app.isPaid ? `Get for ${app.priceLabel}` : 'Download Free'}
                        </Button>
                        {app.website && (
                          <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="features" className="mt-8">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-heading font-semibold mb-4">App Features</h2>
                  {app.features && app.features.length > 0 ? (
                    <ul className="space-y-3">
                      {app.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5 mr-3">
                            <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No feature information available.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="screenshots" className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-heading font-semibold mb-4">App Screenshots</h2>
                  {app.screenshots && app.screenshots.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {app.screenshots.map((screenshot, index) => (
                        <div key={index} className="rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={screenshot} 
                            alt={`${app.name} screenshot ${index + 1}`} 
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No screenshots available.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="details" className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-heading font-semibold mb-4">App Details</h2>
                  <div className="space-y-4">
                    {app.developer && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Developer</h3>
                        <p>{app.developer}</p>
                        <Separator className="my-2" />
                      </div>
                    )}
                    
                    {app.size && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Size</h3>
                        <p>{app.size}</p>
                        <Separator className="my-2" />
                      </div>
                    )}
                    
                    {app.releaseDate && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Release Date</h3>
                        <p>{app.releaseDate}</p>
                        <Separator className="my-2" />
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Category</h3>
                      <p>{app.category}</p>
                      <Separator className="my-2" />
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Price</h3>
                      <p>{app.isPaid ? app.priceLabel : 'Free'}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h1 className="text-2xl font-heading font-bold mb-4">App Not Found</h1>
                <p className="text-gray-600 mb-6">The app you're looking for doesn't exist or has been removed.</p>
                <Button asChild>
                  <Link href="/#app-store">Return to App Store</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
