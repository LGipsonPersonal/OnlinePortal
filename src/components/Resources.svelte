<script>
  import { slide } from 'svelte/transition';

  // Example resource data
  let resourceGroups = [
    {
      group: "Documentation",
      resources: [
        { name: "API Reference", type: "website", url: "https://api.example.com" },
        { name: "User Guide (PDF)", type: "download", url: "/downloads/user-guide.pdf" },
        { name: "Architecture Diagram", type: "download", url: "/downloads/architecture.png" }
      ]
    },
    {
      group: "Development",
      resources: [
        { name: "GitHub Repo", type: "website", url: "https://github.com/example/project" },
        { name: "CI/CD Status", type: "website", url: "https://ci.example.com" }
      ]
    },
    {
      group: "Support",
      resources: [
        { name: "Help Center", type: "website", url: "https://support.example.com" },
        { name: "Slack Channel", type: "website", url: "https://slack.com/example" }
      ]
    }
  ];

  let openGroups = $state(Array.from({ length: resourceGroups.length }, () => true));

  function toggleGroup(idx) {
    openGroups[idx] = !openGroups[idx];
  }
</script>

<div class="resources-container">
  <h2 class="section-title">Project Resources</h2>
  <div class="box">
    {#each resourceGroups as group, i}
      <div class="resource-group">
        <div class="group-header" on:click={() => toggleGroup(i)}>
          <span class="group-title">{group.group}</span>
          <span class="submenu-toggle">
            {#if openGroups[i]}
              <i class="fas fa-chevron-down"></i>
            {:else}
              <i class="fas fa-chevron-up"></i>
            {/if}
          </span>
        </div>
        {#if openGroups[i]}
          <div class="resource-grid" transition:slide>
            {#each group.resources as resource}
              <div class="resource-card">
                <div class="resource-icon">
                  {#if resource.type === 'website'}
                    <i class="fas fa-globe"></i>
                  {:else if resource.type === 'download'}
                    <i class="fas fa-download"></i>
                  {/if}
                </div>
                <div class="resource-info">
                  <div class="resource-name">{resource.name}</div>
                  {#if resource.type === 'website'}
                    <a class="resource-link" href={resource.url} target="_blank" rel="noopener">
                      Visit Site
                    </a>
                  {:else if resource.type === 'download'}
                    <a class="resource-link" href={resource.url} download>
                      Download
                    </a>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .resources-container {
    padding: 1.5rem;
    background-color: #18181b;
    font-family: 'Segoe UI', sans-serif;
    border-radius: 12px;
    box-shadow: 0 1px 8px rgba(44, 62, 80, 0.10);
    margin: 2rem;
    color: #e0e0e0;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
    color: #fff;
    border-bottom: 2px solid #6366f1;
    padding-bottom: 0.5rem;
  }

  .box {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .resource-group {
    border: 1px solid #35357a;
    border-radius: 8px;
    overflow: hidden;
    background-color: #232336;
  }

  .group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    background-color: #232336;
    transition: background 0.2s ease-in-out;
    border-bottom: 1px solid #35357a;
  }
  .group-header:hover {
    background-color: #29294d;
  }

  .group-title {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
    color: #fff;
  }

  .submenu-toggle i {
    font-size: 1rem;
    color: #a5b4fc;
    transition: transform 0.3s ease;
  }

  .resource-grid {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    background-color: #232336;
    overflow-x: auto;
    scroll-behavior: smooth;
    max-width: 100%;
  }
  .resource-grid::-webkit-scrollbar {
    height: 8px;
  }
  .resource-grid::-webkit-scrollbar-thumb {
    background: #6366f1;
    border-radius: 4px;
  }
  .resource-grid::-webkit-scrollbar-track {
    background: #232336;
  }

  .resource-card {
    background-color: #2e2e2e;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.10);
    transition: transform 0.2s, background 0.2s;
    min-width: 220px;
    max-width: 260px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #35357a;
  }
  .resource-card:hover {
    transform: translateY(-2px);
    background: #35357a;
  }

  .resource-icon {
    font-size: 1.5rem;
    color: #6366f1;
    margin-bottom: 0.5rem;
  }

  .resource-name {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.25rem;
    color: #fff;
  }

  .resource-link {
    display: block;
    font-size: 0.9rem;
    color: #a5b4fc;
    text-decoration: none;
    margin-bottom: 0.25rem;
    word-break: break-word;
    transition: color 0.15s;
  }
  .resource-link:hover {
    color: #fff;
    text-decoration: underline;
  }
</style>