<script>
    import { onMount } from 'svelte';
    // @ts-ignore
    let {projects, announcements } = $props()
  
  </script>
  
  <div class="project-assignments">
    <h2 class="section-title">Upcoming Assignments & Announcements</h2>
    <div class="cards-container">
      {#each projects as project}
        <div class="card">
          <h3 class="card-title">{project.name}</h3>
          <ul class="tasks-list">
            {#each project.tasks as task}
              <li class="task-item">{task}</li>
            {/each}
          </ul>
        </div>
      {/each}
      {#each announcements as announcement}
        <div class="card">
          <h3 class="card-title">{announcement.title}</h3>
          <p class="announcement-description">{announcement.description}</p>
          <p class="announcement-timestamp">{announcement.timestamp}</p>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .project-assignments {
      padding: 1rem;
      background: var(--accent-color-two);
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
      border: 1px solid var(--border-color);
      color: var(--text-color);
      box-sizing: border-box;
      width: 100%;
      overflow: hidden;
    }
  
    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-align: center;
      color: var(--text-color);
      border-bottom: 2px solid var(--highlight-color-one);
      padding-bottom: 0.5rem;
    }
  
    .cards-container {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding-bottom: 1rem;
    }
  
    .card {
      background: var(--accent-color-one);
      border-radius: 8px;
      padding: 1rem;
      min-width: 250px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border-color);
      color: var(--text-color);
    }
  
    .card-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }
  
    .tasks-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    .task-item {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: var(--text-color-muted);
    }
  
    .announcement-description {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: var(--text-color-muted);
    }
  
    .announcement-timestamp {
      font-size: 0.875rem;
      color: var(--text-color-muted);
    }
  
    /* Scrollbar styling */
    .cards-container::-webkit-scrollbar {
      height: 8px;
    }
  
    .cards-container::-webkit-scrollbar-track {
      background: var(--accent-color-two);
    }
  
    .cards-container::-webkit-scrollbar-thumb {
      background: var(--highlight-color-one);
      border-radius: 4px;
    }
  
    .cards-container::-webkit-scrollbar-thumb:hover {
      background: var(--highlight-color-two);
    }
  </style>