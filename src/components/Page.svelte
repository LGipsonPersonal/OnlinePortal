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
  import ViewDocuments from "./ViewDocuments.svelte";
  import Announcements from "./Announcements.svelte";
  import QuickTime from "./widgets/QuickTime.svelte";
  import EmergencyRequestOff from "./widgets/EmergencyRequestOff.svelte";
    // @ts-ignore
  import ItSupportTicket from "./ItSupportTicket.svelte";
  import Popup from "./widgets/Popup.svelte";
  // @ts-ignore
  import { tabs, requests, docs, images, profile, projectUpcoming, events, projects, announcements, deadlines, meetings, issues, stateGroups } from "$assets/store.svelte.js";
  import Projectheader from "./Projectheader.svelte";
  import ProjectContacts from "./ProjectContacts.svelte";
  import ProjectTimeline from "./ProjectTimeline.svelte"
  import IssueBoard from "./IssueBoard.svelte";
  import Conversation from "./Conversation.svelte";
  import ProjectsDashboard from "./ProjectsDashboard.svelte";
  import Resources from "./Resources.svelte";

  
fetch('/api')
  .then(res => res.text())
  .then(data => console.log(data)); // Should log "Hello World!!!!"

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

 import { projectContacts, projectResources } from "$assets/store.svelte.js";

function getProjectContacts(projectKey) {
  const projectId = projectKey.split("-")[1];
  return projectContacts.find(p => p.projectId === projectId)?.people ?? [];
}

function getProjectResources(projectKey) {
  const projectId = projectKey.split("-")[1];
  return projectResources.find(p => p.projectId === projectId)?.groups ?? [];
}

  let choice = $state('0');
  history.pushState( {choice}, '', `/${choice}`)

let currentTabs = $derived.by(() => {
  const parts = choice.split('-');
  const selectedTab = tabs.find(tab => tab.key === parts[0]);

  if (!selectedTab) return [];
  if (parts.length === 1) return [selectedTab];

  let result = [selectedTab];
  let subtabs = selectedTab.subtabs;

  for (let i = 1; i < parts.length; i++) {
    subtabs = subtabs?.[parts[i]];
    if (!subtabs) break;
    result.push(subtabs);
  }

  return result;
});

let projSubChoice = $state("Timeline");

$inspect(projSubChoice)

// Filter issues and stateGroups for the current project
function getProjectData(projectKey) {
    const projectId = projectKey.split("-")[1]; // Extract project ID from the key
    const project = projects.find((project) => project.id === projectId);

    if (!project) {
      return { projectIssues: [], projectStateGroups: [] };
    }

    const projectIssues = issues.filter((issue) => issue.projectId === projectId);

    // Find state groups that match the names in the project's stateGroups
    const projectStateGroups = stateGroups.filter((group) =>
      project.stateGroups.includes(group.name)
    );

    return { projectIssues, projectStateGroups };
  }
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
          <QuickTime {projects} ></QuickTime>
        </div>
        <div class="main-row">
          <Announcements props={deadlines}></Announcements>
          <Announcements props={meetings}></Announcements>
          <EmergencyRequestOff></EmergencyRequestOff>
        </div>
      </div>
    {:else if choice === tabs[1].key}
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
      WIP
    {:else if choice === tabs[5].subtabs[0].key}
      <div class="time-off-page">
        <ProjectsDashboard></ProjectsDashboard>
      </div>
    {:else if choice === tabs[6].key}
      <div class="time-off-page">
        <ItSupportTicket></ItSupportTicket>
      </div>
    {/if}
    {#each tabs[5].subtabs as proj, i}
        {#if choice === `${proj.key}-0`}
          <ProjectTimeline></ProjectTimeline>
        {:else if choice === `${proj.key}-1`}
          <IssueBoard
            issues={getProjectData(proj.key).projectIssues}
            stateGroups={getProjectData(proj.key).projectStateGroups}
            projectId={proj.key.split("-")[1]}
          />
        {:else if choice === `${proj.key}-2`}
          <Resources resourceGroups={getProjectResources(proj.key)}></Resources>
        {:else if choice === `${proj.key}-3`}
          <ProjectContacts peopleOfContact={getProjectContacts(proj.key)} ></ProjectContacts>

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