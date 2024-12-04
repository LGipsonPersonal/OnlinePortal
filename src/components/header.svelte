<script>
  import Dropdown from "./widgets/Dropdown.svelte";

    const { userName } = $props() 
</script>

<div class="header-top">
    <div class="header">
        <span class="header-title">Timesheet <br> {userName}</span>
        <button class="header-button">Submit Timesheet</button>
    </div>
    <div class="date-field" >
      <Dropdown></Dropdown>

    </div>
</div>

<style>
.header-top{
        display: flex;
        flex-direction: column;
    }
.date-input {
    appearance: none; /* Removes default styling for cross-browser consistency */
    background-color: #f4f4f4; /* Light gray background */
    border: 1px solid #ccc; /* Border styling */
    border-radius: 4px; /* Rounded corners */
    padding: 8px 10px; /* Padding inside the input */
    font-size: 1rem; /* Font size */
    color: #333; /* Text color */
    width: 200px; /* Width of the input */
    cursor: pointer; /* Pointer cursor to indicate interactivity */
  }

.date-input:focus {
    outline: none; /* Removes the default focus outline */
    border-color: #0078d4; /* Highlight border color on focus */
    box-shadow: 0 0 3px 2px rgba(0, 120, 212, 0.2); /* Subtle focus shadow */
  }

.header {
    width: calc(100% - 1.5rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem; /* Optional: Adjust spacing around the header */
  }
  
  .header-title {
    margin: 0; /* Remove default margin */
  }
  .date-field{
    display: flex;
    margin: 0.2rem 1rem;
    border: 2px red solid;
    gap: 6px;
  }
  .date-input{
    width: 320px;
    border: 2px blue solid;
  }
  .header-button {
    margin: 0; /* Remove default margin */
    width: 150px;
    height: 35px;
  }
</style>