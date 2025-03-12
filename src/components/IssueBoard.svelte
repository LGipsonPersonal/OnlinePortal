<script>
  import { onMount } from 'svelte';
  import Popup from './widgets/Popup.svelte';
  // @ts-ignore
  import { startingBoards } from '$assets/store.svelte.js';

  let backlog = $state([
    { id: "id" + Math.random().toString(16).slice(2), title: "Issue 1", description: "Description for Issue 1" },
    { id: "id" + Math.random().toString(16).slice(2), title: "Issue 2", description: "Description for Issue 2" }
  ]);

  let boards = $state([{ name: "Backlog", issues: backlog }, ...startingBoards.map(name => ({ name, issues: [] }))]);

  let newIssueTitle = $state("");
  let newIssueDescription = $state("");
  let newBoardName = $state("");
  let showAddBoardPopup = $state(false);
  let showAddIssuePopup = $state(false);
  let searchQuery = $state("");
  let selectedBoard = $state("All Boards");

  function addIssue() {
    if (newIssueTitle.trim() && newIssueDescription.trim()) {
      boards = boards.map(board => {
        if (board.name === "Backlog") {
          board.issues.push({
            id: "id" + Math.random().toString(16).slice(2),
            title: newIssueTitle,
            description: newIssueDescription
          });
        }
        return board;
      });
      newIssueTitle = "";
      newIssueDescription = "";
      showAddIssuePopup = false;
    }
  }

  function addBoard() {
    if (newBoardName.trim()) {
      boards.push({ name: newBoardName, issues: [] });
      newBoardName = "";
      showAddBoardPopup = false;
    }
  }

  function handleDragStart(event, issue, source) {
    event.dataTransfer.setData("issue", JSON.stringify(issue));
    event.dataTransfer.setData("source", source);
  }

  function handleDrop(event, targetBoard) {
    event.preventDefault();
    const issue = JSON.parse(event.dataTransfer.getData("issue"));
    const source = event.dataTransfer.getData("source");

    boards = boards.map(board => {
      if (board.name === source) {
        board.issues = board.issues.filter(i => i.id !== issue.id);
      }
      if (board.name === targetBoard) {
        board.issues.push(issue);
      }
      return board;
    });
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function searchIssues() {
    // Stub function for searching issues
    console.log("Searching for:", searchQuery);
  }

  function selectBoard(boardName) {
    selectedBoard = boardName;
    // Stub function for selecting a board
    console.log("Selected board:", boardName);
  }

  function jumpToSettings() {
    // Stub function for jumping to settings
    console.log("Jumping to settings");
  }
</script>

<div class="issue-board-container">
  <div class="top-bar">
    <input
      type="text"
      placeholder="Search issues..."
      bind:value={searchQuery}
      oninput={searchIssues}
    />
    <select bind:value={selectedBoard} onchange={() => selectBoard(selectedBoard)}>
      <option value="All Boards">All Boards</option>
      {#each boards as board}
        <option value={board.name}>{board.name}</option>
      {/each}
    </select>
    <button onclick={jumpToSettings}>Settings</button>
    <button onclick={() => showAddIssuePopup = true}>Add Issue</button>
    <button onclick={() => showAddBoardPopup = true}>Add Board</button>
  </div>
  <div class="boards">
    {#each boards as board}
      {#if selectedBoard === "All Boards" || selectedBoard === board.name}
        <div
          class="board"
          ondrop={(event) => handleDrop(event, board.name)}
          ondragover={allowDrop}
        >
          <h2>{board.name}</h2>
          <div class="issue-list">
            {#each board.issues as issue}
              <div
                class="issue"
                draggable="true"
                ondragstart={(event) => handleDragStart(event, issue, board.name)}
              >
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
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
    <button onclick={addIssue}>Confirm</button>
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
    background-color: #1e1e1e; /* Dark background */
    color: #e0e0e0; /* Light text */
  }

  .top-bar {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #2e2e2e; /* Darker background */
    border-radius: 4px;
    border: 1px solid #444444; /* Darker border */
    margin-bottom: 1rem;
  }

  .top-bar input,
  .top-bar select {
    flex: 1;
    padding: 0.5rem;
    background-color: #2e2e2e; /* Darker background */
    color: #e0e0e0; /* Light text */
    border: 1px solid #444444;
    border-radius: 4px;
  }

  .top-bar button {
    padding: 0.5rem;
    background-color: #4f46e5; /* Purple background */
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .top-bar button:hover {
    background-color: #6a5acd; /* Lighter purple on hover */
  }

  .boards {
    display: flex;
    flex-grow: 1;
    padding: 1rem;
    overflow-x: auto;
  }

  .issue-list {
    margin-bottom: 1rem;
  }

  .issue {
    background-color: #333333;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    cursor: grab;
    transition: background-color 0.2s;
  }

  .issue:hover {
    background-color: #444444;
  }

  .board {
    background-color: #2e2e2e;
    padding: 1rem;
    margin-right: 1rem;
    border-radius: 4px;
    border: 1px solid #444444;
    min-width: 250px;
  }

  .board h2 {
    margin-top: 0;
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
    background-color: #4f46e5; /* Purple background */
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .popup-content button:hover {
    background-color: #6a5acd; /* Lighter purple on hover */
  }
</style>