<script>
  import TaskSearchBar from "./TaskSearchbar.svelte";
  // Import the `issues` array from the store
  import { issues } from "$assets/store.svelte.js";

  let searchResults = $state([]);

  // Extract unique states (boards) from the issues array
  let states = $derived.by(() => [...new Set(issues.map((issue) => issue.board))]);

  // Function to update the state (board) of an issue
  function updateTaskState(task, newState) {
    const issue = issues.find((i) => i.id === task.id);
    if (issue) {
      issue.board = newState; // Update the board field
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
</script>

<div class="dashboard-container">
  <h2 class="board-title">Projects Dashboard</h2>
  <TaskSearchBar tasks={issues} bind:results={searchResults} />

  <div class="table-wrapper">
    <table class="dashboard-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Due Date</th>
          <th>Project</th>
          <th>State</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {#each (searchResults.length > 0 ? searchResults : issues) as task}
          <tr>
            <td>{task.title}</td>
            <td>{task.dueDate}</td>
            <td>{task.group}</td>
            <td>
              <select
                bind:value={task.board}
                class="state-select"
                on:change={(e) => updateTaskState(task, e.target.value)}
              >
                {#each states as state}
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
                  >
                    {tag.name}
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
    text-align: left;
    border-right: 1px solid #444444; /* Add dividing line between columns */
  }

  .dashboard-table th:last-child {
    border-right: none; /* Remove dividing line for the last column */
  }

  .dashboard-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #2e2e2e;
    color: #d1d1d1;
    border-right: 1px solid #444444; /* Add dividing line between columns */
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