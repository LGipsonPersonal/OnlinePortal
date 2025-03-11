<!-- svelte-ignore state_referenced_locally -->
<svelte:window onpopstate={watchURL}/>
<script>
  import Menu from "./Menu.svelte";
  import { setContext } from "svelte";
  import TimeTable from "./TimeTable.svelte";;
  import TimeOff from "./TimeOff.svelte";
  import TopBar from "./TopBar.svelte";
  import UploadDocs from "./UploadDocs.svelte";
  import RequestHistory from "./RequestHistory.svelte";
  import UserProfile from "./UserProfile.svelte";
  import ViewDocuments from "./ViewDocuments.svelte";
  import Announcements from "./Announcements.svelte";
  import QuickTime from "./widgets/QuickTime.svelte";
  import EmergencyRequestOff from "./widgets/EmergencyRequestOff.svelte";
    // @ts-ignore
  import ItSupportTicket from "./ItSupportTicket.svelte";
  import Popup from "./widgets/Popup.svelte";
  // @ts-ignore
  import { tabs, requests, docs, images, profile, projectUpcoming, events, projects, announcements, deadlines, meetings } from "$assets/store.svelte.js";
  import ProjectsDashboard from "./ProjectsDashboard.svelte";
  import Projectheader from "./Projectheader.svelte";
  import ProjectTimeline from "./ProjectTimeline.svelte"
  import IssueBoard from "./IssueBoard.svelte";
  import Conversation from "./Conversation.svelte";

  setContext('MainPage', {updateChoice})

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
      if(tabKey === '5'){
        return [selectedTab, selectedTab.subtabs[+subtabIndex], {name: projSubChoice}];
      }
      return [selectedTab, selectedTab.subtabs[+subtabIndex]];
    }
    
    // Return empty array if no match is found
    return [];
  }
});
let projSubChoice = $state("Timeline");

$inspect(projSubChoice)
</script>


<div class="fullscreen">
  <Menu {choice} {tabs}></Menu>
  <div class="main-page">
    <TopBar {currentTabs}></TopBar>
    {#if choice === tabs[0].key}
      <div class="homePage">
        <div class="main-row">
            <Announcements props={announcements}></Announcements>
            <Announcements props={events}></Announcements>
            <QuickTime></QuickTime>
        </div>
        <div class="main-row">
          <Announcements props={deadlines}></Announcements>
          <Announcements props={meetings}></Announcements>
          <EmergencyRequestOff></EmergencyRequestOff>
        </div>
          <!--<Carousel {images}></Carousel>-->
      </div>
    {:else if choice === tabs[1].key}
      <TimeTable {projects} sheetRecords={[{startDate: "Feburary 17, 2025"}]}></TimeTable>
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
        WIP
        {:else if choice === tabs[5].subtabs[0].key}
        <div class="time-off-page">
          <ProjectsDashboard props={projectUpcoming}></ProjectsDashboard>
        </div>
      {:else if choice === tabs[6].key}
        <div class="time-off-page">
          <ItSupportTicket></ItSupportTicket>
        </div>
      {:else if choice === tabs[7].subtabs[0].key}
        <Conversation></Conversation>
    {/if}
    {#each tabs[5].subtabs.slice(1) as proj, i}
        {#if choice === proj.key}
          <Projectheader projectTitle={proj.name} bind:selectedTab={projSubChoice}></Projectheader>
          {#if projSubChoice === "Timeline"}
            <ProjectTimeline></ProjectTimeline>
          {:else if projSubChoice === "Issue Board"}
            <IssueBoard></IssueBoard>
          {:else if projSubChoice === "Resources"}
            <p>Resources</p>
          {:else if projSubChoice === "People of Contact"}
            <p>People of Contact</p>
          {:else if projSubChoice === "Discussions"}
            <p>Discussions</p>
          {/if}
        {/if}
    {/each}
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
    border-right: 1px solid var(--border-color);
  }
  .main-row {
    min-height: 0px;
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    width: 100%;
    justify-content: space-between;

  }
  .time-off-page{
    min-height: 0px;
    max-height: 100%;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1rem;
  }
  .homePage{
    min-height: 0px;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    padding: 0.75rem;
    flex-direction: column;
  }
  .blue{
    color: blue;
  }

  /* Add this at the end of the file */
@media (max-width: 768px) {
  .main-page {
    padding: 1rem;
  }

  .main-row {
    flex-direction: column;
  }

  .time-off-page {
    flex-direction: column;
  }

  .homePage {
    padding: 1rem;
  }
}
</style>