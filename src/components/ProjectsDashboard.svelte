<script>
  import { issues, stateGroups, projects } from "$assets/store.svelte.js";

  let searchTerm = $state("");
  let searchResults = $state([]);
  let searchType = $state("tasks");

  // Extract available states for an issue based on its stateGroup
  function getAvailableStates(issue) {
    const stateGroup = stateGroups.find((group) => group.name === issue.stateGroup);
    return stateGroup ? stateGroup.states : [];
  }

  // Function to update the state (board) of an issue
  function updateTaskState(task, newState) {
    if (confirm(`Change state of "${task.name}" to "${newState}"?`)) {
      const issue = issues.find((i) => i.id === task.id);
      if (issue) {
        issue.state = newState; // Update the state of the issue
      }
    }
  }

  // Function to get text color based on background color
  function getTextColorForBackground(backgroundColor) {
    const color = backgroundColor.substring(1); // Remove the '#' character
    const rgb = parseInt(color, 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Calculate luma
    return luma > 128 ? "#000000" : "#ffffff"; // Return black or white based on luma
  }

  // Filter tasks based on the search term
  function filterTasks() {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      searchResults = [];
      return;
    }
    if (searchType === "tasks") {
      searchResults = issues.filter(task =>
        task.name.toLowerCase().includes(term)
      );
    } else if (searchType === "projects") {
      searchResults = issues.filter(task =>
        projects.find(p => p.id === task.projectId)?.name.toLowerCase().includes(term)
      );
    } else if (searchType === "tags") {
      searchResults = issues.filter(task =>
        task.tags.some(tag => tag.name.toLowerCase().includes(term))
      );
    }
  }
</script>

<div class="dashboard-container">
  <h2 class="board-title">Projects Dashboard</h2>

  <!-- Search Bar with Dropdown -->
  <div class="searchbar-group">
    <select
      class="search-dropdown"
      bind:value={searchType}
      aria-label="Choose search type"
    >
      <option value="tasks">Tasks</option>
      <option value="projects">Projects</option>
      <option value="tags">Tags</option>
    </select>
    <input
      class="search-bar"
      type="text"
      placeholder={`Search ${searchType}…`}
      bind:value={searchTerm}
      on:input={filterTasks}
      aria-label="Search"
      autocomplete="off"
    />
  </div>

  <div class="table-wrapper">
    <table class="dashboard-table" aria-label="Project Issues Table">
      <caption class="sr-only">Project Issues Table</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Due Date</th>
          <th scope="col">Project</th>
          <th scope="col">State</th>
          <th scope="col">Tags</th>
        </tr>
      </thead>
      <tbody>
        {#each (searchResults.length > 0 ? searchResults : issues) as task (task.id)}
          <tr>
            <td>{task.name}</td>
            <td>{task.dueDate}</td>
            <td>{projects.find((project) => project.id === task.projectId).name}</td>
            <td>
              <select
                bind:value={task.state}
                class="state-select"
                aria-label="Change task state"
                on:change={(e) => updateTaskState(task, e.target.value)}
              >
                {#each getAvailableStates(task) as state}
                  <option value={state}>{state}</option>
                {/each}
              </select>
            </td>
            <td>
              <div class="tags">
                {#each task.tags as tag}
                  <span
                    class="tag"
                    style="background-color: {tag.color}; color: {getTextColorForBackground(tag.color)}"
                    title={tag.name}
                  >
                    {tag.name.length > 16 ? tag.name.slice(0, 15) + "…" : tag.name}
                  </span>
                {/each}
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .dashboard-container {
    max-height: calc(100vh - 7rem);
    flex: 1 1 100%;
    background: var(--accent-color-two);
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #444;
    color: #e0e0e0;
    overflow: hidden;
  }

  .board-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
    color: #e0e0e0;
    border-bottom: 1px solid #444;
    padding-bottom: 0.8rem;
  }

  .searchbar-group {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    gap: 0;
  }

  .search-dropdown {
    border: 1px solid #444;
    border-radius: 6px 0 0 6px;
    background: #232336;
    color: #e0e0e0;
    font-size: 1rem;
    padding: 0.6rem 0.8rem;
    outline: none;
    border-right: none;
    height: 42px;
    min-width: 110px;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .search-dropdown:focus {
    border-color: #4f46e5;
    z-index: 2;
  }

  .search-bar {
    width: 100%;
    box-sizing: border-box;
    padding: 0.6rem 1rem;
    border-radius: 0 6px 6px 0;
    border-left: none;
    height: 42px;
    border: 1px solid #444;
    background: #232336;
    color: #e0e0e0;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .search-bar:focus {
    border-color: #4f46e5;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }

  .table-wrapper {
    overflow-x: auto;
    margin-top: 1rem;
  }

  .dashboard-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    background-color: #1e1e1e;
    color: #e0e0e0;
    border: 1px solid #2e2e2e;
    border-radius: 8px;
    overflow: hidden;
  }

  .dashboard-table th {
    background-color: #2e2e2e;
    color: #e0e0e0;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    padding: 0.75rem;
    border-bottom: 1px solid #444444;
    text-align: center;
    border-right: 1px solid #444444; /* Add dividing line between columns */
  }

  .dashboard-table th:last-child {
    border-right: none; /* Remove dividing line for the last column */
  }

  .dashboard-table td {
    padding: 0.75rem;
    text-align: center;
    border-bottom: 1px solid #2e2e2e;
    color: #d1d1d1;
    border-right: 1px solid #444444; /* Add dividing line between columns */
    max-width: 200px; /* Set a maximum width for each cell */
    word-wrap: break-word; /* Allow text to wrap within the cell */
    word-break: break-word; /* Break long words if necessary */
    white-space: normal; /* Allow text to wrap to the next line */
  }

  .dashboard-table td:last-child {
    border-right: none; /* Remove dividing line for the last column */
  }

  .dashboard-table tr:hover {
    background-color: #2a2a2a;
    transition: background-color 0.3s ease;
  }

  .tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .tag {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
    color: #ffffff;
  }

  .priority {
    font-weight: bold;
  }

  .priority.high {
    color: #ff6b6b; /* Red for high priority */
  }

  .priority.medium {
    color: #ffa500; /* Orange for medium priority */
  }

  .priority.low {
    color: #4caf50; /* Green for low priority */
  }

  .state-select {
    padding: 0.2rem;
    font-size: 0.875rem;
    border: 1px solid #444444;
    border-radius: 4px;
    background-color: #2e2e2e;
    color: #e0e0e0;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .state-select:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
  }
</style>