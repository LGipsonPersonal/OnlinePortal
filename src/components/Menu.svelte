<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  let { choice, tabs } = $props();

  let MainPage = getContext('MainPage'); // Communication channel to main app component
  let openTabs = $state([]); // Store indices of open submenus

  /**
   * Toggle submenu visibility
   * @param {number} index
   */
  function toggleSubmenu(index) {
    if (openTabs.includes(index)) {
      openTabs = openTabs.filter(i => i !== index);
    } else {
      openTabs = [...openTabs, index];
    }
  }

  /**
   * Select a menu choice
   * @param {string} key
   */
  function selectChoice(key) {
    choice = key;
    MainPage.updateChoice(choice);
  }
</script>

<div class="sidebar">
  <div class="logo-container">
    <img src="./svelte.svg" alt="Logo" class="sidebar-logo" />
    <span class="logo-text">Portal</span>
  </div>
  <div class="sidebar-text-container">
    {#each tabs as tab, i (tab.key)}
      <div class="tab-item {tab.name === 'Settings' ? 'settings-tab' : ''}">
        <div class="tab-content-wrapper {choice === tab.key ? 'selected-content-wrapper' : ''}">
          <button
            class="tab-button {choice === tab.key ? 'selected-tab' : ''}"
            onclick={() => {
              if (tab.subtabs.length === 0) {
                selectChoice(tab.key);
              }
              else if (tab.isOpener) {
                selectChoice(tab.key);
                toggleSubmenu(i);
              }
               else {
                toggleSubmenu(i);
              }
            }}
          >
            <img src={`/${tab.icon}-${choice === tab.key ? 'solid': 'regular'}.svg`} alt="{tab.name} icon" class="icon {choice === tab.key ? 'selected-icon' : ''}" />
            {tab.name}
          </button>
          {#if tab.subtabs.length !== 0}
          <button
            class="submenu-toggle"
            onclick={() => toggleSubmenu(i)}
          >
            {#if openTabs.includes(i)}
              <i class="fas fa-chevron-up"></i>
            {:else}
              <i class="fas fa-chevron-down"></i>
            {/if}
          </button>
          {/if}
        </div>
        {#if openTabs.includes(i)}
        <div transition:slide class="sidebar-submenu">
          {#each tab.subtabs as subTab, j}
          <div class="tab-item">
            <div class="tab-content-wrapper {choice === subTab.key ? 'selected-content-wrapper' : ''}">
              <button
                class="tab-button {choice === subTab.key ? 'selected-tab' : ''}"
                onclick={() => {
                  if (!subTab.subtabs) {
                    selectChoice(subTab.key);
                  } else {
                    toggleSubmenu(`${i}-${j}`);
                  }
                }}
              >
                {subTab.name}
              </button>
              {#if subTab.subtabs}
              <button
                class="submenu-toggle"
                onclick={() => toggleSubmenu(`${i}-${j}`)}
              >
                {#if openTabs.includes(`${i}-${j}`)}
                  <i class="fas fa-chevron-up"></i>
                {:else}
                  <i class="fas fa-chevron-down"></i>
                {/if}
              </button>
              {/if}
            </div>
            {#if openTabs.includes(`${i}-${j}`)}
            <div transition:slide class="sidebar-submenu">
              {#each subTab.subtabs as subSubTab}
              <div
                onclick={() => {
                  selectChoice(subSubTab.key);
                }}
                class="sidebar-submenu-item {choice === subSubTab.key ? 'selected-tab selected-content-wrapper' : ''}"
              >
                {subSubTab.name}
              </div>
              {/each}
            </div>
            {/if}
          </div>
          {/each}
        </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .sidebar {
    height: 100%;
    width: 15rem; /* Sidebar width */
    min-width: 15rem;
    background-color: var(--accent-color-two); /* Dark background */
    border-right: 1px solid var(--border-color); /* Subtle border */
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem; /* Generous padding */
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .sidebar-logo {
    max-width: 40px;
    height: auto;
    padding-left: 0.4rem;
  }

  .logo-text {
    font-size: 1.125rem; /* Slightly smaller text */
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }

  .sidebar-text-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem; /* Tighter spacing between buttons */
  }

  .tab-item {
    font-family: 'Tahoma';
    display: flex;
    flex-direction: column;
    width: 100%; /* Ensure full width */
  }

  .tab-content {
    display: flex;
    align-items: center; /* Align tab button and toggle button */
    justify-content: space-between; /* Space between tab button and toggle button */
    width: 100%;
  }

  .icon {
    width: 16px;
    height: 16px;
    filter: invert(60%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%); /* Apply filter to make the icon color #aaa */
  }

  .selected-icon {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%); /* Apply filter to make the icon color #fff */
  }

  .tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Space between icon and text */
    flex-grow: 1; /* Take up remaining space */
    padding: 0.4rem 0.6rem; /* Padding for the button */
    border: none;
    border-radius: 0.4rem; /* Subtly rounded corners */
    background-color: transparent;
    color: #aaa; /* Subtle text color */
    font-size: 0.9rem; /* Smaller font size */
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }

  .tab-button:hover {
    background-color: #333;
    color: #fff; /* Highlighted text color */
  }

  .submenu-toggle {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    padding: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .selected-tab {
    outline: none;
    background-color: #444;
    color: #fff !important;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
  }

  .sidebar-submenu {
    display: flex; /* Visible only when rendered */
    flex-direction: column;
    gap: 0.4rem; /* Space between submenu items */
    width: 100%; /* Match parent width */
    padding: 0.4rem 0.2rem;
  }

  .sidebar-submenu-item {
    padding: 0.4rem 0.6rem; /* Padding for a smaller, tighter button */
    border-radius: 0.3rem;
    background-color: transparent; /* Transparent background */
    color: #aaa; /* Subtle text color */
    font-size: 0.9rem; /* Smaller font size */
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }

  .sidebar-submenu-item:active {
    background-color: #555; /* Slightly darker on active */
  }

  .tab-content-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.1rem; /* Adjust padding as needed */
    border-radius: 0.4rem; /* Match the button styles */
    transition: background-color 0.2s, color 0.2s;
  }

  .tab-content-wrapper:hover, .selected-content-wrapper {
    background-color: #333 !important; /* Highlight background */
  }

  .tab-content-wrapper .tab-button,
  .tab-content-wrapper {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
  }

  .tab-content-wrapper:hover .tab-button,
  .tab-content-wrapper:hover .submenu-toggle {
    color: #fff; /* Highlight text color on hover */
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Space out items */
    height: 100%; /* Full height for flexbox alignment */
  }

  .sidebar-text-container {
    flex-grow: 1; /* Fill available space */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .settings-tab {
    margin-top: auto;
    order: 1;
  }

  .tab-button:active {
    background-color: #555;
  }

  /* Indentation for nested tabs */
  .sidebar-submenu  {
    padding-left: 0.8rem; /* Indent nested submenu */
  }



  /* Add this at the end of the file */
  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      height: auto;
      padding: 1rem;
    }

    .tab-button {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }

    .submenu-toggle {
      padding: 0.5rem;
    }

    .sidebar-submenu-item {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }

    .main-page {
      padding: 1rem;
    }

    .main-row {
      flex-direction: column;
    }

    .time-off-page {
      flex-direction: column;
    }

    .homePage {
      padding: 1rem;
    }
  }
</style>
