<script>
  let { choice = $bindable(), tabs } = $props();
  $inspect(choice);
</script>

<div class="sidebar">
  <div class="logo-container">
    <img src="./svelte.svg" alt="Logo" class="sidebar-logo">
    <span class="logo-text">Portal</span>
  </div>
  <div class="sidebar-text-container">
    {#each tabs as tab, i (tab)}
    <button
      onclick={() => {
        choice = i + 1;
      }}
      class="tab-button">
      <i class="fas fa-calendar-days icon"></i>
      {tab}
    </button>
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
    background-color: #1a1a1a; /* Dark background */
    border-right: 1px solid #333; /* Subtle border */
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem; /* Generous padding */
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
    padding-left: .4rem;
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

  .tab-button {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.5rem; /* Space between icon and text */
    width: 100%;
    padding: 0.4rem 0.6rem; /* Reduced padding for a smaller button */
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

  .tab-button:focus {
    outline: none;
    background-color: #444;
    color: #fff;
  }

  .icon {
    font-size: 0.9rem; /* Slightly smaller icon size */
  }
</style>

