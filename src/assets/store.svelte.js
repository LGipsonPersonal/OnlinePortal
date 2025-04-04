export const todayAddedHours = [];

export const tabs = [
    {
      name: "Home",
      key: '0',
      icon: 'home',
      subtabs: [],
    },
    {
      name: "Time Sheet",
      key: '1',
      icon: 'calendar-alt',
      subtabs: [],
    },
    {
      name: "Request Time Off",
      key: '2',
      icon: 'calendar-edit',
      subtabs: [],
    },
    {
      name: "Documents",
      key: '3',
      icon: 'file-alt',
      subtabs: [
        { name: "Upload Document", key: "3-0" },
        { name: "View Documents", key: "3-1" },
      ],
    },
    {
      name: "Settings",
      key: '4',
      icon: 'cog',
      subtabs: [],
    },
    {
      name: "Your Projects",
      key: '5',
      icon: 'project-diagram',
      subtabs: [
        { name: "Project Dashboard", key: "5-0" },
        { name: "Project X", key: "5-1", subtabs: [
          { name: "Timeline", key: "5-1-0" },
          { name: "Issue Board", key: "5-1-1" },
          { name: "Resources", key: "5-1-2" },
          { name: "People of Contact", key: "5-1-3" },
          { name: "Discussions", key: "5-1-4" }
        ]},
        { name: "Project Y", key: "5-2", subtabs: [
          { name: "Timeline", key: "5-2-0" },
          { name: "Issue Board", key: "5-2-1" },
          { name: "Resources", key: "5-2-2" },
          { name: "People of Contact", key: "5-2-3" },
          { name: "Discussions", key: "5-2-4" }
        ]},
        { name: "Project Z", key: "5-3", subtabs: [
          { name: "Timeline", key: "5-3-0" },
          { name: "Issue Board", key: "5-3-1" },
          { name: "Resources", key: "5-3-2" },
          { name: "People of Contact", key: "5-3-3" },
          { name: "Discussions", key: "5-3-4" }
        ]},
        { name: "Project R", key: "5-4", subtabs: [
          { name: "Timeline", key: "5-4-0" },
          { name: "Issue Board", key: "5-4-1" },
          { name: "Resources", key: "5-4-2" },
          { name: "People of Contact", key: "5-4-3" },
          { name: "Discussions", key: "5-4-4" }
        ]}
      ],
    },
    {
      name: "IT Helpdesk",
      key: '6',
      icon: 'headset',
      subtabs: [],
    },
    {
      name: "Messages",
      key: '7',
      icon: 'message',
      subtabs: [
        { name: "Timesheet Reminder Bot", key: "7-0" },
        { name: "Fitness Challenge Group", key: "7-1" },
        { name: "SEG Group Message", key: "7-2" },
        { name: "Timothy (HR)", key: "7-3" },
        { name: "Connor", key: "7-4" },
        { name: "Candy", key: "7-5" },
      ],
    },
  ];
  export const requests = [
    {
      id: 1, 
      request_date: '05/04/2024', 
      start_date: '06/04/2024', 
      end_date: '06/04/2024', 
      duration: '4 hours', 
      status: 'Pending', 
      supervisor_note: '-', 
      action: 'Cancel'
    },
    {
      id: 2, 
      request_date: '05/04/2024', 
      start_date: '06/04/2024', 
      end_date: '06/04/2024', 
      duration: '4 hours', 
      status: 'Denied', 
      supervisor_note: 'Insufficient coverage.', 
      action: 'Retry'
   },
   {
    id: 3, 
    request_date: '05/04/2024', 
    start_date: '06/04/2024', 
    end_date: '06/04/2024', 
    duration: '4 hours', 
    status: 'Denied', 
    supervisor_note: 'Insufficient coverage.', 
    action: 'Retry'
 }
  ]
  
  export const docs = [
    {name: 'Resume.pdf', status: 'Pending', due_date: '2024-06-20', submitted_date: '-', action: 'Upload'},
    {name: 'CoverLetter.docx', status: 'Uploaded', due_date: '2024-06-18', submitted_date: '2024-06-18', action: 'Retry'},
    {name: 'Portfolio.pdf', status: 'Failed', due_date: '2024-06-19', submitted_date: '2024-06-19', action: 'Retry'},
  ]
  
    export const images = [
      "https://placehold.co/1600x900?text=Image+1",
      "https://placehold.co/1600x900?text=Image+2",
      "https://placehold.co/1600x900?text=Image+3",
    ];

    export let profile = $state({
        fullName: "John Doe",
        profileImage: 'ZFewuwKm',
        username: "johndoe",
        password: 'plaintext-placeholder',
        jobTitle: "Software Developer",
        address: "123 Main Street, Springfield, IL",
        phone: "(555) 123-4567",
        workEmail: "john.doe@company.com",
        companyEmail: "johndoe@corp.com",
        emergencyContact: {
            name: "Jane Doe",
            phone: "(555) 987-6543",
            relationship: "Spouse"
        },
        team: "SEG"
    });

    export let projects = [
    {
      name: 'Project X', 
      tasks:["Task 1", "Task 2"]
    }, 
    {
      name: 'Project Y', 
      tasks:["Task 1", "Task 2"]
    },{
      name: 'Project Z', 
      tasks:["Task 1", "Task 2"]
    },
    {
      name: 'Project R', 
      tasks:["Task 1", "Task 2", "Task 3"]
    },
    {
      name: 'Leave', 
      tasks:[ "Holiday", "Vacation", "Unpaid", "Sick"]
    } 
  ]
  
  export const documentCategories = [
    {
      category: "Insurance",
      documents: [
        "Health Insurance Policy",
        "Car Insurance Policy"
      ]
    },
    {
      category: "Security Information",
      documents: [
        "Network Security Guidelines",
        "Password Policy"
      ]
    },
    {
      category: "Retirement Account Information",
      documents: [
        "401(k) Plan Summary",
        "Pension Fund Details"
      ]
    }
  ];
  
  export const announcements = {
    boardTitle: "What's happening at Company",
    announcements: [
        {
            id: 1,
            avatar: "avatar1.png",
            author: "Alice Doe",
            title: "Alice posted an announcement: \"New Feature Released!\"",
            description: "We are excited to announce a new feature...",
            date: "Feb 12, 2024",
            timestamp: "2 hours ago",
            postContent: `
            <p>
                Welcome to a deep dive into the minimal, modern aesthetics that define today's digital design trends. In this post, we explore how subtle color palettes and careful typography can create an immersive reading experience.
            </p>
            <blockquote>
                "Design is not just what it looks like and feels like. Design is how it works." – Steve Jobs
            </blockquote>
            <p>
                Whether you're a designer or just a lover of sleek interfaces, there's a lot to uncover about the art of simplicity. The approach here mirrors the clean style seen on platforms like ShadeCN, focusing on functionality, readability, and a dark theme that brings content to the forefront.
            </p>
            <img src="https://placehold.co/600x300/?text=Placeholder+Image" alt="Dark Aesthetic" class="post-image" />
            <p>
                Stay tuned for more insights on design, trends, and the creative process. Your journey into the elegant side of dark mode begins here.
            </p>
            <p>
                Welcome to a deep dive into the minimal, modern aesthetics that define today's digital design trends. In this post, we explore how subtle color palettes and careful typography can create an immersive reading experience.
            </p>
            <blockquote>
                "Design is not just what it looks like and feels like. Design is how it works." – Steve Jobs
            </blockquote>
            <p>
                Whether you're a designer or just a lover of sleek interfaces, there's a lot to uncover about the art of simplicity. The approach here mirrors the clean style seen on platforms like ShadeCN, focusing on functionality, readability, and a dark theme that brings content to the forefront.
            </p>
            <img src="https://placehold.co/600x300/?text=Placeholder+Image" alt="Dark Aesthetic" class="post-image" />
            <p>
                Stay tuned for more insights on design, trends, and the creative process. Your journey into the elegant side of dark mode begins here.
            </p>
            `
        },
        {
            id: 2,
            avatar: "avatar2.png",
            title: "Bob posted an announcement: \"Scheduled Maintenance\"",
            description: "The system will be down for maintenance...",
            timestamp: "1 day ago"
        },
        {
            id: 3,
            avatar: "avatar3.png",
            title: "Carol posted an announcement: \"Weekly Update\"",
            description: "Here is your weekly company update...",
            timestamp: "3 days ago"
        },
        {
          id: 4,
          avatar: "avatar2.png",
          title: "Bob posted an announcement: \"Scheduled Maintenance\"",
          description: "The system will be down for maintenance...",
          timestamp: "1 day ago"
      },
      {
          id: 5,
          avatar: "avatar3.png",
          title: "Carol posted an announcement: \"Weekly Update\"",
          description: "Here is your weekly company update...",
          timestamp: "3 days ago"
      }
    ]
};

export const events = {
  boardTitle: "Upcoming Events",
  announcements: [
      {
          id: 1,
          avatar: "avatar1.png",
          title: "Los Marcos, June 25th: Celebrate Another Gold Delivery!",
          description: "With the final delivery of XYSR out the gate...",
          timestamp: "2 hours ago"
      },
      {
          id: 2,
          avatar: "avatar2.png",
          title: "OKC Office, May 7th: Annual Chili Party!",
          description: "Come by the office for our annual Chili party...",
          timestamp: "1 day ago"
      },
      {
          id: 3,
          avatar: "avatar3.png",
          title: "AMC - Penn State, Jan 19th: Movie Night!",
          description: "Come watch a movie with us this Friday night...",
          timestamp: "3 days ago"
      }
  ]
};

export const deadlines = {
  boardTitle: " Your Upcoming Deadlines",
  announcements: [
      {
          id: 1,
          avatar: "avatar1.png",
          title: "May 4, WATR Beta Delivery",
          description: "Expected features shown at https://docs.google.com/...",
          timestamp: "2 hours ago"
      },
      {
        id: 2,
        avatar: "avatar2.png",
        title: "Feb 8, 508 Compliance Report",
        description: "Details and checklist shown at https://docs.google.com/...",
        timestamp: "2 hours ago"
    },
    {
      id: 3,
      avatar: "avatar2.png",
      title: "Feb 8, 508 Compliance Report",
      description: "Details and checklist shown at https://docs.google.com/...",
      timestamp: "2 hours ago"
  }
  ]
};


export const meetings= {
  boardTitle: "Your Upcoming Meetings",
  announcements: [
      {
          id: 1,
          avatar: "avatar1.png",
          title: "SYS Techincal Review Meeting",
          description: "Link: https://meet.google.com/wka-nvbw-jwx?pli=1&ijlm=1737...",
          timestamp: "2 hours ago"
      },
      {
        id: 2,
        avatar: "avatar2.png",
        title: "SEG Summer intern interview",
        description: "Link: https://meet.google.com/wka-nvbw-jwx?pli=1&ijl...",
        timestamp: "2 hours ago"
    },
    {
      id: 3,
      avatar: "avatar2.png",
      title: "Standup",
      description: "Link: https://meet.google.com/wka-nvbw-jwx?pli=1&ijl...",
      timestamp: "2 hours ago"
  }
  ]
};

export const projectUpcoming = [
  {
    id: 1,
    avatar: "https://example.com/avatar1.png",
    title: "Website Redesign",
    description: "Update UI/UX for better user experience.",
    timestamp: "Feb 18, 2025",
    date: "Feb 25, 2025",
    project: "Project X",
    priority: "High"
  },
  {
    id: 2,
    avatar: "https://example.com/avatar2.png",
    title: "Database Migration",
    description: "Move database to cloud infrastructure.",
    timestamp: "Feb 16, 2025",
    date: "Mar 5, 2025",
    project: "Project Y",
    priority: "High"
  },
  {
    id: 3,
    avatar: "https://example.com/avatar3.png",
    title: "Security Audit",
    description: "Review and patch vulnerabilities.",
    timestamp: "Feb 16, 2025",
    date: "Mar 1, 2025",
    project: "Project Z",
    priority: "Low"
  },
  {
    id: 4,
    avatar: "https://example.com/avatar4.png",
    title: "API Development",
    description: "Build new REST API endpoints.",
    timestamp: "Feb 15, 2025",
    date: "Feb 14, 2025",
    project: "Project R"
  },
  {
    id: 5,
    avatar: "https://example.com/avatar5.png",
    title: "Marketing Campaign",
    description: "Launch new product advertising campaign.",
    timestamp: "Feb 14, 2025",
    date: "Mar 10, 2025",
    project: "Project X"
  },
];

export let boardGroups = $state([
  {
    name: "UI/UX",
    boards: [
      {
        name: "Design",
        issues: [
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Redesign Homepage",
            description: "Update the homepage layout for better usability.",
            dueDate: "2025-04-01",
            originator: "User C",
            tags: [
              { name: "UI", color: "#4f46e5" },
              { name: "High Priority", color: "#ff6b6b" }
            ]
          },
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Create Style Guide",
            description: "Develop a consistent style guide for the application.",
            dueDate: "2025-04-10",
            originator: "User F",
            tags: [
              { name: "Design", color: "#34d399" },
              { name: "Documentation", color: "#fbbf24" }
            ]
          }
        ]
      },
      {
        name: "Development",
        issues: [
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Implement Dark Mode",
            description: "Add a dark mode toggle to the application.",
            dueDate: "2025-04-15",
            originator: "User G",
            tags: [
              { name: "Feature", color: "#4f46e5" },
              { name: "UI", color: "#34d399" }
            ]
          }
        ]
      },
      {
        name: "Testing",
        issues: [
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Test Navigation Bar",
            description: "Ensure the navigation bar works on all screen sizes.",
            dueDate: "2025-04-20",
            originator: "User H",
            tags: [
              { name: "Testing", color: "#fbbf24" },
              { name: "UI", color: "#4f46e5" }
            ]
          }
        ]
      },
      {
        name: "QA",
        issues: []
      }
    ]
  },
  {
    name: "AI Features",
    boards: [
      {
        name: "Model Training",
        issues: [
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Train Recommendation Model",
            description: "Improve recommendation accuracy by 10%.",
            dueDate: "2025-05-15",
            originator: "User D",
            tags: [
              { name: "AI", color: "#34d399" },
              { name: "Backend", color: "#fbbf24" }
            ]
          },
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Optimize Model Performance",
            description: "Reduce model inference time by 20%.",
            dueDate: "2025-05-20",
            originator: "User I",
            tags: [
              { name: "Optimization", color: "#ff6b6b" },
              { name: "AI", color: "#34d399" }
            ]
          }
        ]
      },
      {
        name: "Feature Integration",
        issues: [
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Integrate Chatbot",
            description: "Add chatbot functionality to the support page.",
            dueDate: "2025-05-25",
            originator: "User J",
            tags: [
              { name: "AI", color: "#34d399" },
              { name: "Feature", color: "#4f46e5" }
            ]
          }
        ]
      },
      {
        name: "Testing",
        issues: []
      },
      {
        name: "QA",
        issues: []
      }
    ]
  },
  {
    name: "Backend",
    boards: [
      {
        name: "API Development",
        issues: [
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Create Authentication API",
            description: "Develop a secure authentication API.",
            dueDate: "2025-03-30",
            originator: "User E",
            tags: [
              { name: "Backend", color: "#fbbf24" },
              { name: "Security", color: "#ff6b6b" }
            ]
          },
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Build Payment Gateway",
            description: "Integrate a payment gateway for subscriptions.",
            dueDate: "2025-04-05",
            originator: "User K",
            tags: [
              { name: "Backend", color: "#fbbf24" },
              { name: "Finance", color: "#34d399" }
            ]
          }
        ]
      },
      {
        name: "Database Migration",
        issues: [
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: "Migrate to PostgreSQL",
            description: "Move the database from MySQL to PostgreSQL.",
            dueDate: "2025-04-10",
            originator: "User L",
            tags: [
              { name: "Database", color: "#4f46e5" },
              { name: "Backend", color: "#fbbf24" }
            ]
          }
        ]
      },
      {
        name: "Testing",
        issues: []
      },
      {
        name: "QA",
        issues: []
      }
    ]
  }
]);



