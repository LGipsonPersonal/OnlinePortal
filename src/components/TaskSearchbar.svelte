<script>
  let { tasks, results = $bindable() } = $props(); // Array of tasks to search and filter

  let searchQueries = $state([]); // List of search queries
  let currentQuery = $state(""); // Current search input
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

  // Filter tasks based on all search queries
  function filterTasks() {
    let filteredTasks = tasks;

    searchQueries.forEach(({ field, query }) => {
      filteredTasks = filteredTasks.filter((task) => {
        if (field === "tags") {
          return task.tags.some((tag) =>
            tag.name.toLowerCase().includes(query.toLowerCase())
          );
        }
        return task[field]?.toLowerCase().includes(query.toLowerCase());
      });
    });

    // Sort the filtered tasks
    results = sortTasks(filteredTasks);
  }

  // Add a new search query
  function addSearchQuery() {
    if (currentQuery.trim()) {
      searchQueries = [...searchQueries, { field: selectedField, query: currentQuery }];
      currentQuery = ""; // Clear the input
      filterTasks(); // Reapply filters
    }
  }

  // Remove a search query
  function removeSearchQuery(index) {
    searchQueries = searchQueries.filter((_, i) => i !== index);
    filterTasks(); // Reapply filters
  }
</script>

<div class="search-bar-container">
  <!-- Search Section -->
  <div class="search-section">
    <label class="search-label">
      Add Search Query:
      <div class="search-group">
        <select bind:value={selectedField} class="search-dropdown">
          {#each searchFields as field}
            <option value={field.value}>{field.label}</option>
          {/each}
        </select>
        <input
          type="text"
          placeholder="Enter search query..."
          bind:value={currentQuery}
          class="search-input"
        />
        <button class="add-query-button" onclick={addSearchQuery}>Add</button>
      </div>
    </label>
  </div>

  <!-- Active Queries Section -->
  <div class="active-queries">
    {#each searchQueries as { field, query }, index}
      <div class="query-chip">
        <span>{field}: "{query}"</span>
        <button class="remove-query-button" onclick={() => removeSearchQuery(index)}>x</button>
      </div>
    {/each}
  </div>

  <!-- Filter and Sort Section -->
  <div class="filter-section">
    <label class="filter-label">
      Sort by:
      <select bind:value={sortOrder} onchange={filterTasks} class="filter-dropdown">
        <option value="ascending">Due Date: Ascending</option>
        <option value="descending">Due Date: Descending</option>
      </select>
    </label>
  </div>
</div>

<style>
  .search-bar-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.75rem;
    background-color: #2e2e2e;
    border-radius: 6px;
    border: 1px solid #444444;
    margin-bottom: 1rem;
  }

  .search-label,
  .filter-label {
    font-size: 0.85rem;
    font-weight: bold;
    color: #e0e0e0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .search-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
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
    flex-grow: 0;
    outline: none;
  }

  .add-query-button {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
    border: none;
    border-radius: 4px;
    background-color: #4f46e5;
    color: #ffffff;
    cursor: pointer;
  }

  .add-query-button:hover {
    background-color: #3b3bb3;
  }

  .active-queries {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .query-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    background-color: #444444;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #e0e0e0;
  }

  .remove-query-button {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #ff6b6b;
    color: #ffffff;
    cursor: pointer;
  }

  .remove-query-button:hover {
    background-color: #e04e4e;
  }

  .filter-section {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    align-items: center;
  }

  .filter-label {
    font-size: 0.85rem;
    font-weight: bold;
    color: #e0e0e0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-dropdown {
    padding: 0.4rem;
    font-size: 0.85rem;
    border: 1px solid #444444;
    border-radius: 4px;
    background-color: #1e1e1e;
    color: #e0e0e0;
    outline: none;
    flex-shrink: 0; /* Prevent the dropdown from shrinking or growing */
    width: 200px; /* Set a fixed width for the dropdown */
  }

  .filter-dropdown:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
  }
</style>