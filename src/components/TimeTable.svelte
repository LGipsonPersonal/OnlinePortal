<script>
  const DAYS_IN_TEN_DAYS = 10;
  import { tick } from 'svelte';
  import Popup from './widgets/Popup.svelte';
 
  let weekDays = $state([]);
  let { projects, sheetRecords } = $props();

  let activeProjects = $state([]);

  let tableData = $state([]);
  let noteText = $state('');
  let takingNote = $state(false);
  
  $inspect(noteText);

  // Form an Array of the Time data totals
  let columnTotals = $derived.by(() => {
    return Array.from({ length: DAYS_IN_TEN_DAYS }, (_, colIndex) =>
      tableData.reduce((sum, row) => sum + (parseFloat(row[colIndex]) || 0), 0)
    );
  });

  // @ts-ignore
  let tableTotal = $derived(columnTotals.reduce((sum, value) => sum + (parseFloat(value) || 0), 0));

  let rowTotals = $derived.by(() => {
    return tableData.map(row =>
      row.reduce((sum, value) => sum + (parseFloat(value) || 0), 0)
    );
  });

  let startDate = new Date(sheetRecords[sheetRecords.length - 1].startDate);
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
    activeProjects.push({
      name: '',
      tasks: [""]
    });
    tick().then(() => tableData.push(Array.from({ length: DAYS_IN_TEN_DAYS }, () => "")));
  }

  function chooseProject(event, rowIndex) {
    activeProjects[rowIndex] = projects[event.target.value];
  }

  function copyLastWeek(){
    console.log('Stub')
  }
  function AddNote(){
    takingNote = true;
  }

  updateWeekRange();
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
    background-color: var(--input-bg, #2e2e2e); /* Default dark background for the input */
    border: 1px solid #3e3e3e; /* Subtle border for the input */
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.minimal-textbox:focus {
    border-color: var(--accent-color, #4f46e5); /* Accent color on focus*/
    box-shadow: 0 0 5px rgba(86, 182, 194, 0.5); /* Subtle glow on focus */
    background-color: var(--input-focus-bg, #3e3e3e); /* Slightly lighter background on focus */
}
  </style>
{/snippet}

<div class="project-table-container box-shadow">

    <Popup popupContent={noteBox} bind:active={takingNote}></Popup>
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
        {#each activeProjects as project, rowIndex}
          <tr>
            <td>
              <select onchange={(event) => chooseProject(event, rowIndex)}>
                <option value="" disabled selected>Select a Project</option>
                {#each projects as projectSelection, i}
                  <option value={i}>{projectSelection.name}</option>
                {/each}
              </select>
            </td>
            <td>
              <select disabled={project.name === ''}>
                <option value="" disabled selected>Select a task</option>
                {#each project.tasks as task}
                  <option>{task}</option>
                {/each}
              </select>
            </td>
            {#each tableData[rowIndex] as _, colIndex}
              <td>
                <input
                  bind:value={tableData[rowIndex][colIndex]}
                  type="text"
                  placeholder="0"
                  min="0"
                  max="24"
                />
              </td>
            {/each}
            <td>{rowTotals[rowIndex]}</td>
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
:root {
  --button-hover-bg: #4f46e5;
  --button-active-bg: #2a259a;
  --input-bg: #1e1e1e;
  --input-border: #3a3a3a;
  --input-focus-border: #4f46e5;
}

/* Wrapper for Table to Enable Horizontal Scrolling */
.table-wrapper {
  overflow-x: auto;
  width: 100%;
}
.left-side-buttons{
  display: flex;
  gap: 1rem;
}
/* Container */
.project-table-container {
  background: var(--accent-color-two);
  padding: 1.8rem 2rem 0.4rem;
  border-radius: 12px;
  border: 1px solid #1e1e1e;
  margin: 2rem auto;
  color: #d1d1d1;
  width: 95%;
  box-sizing: border-box;
}

/* Title */
.project-table-container .form-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: #ffffff;
  border-bottom: 2px solid #4f46e5;
  padding-bottom: 1rem;
}

/* Controls */
.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.calendar-input {
  padding: 0.5rem 1rem;
  border: 1px solid var(--input-border);
  border-radius: 6px;
  background-color: var(--input-bg);
  color: #e0e0e0;
  font-size: 0.875rem;
  text-align: center;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
}

.calendar-input:hover {
  background-color: #272727;
}

.calendar-input:focus {
  border-color: var(--input-focus-border);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
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
  background-color: #272727;
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
  background-color: var(--button-hover-bg);
  transform: translateY(-2px);
}

button:active, .arrow-button:active, .submit-button:active, .left-button:active {
  background-color: var(--button-active-bg);
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

/* Table */
.project-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  background-color: var(--accent-color-two);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.project-table th {
  background-color: var(--accent-color-one);
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.6rem;
  padding: 0.5rem; /* Reduced padding */
  border-bottom: 1px solid #2e2e2e;
}

.project-table td {
  padding: 0.5rem; /* Reduced padding */
  text-align: center;
  color: #d4d4d4;
  border: 1px solid #2e2e2e;
}

/* Inputs in Table */
.project-table input {
  width: 2rem; /* Reduced width */
  padding: 0.25rem; /* Reduced padding */
  border: 1px solid var(--input-border);
  border-radius: 6px;
  font-size: 0.75rem; /* Reduced font size */
  text-align: center;
  background-color: var(--input-bg);
  color: #e0e0e0;
  outline: none;
  transition: 0.2s;
}

.project-table input:focus {
  border-color: var(--input-focus-border);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
}

/* Totals Row */
.project-table .total-row td {
  font-weight: 600;
  background-color: var (--accent-color-one);
  color: #ffffff;
}

/* Row Hover */
.project-table tbody tr:hover {
  background-color: #333333;
  transition: background-color 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
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
    font-size: 0.rem;
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
