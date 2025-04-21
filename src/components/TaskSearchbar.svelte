<script>
  let { tasks, results = $bindable() } = $props(); // Array of tasks to search and filter

  let searchQueries = $state([]); // List of search queries
  let currentQuery = $state(""); // Current search input
  let selectedField = $state(null); // Currently selected search field
  let showFieldDropdown = $state(false); // Whether to show the field dropdown
  let showSuggestions = $state(false); // Whether to show suggestions
  let suggestions = $state([]); // Suggestions for the current query

  // Fields available for searching
  const searchFields = [
    { label: "Name", value: "name" },
    { label: "Tags", value: "tags" },
    { label: "State", value: "state" },
    { label: "Project", value: "project" },
  ];

  // Populate suggestions based on the selected field
  function updateSuggestions() {
    if (selectedField === "name") {
      suggestions = [...new Set(tasks.map((task) => task.name))];
    } else if (selectedField === "tags") {
      suggestions = [...new Set(tasks.flatMap((task) => task.tags.map((tag) => tag.name)))];
    } else if (selectedField === "state") {
      suggestions = [...new Set(tasks.map((task) => task.board))];
    } else if (selectedField === "project") {
      suggestions = [...new Set(tasks.map((task) => task.group))];
    }
    showSuggestions = true;
  }

  // Add a new search query
  function addSearchQuery(queryText) {
    if (selectedField && queryText.trim()) {
      searchQueries = [...searchQueries, { field: selectedField, query: queryText }];
      currentQuery = ""; // Clear the input
      showSuggestions = false;
      filterTasks(); // Reapply filters
    }
  }

  // Remove a search query
  function removeSearchQuery(index) {
    searchQueries = searchQueries.filter((_, i) => i !== index);
    filterTasks(); // Reapply filters
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

    results = filteredTasks;
  }
</script>

<div class="search-bar-container">
  <!-- Search Bar -->
  <div class="search-bar" onclick={() => (showFieldDropdown = !showFieldDropdown)}>
    {#each searchQueries as { field, query }, index}
      <div class="query-chip">
        <span>{field}: "{query}"</span>
        <button class="remove-query-button" onclick={() => removeSearchQuery(index)}>x</button>
      </div>
    {/each}
    <div
      class="search-input"
      contenteditable="true"
      bind:innerText={currentQuery}
      oninput={() => updateSuggestions()}
      onkeydown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addSearchQuery(currentQuery);
        }
      }}
    ></div>
  </div>

  <!-- Field Dropdown -->
  {#if showFieldDropdown}
    <div class="dropdown">
      {#each searchFields as field}
        <div
          class="dropdown-item"
          onclick={() => {
            selectedField = field.value;
            showFieldDropdown = false;
            updateSuggestions();
          }}
        >
          {field.label}
        </div>
      {/each}
    </div>
  {/if}

  <!-- Suggestions Dropdown -->
  {#if showSuggestions}
    <div class="dropdown">
      {#each suggestions as suggestion}
        <div
          class="dropdown-item"
          onclick={() => addSearchQuery(suggestion)}
        >
          {suggestion}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .search-bar-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #2e2e2e;
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #444444;
  }

  .search-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: #1e1e1e;
    border: 1px solid #444444;
    border-radius: 4px;
    cursor: text;
  }

  .search-input {
    flex: 1;
    min-width: 150px;
    outline: none;
    border: none;
    background: none;
    color: #e0e0e0;
    font-size: 0.85rem;
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

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #1e1e1e;
    border: 1px solid #444444;
    border-radius: 4px;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
  }

  .dropdown-item {
    padding: 0.5rem;
    color: #e0e0e0;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #444444;
  }
</style>