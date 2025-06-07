<script>
  // @ts-ignore
  let { issues, stateGroups, projectId } = $props();
  import { getNewIssueId } from "$assets/store.svelte.js";

  let renamingBoard = $state(null); // board.name being renamed, or null
  let renameValue = $state("");     // current value of the input

  let boardGroups = $derived.by(() => {
    const groups = {};

    // Iterate through all stateGroups
    stateGroups.forEach((stateGroup) => {
      if (!groups[stateGroup.name]) {
        groups[stateGroup.name] = { name: stateGroup.name, boards: [] };
      }

      const group = groups[stateGroup.name];

      // Add all states from the stateGroup to the boards
      stateGroup.states.forEach((state) => {
        let board = group.boards.find((b) => b.name === state);

        if (!board) {
          board = { name: state, issues: [] }; // Initialize empty board
          group.boards.push(board);
        }
      });
    });

    // Assign issues to the appropriate boards
    issues.forEach((issue) => {
      const stateGroup = groups[issue.stateGroup];
      if (!stateGroup) return;

      const board = stateGroup.boards.find((b) => b.name === issue.state);
      if (board) {
        board.issues.push(issue);
      }
    });

    return Object.values(groups);
  });

  let searchQuery = $state("");
  let selectedGroup = $state(boardGroups[0]?.name || ""); // Default to the first group
  let selectedIssue = $state(null);
  let showIssueDetails = $state(false);
  let dragIssueId = $state(null); // Store the ID of the dragged issue
  let dragOverBoard = $state(null);
  let showAddIssuePopup = $state(false);
  let addIssueBoard = '';

  let newIssue = $state({
    name: "",
    description: "",
    dueDate: "",
    originator: "",
    tags: "",
  });

  function handleDragStart(issueId) {
    dragIssueId = issueId; // Store the dragged issue ID
  }

  function handleDrop(targetBoardName) {
    const index = issues.findIndex((i) => i.id === dragIssueId);
    if (index !== -1) {
      issues[index] = { ...issues[index], state: targetBoardName };
      issues = [...issues]; // Force reactivity
    }
    dragIssueId = null;
    dragOverBoard = null;
  }


  function allowDrop(event, boardName) {
    event.preventDefault(); // Allow the drop event to occur
    dragOverBoard = boardName;
  }

  function searchIssues() {
    console.log("Searching for:", searchQuery);
  }

  function selectIssue(issue) {
    selectedIssue = issue;
    showIssueDetails = true;
  }

  function closeIssueDetails() {
    showIssueDetails = false;
  }

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

  function submitNewIssue() {
    // Basic validation
    if (!newIssue.name || !newIssue.description) {
      alert("Title and Description are required.");
      return;
    }

    // Generate a deterministic color from a tag name
    function colorFromString(str) {
      // Simple hash function
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      // Generate color
      let color = "#";
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).slice(-2);
      }
      return color;
    }

    // Parse tags as objects with name and generated color
    const tags = newIssue.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(name => ({
        name,
        color: colorFromString(name)
      }));

    // Create a new issue object
    const issue = {
      id: getNewIssueId(), // Simple ID generation
      name: newIssue.name,
      description: newIssue.description,
      dueDate: newIssue.dueDate,
      originator: newIssue.originator,
      tags, // Use the new tags array
      state: addIssueBoard, // Set initial state to the board it's added to
      stateGroup: selectedGroup, // Set the state group,
      projectId
    };

    // Add the new issue to the issues array
    issues = [...issues, issue];

    // Reset the new issue form
    newIssue = {
      name: "",
      description: "",
      dueDate: "",
      originator: "",
      tags: "",
    };

    closeAddIssuePopup();
  }

  function closeAddIssuePopup() {
    showAddIssuePopup = false;
    addIssueBoard = '';
  }

  // Track which board's menu is open
  let openBoardMenu = $state(null);

  function toggleBoardMenu(boardName) {
    openBoardMenu = openBoardMenu === boardName ? null : boardName;
  }

  function closeBoardMenu() {
    openBoardMenu = null;
  }

  // Optional: Close menu when clicking outside
  function handleDocumentClick(event) {
    if (!event.target.closest('.board-menu') && !event.target.closest('.board-menu-btn')) {
      closeBoardMenu();
    }
  }
  

  // Listen for clicks outside the menu
  if (typeof window !== "undefined") {
    window.addEventListener('click', handleDocumentClick);
  }


  function moveBoardLeft(boardName) {
    const group = stateGroups.find(g => g.name === selectedGroup);
    if (!group) {
      window.alert("Group not found");
      closeBoardMenu(); 
      return;
    }
    const boardIndex = group.states.findIndex(b => b === boardName);
    if (boardIndex === -1 || boardIndex === 0) { // Can't move first board left
      window.alert("Can't move the board to the left");
      closeBoardMenu();
      return;
    }
    // Swap with the previous board to the left
    const prevBoardName = group.states[boardIndex - 1];
    group.states[boardIndex] = prevBoardName;
    group.states[boardIndex - 1] = boardName;
    closeBoardMenu(); // Close the menu after moving
  }

  function moveBoardRight(boardName) {
    const group = stateGroups.find(g => g.name === selectedGroup);
    if (!group) {
      window.alert("Group not found");
      closeBoardMenu(); 
      return;
    }
    const boardIndex = group.states.findIndex(b => b === boardName);
    if (boardIndex === -1 || boardIndex === group.states.length - 1)  { // Can't move last board right
      window.alert("Can't move the board to the right");
      closeBoardMenu();
      return;
    }
    // Swap with the next board to the right
    const nextBoardName = group.states[boardIndex + 1];
    group.states[boardIndex] = nextBoardName;
    group.states[boardIndex + 1] = boardName;
    closeBoardMenu(); // Close the menu after moving
  }

  function finishRenameBoard(board) {
    const group = stateGroups.find(g => g.name === selectedGroup);
    if (!group) return;
    const idx = group.states.findIndex(n => n === board.name);
    if (idx !== -1 && renameValue.trim() && renameValue !== board.name) {
      // Update the state name in the group
      group.states[idx] = renameValue.trim();
      // Also update the board object name
      board.name = renameValue.trim();
      // Update all issues in this board to use the new state name
      issues = issues.map(issue =>
        issue.stateGroup === selectedGroup && issue.state === board.name
          ? { ...issue, state: renameValue.trim() }
          : issue
      );
    }
    renamingBoard = null;
    renameValue = "";
  }
</script>

<div class="issue-board-container">
  <div class="top-bar">
    <select class="groups-selection" bind:value={selectedGroup}>
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

  </div>
  <div class="main-content">
    <div class="boards">
      {#if selectedGroup}
        {#each boardGroups.find((group) => group.name === selectedGroup)?.boards as board}
          <div
            class="board {dragOverBoard === board.name ? 'drag-over' : ''}"
            ondrop={() =>  handleDrop(board.name)}
            ondragover={(event) => allowDrop(event, board.name)}
            role="region"
            aria-label={`Board: ${board.name}`}
          >
          <div class="section-header">
            {#if renamingBoard === board.name}
              <input
                class="rename-board-input"
                bind:value={renameValue}
                onblur={() => finishRenameBoard(board)}
                onkeydown={(e) => e.key === 'Enter' && finishRenameBoard(board)}
                autofocus
              />
            {:else}
              <h2>
                {board.name} <span class="tag-count">({board.issues.length})</span>
              </h2>
            {/if}
            <div style="display: flex; gap: 0.2em;">

            <button
              class="board-menu-btn"
              aria-label="Board options"
              onclick={() => toggleBoardMenu(board.name)}
              tabindex="0"
            >...</button>
            {#if openBoardMenu === board.name}
              <div class="board-menu">
                <ul>
                  <li>
                    <button tabindex="0" onclick={() => {
                      renamingBoard = board.name;
                      renameValue = board.name;
                      closeBoardMenu();
                    }}>Rename Board</button>
                  </li>
                  <li><button tabindex="0" onclick={() => {
                    showAddIssuePopup = true;
                    addIssueBoard = board.name; // Set the board for the new issue
                    }}>Add Issue</button></li>
                  <li><button tabindex="0">Archive Board</button></li>
                  <li><button tabindex="0" onclick={() => moveBoardLeft(board.name)}>Move Board Left</button></li>
                  <li><button tabindex="0" onclick={() => moveBoardRight(board.name)}>Move Board Right</button></li>
                  <li><button tabindex="0">Protect Board</button></li>
                </ul>
              </div>
            {/if}
            </div>
            </div> 
            <div class="issue-list">
              {#if board.issues.length > 0}
                {#each board.issues as issue (issue.id)}
                  <div
                    class="issue {dragIssueId === issue.id ? 'dragging' : ''}"
                    draggable="true"
                    ondragstart={() => handleDragStart(issue.id)}
                    ondragend={() => (dragIssueId = null)}
                    role="listitem"
                    aria-label={`Issue: ${issue.name}`}
                  >
                    <div class="issue-header">
                      <h3 title={issue.name}>{issue.name}</h3>
                      <button
                        class="ellipsis-button"
                        onclick={() => selectIssue(issue)}
                        aria-label="More options"
                      >
                        ...
                      </button>
                    </div>
                    <p title={issue.description}>{issue.description}</p>
                    <div class="tags">
                      {#each issue.tags as tag}
                        <!-- Tag with tooltip -->
                        <span
                          class="tag"
                          style="background-color: {tag.color}; color: {getTextColorForBackground(tag.color)}"
                          title={tag.name}
                        >
                          {tag.name}
                        </span>
                      {/each}
                    </div>
                  </div>
                {/each}
              {:else}
                <p class="empty-board-message">No issues in this board</p>
              {/if}
            </div>
          </div>
        {/each}
      {/if}
    </div>
    {#if showIssueDetails}
      <div class="issue-details">
        <button class="close-button" onclick={closeIssueDetails}>Close</button>
        <h2>Issue Details</h2>
        <p><strong>Title:</strong> {selectedIssue.name}</p>
        <p><strong>Description:</strong> {selectedIssue.description}</p>
        <p><strong>Due Date:</strong> {selectedIssue.dueDate}</p>
        <p><strong>Originator:</strong> {selectedIssue.originator}</p>
      </div>
    {/if}
    {#if showAddIssuePopup}
      <div class="popup-overlay">
        <div class="popup-content">
          <h3>Add New Issue to "{addIssueBoard}"</h3>
          <input
            placeholder="Title"
            bind:value={newIssue.name}
            required
          />
          <textarea
            placeholder="Description"
            bind:value={newIssue.description}
            rows="3"
          ></textarea>
          <input
            type="date"
            placeholder="Due Date"
            bind:value={newIssue.dueDate}
          />
          <input
            placeholder="Originator"
            bind:value={newIssue.originator}
          />
          <input
            placeholder="Tags (comma separated)"
            bind:value={newIssue.tags}
          />
          <div class="popup-actions">
            <button onclick={submitNewIssue}>Add Issue</button>
            <button onclick={closeAddIssuePopup} class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>


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
  .rename-board-input {
  font-size: 1.2rem;
  padding: 0.2em 0.5em;
  border-radius: 4px;
  border: 1px solid #6366f1;
  background: #232336;
  color: #e0e0e0;
  width: 70%;
  margin-right: 0.5em;
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
  .board.drag-over .issue-list::before {
    content: "Drop here";
    color: #4f46e5;
    text-align: center;
    font-weight: bold;
    display: block;
    margin: 0.5rem 0;
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
    transition: background-color 0.3s, transform 0.2s ease, box-shadow 0.2s;
    font-size: 0.85rem; /* Slightly smaller font size for readability */
    color: #f0f0f0; /* Light text color for better contrast */
  }

  .issue.dragging {
  transform: scale(1.05);
  opacity: 0.5;
  border: 2px dashed #4f46e5;
  background-color: #232336;
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
  .section-header{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 0.2rem;
    padding-top:0.2rem;
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

  .popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30,30,30,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background: #232336;
  color: #e0e0e0;
  border-radius: 8px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  min-width: 320px;
  max-width: 95vw;
  box-shadow: 0 4px 24px rgba(44,62,80,0.18);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.popup-content input,
.popup-content textarea {
  background: #18181b;
  color: #e0e0e0;
  border: 1px solid #35357a;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
}

.popup-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.popup-actions .cancel-btn {
  background: #444;
}

.add-issue-btn {
  background: none;
  border: none;
  color: #b0b0b0;
  
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  outline: none;
}

.add-issue-btn:hover,
.add-issue-btn:focus {
  background: #2a2a2a;
  color: #fff;
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

  .empty-board-message {
    font-size: 0.9rem;
    color: #888888;
    text-align: center;
    margin-top: 1rem;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .cancel-btn {
    background-color: #888888;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: 0.5rem;
    transition: background-color 0.2s;
  }

  .cancel-btn:hover {
    background-color: #aaaaaa;
  }

  .board-menu-btn {
    background: none;
    border: none;
    color: #b0b0b0;
    font-size: 1.3em;
    width: 1.8em;
    height: 1.8em;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    margin-left: 0.2em;
    outline: none;
  }
  .board-menu-btn:hover,
  .board-menu-btn:focus {
    background: #2a2a2a;
    color: #fff;
  }
  .board-menu {
    position: absolute;
    margin-top: 2.2em;
    right: 0;
    background: #232336;
    color: #e0e0e0;
    border: 1px solid #35357a;
    border-radius: 6px;
    box-shadow: 0 2px 12px rgba(44,62,80,0.18);
    z-index: 10;
    min-width: 160px;
    padding: 0.5em 0;
  }
  .board-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .board-menu li {
    margin: 0;
    padding: 0;
  }
  .board-menu button {
    background: none;
    border: none;
    color: #e0e0e0;
    width: 100%;
    text-align: left;
    padding: 0.7em 1.2em;
    font-size: 1em;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .board-menu button:hover,
  .board-menu button:focus {
    background: #35357a;
    color: #fff;
  }
  .section-header {
    position: relative;
  }
</style>