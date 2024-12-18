<script>
  import Menu from "./Menu.svelte";
  import Header from "./header.svelte";
  import TimeTable from "./TimeTable.svelte";
  import Carousel from "./Carousel.svelte";
  import TimeOff from "./TimeOff.svelte";
  import Breadcrumbs from "./Breadcrumbs.svelte";
  import UploadDocs from "./UploadDocs.svelte";
  let tabs = [
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
      name: "My Profile",
      key: '3',
      icon: 'fas fa-user-alt',
      subtabs: [

      ],
    },
    {
      name: "Documents",
      key: '4',
      icon: 'fas fa-file-alt',
      subtabs: [
        { name: "Upload Document", key: "4-0" },
        { name: "View Documents", key: "4-1" },
      ],
    },
  ];

  let choice = $state('0');

  let currentTabs = $derived.by(() => {
  if (!choice.includes('-')) {
    // Default behavior: Return the matching tab
    return [tabs.find(tab => tab.key === choice)];
  } else {
    // Extract digits before and after '-' in choice
    const [tabKey, subtabIndex] = choice.split('-');
    
    // Find the matching tab using the key
    const selectedTab = tabs.find(tab => tab.key === tabKey);
    
    // Ensure the tab and its subtabs exist
    if (selectedTab && selectedTab.subtabs?.[subtabIndex]) {
      return [selectedTab, selectedTab.subtabs[+subtabIndex]];
    }
    
    // Return empty array if no match is found
    return [];
  }
});

let docs = [
  {name: 'Resume.pdf', status: 'Pending', due_date: '2024-06-20', submitted_date: '-', action: 'Upload'},
  {name: 'CoverLetter.docx', status: 'Uploaded', due_date: '2024-06-18', submitted_date: '2024-06-18', action: 'Retry'},
  {name: 'Portfolio.pdf', status: 'Failed', due_date: '2024-06-19', submitted_date: '2024-06-19', action: 'Retry'},
]
  
$inspect(choice)

  const images = [
    "https://placehold.co/1600x900?text=Image+1",
    "https://placehold.co/1600x900?text=Image+2",
    "https://placehold.co/1600x900?text=Image+3",
  ];
</script>

<div class="fullscreen">
  <Menu bind:choice {tabs}></Menu>
  <div class="main-page">
    <Breadcrumbs {currentTabs}></Breadcrumbs>
    {#if choice === tabs[0].key}
      <Carousel {images}></Carousel>
    {:else if choice === tabs[1].key}
      <Header userName="Luke Gipson"></Header>
      <TimeTable></TimeTable>
    {:else if choice === tabs[2].key}
      <TimeOff></TimeOff>
    {:else if choice === tabs[4].subtabs[0].key}
      <UploadDocs {docs}></UploadDocs>
    {/if}
  </div>
</div>

<style>
  .fullscreen {
    position: fixed; /* Ensures the div stays in place even when scrolling */
    display: flex;
    top: 0;
    left: 0;
    width: 100vw; /* Full viewport width */
    height: 100vh; /* Full viewport height */
    background-color: var(--main-bg-color);
  }
  .main-page {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
