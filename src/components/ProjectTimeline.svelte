<script>
    import { onMount } from 'svelte';
    import ProjectsDashboard from './ProjectsDashboard.svelte';
  
    let projectStates = [
      { name: "Alpha", sprints: ["Sprint 1", "Sprint 2", "Sprint 3"] },
      { name: "Beta", sprints: ["Sprint 4", "Sprint 5", "Sprint 6"] },
      { name: "Gamma", sprints: ["Sprint 7", "Sprint 8", "Sprint 9"] }
    ];
  
    let selectedState = $state(null);
    let selectedSprint = $state(null);
    let tasks = $state([]);
  
    function selectState(state) {
      selectedState = state;
      selectedSprint = null;
      tasks = [];
    }
  
    function selectSprint(sprint) {
      selectedSprint = sprint;
      // Fetch tasks for the selected sprint (mock data for now)
      tasks = [
        { id: 1, title: "Task 1", description: "Description for Task 1", date: "2025-03-01", project: "Project A", avatar: "https://via.placeholder.com/60" },
        { id: 2, title: "Task 2", description: "Description for Task 2", date: "2025-03-02", project: "Project B", avatar: "https://via.placeholder.com/60" }
      ];
    }
  </script>
  
  <div class="timeline-container">
    <div class="sidebar">
      {#each projectStates as state}
        <div class="state-section">
          <div class="state-header" on:click={() => selectState(state.name)}>
            {state.name}
          </div>
          {#if selectedState === state.name}
            <div class="sprint-list">
              {#each state.sprints as sprint}
                <div class="sprint-item" on:click={() => selectSprint(sprint)}>
                  {sprint}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    <div class="content">
      {#if selectedSprint}
        <ProjectsDashboard props={tasks} />
      {/if}
    </div>
  </div>
  
  <style>
    .timeline-container {
      display: flex;
      height: 100vh;
      background-color: #1e1e1e; /* Dark background */
      color: #e0e0e0; /* Light text */
    }
  
    .sidebar {
      width: 250px;
      background-color: #2e2e2e; /* Darker background */
      padding: 1rem;
      border-right: 1px solid #444444; /* Darker border */
      overflow-y: auto;
    }
  
    .state-section {
      margin-bottom: 1rem;
    }
  
    .state-header {
      font-size: 1.25rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      background-color: #333333;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    .state-header:hover {
      background-color: #444444;
    }
  
    .sprint-list {
      margin-top: 0.5rem;
      padding-left: 1rem;
    }
  
    .sprint-item {
      font-size: 1rem;
      padding: 0.5rem 1rem;
      background-color: #3a3a3a;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-bottom: 0.5rem;
    }
  
    .sprint-item:hover {
      background-color: #4f46e5; /* Purple background */
    }
  
    .content {
      flex-grow: 1;
      padding: 1rem;
      overflow-y: auto;
    }
  </style>