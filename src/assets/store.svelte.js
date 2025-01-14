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
    
    