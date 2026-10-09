/*
 * Personal information and project data.
 * Edit this file to update the site. Leave a value as "" to hide the related link.
 */
window.portfolioData = {
  name: "Praveen Raj A",
  role: "Full-Stack Software Engineer",
  location: "Coimbatore, Tamil Nadu, India",

  introduction:
    "Full-stack software engineer experienced in enterprise applications, backend services, data processing, and cloud-integrated solutions. Interested in building reliable software and exploring AI-powered database applications.",

  // Leave empty to hide the link.
  github: "",
  linkedin: "https://www.linkedin.com/in/mrapraveenraj/",
  email: "",

  accentColor: "#8bb8ff",

  about: [
    "I build full-stack applications that connect user interfaces, backend services, databases, external APIs, and cloud storage. My day-to-day work spans Java and Spring Boot services, React and TypeScript interfaces, and Python and SQL data processing.",
    "A large part of my experience is in batch processing and file transformation: handling structured and semi-structured files, validating records, managing asynchronous workflows, and troubleshooting integration issues across authentication, cloud permissions, and file transfers.",
    "I am also exploring AI-powered database applications, including natural-language-to-SQL concepts, schema-aware retrieval, and embeddings, with the aim of making data access easier for non-technical users."
  ],

  skillGroups: [
    { title: "Backend", items: ["Java", "Spring Boot", "Python", "Flask", "REST APIs", "JDBC"] },
    { title: "Frontend", items: ["React", "TypeScript", "JavaScript", "Material UI", "HTML", "CSS"] },
    { title: "Databases & Querying", items: ["Ocient", "PostgreSQL", "MySQL", "DB2", "DuckDB", "SQL"] },
    { title: "Cloud & Integration", items: ["Google Cloud Storage", "OAuth 2.0", "Bearer Token Authentication", "Signed URLs", "API Integration"] },
    { title: "Data Processing & Tools", items: ["CSV", "JSON", "Fixed-Width and Delimited Files", "Maven", "npm", "Vite", "Linux", "iTextPDF"] },
    { title: "AI & Product Exploration", items: ["Large Language Models", "Embeddings", "Vector Search", "Natural-Language-to-SQL"] }
  ],

  projects: [
    {
      title: "Data Preprocessing & Transformation Platform",
      status: "",
      problem: "Incoming data feeds arrive in varied formats and need consistent handling of inserts, updates, and deletes before they can be used.",
      description: "Configurable preprocessing workflows that validate and transform structured and semi-structured files, with cloud storage integration for retrieving sources and delivering outputs.",
      contributions: [
        "Built configurable workflows for insert, update, and delete handling across data feeds.",
        "Implemented validation and transformation logic for customer-specific file structures and business rules.",
        "Processed CSV, JSON, fixed-width, delimited, and compressed files, including nested JSON construction and audit file generation.",
        "Applied streaming and intermediate-storage reduction techniques where the workflow supported them."
      ],
      tech: ["Python", "DuckDB", "SQL", "Google Cloud Storage", "CSV", "JSON"],
      github: "",
      demo: ""
    },
    {
      title: "Enterprise Batch Processing & API Integration",
      status: "",
      problem: "Long-running batch jobs need request persistence, status tracking, and secure file exchange with external systems.",
      description: "Backend services for batch creation, file upload coordination, and processing status management, with integrations to external APIs.",
      contributions: [
        "Built services for batch creation, request persistence, and processing status management.",
        "Implemented background execution with blocking queues, worker threads, and executor services.",
        "Integrated external APIs using bearer-token authentication and configurable endpoints.",
        "Investigated signed URL, authentication, and access-permission issues in secure file transfer."
      ],
      tech: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "OAuth 2.0"],
      github: "",
      demo: ""
    },
    {
      title: "Cloud File Inspection Application",
      status: "",
      problem: "Technical users need to inspect structured files stored in the cloud without downloading each one first.",
      description: "A browser-based interface to preview, inspect, and download files from cloud storage, with parsers for delimited and fixed-width formats.",
      contributions: [
        "Built parsers for delimited and fixed-width files, including compressed files and text encoding considerations.",
        "Added preview limits and parsing controls to manage how much data loads into the interface.",
        "Connected frontend workflows with cloud file retrieval and download operations."
      ],
      tech: ["React", "TypeScript", "Google Cloud Storage", "File Parsing"],
      github: "",
      demo: ""
    },
    {
      title: "Enterprise Application Development",
      status: "",
      problem: "Business workflows depended on legacy applications that needed modernization and reliable backend services.",
      description: "Full-stack feature development across backend APIs, scheduled processes, and database-backed workflows.",
      contributions: [
        "Developed and maintained backend APIs, scheduled processes, and full-stack application features.",
        "Contributed to modernization of legacy applications using Java services and database migration approaches.",
        "Worked on PDF generation, application monitoring, and data transfer functionality.",
        "Applied structured debugging to maintain application reliability."
      ],
      tech: ["Java", "Spring Boot", "React", "TypeScript", "SQL"],
      github: "",
      demo: ""
    },
    {
      title: "AI-Assisted Database Querying",
      status: "Prototype",
      problem: "People who need answers from a database often cannot write SQL themselves.",
      description: "An exploration of natural-language-to-SQL using database schema context. This is a prototype and product exploration, not a production deployment.",
      contributions: [
        "Investigated schema-aware retrieval and embeddings to help language models identify relevant tables, columns, and relationships.",
        "Explored local language models and vector search for cost-conscious AI application development.",
        "Designed concepts for database connectivity, query execution, and chat-driven dashboard generation.",
        "Evaluated DuckDB for temporary data processing and analytical workflows."
      ],
      tech: ["LLMs", "SQL", "Embeddings", "Vector Search", "DuckDB"],
      github: "",
      demo: ""
    }
  ],

  experience: [
    {
      role: "Technical Solutions Delivery Engineer",
      company: "Ocient",
      location: "Remote",
      start: "March 2024",
      end: "Present",
      highlights: [
        "Full-stack application development using Java, Spring Boot, React, and TypeScript for enterprise data and integration workflows.",
        "Backend services and REST APIs connecting databases, external systems, cloud storage, and application interfaces.",
        "Data processing with Python, SQL, and DuckDB for structured and semi-structured files.",
        "Google Cloud Storage integration for input retrieval, processed file delivery, and audit output.",
        "Batch orchestration and status tracking with database persistence, background workers, and API integrations.",
        "Troubleshooting across authentication, cloud permissions, file formats, transfers, and deployment."
      ]
    },
    {
      role: "Software Engineer",
      company: "Cognizant",
      location: "Coimbatore, India · Hybrid",
      start: "January 2023",
      end: "March 2024",
      highlights: [
        "Enterprise application functionality using Java and Spring Boot, including backend APIs and scheduled jobs.",
        "Database-driven workflows and React-based frontend features integrated with backend services.",
        "Legacy modernization, database migration, PDF generation, and application maintenance."
      ]
    },
    {
      role: "Junior Software Engineer",
      company: "Cognizant",
      location: "Coimbatore, India",
      start: "May 2022",
      end: "January 2023",
      highlights: [
        "Full-stack application features using Java and Spring Boot, with enhancements, debugging, and maintenance."
      ]
    },
    {
      role: "Programmer Analyst",
      company: "Cognizant",
      location: "Coimbatore, India",
      start: "December 2020",
      end: "May 2022",
      highlights: [
        "Application development and support, including testing and implementation of business requirements."
      ]
    }
  ]
};
