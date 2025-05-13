import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { PortfolioItem, App } from "@shared/schema";

// Sample data for portfolios
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    description: "Complete redesign and development of a modern e-commerce platform with enhanced user experience.",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&h=900",
    technologies: ["React", "Node.js"],
    projectUrl: "#",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Health & Fitness Tracker",
    description: "A comprehensive health and fitness mobile application with personalized workout plans.",
    category: "Mobile App",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&h=900",
    technologies: ["Swift", "Flutter"],
    projectUrl: "#",
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Interactive data visualization dashboard designed for enterprise-level data analysis.",
    category: "UI/UX Design",
    imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&h=900",
    technologies: ["Figma", "D3.js"],
    projectUrl: "#",
    createdAt: new Date()
  },
  {
    id: 4,
    title: "Corporate Brand Identity",
    description: "Complete brand identity design including logo, style guide, and marketing materials.",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&h=900",
    technologies: ["Illustrator", "Photoshop"],
    projectUrl: "#",
    createdAt: new Date()
  }
];

// Sample data for apps
const appsData: App[] = [
  {
    id: 1,
    name: "TaskMaster Pro",
    category: "Productivity",
    price: "4.99",
    priceLabel: "$4.99",
    description: "The ultimate task management app that helps you organize your work and life.",
    rating: 4.8,
    reviews: 2300,
    imageUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    isPaid: true,
    features: [
      "Create and organize tasks with categories",
      "Set reminders and deadlines",
      "Track your productivity with analytics",
      "Sync across all your devices",
      "Collaborate with team members",
      "Dark mode support"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
    ],
    developer: "Polifilo Software Inc.",
    releaseDate: "June 15, 2023",
    version: "2.1.3",
    size: "45 MB",
    website: "https://example.com/taskmaster",
    createdAt: new Date()
  },
  {
    id: 2,
    name: "FitTrack",
    category: "Health & Fitness",
    price: null,
    priceLabel: "Free",
    description: "Track your workouts, monitor progress, and achieve your fitness goals.",
    rating: 4.6,
    reviews: 1500,
    imageUrl: "https://cdn.pixabay.com/photo/2020/04/02/22/09/fitness-4996855_1280.jpg",
    isPaid: false,
    features: [
      "Track over 100 different exercises",
      "Create custom workout routines",
      "Monitor calories burned",
      "Connect with fitness trackers",
      "Progress charts and analytics",
      "Community challenges"
    ],
    screenshots: [
      "https://cdn.pixabay.com/photo/2020/04/02/22/09/fitness-4996855_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/01/09/11/30/dumbbell-1966247_1280.jpg"
    ],
    developer: "HealthTech Solutions",
    releaseDate: "March 3, 2023",
    version: "3.0.5",
    size: "67 MB",
    website: "https://example.com/fittrack",
    createdAt: new Date()
  },
  {
    id: 3,
    name: "StreamHub",
    category: "Entertainment",
    price: "3.99",
    priceLabel: "$3.99",
    description: "Stream your favorite content with personalized recommendations.",
    rating: 4.7,
    reviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    isPaid: true,
    features: [
      "Access to thousands of movies and shows",
      "Create personalized playlists",
      "Download content for offline viewing",
      "Family sharing across 5 accounts",
      "4K Ultra HD streaming",
      "Ad-free experience"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
    ],
    developer: "MediaStream Technologies",
    releaseDate: "January 12, 2023",
    version: "4.2.1",
    size: "85 MB",
    website: "https://example.com/streamhub",
    createdAt: new Date()
  },
  {
    id: 4,
    name: "MindfulMe",
    category: "Lifestyle",
    price: null,
    priceLabel: "Free",
    description: "Guided meditation and mindfulness exercises for daily peace.",
    rating: 4.9,
    reviews: 4700,
    imageUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    isPaid: false,
    features: [
      "Over 200 guided meditations",
      "Sleep stories and calming sounds",
      "Breathing exercises",
      "Mood tracking",
      "Daily mindfulness reminders",
      "Progress tracking"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
    ],
    developer: "Zen Digital LLC",
    releaseDate: "April 22, 2023",
    version: "2.4.0",
    size: "32 MB",
    website: "https://example.com/mindfulme",
    createdAt: new Date()
  },
  {
    id: 5,
    name: "NotePro",
    category: "Productivity",
    price: "2.99",
    priceLabel: "$2.99",
    description: "Smart note-taking app with organization features and cloud sync.",
    rating: 4.5,
    reviews: 2800,
    imageUrl: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    isPaid: true,
    features: [
      "Create rich text notes with formatting",
      "Organize with tags and folders",
      "Cloud sync across devices",
      "Voice-to-text transcription",
      "Embed images and documents",
      "Powerful search functionality"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      "https://images.unsplash.com/photo-1494178270175-e96de6971df1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
    ],
    developer: "Productivity Works",
    releaseDate: "February 8, 2023",
    version: "3.1.2",
    size: "28 MB",
    website: "https://example.com/notepro",
    createdAt: new Date()
  },
  {
    id: 6,
    name: "DreamTrack",
    category: "Health & Fitness",
    price: "1.99",
    priceLabel: "$1.99",
    description: "Sleep tracker with insights to improve your sleep quality and habits.",
    rating: 4.4,
    reviews: 1900,
    imageUrl: "https://cdn.pixabay.com/photo/2021/11/11/14/19/woman-6786626_1280.jpg",
    isPaid: true,
    features: [
      "Track sleep patterns and quality",
      "Smart alarm for optimal wake times",
      "Soothing sleep sounds library",
      "Weekly sleep reports and trends",
      "Sleep goal setting",
      "Integration with health apps"
    ],
    screenshots: [
      "https://cdn.pixabay.com/photo/2021/11/11/14/19/woman-6786626_1280.jpg",
      "https://cdn.pixabay.com/photo/2019/11/10/17/36/moon-4616333_1280.jpg"
    ],
    developer: "SleepWell Technologies",
    releaseDate: "May 17, 2023",
    version: "1.8.4",
    size: "38 MB",
    website: "https://example.com/dreamtrack",
    createdAt: new Date()
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for portfolio items
  app.get('/api/portfolio', (_req, res) => {
    res.json(portfolioData);
  });

  app.get('/api/portfolio/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const portfolioItem = portfolioData.find(item => item.id === id);
    
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    res.json(portfolioItem);
  });

  // API routes for apps
  app.get('/api/apps', (_req, res) => {
    res.json(appsData);
  });

  app.get('/api/apps/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const app = appsData.find(item => item.id === id);
    
    if (!app) {
      return res.status(404).json({ message: 'App not found' });
    }
    
    res.json(app);
  });

  const httpServer = createServer(app);

  return httpServer;
}
