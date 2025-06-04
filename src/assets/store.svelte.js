export let tableData = $state([]);

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
          { name: "Issue Board", key: "5-1-1" },
          { name: "Resources", key: "5-1-2" },
          { name: "People of Contact", key: "5-1-3" }
        ]},
        { name: "Project Y", key: "5-2", subtabs: [
          { name: "Issue Board", key: "5-2-1" },
          { name: "Resources", key: "5-2-2" },
          { name: "People of Contact", key: "5-2-3" }
        ]},
        { name: "Project Z", key: "5-3", subtabs: [
          { name: "Issue Board", key: "5-3-1" },
          { name: "Resources", key: "5-3-2" },
          { name: "People of Contact", key: "5-3-3" }
        ]},
        { name: "Project R", key: "5-4", subtabs: [
          { name: "Issue Board", key: "5-4-1" },
          { name: "Resources", key: "5-4-2" },
          { name: "People of Contact", key: "5-4-3" }
        ]}
      ],
    },
    {
      name: "IT Helpdesk",
      key: '6',
      icon: 'headset',
      subtabs: [],
    }
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
    },
    {
      id: 2, 
      request_date: '05/04/2024', 
      start_date: '06/04/2024', 
      end_date: '06/04/2024', 
      duration: '4 hours', 
      status: 'Denied', 
      supervisor_note: 'Insufficient coverage.', 
   },
   {
    id: 3, 
    request_date: '05/04/2024', 
    start_date: '06/04/2024', 
    end_date: '06/04/2024', 
    duration: '4 hours', 
    status: 'Denied', 
    supervisor_note: 'Insufficient coverage.', 
 },
 {
    id: 4, 
    request_date: '05/04/2024', 
    start_date: '06/04/2024', 
    end_date: '06/04/2024', 
    duration: '4 hours', 
    status: 'Approved', 
    supervisor_note: 'Enjoy your time off!', 
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

  export let projects = [
    {
      id: "1",
      name: "Project X",
      stateGroups: ["Design", "Development", "Testing"],
    },
    {
      id: "2",
      name: "Project Y",
      stateGroups: ["Planning", "Execution"],
    },
    {
      id: "3",
      name: "Project Z",
      stateGroups: ["Review", "Database Migration"],
    },
    {
      id: "4",
      name: "Project R",
      stateGroups: ["Research", "Implementation", "Deployment"],
    },6
  ];

  export let stateGroups = $state([
    {
      name: "Design",
      states: ["Wireframes", "Prototypes", "Final Design"],
    },
    {
      name: "Development",
      states: ["To Do", "In Progress", "Code Review", "Done"],
    },
    {
      name: "Testing",
      states: ["Test Cases", "In Testing", "Bug Fixing", "Completed"],
    },
    {
      name: "Planning",
      states: ["Ideas", "Research", "Approved"],
    },
    {
      name: "Execution",
      states: ["Assigned", "In Progress", "Completed"],
    },
    {
      name: "Review",
      states: ["Peer Review", "Final Approval"],
    },
    {
      name: "Database Migration",
      states: ["Migration Planned", "Migration In Progress", "Migration Completed"],
    },
    {
      name: "Research",
      states: ["Initial Research", "Feasibility Study", "Approved"],
    },
    {
      name: "Implementation",
      states: ["Setup", "Development", "Testing"],
    },
    {
      name: "Deployment",
      states: ["Staging", "Production", "Post-Deployment Review"],
    },
  ]);

export function getNewIssueId() {
  const lastIssue = issues[issues.length - 1];
  return lastIssue ? (parseInt(lastIssue.id) + 1).toString() : "1";
}

export let issues = $state([
  {
    id: "1",
    name: "Redesign Homepage",
    description: "Update the homepage layout for better usability.",
    dueDate: "2025-04-01",
    originator: "User C",
    tags: [
      { name: "UI", color: "#4f46e5" },
      { name: "High Priority", color: "#ff6b6b" }, // Priority as a tag
    ],
    state: "Wireframes",
    stateGroup: "Design",
    projectId: "1", // Project X
  },
  {
    id: "2",
    name: "Create Style Guide",
    description: "Develop a consistent style guide for the application.",
    dueDate: "2025-04-10",
    originator: "User F",
    tags: [
      { name: "Design", color: "#34d399" },
      { name: "Documentation", color: "#fbbf24" },
      { name: "Medium Priority", color: "#ffa500" }, // Priority as a tag
    ],
    state: "Prototypes",
    stateGroup: "Design",
    projectId: "1", // Project X
  },
  {
    id: "3",
    name: "Implement Dark Mode",
    description: "Add a dark mode toggle to the application.",
    dueDate: "2025-04-15",
    originator: "User G",
    tags: [
      { name: "Feature", color: "#4f46e5" },
      { name: "UI", color: "#34d399" },
      { name: "Low Priority", color: "#4caf50" }, // Priority as a tag
    ],
    state: "To Do",
    stateGroup: "Development",
    projectId: "1", // Project X
  },
  {
    id: "4",
    name: "Test Navigation Bar",
    description: "Ensure the navigation bar works on all screen sizes.",
    dueDate: "2025-04-20",
    originator: "User H",
    tags: [
      { name: "Testing", color: "#fbbf24" },
      { name: "UI", color: "#4f46e5" },
      { name: "Low Priority", color: "#4caf50" }, // Priority as a tag
    ],
    state: "In Progress",
    stateGroup: "Development",
    projectId: "1", // Project X
  },
  {
    id: "5",
    name: "Train Recommendation Model",
    description: "Improve recommendation accuracy by 10%.",
    dueDate: "2025-05-15",
    originator: "User D",
    tags: [
      { name: "AI1", color: "#34d399" },
      { name: "AI2", color: "#34d399" },
      { name: "AI3", color: "#34d399" },
      { name: "AI4", color: "#34d399" },
      { name: "AI5", color: "#34d399" },
      { name: "Backend1", color: "#fbbf24" },
      { name: "Backend2", color: "#fbbf24" },
      { name: "Backend3", color: "#fbbf24" },
      { name: "Backend4", color: "#fbbf24" },
      { name: "High Priority", color: "#ff6b6b" }, // Priority as a tag
    ],
    state: "Ideas",
    stateGroup: "Planning",
    projectId: "2", // Project Y
  },
  {
    id: "6",
    name: "Integrate Chatbot",
    description: "Add chatbot functionality to the support page.",
    dueDate: "2025-05-25",
    originator: "User J",
    tags: [
      { name: "AI", color: "#34d399" },
      { name: "Feature", color: "#4f46e5" },
      { name: "Medium Priority", color: "#ffa500" }, // Priority as a tag
    ],
    state: "Assigned",
    stateGroup: "Execution",
    projectId: "2", // Project Y
  },
  {
    id: "7",
    name: "Create Authentication API",
    description: "Develop a secure authentication API.",
    dueDate: "2025-03-30",
    originator: "User E",
    tags: [
      { name: "Backend", color: "#fbbf24" },
      { name: "Security", color: "#ff6b6b" },
      { name: "High Priority", color: "#ff6b6b" }, // Priority as a tag
    ],
    state: "Peer Review",
    stateGroup: "Review",
    projectId: "3", // Project Z
  },
  {
    id: "8",
    name: "Migrate to PostgreSQL",
    description: "Move the database from MySQL to PostgreSQL.",
    dueDate: "2025-04-10",
    originator: "User L",
    tags: [
      { name: "Database", color: "#4f46e5" },
      { name: "Backend", color: "#fbbf24" },
      { name: "Medium Priority", color: "#ffa500" }, // Priority as a tag
    ],
    state: "Migration Planned",
    stateGroup: "Database Migration",
    projectId: "3", // Project Z
  },
  {
    id: "9",
    name: "Conduct Feasibility Study",
    description: "Analyze the feasibility of the new project idea.",
    dueDate: "2025-05-01",
    originator: "User K",
    tags: [
      { name: "Research", color: "#4f46e5" },
      { name: "High Priority", color: "#ff6b6b" },
    ],
    state: "Feasibility Study",
    stateGroup: "Research",
    projectId: "4", // Project R
  },
  {
    id: "10",
    name: "Setup Development Environment",
    description: "Prepare the environment for development.",
    dueDate: "2025-05-10",
    originator: "User L",
    tags: [
      { name: "Setup", color: "#34d399" },
      { name: "Medium Priority", color: "#ffa500" },
    ],
    state: "Setup",
    stateGroup: "Implementation",
    projectId: "4", // Project R
  },
  {
    id: "11",
    name: "Deploy to Staging",
    description: "Deploy the application to the staging environment.",
    dueDate: "2025-05-20",
    originator: "User M",
    tags: [
      { name: "Deployment", color: "#4f46e5" },
      { name: "Low Priority", color: "#4caf50" },
    ],
    state: "Staging",
    stateGroup: "Deployment",
    projectId: "4", // Project R
  },
]);



