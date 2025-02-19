<script>
  let { props } = $props();

  let deadlineContent = $state(null);

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
</script>

<div class="deadline-board box-shadow">
  <h2 class="board-title">Projects Dashboard</h2>
  <div class="scroll-wrap">
    {#each Object.keys(groupedAnnouncements) as timestamp, index}
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
    background: var(--accent-color-two);
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    overflow: hidden;
  }
  .scroll-wrap {
    padding-right: 1rem;
    padding-left: 1rem;
    height: calc(100vh - 11.4rem);
    padding-bottom: 0;
  }
  .board-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 0.8rem;
    text-align: center;
    background: var(--accent-color-two);
    width: 96%;
    color: var(--text-color);
    border-bottom: 2px solid var(--highlight-color-one);
    padding-bottom: 0.8rem;
    margin-left: auto;
    margin-right: auto;
    max-height: 2rem;
  }
  
  .deadline {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #2a2a2a;
    border-radius: 8px;
    border: 1px solid var(--interact-highlight-color);
    margin-bottom: 0.8rem;
    transition:
      background-color 0.3s,
      transform 0.2s;
    cursor: pointer;
  }

  .deadline:hover {
    background-color: var(--interact-highlight-color);
    transform: scale(1.02);
  }

  .avatar-container {
    margin-right: 1rem;
  }
  .date-divider {
    border: 0;
    height: 1px;
    background: var(--border-color);
    margin: 1rem 0;
  }
  .date-heading {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #444;
  }

  .right, .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid var(--border-color);
  }

  .deadline-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    color: var(--text-color);
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--text-color);
  }

  .description {
    font-size: 0.9rem;
    margin: 0 0 0.5rem;
    color: var(--text-color-muted);
  }

  .date {
    font-size: 0.9rem;
    margin: 0;
    color: var(--text-color-muted);
  }

  .class {
    font-size: 0.9rem;
    margin: 0 0 0.5rem;
    color: var(--text-color-muted);
  }
  .timestamp {
    font-size: 0.8rem;
    color: var(--text-color-muted);
  }
</style>