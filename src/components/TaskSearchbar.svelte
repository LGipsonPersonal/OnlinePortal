<script>
  let { tasks, results = $bindable() } = $props(); // Array of tasks to search and filter
  
  let searchQuery = $state(""); // User's search input
  let selectedField = $state("name"); // Default search field
  let sortOrder = $state("ascending"); // Default sort order

  // Fields available for searching
  const searchFields = [
    { label: "Name", value: "name" },
    { label: "Tags", value: "tags" },
  ];

  // Sort tasks based on the selected order
  function sortTasks(tasks) {
    return tasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "ascending" ? dateA - dateB : dateB - dateA;
    });
  }

  // Filter tasks based on the search query and selected field
  function filterTasks() {
    let filteredTasks = tasks.filter((task) => {
      if (selectedField === "tags") {
        return task.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return task[selectedField]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });

    // Sort the filtered tasks
    results = sortTasks(filteredTasks);
  }
</script>

<div class="search-bar-container">
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search tasks..."
      bind:value={searchQuery}
      oninput={filterTasks}
      class="search-input"
    />
    <div class="vertical-divider"></div>
    <select bind:value={selectedField} onchange={filterTasks} class="filter-dropdown">
      {#each searchFields as field}
        <option value={field.value}>{field.label}</option>
      {/each}
    </select>
    <div class="vertical-divider"></div>
    <select bind:value={sortOrder} onchange={filterTasks} class="sort-dropdown">
      <option value="ascending">Due Date: Ascending</option>
      <option value="descending">Due Date: Descending</option>
    </select>
  </div>
</div>

<style>
  .search-bar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #2e2e2e; /* Unified background color */
    border-radius: 8px;
    border: 1px solid #444444;
    margin-bottom: 1rem;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 800px;
    background-color: #1e1e1e; /* Unified background for the entire bar */
    border-radius: 6px;
    padding: 0.5rem;
    border: 1px solid #444444;
  }

  .search-input,
  .filter-dropdown,
  .sort-dropdown {
    padding: 0.5rem;
    font-size: 1rem;
    border: none; /* Remove individual borders */
    background-color: transparent;
    color: #e0e0e0;
    outline: none;
    flex: 1;
  }

  .filter-dropdown,
  .sort-dropdown {
    flex: 0 0 auto;
    width: auto;
    cursor: pointer;
  }

  .search-input {
    flex: 2; /* Make the search input larger than the dropdowns */
  }

  .vertical-divider {
    width: 1px; /* Thin vertical line */
    height: 1.5rem; /* Match the height of the parent container */
    background-color: #444444; /* Divider color */
    margin: 0 0.5rem; /* Spacing between elements */
  }

  .filter-dropdown:focus,
  .sort-dropdown:focus {
    border: none;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3); /* Subtle focus effect */
  }
</style>