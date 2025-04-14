<script>
  import { onMount } from 'svelte';
  import Popup from './widgets/Popup.svelte';
  // @ts-ignore
  import { issues } from '$assets/store.svelte.js';

  let boardGroups = $derived(transformIssuesToBoardGroups(issues))

  let newIssueTitle = $state("");
  let newIssueDescription = $state("");
  let newBoardName = $state("");
  let showAddBoardPopup = $state(false);
  let showAddIssuePopup = $state(false);
  let searchQuery = $state("");
  let selectedGroup = $state(boardGroups[0]?.name || ""); // Default to the first group
  let selectedIssue = $state(null);
  let showIssueDetails = $state(false);
  let dragIssueId = $state(null); // Store the ID of the dragged issue
  let dragOverBoard = $state(null);

  function transformIssuesToBoardGroups(issues) {
  const groups = {};

  issues.forEach((issue) => {
    if (!groups[issue.group]) {
      groups[issue.group] = { name: issue.group, boards: [] };
    }

    const group = groups[issue.group];
    let board = group.boards.find((b) => b.name === issue.board);

    if (!board) {
      board = { name: issue.board, issues: [] };
      group.boards.push(board);
    }

    board.issues.push(issue);
  });

  return Object.values(groups);
}

  // Utility function to calculate luminance and determine text color
  function getTextColorForBackground(backgroundColor) {
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return white text for dark backgrounds, black text for light backgrounds
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  function addIssue(title, description, boardName) {
    if (title.trim() && description.trim() && boardName.trim()) {
      const group = boardGroups.find(group => group.name === selectedGroup);
      const board = group?.boards.find(board => board.name === boardName);
      if (board) {
        board.issues.push({
          id: "id" + Math.random().toString(16).slice(2),
          title: title,
          description: description,
          dueDate: "2025-03-30",
          originator: "User C",
          tags: []
        });
      }
      showAddIssuePopup = false;
    }
  }

  function addBoard() {
    if (newBoardName.trim()) {
      const group = boardGroups.find(group => group.name === selectedGroup);
      if (group) {
        group.boards.push({ name: newBoardName, issues: [] });
      }
      newBoardName = "";
      showAddBoardPopup = false;
    }
  }

  function handleDragStart(issueId) {
    dragIssueId = issueId; // Store the dragged issue ID
  }

  function handleDrop(targetBoardName) {
    const issue = issues.find((i) => i.id === dragIssueId); // Find the issue in the store
    console.log(issue)
    if (issue) {
      issue.board = targetBoardName; // Update the board (state) of the issue
    }

    dragIssueId = null; // Clear the dragged issue ID
    dragOverBoard = null;
  }

  function allowDrop(boardName) {
    dragOverBoard = boardName;
  }

  function searchIssues() {
    console.log("Searching for:", searchQuery);
  }


  function jumpToSettings() {
    console.log("Jumping to settings");
  }

  function selectIssue(issue) {
    selectedIssue = issue;
    showIssueDetails = true;
  }

  function closeIssueDetails() {
    showIssueDetails = false;
  }
</script>

<div class="issue-board-container">
  <div class="top-bar">
    <select class="groups-selection" bind:value={selectedGroup} >
      {#each boardGroups as group}
        <option value={group.name}>{group.name}</option>
      {/each}
    </select>
    <input
      type="text"
      placeholder="Search issues..."
      bind:value={searchQuery}
      oninput={searchIssues}
    />
    <button class="settings-button" onclick={jumpToSettings}>
      <i class="fas fa-cog"></i>
    </button>
    <button class="standard-button" onclick={() => showAddIssuePopup = true}>Add Issue</button>
    <button class="standard-button" onclick={() => showAddBoardPopup = true}>Add Board</button>
  </div>
  <div class="main-content">
    <div class="boards">
      {#if selectedGroup}
        {#each boardGroups.find(group => group.name === selectedGroup)?.boards as board}
          <div
            class="board {dragOverBoard === board.name ? 'drag-over' : ''}"
            ondrop={() => handleDrop(board.name)}
            ondragover={() => allowDrop(board.name)}
          >
            <h2>{board.name}</h2>
            <div class="issue-list">
              {#each board.issues as issue}
                <div
                  class="issue"
                  draggable="true"
                  ondragstart={() => handleDragStart(issue.id)}
                >
                  <div class="issue-header">
                    <h3>{issue.title}</h3>
                    <button
                      class="ellipsis-button"
                      onclick={() => selectIssue(issue)}
                      aria-label="More options"
                    >
                      ...
                    </button>
                  </div>
                  <p>{issue.description}</p>
                  <div class="tags">
                    {#each issue.tags as tag}
                      <span
                        class="tag"
                        style="background-color: {tag.color}; color: {getTextColorForBackground(tag.color)}"
                      >
                        {#if tag.count}
                          <span class="tag-count">{tag.count}</span>
                        {/if}
                        {tag.name}
                      </span>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    </div>
    {#if showIssueDetails}
      <div class="issue-details">
        <button class="close-button" onclick={closeIssueDetails}>Close</button>
        <h2>Issue Details</h2>
        <p><strong>Title:</strong> {selectedIssue.title}</p>
        <p><strong>Description:</strong> {selectedIssue.description}</p>
        <p><strong>Due Date:</strong> {selectedIssue.dueDate}</p>
        <p><strong>Originator:</strong> {selectedIssue.originator}</p>
      </div>
    {/if}
  </div>
</div>

{#snippet boardDialog()}
<div class="popup-content">
    <h2>Add New Board</h2>
    <input
      type="text"
      placeholder="Board Name"
      bind:value={newBoardName}
    />
    <button onclick={addBoard}>Confirm</button>
  </div>
{/snippet}

{#snippet issueDialog()}
<div class="popup-content">
    <h2>Add New Issue</h2>
    <input
      type="text"
      placeholder="Issue Title"
      bind:value={newIssueTitle}
    />
    <textarea
      placeholder="Issue Description"
      bind:value={newIssueDescription}
    ></textarea>
    <!--<select bind:value={selectedBoardForIssue}>
      <option value="" disabled selected>Select a Board</option>
      {#each boardGroups.find(group => group.name === selectedGroup)?.boards as board}
        <option value={board.name}>{board.name}</option>
      {/each}
    </select>-->
    <button onclick={() => addIssue(newIssueTitle, newIssueDescription, selectedBoardForIssue)}>Confirm</button>
</div>
{/snippet}

{#if showAddBoardPopup}
  <Popup popupContent={boardDialog} bind:active={showAddBoardPopup} popupData="">
  </Popup>
{/if}

{#if showAddIssuePopup}
  <Popup popupContent={issueDialog} bind:active={showAddIssuePopup} popupData="">
  </Popup>
{/if}

<style>
  * {
    box-sizing: border-box;
  }

  .issue-board-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #1e1e1e;
    color: #e0e0e0;
    font-family: Arial, sans-serif;
  }

  .top-bar {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #2e2e2e;
    border-bottom: 1px solid #444444;
    align-items: center;
  }

  .top-bar input,
  .top-bar select {
    padding: 0.5rem;
    background-color: #2e2e2e;
    color: #e0e0e0;
    border: 1px solid #444444;
    border-radius: 4px;
    flex: 1;
  }

  .standard-button {
    padding: 0.5rem;
    background-color: #4f46e5; /* Purple background */
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .settings-button {
    background: none; 
    border: none;
    color: #e0e0e0;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .main-content {
    display: flex;
    flex-grow: 1;
    padding: 1rem;
    overflow-x: auto;
  }

  .boards {
    display: flex;
    gap: 1rem;
  }

  .board {
    background-color: #2e2e2e;
    padding: 0.86rem;
    border-radius: 4px;
    border: 1px solid #444444;
    min-width: 300px;
    flex: 0 0 300px;
  }

  .board.drag-over {
    border: 2px dashed #4f46e5;
  }
  .board h2 {
    font-size: 1.2rem;
    margin-top: 0;
    color: #ffffff; /* White text for the board title */
  }
  .issue {
    background-color: #3a3a3a; /* Lighter background for better contrast */
    padding: 0.8rem; /* Reduced padding to shrink the issue size */
    border-radius: 6px; /* Slightly smaller rounded corners */
    border: 1px solid #555555; /* Subtle border for definition */
    cursor: grab;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
    font-size: 0.85rem; /* Slightly smaller font size for readability */
    color: #f0f0f0; /* Light text color for better contrast */
  }

  .issue:hover {
    background-color: #4a4a4a; /* Slightly lighter background on hover */
    transform: translateY(-2px); /* Subtle lift effect on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
  }

  .issue h3 {
    font-size: 0.95rem; /* Slightly smaller font size for the title */
    font-weight: bold; /* Bold title for emphasis */
    margin-top: 0.2rem;
    margin-bottom: 0.4rem; /* Reduced spacing below the title */
    color: #ffffff; /* White text for the title */
  }

  .issue p {
    font-size: 0.8rem; /* Smaller font size for the description */
    margin: 0.4rem 0; /* Reduced spacing around the description */
    color: #d0d0d0; /* Muted text color for the description */
  }

  .tags {
    display: flex;
    gap: 0.4rem; /* Reduced spacing between tags */
    margin-top: 0.4rem; /* Reduced spacing above tags */
    flex-wrap: wrap; /* Allow tags to wrap to the next line */
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.5rem; /* Reduced padding for smaller tags */
    border-radius: 10px; /* Slightly smaller rounded pill shape */
    font-size: 0.75rem; /* Slightly smaller font size for tags */
    color: #ffffff; /* White text for tags */
    font-weight: bold; /* Bold text for tags */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow for tags */
  }

  .tag-count {
    margin-right: 0.2rem; /* Reduced spacing between count and tag name */
    font-size: 0.75rem; /* Match font size with the tag */
    font-weight: bold; /* Bold text for the count */
  }

  .issue-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem; /* Reduced spacing between issues */
  }

  /* Add a subtle animation for drag-and-drop */
  .issue:active {
    transform: scale(0.96); /* Slightly shrink the issue when dragging */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); /* Adjust shadow during drag */
  }

  .issue-details {
    width: 300px;
    height: 100%;
    padding: 1rem;
    margin: 0;
    background-color: #2e2e2e;
    border-left: 1px solid #444444;
    overflow-y: auto;
    position: absolute;
    top: 0;
    right: 0;
  }
  .issue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ellipsis-button {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    margin: 0;
    transition: color 0.2s;
  }

  .ellipsis-button:hover {
    color: #4f46e5; /* Highlight color on hover */
  }
  .close-button {
    background-color: #4f46e5;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0.5rem;
    margin-bottom: 1rem;
    transition: background-color 0.2s;
  }

  .close-button:hover {
    background-color: #6a5acd;
  }

  .popup-content {
    background-color: #1e1e1e;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #444444;
    color: #e0e0e0;
  }

  .popup-content input,
  .popup-content textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #444444;
    border-radius: 4px;
    background-color: #2e2e2e;
    color: #e0e0e0;
  }

  .popup-content button {
    width: 100%;
    padding: 0.5rem;
    background-color: #4f46e5;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .popup-content button:hover {
    background-color: #6a5acd;
  }

  .groups-selection {
    flex: 0 0 150px;
    padding: 0.5rem;
    background-color: #2e2e2e;
    color: #e0e0e0;
    border: 1px solid #444444;
    border-radius: 4px;
  }

  .boards-selection {
    flex: 0 0 150px;
    padding: 0.5rem;
    background-color: #2e2e2e;
    color: #e0e0e0;
    border: 1px solid #444444;
    border-radius: 4px;
  }
</style>