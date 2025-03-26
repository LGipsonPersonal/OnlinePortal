<script>
  import { onMount } from 'svelte';
  import Popup from './widgets/Popup.svelte';
  // @ts-ignore
  import { startingBoards } from '$assets/store.svelte.js';

  let backlog = $state([
    {
      id: "id" + Math.random().toString(16).slice(2),
      title: "Issue 1",
      description: "Description for Issue 1",
      dueDate: "2025-03-20",
      originator: "User A",
      tags: [
        { name: "Bug", color: "#ff6b6b", count: 3 },
        { name: "UI", color: "#4f46e5" }
      ]
    },
    {
      id: "id" + Math.random().toString(16).slice(2),
      title: "Issue 2",
      description: "Description for Issue 2",
      dueDate: "2025-03-25",
      originator: "User B",
      tags: [
        { name: "Feature", color: "#34d399" },
        { name: "Backend", color: "#fbbf24", count: 1 }
      ]
    }
  ]);

  let boards = $state([{ name: "Backlog", issues: backlog }, ...startingBoards.map(name => ({ name, issues: [] }))]);

  let newIssueTitle = $state("");
  let newIssueDescription = $state("");
  let newBoardName = $state("");
  let showAddBoardPopup = $state(false);
  let showAddIssuePopup = $state(false);
  let searchQuery = $state("");
  let selectedBoard = $state("All Boards");
  let selectedIssue = $state(null);
  let showIssueDetails = $state(false);
  let dragOverBoard = $state(null);

  function addIssue() {
    if (newIssueTitle.trim() && newIssueDescription.trim()) {
      boards = boards.map(board => {
        if (board.name === "Backlog") {
          board.issues.push({
            id: "id" + Math.random().toString(16).slice(2),
            title: newIssueTitle,
            description: newIssueDescription,
            dueDate: "2025-03-30",
            originator: "User C",
            tags: []
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
    dragOverBoard = null;
  }

  function allowDrop(event, boardName) {
    event.preventDefault();
    dragOverBoard = boardName;
  }

  function searchIssues() {
    console.log("Searching for:", searchQuery);
  }

  function selectBoard(boardName) {
    selectedBoard = boardName;
    console.log("Selected board:", boardName);
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
    <select class="boards-selection" bind:value={selectedBoard} onchange={() => selectBoard(selectedBoard)}>
      <option value="All Boards">Unsorted boards</option>
      <option value="Project A">UI-UX</option>
      <option value="Project B">AI features</option>
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
    <button onclick={() => showAddIssuePopup = true}>Add Issue</button>
    <button onclick={() => showAddBoardPopup = true}>Add Board</button>
  </div>
  <div class="main-content">
    <div class="boards">
      {#each boards as board}
        <div
          class="board {dragOverBoard === board.name ? 'drag-over' : ''}"
          ondrop={(event) => handleDrop(event, board.name)}
          ondragover={(event) => allowDrop(event, board.name)}
        >
          <h2>{board.name}</h2>
          <div class="issue-list">
            {#each board.issues as issue}
              <div
                class="issue"
                draggable="true"
                ondragstart={(event) => handleDragStart(event, issue, board.name)}
                onclick={() => selectIssue(issue)}
              >
                <h3>{issue.title}</h3>
                <div class="tags">
                  {#each issue.tags as tag}
                    <span class="tag" style="background-color: {tag.color}">
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
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #444444;
    min-width: 250px;
    flex: 0 0 250px;
  }

  .board.drag-over {
    border: 2px dashed #4f46e5;
  }

  .issue {
    background-color: #333333;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    cursor: grab;
    transition: background-color 0.2s;
    font-size: 0.875rem;
  }

  .issue:hover {
    background-color: #444444;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    color: #fff;
    font-weight: bold;
  }

  .tag-count {
    margin-right: 0.25rem;
    font-size: 0.75rem;
    font-weight: bold;
  }
</style>