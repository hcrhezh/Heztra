import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  function onSubmit(data: ContactFormValues) {
    console.log("Form submitted:", data);
    
    // Since we're using GitHub Pages (static hosting), we'll simulate 
    // form submission with a success message
    // In a real implementation, you would use a form service or serverless function
    
    // Show loading toast
    toast({
      title: "Sending message...",
      description: "Please wait while we process your message.",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: `Thank you for your message. An email has been sent from officialcustomerss@gmail.com and we'll get back to you soon.`,
      });
      
      form.reset();
    }, 1500);
  }
  
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to learn more about our services? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="hidden lg:block">
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Fill out the form and we'll get back to you shortly. Your message will be sent from officialcustomerss@gmail.com.
              </p>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon={<MapPin className="text-primary" />}
                  title="Our Location"
                  content="123 Innovation Drive, Tech City, CA 94103"
                />
                
                <ContactInfo 
                  icon={<Mail className="text-primary" />}
                  title="Email Us"
                  content="hello@polifilo.com"
                />
                
                <ContactInfo 
                  icon={<Phone className="text-primary" />}
                  title="Call Us"
                  content="+1 (555) 123-4567"
                />
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-medium mb-4 dark:text-white">Connect With Us</h4>
                <div className="flex space-x-4">
                  <SocialLink href="#" icon="twitter" />
                  <SocialLink href="#" icon="facebook" />
                  <SocialLink href="#" icon="instagram" />
                  <SocialLink href="#" icon="linkedin" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-md"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="h-14 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Input 
                          placeholder="Your email" 
                          {...field} 
                          className="h-14 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Input 
                          placeholder="Subject" 
                          {...field} 
                          className="h-14 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          rows={5} 
                          {...field} 
                          className="min-h-[150px] dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-5 h-14 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

function ContactInfo({ icon, title, content }: ContactInfoProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-xl mt-1">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-medium mb-1 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{content}</p>
      </div>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: string;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  // Map icon names to React components
  const iconMap: Record<string, JSX.Element> = {
    twitter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46,6c-0.77,0.35-1.6,0.58-2.46,0.69c0.88-0.53,1.56-1.37,1.88-2.38c-0.83,0.5-1.75,0.85-2.72,1.05C18.37,4.5,17.26,4,16,4c-2.35,0-4.27,1.92-4.27,4.29c0,0.34,0.04,0.67,0.11,0.98C8.28,9.09,5.11,7.38,3,4.79c-0.37,0.63-0.58,1.37-0.58,2.15c0,1.49,0.75,2.81,1.91,3.56c-0.71,0-1.37-0.2-1.95-0.5c0,0.02,0,0.03,0,0.05c0,2.08,1.48,3.82,3.44,4.21c-0.36,0.1-0.74,0.15-1.13,0.15c-0.27,0-0.54-0.03-0.8-0.08c0.54,1.69,2.11,2.95,3.98,2.98c-1.46,1.16-3.3,1.84-5.33,1.84c-0.35,0-0.69-0.02-1.03-0.06c1.9,1.22,4.16,1.93,6.58,1.93c7.88,0,12.21-6.54,12.21-12.21c0-0.19,0-0.37-0.01-0.56C21.18,7.63,21.88,6.87,22.46,6z"></path></svg>,
    facebook: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z"></path></svg>,
    instagram: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2.982c2.937,0,3.285.011,4.445.064a6.072,6.072,0,0,1,2.042.379,3.4,3.4,0,0,1,1.265.823,3.4,3.4,0,0,1,.823,1.265,6.072,6.072,0,0,1,.379,2.042c.053,1.16.064,1.508.064,4.445s-.011,3.285-.064,4.445a6.072,6.072,0,0,1-.379,2.042,3.644,3.644,0,0,1-2.088,2.088,6.072,6.072,0,0,1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.072,6.072,0,0,1-2.042-.379,3.4,3.4,0,0,1-1.265-.823,3.4,3.4,0,0,1-.823-1.265,6.072,6.072,0,0,1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.072,6.072,0,0,1,.379-2.042,3.4,3.4,0,0,1,.823-1.265,3.4,3.4,0,0,1,1.265-.823,6.072,6.072,0,0,1,2.042-.379c1.16-.053,1.508-.064,4.445-.064M12,1c-2.987,0-3.362.013-4.535.066a8.074,8.074,0,0,0-2.67.511,5.392,5.392,0,0,0-1.949,1.27,5.392,5.392,0,0,0-1.27,1.949,8.074,8.074,0,0,0-.511,2.67C1.013,8.638,1,9.013,1,12s.013,3.362.066,4.535a8.074,8.074,0,0,0,.511,2.67,5.392,5.392,0,0,0,1.27,1.949,5.392,5.392,0,0,0,1.949,1.27,8.074,8.074,0,0,0,2.67.511C8.638,22.987,9.013,23,12,23s3.362-.013,4.535-.066a8.074,8.074,0,0,0,2.67-.511,5.625,5.625,0,0,0,3.219-3.219,8.074,8.074,0,0,0,.511-2.67C22.987,15.362,23,14.987,23,12s-.013-3.362-.066-4.535a8.074,8.074,0,0,0-.511-2.67,5.392,5.392,0,0,0-1.27-1.949,5.392,5.392,0,0,0-1.949-1.27,8.074,8.074,0,0,0-2.67-.511C15.362,1.013,14.987,1,12,1Zm0,5.351A5.649,5.649,0,1,0,17.649,12,5.649,5.649,0,0,0,12,6.351Zm0,9.316A3.667,3.667,0,1,1,15.667,12,3.667,3.667,0,0,1,12,15.667Zm7.192-9.53a1.32,1.32,0,1,1-1.32-1.32A1.32,1.32,0,0,1,19.192,6.137Z"></path></svg>,
    linkedin: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M8.5,18h-3v-9h3V18z M7,7.7c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4C8.4,7.1,7.8,7.7,7,7.7z M18,18h-3v-4.8c0-1.3-0.2-3.2-2-3.2c-2,0-2.4,1.5-2.4,3.1v4.8h-3V9h3v1.4h0c0.6-1,1.7-1.4,2.9-1.4c3,0,3.5,2,3.5,4.5V18z"></path></svg>
  };
  
  return (
    <a 
      href={href} 
      className="w-10 h-10 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
      aria-label={`Visit our ${icon} page`}
    >
      <span className="text-gray-700 dark:text-gray-300">
        {iconMap[icon] || <span>{icon}</span>}
      </span>
    </a>
  );
}
