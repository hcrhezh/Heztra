import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">About Polifilo</h2>
            <p className="text-gray-600 mb-4">
              We are a passionate team of designers and developers dedicated to creating exceptional digital experiences. 
              With over 10 years of industry experience, we've helped businesses of all sizes transform their ideas into reality.
            </p>
            <p className="text-gray-600 mb-6">
              Our approach combines technical expertise with creative innovation to deliver solutions that not only meet but 
              exceed client expectations. We believe in the power of thoughtful design and clean code to solve complex problems.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatsCard value="50+" label="Completed Projects" />
              <StatsCard value="25+" label="Mobile Applications" />
              <StatsCard value="15+" label="Team Members" />
              <StatsCard value="30+" label="Happy Clients" />
            </div>
            <a 
              href="#contact" 
              className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&h=1100" 
              alt="Our Team at Work" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface StatsCardProps {
  value: string;
  label: string;
}

function StatsCard({ value, label }: StatsCardProps) {
  return (
    <motion.div 
      className="bg-gray-50 p-5 rounded-lg"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-primary text-2xl font-bold">{value}</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}
