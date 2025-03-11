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

  // Sort dates chronologically
  let sortedDates = Object.keys(groupedAnnouncements).sort((a, b) => {
    // @ts-ignore
    return new Date(a) - new Date(b);
  });
</script>

<div class="deadline-board box-shadow">
  <h2 class="board-title">Projects Dashboard</h2>
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
    background: #1e1e1e; /* Dark background */
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid #444444; /* Darker border */
    color: #e0e0e0; /* Light text */
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(27, 31, 35, 0.12), 0 8px 24px rgba(27, 31, 35, 0.12); /* Subtle shadow */
  }

  .scroll-wrap {
    padding-right: 1rem;
    padding-left: 1rem;
    height: calc(100vh - 11.4rem);
    padding-bottom: 0;
    overflow-y: auto;
  }

  .board-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 0.8rem;
    text-align: center;
    background: #1e1e1e; /* Dark background */
    width: 96%;
    color: #e0e0e0; /* Light text */
    border-bottom: 2px solid #4f46e5; /* Purple accent */
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
    border: 1px solid #4f46e5; /* Purple accent */
    margin-bottom: 0.8rem;
    transition: background-color 0.3s, transform 0.2s;
    cursor: pointer;
  }

  .deadline:hover {
    background-color: #4f46e5; /* Purple background on hover */
    transform: scale(1.02);
  }

  .avatar-container {
    margin-right: 1rem;
  }

  .date-divider {
    border: 0;
    height: 1px;
    background: #444444; /* Darker border */
    margin: 1rem 0;
  }

  .date-heading {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #e0e0e0; /* Light text */
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
    border: 1px solid #444444; /* Darker border */
  }

  .deadline-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    color: #e0e0e0; /* Light text */
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #e0e0e0; /* Light text */
  }

  .description {
    font-size: 0.9rem;
    margin: 0 0 0.5rem;
    color: #a0a0a0; /* Muted text */
  }

  .date {
    font-size: 0.9rem;
    margin: 0;
    color: #a0a0a0; /* Muted text */
  }

  .class {
    font-size: 0.9rem;
    margin: 0 0 0.5rem;
    color: #a0a0a0; /* Muted text */
  }

  .timestamp {
    font-size: 0.8rem;
    color: #a0a0a0; /* Muted text */
  }
</style>