<script>
  import Popup from './widgets/Popup.svelte';
  // @ts-ignore
  import { tableData } from '$assets/store.svelte.js';
 
  let weekDays = $state([]);
  let { projects, sheetRecords } = $props();

  console.log($state.snapshot(projects))
  let noteText = $state('');
  let takingNote = $state(false);


  // Form an Array of the Time data totals
  let columnTotals = $derived.by(() => {
    return Array.from({ length: 10 }, (_, colIndex) =>
      tableData.reduce((sum, row) => sum + (parseFloat(row.entries[colIndex]) || 0), 0)
    );
  });

  // @ts-ignore
  let tableTotal = $derived(columnTotals.reduce((sum, value) => sum + (parseFloat(value) || 0), 0));

  let startDate = new Date(sheetRecords[0].startDate);
  let weekStart = $state(null);
  let weekEnd = $state(null);

  function updateWeekRange() {
    const dayOfWeek = startDate.getDay();
    const startOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() - startOffset);
    weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 13); // 13 days to cover two weeks

    // Adjust weekEnd to skip weekends
    let daysAdded = 0;
    weekDays = [];
    let currentDate = new Date(weekStart);
    while (daysAdded < 10) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        weekDays.push(currentDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }));
        daysAdded++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const previousWeek = () => {
    startDate.setDate(startDate.getDate() - 14); // Move back by two weeks
    updateWeekRange();
  };

  const nextWeek = () => {
    startDate.setDate(startDate.getDate() + 14); // Move forward by two weeks
    updateWeekRange();
  };

  let selectedDate = '';
  const submitTimesheet = () => {
    console.log('Timesheet submitted:', tableData);
  };

  function handleDateChange() {
    // Handle date change logic here
  }

  function addRow() {
    tableData.push({
      projectName: '',
      selectedTask: '',
      entries: Array.from({ length: 10 }, () => "")
    });
  }


  function copyLastWeek(){
    console.log('Stub')
  }
  function AddNote(){
    takingNote = true;
  }

  updateWeekRange();

  console.log($state.snapshot(tableData))
</script>

{#snippet noteBox()}
<input class="minimal-textbox" type="text" placeholder="Enter text here..." bind:value={noteText}/>

  <style>
    /* Minimalist text box styling */
.minimal-textbox {
    min-width: 25vw;
    min-height: 20vh;
    padding: 0.5rem;
    font-size: 1rem;
    color: #d1d1d1;
    background-color: #2e2e2e; /* Default dark background for the input */
    border: 1px solid #3e3e3e; /* Subtle border for the input */
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.minimal-textbox:focus {
    border-color: #4f46e5; /* Accent color on focus*/
    box-shadow: 0 0 5px rgba(86, 182, 194, 0.5); /* Subtle glow on focus */
    background-color: #3e3e3e; /* Slightly lighter background on focus */
}
  </style>
{/snippet}

<div class="project-table-container box-shadow">

    <Popup popupContent={noteBox} bind:active={takingNote} popupData={''}></Popup>
  <h2 class="form-title">Time Sheet</h2>
  <div class="controls">
    <button class="arrow-button" onclick={previousWeek}>
      <i class="fas fa-arrow-left"></i> Previous Two Weeks
    </button>
    <input 
      class="calendar-input" 
      type="date" 
      value={selectedDate} 
      onchange={handleDateChange} 
      aria-label="Select Date" 
    />
    <button class="arrow-button" onclick={nextWeek}>
      Next Two Weeks <i class="fas fa-arrow-right"></i>
    </button>
  </div>
  <p class="date-range">{formatDate(weekStart)} - {formatDate(weekEnd)}</p>

  <div class="table-wrapper">
    <table class="project-table">
      <thead>
        <tr>
          <th>Projects</th>
          <th>Tasks</th>
          {#each weekDays as day}
            <th>{day}</th>
          {/each}
          <th>Totals</th>
        </tr>
      </thead>
      <tbody>
        {#each tableData as row, rowIndex}
          <tr>
            <td>
              <select bind:value={row.projectName}>
                <option value="" disabled selected>Select a Project</option>
                {#each projects as projectSelection}
                  <option>{projectSelection.name}</option>
                {/each}
              </select>
            </td>
            <td>
              <select bind:value={row.selectedTask} disabled={row.projectName === ''}>
                <option value="" disabled selected>Select a task</option>
                {#each projects.find(p => p.name === row.projectName)?.tasks || [] as task}
                  <option>{task}</option>
                {/each}
              </select>
            </td>
            {#each row.entries as entry, colIndex}
              <td>
                <input
                  bind:value={row.entries[colIndex]}
                  type="text"
                  placeholder="0"
                  min="0"
                  max="24"
                />
              </td>
            {/each}
            <td>{row.entries.reduce((sum, value) => sum + (parseFloat(value) || 0), 0)}</td>
          </tr>
        {/each}
        <tr class="total-row">
          <td colspan="2"><strong>Totals</strong></td>
          {#each columnTotals as total}
            <td>{total}</td>
          {/each}
          <td>{tableTotal}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="submit-container">
    <div class="left-side-buttons">
      <button class="left-button" onclick={addRow}>Add Row</button>
      <button class="left-button" onclick={copyLastWeek}>Copy last week's projects/tasks</button>
      <button class="left-button" onclick={AddNote}>Add Note to Timesheet</button>
    </div>

    <button class="submit-button" onclick={submitTimesheet}>Submit Timesheet</button>
  </div>
</div>

<style>
/* General Styles */
.project-table-container {
  background: var(--accent-color-two);
  padding: 1.8rem 2rem 0.4rem;
  border-radius: 12px;
  border: 1px solid #333333; /* Darker border */
  margin: 2rem auto;
  color: #e0e0e0; /* Light text */
  width: 95%;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(27, 31, 35, 0.12), 0 8px 24px rgba(27, 31, 35, 0.12); /* Subtle shadow */
}

/* Title */
.project-table-container .form-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: #e0e0e0; /* Light text */
  border-bottom: 2px solid #333333; /* Darker border */
  padding-bottom: 1rem;
}

/* Controls */
.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.left-side-buttons{
  display: flex;
  gap: 1rem;
}

.calendar-input {
  padding: 0.5rem 1rem;
  border: 1px solid #444444; /* Darker border */
  border-radius: 6px;
  background-color: #2e2e2e; /* Dark background */
  color: #e0e0e0; /* Light text */
  font-size: 0.875rem;
  text-align: center;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
}

.calendar-input:hover {
  background-color: #3e3e3e;
}

.calendar-input:focus {
  border-color: #4f46e5; /* Purple focus border */
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3); /* Subtle purple shadow */
}

.calendar-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

/* Button Styles (Shared) */
button, .arrow-button, .submit-button, .left-button {
  padding: 0.5rem 1rem; /* Adjusted padding for uniform size */
  font-size: 0.875rem; /* Consistent font size */
  border: none;
  border-radius: 6px;
  background-color: #4f46e5; /* Purple background */
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s, transform 0.2s;
}
.date-range{
  text-align: center;
}
button:hover, .arrow-button:hover, .submit-button:hover, .left-button:hover {
  background-color: #6a5acd; /* Lighter purple on hover */
  transform: translateY(-2px);
}

button:active, .arrow-button:active, .submit-button:active, .left-button:active {
  background-color: #483d8b; /* Darker purple on active */
  transform: translateY(0);
}
/* Adjust Layout for Narrow Screens */

/* Submit Container Alignment */
.submit-container {
  display: flex;
  justify-content: space-between; /* Centers horizontally */
  align-items: center; /* Aligns vertically */
  gap: 1rem; /* Spacing between buttons */
  margin-top: 1rem; /* Space above the container */
  margin-bottom: 1rem;
}
.form-title{
  margin-top: 0
}

@media (max-width: 1250px) {
  .submit-button {
  position: absolute;
  right: 1.5rem; /* Sticks to the right side */
  margin-left: auto; /* Pushes it to the far right within its container */
  z-index: 10; /* Ensures it stays above other content */
}
}
/* Responsive Adjustments (Optional for Smaller Screens) */
@media (max-width: 768px) {
  .submit-container {
    flex-direction: column;
    gap: 0.5rem;
  }
  .submit-button{
    position: unset;
    margin-left: 0; /* Pushes it to the far right within its container */
  }
}

  /* General Table Styles */
  .project-table {
    width: 100%;
    border-collapse: collapse; /* Remove spacing between table cells */
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    background-color: #1e1e1e; /* Dark background */
    color: #e0e0e0; /* Light text */
    border: 1px solid #2e2e2e; /* Subtle border around the table */
    border-radius: 8px; /* Rounded corners for the table */
    overflow: hidden; /* Ensure rounded corners apply to the entire table */
  }

  .table-wrapper {
    overflow-x: auto; /* Allow horizontal scrolling for smaller screens */
    width: 100%;
    border-radius: 8px; /* Match table's rounded corners */
    background-color: #1e1e1e; /* Match table background */
    padding: 0.5rem; /* Padding around the table */
    margin: 0 auto; /* Center the table wrapper */
    box-sizing: border-box;
    
  }

  /* Table Header */
  .project-table th {
    background-color: #2e2e2e; /* Slightly darker background for headers */
    color: #e0e0e0; /* Light text */
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    padding: 0.75rem; /* Consistent padding */
    border-bottom: 1px solid #444444; /* Subtle border below headers */
    text-align: center; /* Align text to the left */
  }

  /* Table Body */
  .project-table td {
    padding: 0.75rem; /* Consistent padding */
    text-align: center; /* Align text to the left */
    border-bottom: 1px solid #2e2e2e; /* Subtle border between rows */
    color: #d1d1d1; /* Muted text color for table cells */
  }

  /* Inputs in Table */
  .project-table input {
    width: 5rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    border: 1px solid #444444; /* Subtle border for inputs */
    border-radius: 4px; /* Slightly rounded corners */
    background-color: #2e2e2e; /* Darker background for inputs */
    color: #e0e0e0; /* Light text */
    outline: none;
    text-align: center; /* Center text in inputs */
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .project-table input:focus {
    border-color: #4f46e5; /* Purple focus border */
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3); /* Subtle purple shadow */
  }

  /* Totals Row */
  .project-table .total-row td {
    font-weight: 600;
    background-color: #2e2e2e; /* Match header background */
    color: #e0e0e0; /* Light text */
    border-top: 1px solid #444444; /* Subtle border above totals row */
  }
  .project-table tbody tr {
    border-left: 2px solid #444444; /* Subtle left border for rows */
    border-right: 2px solid #444444; /* Subtle left border for rows */
  }

  /* Row Hover Effect */
  .project-table tbody tr:hover {
    background-color: #2a2a2a; /* Slightly lighter background on hover */
    transition: background-color 0.3s ease;
  }

  /* Dropdown Styling */
  .project-table select {
    width: 100%;
    padding: 0.5rem;
    font-size: 0.875rem;
    border: 1px solid #444444; /* Subtle border for dropdowns */
    border-radius: 4px; /* Slightly rounded corners */
    background-color: #2e2e2e; /* Darker background for dropdowns */
    color: #e0e0e0; /* Light text */
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .project-table select:focus {
    border-color: #4f46e5; /* Purple focus border */
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3); /* Subtle purple shadow */
  }


/* Responsive Design */
@media (max-width: 768px) {
  .project-table th,
  .project-table td {
    font-size: 0.75rem; /* Smaller font size for smaller screens */
    padding: 0.5rem; /* Reduced padding */
  }

    .table-wrapper {
      padding: 0.5rem; /* Reduced padding around the table */
    }
  .controls {
    flex-direction: column;
    align-items: center;
  }

  .arrow-button {
    width: 100%;
  }

  .calendar-input, .project-table input {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .form-title {
    font-size: 1.2rem;
  }

  .project-table th, .project-table td {
    font-size: 0.6rem;
    padding: 0.5rem;
  }

  .submit-button {
    width: 100%;
  }
}
/* Add this at the end of the file */
@media (max-width: 768px) {
  .project-table-container {
    padding: 1rem;
  }

  .controls {
    flex-direction: column;
    gap: 0.5rem;
  }

  .calendar-input,
  .arrow-button {
    width: 100%;
  }

  .project-table th,
  .project-table td {
    font-size: 0.6rem;
    padding: 0.5rem;
  }

  .submit-container {
    flex-direction: column;
    gap: 0.5rem;
  }

  .submit-button {
    width: 100%;
  }
}
</style>
