/**
 * Dummy data untuk MVP awal
 * Data ini akan digunakan untuk development dan testing sebelum backend fully ready
 */

// Dummy users
export const dummyUsers = [
  {
    id: "user-1",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@example.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
    github_username: "ahmadfauzi",
  },
  {
    id: "user-2",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=siti",
    github_username: "sitinurhaliza",
  },
  {
    id: "user-3",
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=budi",
    github_username: "budisantoso",
  },
];

// Dummy projects
export const dummyProjects = [
  {
    id: "project-1",
    name: "E-Commerce Platform",
    description: "Platform e-commerce modern dengan fitur payment gateway, inventory management, dan admin dashboard. Dibangun menggunakan React dan Node.js.",
    repo_url: "https://github.com/ahmadfauzi/ecommerce-platform",
    status: "deployed",
    source: "github",
    owner_id: "user-1",
    deploy_url: "https://ecommerce-demo.imuii.id",
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-01-20").toISOString(),
    owner: dummyUsers[0],
    // Showcase fields (akan ditambahkan di backend Phase 6)
    showcase_title: "E-Commerce Platform - Modern Shopping Experience",
    showcase_description: "Platform e-commerce lengkap dengan berbagai fitur modern untuk memberikan pengalaman belanja terbaik. Termasuk payment gateway terintegrasi, manajemen inventory real-time, dan dashboard admin yang powerful.",
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    youtube_link: "https://youtube.com/watch?v=demo1",
    tags: ["React", "Node.js", "E-Commerce", "Payment Gateway"],
    team_members: [
      {
        name: "Ahmad Fauzi",
        email: "ahmad.fauzi@example.com",
        role: "Full Stack Developer",
      },
      {
        name: "Siti Nurhaliza",
        email: "siti.nurhaliza@example.com",
        role: "UI/UX Designer",
      },
    ],
  },
  {
    id: "project-2",
    name: "Task Management App",
    description: "Aplikasi manajemen tugas dengan real-time collaboration, kanban board, dan notification system. Built with Vue.js dan Firebase.",
    repo_url: "https://github.com/sitinurhaliza/task-manager",
    status: "deployed",
    source: "github",
    owner_id: "user-2",
    deploy_url: "https://taskmanager-demo.imuii.id",
    created_at: new Date("2024-02-10").toISOString(),
    updated_at: new Date("2024-02-15").toISOString(),
    owner: dummyUsers[1],
    showcase_title: "Task Management App - Collaborate & Organize",
    showcase_description: "Aplikasi manajemen tugas yang powerful dengan fitur real-time collaboration. Tim dapat bekerja bersama secara efisien dengan kanban board yang intuitif dan sistem notifikasi yang cerdas.",
    thumbnail_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    youtube_link: null,
    tags: ["Vue.js", "Firebase", "Real-time", "Collaboration"],
    team_members: [
      {
        name: "Siti Nurhaliza",
        email: "siti.nurhaliza@example.com",
        role: "Lead Developer",
      },
    ],
  },
  {
    id: "project-3",
    name: "Weather Dashboard",
    description: "Dashboard cuaca dengan data real-time dari berbagai sumber, visualisasi interaktif, dan forecast untuk 7 hari ke depan.",
    repo_url: "https://github.com/budisantoso/weather-dashboard",
    status: "deployed",
    source: "github",
    owner_id: "user-3",
    deploy_url: "https://weather-demo.imuii.id",
    created_at: new Date("2024-03-05").toISOString(),
    updated_at: new Date("2024-03-08").toISOString(),
    owner: dummyUsers[2],
    showcase_title: "Weather Dashboard - Real-time Weather Data",
    showcase_description: "Dashboard cuaca yang menampilkan data real-time dari berbagai sumber terpercaya. Dilengkapi dengan visualisasi interaktif dan forecast akurat untuk 7 hari ke depan.",
    thumbnail_url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    youtube_link: "https://youtube.com/watch?v=demo3",
    tags: ["React", "API Integration", "Data Visualization", "Weather"],
    team_members: [
      {
        name: "Budi Santoso",
        email: "budi.santoso@example.com",
        role: "Frontend Developer",
      },
      {
        name: "Ahmad Fauzi",
        email: "ahmad.fauzi@example.com",
        role: "Backend Developer",
      },
    ],
  },
  {
    id: "project-4",
    name: "Social Media Analytics",
    description: "Platform analitik untuk social media dengan insights mendalam, sentiment analysis, dan reporting otomatis.",
    repo_url: "https://github.com/ahmadfauzi/social-analytics",
    status: "deployed",
    source: "github",
    owner_id: "user-1",
    deploy_url: "https://analytics-demo.imuii.id",
    created_at: new Date("2024-01-25").toISOString(),
    updated_at: new Date("2024-01-30").toISOString(),
    owner: dummyUsers[0],
    showcase_title: "Social Media Analytics Platform",
    showcase_description: "Platform analitik yang komprehensif untuk menganalisis performa social media. Dilengkapi dengan sentiment analysis, trend detection, dan automated reporting.",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    youtube_link: null,
    tags: ["Python", "Data Analytics", "Machine Learning", "Social Media"],
    team_members: [
      {
        name: "Ahmad Fauzi",
        email: "ahmad.fauzi@example.com",
        role: "Data Scientist",
      },
    ],
  },
];

// Dummy portfolios
export const dummyPortfolios = [
  {
    id: "portfolio-1",
    name: "Ahmad Fauzi - Software Developer",
    description: "Portfolio profesional untuk software developer dengan showcase projects, skills, dan experience.",
    html_content: "<html>...</html>",
    status: "deployed",
    template_id: "template-1",
    user_id: "user-1",
    deploy_url: "https://ahmadfauzi.imuii.id",
    created_at: new Date("2024-01-10").toISOString(),
    updated_at: new Date("2024-01-12").toISOString(),
    user: dummyUsers[0],
    showcase_title: "Ahmad Fauzi - Full Stack Developer Portfolio",
    showcase_description: "Portfolio profesional yang menampilkan berbagai project, skills, dan pengalaman sebagai Full Stack Developer. Spesialisasi di React, Node.js, dan cloud technologies.",
    thumbnail_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    youtube_link: null,
    tags: ["Portfolio", "Full Stack", "React", "Node.js"],
    team_members: [
      {
        name: "Ahmad Fauzi",
        email: "ahmad.fauzi@example.com",
        role: "Full Stack Developer",
      },
    ],
  },
  {
    id: "portfolio-2",
    name: "Siti Nurhaliza - UI/UX Designer",
    description: "Portfolio kreatif untuk UI/UX designer dengan showcase design projects dan case studies.",
    html_content: "<html>...</html>",
    status: "deployed",
    template_id: "template-2",
    user_id: "user-2",
    deploy_url: "https://sitinurhaliza.imuii.id",
    created_at: new Date("2024-02-01").toISOString(),
    updated_at: new Date("2024-02-05").toISOString(),
    user: dummyUsers[1],
    showcase_title: "Siti Nurhaliza - Creative UI/UX Designer",
    showcase_description: "Portfolio kreatif yang menampilkan berbagai design projects dan case studies. Spesialisasi di user experience design, interface design, dan design systems.",
    thumbnail_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    youtube_link: "https://youtube.com/watch?v=portfolio2",
    tags: ["Portfolio", "UI/UX", "Design", "Figma"],
    team_members: [
      {
        name: "Siti Nurhaliza",
        email: "siti.nurhaliza@example.com",
        role: "UI/UX Designer",
      },
    ],
  },
  {
    id: "portfolio-3",
    name: "Budi Santoso - Data Analyst",
    description: "Portfolio profesional untuk data analyst dengan showcase data visualization projects dan insights.",
    html_content: "<html>...</html>",
    status: "deployed",
    template_id: "template-3",
    user_id: "user-3",
    deploy_url: "https://budisantoso.imuii.id",
    created_at: new Date("2024-02-20").toISOString(),
    updated_at: new Date("2024-02-25").toISOString(),
    user: dummyUsers[2],
    showcase_title: "Budi Santoso - Data Analyst Portfolio",
    showcase_description: "Portfolio yang menampilkan berbagai data visualization projects dan insights. Spesialisasi di data analysis, business intelligence, dan statistical modeling.",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    youtube_link: null,
    tags: ["Portfolio", "Data Analysis", "Visualization", "Python"],
    team_members: [
      {
        name: "Budi Santoso",
        email: "budi.santoso@example.com",
        role: "Data Analyst",
      },
    ],
  },
];

/**
 * Get dummy projects (simulate API response)
 */
export function getDummyProjects() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        projects: dummyProjects,
        pagination: {
          page: 1,
          limit: 10,
          total: dummyProjects.length,
        },
      });
    }, 500); // Simulate network delay
  });
}

/**
 * Get dummy portfolios (simulate API response)
 */
export function getDummyPortfolios() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        portfolios: dummyPortfolios,
        pagination: {
          page: 1,
          limit: 100,
          total: dummyPortfolios.length,
        },
      });
    }, 500); // Simulate network delay
  });
}

/**
 * Get dummy project by ID
 */
export function getDummyProjectById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const project = dummyProjects.find((p) => p.id === id);
      if (project) {
        resolve(project);
      } else {
        reject(new Error("Project not found"));
      }
    }, 300);
  });
}

/**
 * Get dummy portfolio by ID
 */
export function getDummyPortfolioById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const portfolio = dummyPortfolios.find((p) => p.id === id);
      if (portfolio) {
        resolve(portfolio);
      } else {
        reject(new Error("Portfolio not found"));
      }
    }, 300);
  });
}

