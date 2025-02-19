<script>
  import { selfOnly } from "$assets/utils.js";
  import { onMount, onDestroy } from 'svelte';
  import Tooltip from "./widgets/Tooltip.svelte";

  let categories = $state([
    { value: "hardware", label: "Hardware" },
    { value: "software", label: "Software" },
    { value: "network", label: "Network" },
    { value: "access", label: "Account & Access" }
  ]);

  let dropdownOpen = $state(false);
  let selectedCategories = $state([]);
  let newCategory = $state("");

  function toggleDropDown() {
    dropdownOpen = !dropdownOpen;
  }

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter(c => c !== category);
    } else {
      selectedCategories.push(category);
    }
  }

  function isSelected(category) {
    return selectedCategories.includes(category);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter" && newCategory.trim() !== "") {
      event.preventDefault();
      if (!selectedCategories.includes(newCategory.trim())) {
        selectedCategories.push(newCategory.trim());
        categories.push({ value: newCategory.trim(), label: newCategory.trim() });
      }
      newCategory = "";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Selected Categories:", selectedCategories);
    // Add your form submission logic here
  }

  function handleClickOutside(event) {
    const multiselect = document.querySelector('.multi-select');
    if (multiselect && !multiselect.contains(event.target)) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="support-ticket-form">
  <h2 class="form-title">Submit an IT Support Ticket</h2>
  <form onsubmit={handleSubmit}>
    <!-- Issue Details -->
    <div class="form-group">
      <label for="category">Issue Category
        <Tooltip tooltipMessage={"Interact with the category bar and chose the most appropriate category from the provided choices or type in and enter your own."}></Tooltip>
      </label>
      <div class="multi-select {dropdownOpen ? 'multi-select-outline':''}" tabindex="0" onclick={selfOnly(toggleDropDown)}>
        <div class="selected-options">
          {#each selectedCategories as category}
            <span class="selected-option">{category}</span>
          {/each}
          <input type="text" bind:value={newCategory} onkeypress={handleKeyPress} onclick={() => { if (!dropdownOpen) { dropdownOpen = true } }} placeholder="Add category..." class="new-category-input">
        </div>
        {#if dropdownOpen}
        <div class="dropdown">
          {#each categories as category}
            <div class="dropdown-item">
              <input type="checkbox" id={category.value} value={category.value} checked={isSelected(category.value)} onchange={() => toggleCategory(category.value)}>
              <label for={category.value}>{category.label}</label>
            </div>
          {/each}
        </div>
        {/if}
      </div>
    </div>

    <div class="form-group outline">
      <label for="priority">Priority</label>
      <select id="priority" name="priority" required>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </div>

    <div class="form-group outline">
      <label for="summary">Issue Summary</label>
      <input type="text" id="summary" name="summary" class="summary-field" placeholder="Brief summary of the issue" required>
    </div>

    <div class="form-group outline">
      <label for="description">Detailed Description (Optional)</label>
      <textarea id="description" name="description" rows="4" placeholder="Describe the issue..." required></textarea>
    </div>

    <!-- Attachments -->
    <div class="form-group">
      <label for="attachments">Attach Screenshot/Logs (Optional)</label>
      <input type="file" id="attachments" class="file-attachments" name="attachments">
    </div>

    <!-- Submit Button -->
    <button type="submit" class="submit-button">Submit Ticket</button>
  </form>
</div>

<style>
  /* Parent container */
  .support-ticket-form {
    flex: 1 1 auto;
    background: var(--accent-color-two);
    padding: 1.8rem 1.5rem 1.2rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
    min-width: 600px;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
  }

  /* Title styling */
  .support-ticket-form .form-title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    border-bottom: 2px solid var(--highlight-color-one);
    padding-bottom: 1rem;
  }

  .scroll-wrap {
    height: calc(100% - 5.4rem);
  }

  /* Form groups */
  .support-ticket-form .form-group {
    margin-bottom: 1.5rem;
    box-sizing: border-box;
  }

  /* Labels */
  .support-ticket-form label {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color-muted);
    margin-bottom: 0.5rem;
  }




  /* Inputs, select, and textarea */
  .summary-field,
  .file-attachments,
  .support-ticket-form select,
  .multi-select,
  .support-ticket-form textarea {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid var(--interact-border);
    border-radius: 6px;
    color: var(--text-color);
    background-color: var(--interact-bg);
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
  }

  /* Focus state */
  .outline input:focus,
  .outline select:focus,
  .outline textarea:focus,
  .multi-select-outline {
    outline: none;
    border-color: var(--interact-focus-border);
    box-shadow: 0 0 0 2px rgba(90, 84, 229, 0.4);
  }

  /* Form row for grouped fields */
  .support-ticket-form .form-row {
    display: flex;
    gap: 1.5rem;
  }

  .support-ticket-form .form-row .form-group {
    flex: 1;
  }

  /* Textarea styles */
  .support-ticket-form textarea {
    width: 100%;
    height: 100px;
  }

  /* Submit button */
  .support-ticket-form .submit-button {
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: var(--highlight-color-one);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }

  .support-ticket-form .submit-button:hover {
    background-color: var(--highlight-color-two);
    transform: scale(1.02);
  }

  /* Multi-select styles */
  .multi-select {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .selected-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    cursor: pointer;
    flex: 1;
  }

  .selected-option {
    background-color: var(--highlight-color-one);
    color: #ffffff;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .new-category-input {
    flex: 1;
    border: none !important;
    outline: none !important;
    background: none !important;
    color: var(--text-color);
    font-size: 1rem;
    padding: 0.1rem;
  }

  .dropdown {
    position: absolute;
    top: 102%;
    left: 0;
    width: 100%;
    background-color: var(--interact-bg);
    border: 1px solid var(--interact-border);
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    display: block;
  }

  .dropdown-item {
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }

  .dropdown-item input {
    margin-right: 0.5rem;
  }

  /* Responsive styling */
  @media (max-width: 760px) {
    .support-ticket-form {
      padding: 1.5rem;
      min-width: auto;
    }

    .support-ticket-form .form-row {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .support-ticket-form {
    background: var(--accent-color-two);
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }

  .support-ticket-form input,
  .support-ticket-form select,
  .support-ticket-form textarea {
    border: 1px solid var(--interact-border);
    color: var(--text-color);
    background-color: var(--interact-bg);
  }
</style>