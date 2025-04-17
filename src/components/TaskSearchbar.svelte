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
  <!-- Search Section -->
  <div class="search-section">
    <select bind:value={selectedField} onchange={filterTasks} class="search-dropdown">
      {#each searchFields as field}
        <option value={field.value}>{field.label}</option>
      {/each}
    </select>
    <input
      type="text"
      placeholder="Search..."
      bind:value={searchQuery}
      oninput={filterTasks}
      class="search-input"
    />
  </div>

  <!-- Filter and Sort Section -->
  <div class="filter-section">
    <select bind:value={sortOrder} onchange={filterTasks} class="filter-dropdown">
      <option value="ascending">Due Date: Ascending</option>
      <option value="descending">Due Date: Descending</option>
    </select>
  </div>
</div>

<style>
  .search-bar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    background-color: #2e2e2e;
    border-radius: 6px;
    border: 1px solid #444444;
    margin-bottom: 1rem;
  }

  .search-section,
  .filter-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .search-input,
  .search-dropdown,
  .filter-dropdown {
    padding: 0.4rem;
    font-size: 0.85rem;
    border: 1px solid #444444;
    border-radius: 4px;
    background-color: #1e1e1e;
    color: #e0e0e0;
    outline: none;
    flex: 1;
  }

  .search-input {
    flex: 2; /* Make the search input larger */
  }

  .search-dropdown,
  .filter-dropdown {
    flex: 0 0 auto;
    width: auto;
    cursor: pointer;
  }

  .search-dropdown:focus,
  .filter-dropdown:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
  }
</style>