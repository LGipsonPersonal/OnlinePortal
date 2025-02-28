<script>
   let { projectTitle, selectedTab  = $bindable()} = $props();
  
    let tabs = [
      { name: "Timeline", key: "timeline" },
      { name: "Resources", key: "resources" },
      { name: "People of Contact", key: "people" },
      { name: "Discussions", key: "discussions" }
    ];
    selectedTab = tabs[0].name
    
  
    function selectTab(key) {
      selectedTab = key;
    }
  </script>
  
  <div class="header">
    <h1 class="project-title">{projectTitle}</h1>
    <div class="tabs">
      {#each tabs as tab}
        <button
          class="tab-button {selectedTab === tab.name ? 'selected-tab' : ''}"
          onclick={() => selectTab(tab.name)}
        >
          {tab.name}
        </button>
      {/each}
    </div>
  </div>
  
  <style>
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--accent-color-two);
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  
    .project-title {
      margin-top: 0.3rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color);
      margin-bottom: 1rem;
    }
  
    .tabs {
      display: flex;
      gap: 1rem;
    }
  
    .tab-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.4rem;
      background-color: transparent;
      color: var(--text-color-muted);
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    }
  
    .tab-button:hover {
      background-color: #333;
      color: #fff;
    }
  
    .selected-tab {
      background-color: #444;
      color: #fff;
      border-color: var(--highlight-color-one);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
    }
  </style>