<script>
  import TaskSearchBar from "./TaskSearchbar.svelte";
  let { props } = $props();

  let deadlineContent = $state(null);

  let searchResults = $state([]);

  let tasks = [
    {
      name: "Fix Bug #123",
      tags: [{ name: "bug" }, { name: "urgent" }],
      dueDate: "2025-03-30",
    },
    {
      name: "Implement Feature X",
      tags: [{ name: "feature" }, { name: "high-priority" }],
      dueDate: "2025-04-05",
    },
    {
      name: "Code Review",
      tags: [{ name: "review" }],
      dueDate: "2025-03-28",
    },
  ];

  $inspect(searchResults)

  function handleDeadlineClick(id) {
    console.log(id);
    deadlineContent = props.announcements.find(
      (announcement) => announcement.id === id,
    );
  }

  // Group announcements by posted date
  let groupedAnnouncements = $state({});

  props.forEach((announcement) => {
    if (!groupedAnnouncements[announcement.timestamp]) {
      groupedAnnouncements[announcement.timestamp] = [];
    }
    groupedAnnouncements[announcement.timestamp].push(announcement);
  });

  // Sort dates chronologically
  let sortedDates = Object.keys(groupedAnnouncements).sort((a, b) => {
    // @ts-ignore
    return new Date(a) - new Date(b);
  });
</script>

<div class="deadline-board">
  <h2 class="board-title">Projects Dashboard</h2>
  <TaskSearchBar tasks={tasks} bind:results={searchResults} />
  <div class="scroll-wrap">
    {#each sortedDates as timestamp, index}
      {#if index !== 0}
        <hr class="date-divider" />
      {/if}
      <h3 class="date-heading">{timestamp}</h3>
      {#each groupedAnnouncements[timestamp] as announcement (announcement.id)}
        <div
          class="deadline"
          onclick={() => handleDeadlineClick(announcement.id)}
        >
          <div class="avatar-container">
            <div class="avatar">
              <img src={announcement.avatar} alt="Project Pic" />
            </div>
          </div>
          <div class="deadline-content">
            <div class="left">
              <p class="title">{announcement.title}</p>
              <p class="description">{announcement.description}</p>
              <p class="date">Due Date: {announcement.date}</p>
            </div>
            <div class="right">
              <p class="priority">Priority: {announcement.priority}</p>
              <p class="class">Project: {announcement.project}</p>
            </div>
          </div>
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .deadline-board {
    max-height: calc(100vh - 7rem);
    flex: 1 1 100%;
    background: var(--accent-color-two); /* Match Announcement background */
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #444; /* Match Announcement border */
    color: #e0e0e0; /* Match Announcement text color */
    overflow: hidden;
  }

  .scroll-wrap {
    padding-right: 1rem;
    padding-left: 1rem;
    height: calc(100vh - 11.4rem);
    padding-bottom: 0;
    overflow-y: auto;
  }

  .board-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    margin-top: 0.8rem;
    text-align: center;
    color: #e0e0e0; /* Match Announcement text color */
    border-bottom: 1px solid #444; /* Match Announcement border */
    padding-bottom: 0.8rem;
  }

  .deadline {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #2e2e2e; /* Match Announcement card background */
    border-radius: 6px;
    border: 1px solid #444; /* Match Announcement card border */
    margin-bottom: 0.8rem;
    transition: background-color 0.3s, transform 0.2s;
    cursor: pointer;
  }

  .deadline:hover {
    background-color: #3a3a3a; /* Match Announcement hover background */
    transform: scale(1.02);
  }

  .avatar-container {
    margin-right: 1rem;
  }
  .right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .date-divider {
    border: 0;
    height: 1px;
    background: #444; /* Match Announcement divider */
    margin: 1rem 0;
  }

  .date-heading {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #e0e0e0; /* Match Announcement text color */
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #444; /* Match Announcement avatar border */
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .deadline-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    color: #e0e0e0; /* Match Announcement text color */
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #e0e0e0; /* Match Announcement text color */
  }

  .description {
    font-size: 0.875rem;
    margin: 0 0 0.5rem;
    color: var(--text-color-muted, #c0c0c0); /* Match Announcement muted text */
  }

  .date {
    font-size: 0.875rem;
    margin: 0;
    color: var(--text-color-muted, #c0c0c0); /* Match Announcement muted text */
  }

  .priority {
    font-size: 0.875rem;
    margin: 0;
    color: #ff6b6b; /* Highlight priority in red */
    font-weight: bold;
  }

  .class {
    font-size: 0.875rem;
    margin: 0 0 0.5rem;
    color: var(--text-color-muted, #c0c0c0); /* Match Announcement muted text */
  }
</style>