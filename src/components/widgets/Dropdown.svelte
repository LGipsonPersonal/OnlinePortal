
<script>
    let isOpen = $state(false)

    function toggleOpen() {
        isOpen = !isOpen
    }

</script>

<div class="dropdown-container">
    <label for="dropdown">Choose an option:</label>
    <select 
      id="dropdown" 
      class="dropdown-input {isOpen ? 'dropdown-input-open' : 'dropdown-input-closed'}"
      onclick="{toggleOpen}"
      >
      <option value="" disabled selected>Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </select>
  </div>

  <style>
/* Dropdown Container Styling */
.dropdown-container {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: Arial, sans-serif;
    width:9vw;
}

/* Label Styling */
.dropdown-container label {
    font-size: 1rem;
    color: #333;
}

/* Dropdown Input Styling */

  </style>
  