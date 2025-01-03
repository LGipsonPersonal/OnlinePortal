<svelte:window onpopstate={watchURL}/>
<script>
  import Menu from "./Menu.svelte";
  import { setContext } from "svelte";
  import Header from "./header.svelte";
  import TimeTable from "./TimeTable.svelte";
  import Carousel from "./Carousel.svelte";
  import TimeOff from "./TimeOff.svelte";
  import Breadcrumbs from "./Breadcrumbs.svelte";
  import UploadDocs from "./UploadDocs.svelte";
  import RequestHistory from "./RequestHistory.svelte";
  import UserProfile from "./UserProfile.svelte";
  import ViewDocuments from "./ViewDocuments.svelte";
  import Announcements from "./Announcements.svelte";
  import QuickTime from "./widgets/QuickTime.svelte";

  setContext('MainPage', { updateChoice})

  /**
     * @param {string} message
  */
  function updateChoice(message) {
      choice = message
      history.pushState( {choice}, '', `/${choice}`)
  }
  
  function watchURL(event) {
    choice = event.state.choice
  }

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
      name: "Documents",
      key: '3',
      icon: 'fas fa-file-alt',
      subtabs: [
        { name: "Upload Document", key: "3-0" },
        { name: "View Documents", key: "3-1" },
      ],
    },
    {
      name: "My Profile",
      key: '4',
      icon: 'fas fa-user-alt',
      subtabs: [

      ],
    },
  ];

  let choice = $state('0');
  history.pushState( {choice}, '', `/${choice}`)

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

 let requests = [
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

let docs = [
  {name: 'Resume.pdf', status: 'Pending', due_date: '2024-06-20', submitted_date: '-', action: 'Upload'},
  {name: 'CoverLetter.docx', status: 'Uploaded', due_date: '2024-06-18', submitted_date: '2024-06-18', action: 'Retry'},
  {name: 'Portfolio.pdf', status: 'Failed', due_date: '2024-06-19', submitted_date: '2024-06-19', action: 'Retry'},
]
  
$inspect(currentTabs)

  const images = [
    "https://placehold.co/1600x900?text=Image+1",
    "https://placehold.co/1600x900?text=Image+2",
    "https://placehold.co/1600x900?text=Image+3",
  ];
</script>

<div class="fullscreen">
  <Menu {choice} {tabs}></Menu>
  <div class="main-page">
    <Breadcrumbs {currentTabs}></Breadcrumbs>
    {#if choice === tabs[0].key}
      <div class="homePage">
          <Announcements></Announcements>
          <!--<Carousel {images}></Carousel>-->
          <QuickTime></QuickTime>
      </div>
    {:else if choice === tabs[1].key}
      <Header userName="Luke Gipson"></Header>
      <TimeTable></TimeTable>
    {:else if choice === tabs[2].key}
      <div class="time-off-page">
        <TimeOff></TimeOff>
        <RequestHistory {requests}></RequestHistory>
      </div>
      {:else if choice === tabs[3].subtabs[0].key}
        <UploadDocs {docs}></UploadDocs>
      {:else if choice === tabs[3].subtabs[1].key}
        <ViewDocuments></ViewDocuments>
      {:else if choice === tabs[4].key}
        <UserProfile></UserProfile>
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

  .time-off-page{
    display: flex;
    overflow: auto;
    align-items: flex-start;
  }
  .homePage{
    display: flex;
  }
</style>
