
<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition'
  let { choice, tabs } = $props();
  let openSubmenuIndex = $state(null); // Tracks which submenu is open
  let MainPage = getContext('MainPage') // communication channel to main app component

  // Toggle submenu visibility
  /**
     * @param {number} index
  */
  function toggleSubmenu(index) {
    openSubmenuIndex = openSubmenuIndex === index ? null : index;
  }

  /**
     * @param {string} key
  */
  function selectChoice(key) {
    choice = key
    MainPage.updateChoice(choice)
  }
</script>

<div class="sidebar">
  <div class="logo-container">
    <img src="./svelte.svg" alt="Logo" class="sidebar-logo" />
    <span class="logo-text">Portal</span>
  </div>
  <div class="sidebar-text-container">
    {#each tabs as tab, i (tab.key)}
    <div class="tab-item">
      <div class="tab-content-wrapper">
        <button
          class="tab-button {choice === tab.key ? 'selected-tab' : ''}"
          onclick={() => {
            if (tab.subtabs.length === 0) {
              selectChoice(tab.key);
            } else {
              toggleSubmenu(i);
            }
          }}
        >
          <i class="{tab.icon} icon"></i>
          {tab.name}
        </button>
        {#if tab.subtabs.length !== 0}
        <button
          class="submenu-toggle"
          onclick={() => toggleSubmenu(i)}
        >
          {#if openSubmenuIndex === i}
            <i class="fas fa-chevron-up"></i>
          {:else}
            <i class="fas fa-chevron-down"></i>
          {/if}
        </button>
        {/if}
      </div>
      {#if openSubmenuIndex === i}
      <div transition:slide class="sidebar-submenu">
        {#each tab.subtabs as subTab, j}
        <div
          onclick={() => {
            selectChoice(subTab.key);
          }}
          class="sidebar-submenu-item {choice === tab.key ? 'selected-tab' : ''}"
        >
          {subTab.name}
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
    background-color: var(--accent-color-two); /* Dark background */
    border-right: 1px solid #333; /* Subtle border */
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem; /* Generous padding */
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
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
  .icon{
    width:16px;
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
    font-size: 0.8rem; /* Smaller font size */
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


  .selected-tab{
    outline: none;
    background-color: #444;
    color: #fff;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
  }

/* No changes required for these styles */
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
  font-size: 0.8rem; /* Smaller font size */
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}


.sidebar-submenu-item:active {
  background-color: #555; /* Slightly darker on active */
}

/* here */
.tab-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.1rem; /* Adjust padding as needed */
  border-radius: 0.4rem; /* Match the button styles */
  transition: background-color 0.2s, color 0.2s;
}

.tab-content-wrapper:hover {
  background-color: #333; /* Highlight background */
}

.tab-content-wrapper .tab-button,
.tab-content-wrapper .submenu-toggle {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
}

.tab-content-wrapper:hover .tab-button,
.tab-content-wrapper:hover .submenu-toggle {
  color: #fff; /* Highlight text color on hover */
}



</style>




