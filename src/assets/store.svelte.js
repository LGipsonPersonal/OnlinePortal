export const tabs = [
    {
      name: "Home",
      key: '0',
      icon: 'fas fa-home',
      subtabs: [

      ],
    },
    {
      name: "Time Sheet",
      key: '1',
      icon: 'fas fa-calendar-days',
      subtabs: [

      ],
    },
    {
      name: "Request Time Off",
      key: '2',
      icon: 'fas fa-calendar-times',
      subtabs: [

      ],
    },
    {
      name: "Documents",
      key: '3',
      icon: 'fas fa-file-alt',
      subtabs: [
        { name: "Upload Document", key: "3-0" },
        { name: "View Documents", key: "3-1" },
      ],
    },
    {
      name: "Settings",
      key: '4',
      icon: 'fas fa fa-cog',
      subtabs: [

      ],
    },
    {
      name: "Your Projects",
      key: '5',
      icon: 'fas fa-project-diagram',
      subtabs: [

      ],
    },
    {
      name: "IT Helpdesk",
      key: '6',
      icon: 'fa-solid fa-headset',
      subtabs: [

      ],
    },
    {
      name: "Messages",
      key: '7',
      icon: 'fa-solid fa-message',
      subtabs: [
        { name: "John", key: "7-0" },
        { name: "Jane", key: "7-1" },
        { name: "Randy", key: "7-2" },
        { name: "Rabecca", key: "7-3" },
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
      tasks:["PTO", "Holdiay", "Unpaid"]
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
            <img src="https://via.placeholder.com/600x300?text=Dark+Aesthetic" alt="Dark Aesthetic" class="post-image" />
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
            <img src="https://via.placeholder.com/600x300?text=Dark+Aesthetic" alt="Dark Aesthetic" class="post-image" />
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


  
  
    