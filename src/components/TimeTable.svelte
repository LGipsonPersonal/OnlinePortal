<script>
  const DAYS_IN_TEN_DAYS = 10;
  import { setContext } from 'svelte';
  import Popup from './widgets/Popup.svelte';
  // @ts-ignore
  import { todayAddedHours } from '$assets/store.svelte.js';
 
  let weekDays = $state([]);
  let { projects, sheetRecords } = $props();

  let tableData = $state([]);
  console.log($state.snapshot(projects))
  let noteText = $state('');
  let takingNote = $state(false);

  setContext('TimeSheet', { addHoursToTable });

  // Form an Array of the Time data totals
  let columnTotals = $derived.by(() => {
    return Array.from({ length: DAYS_IN_TEN_DAYS }, (_, colIndex) =>
      tableData.reduce((sum, row) => sum + (parseFloat(row.entries[colIndex]) || 0), 0)
    );
  });

  // @ts-ignore
  let tableTotal = $derived(columnTotals.reduce((sum, value) => sum + (parseFloat(value) || 0), 0));

  let rowTotals = $derived.by(() => {
    return tableData.map(row =>
      row.entries.reduce((sum, value) => sum + (parseFloat(value) || 0), 0)
    );
  });

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
      entries: Array.from({ length: DAYS_IN_TEN_DAYS }, () => "")
    });
  }

  function chooseProject(event, rowIndex) {
    tableData[rowIndex].projectName = projects[event.target.value].name;
  }

  function chooseTask(event, rowIndex) {
    tableData[rowIndex].selectedTask = event.target.value;
  }

  function copyLastWeek(){
    console.log('Stub')
  }
  function AddNote(){
    takingNote = true;
  }

  function addHoursToTable(date, hours, projectName, task) {
    console.log('Adding hours to table:', date, hours, projectName);

    const dayIndex = weekDays.findIndex(day => day === date);
    if (dayIndex === -1) {
      console.error('Date not found in the current week range');
      return;
    }

    let projectIndex = tableData.findIndex(row => row.projectName === projectName);
    if (projectIndex === -1) {
      tableData.push({
        projectName: projectName,
        selectedTask: task,6
        entries: Array.from({ length: DAYS_IN_TEN_DAYS }, () => "")
      });
      projectIndex = tableData.length - 1;
    }

    tableData[projectIndex].entries[dayIndex] = (parseFloat(tableData[projectIndex].entries[dayIndex]) || 0) + hours;
  }

  updateWeekRange();

  for (let i = 0; i < todayAddedHours.length; ++i) {
    addHoursToTable(todayAddedHours[i].date, todayAddedHours[i].hours, todayAddedHours[i].project, todayAddedHours[i].task);
  }
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
              <select bind:value={row.projectName} >
                <option value="" disabled selected>Select a Project</option>
                {#each projects as projectSelection, i}
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

/* Table */
.project-table {
  width: 100%;
  border-collapse: seperate;
  border-spacing: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  background-color: #1e1e1e; /* Dark background */
  box-shadow: 0 1px 3px rgba(27, 31, 35, 0.12), 0 8px 24px rgba(27, 31, 35, 0.12); /* Subtle shadow */
}
.table-wrapper {
  overflow-x: auto;
  width: 100%;
}
.project-table th {
  background-color: #2e2e2e; /* Darker background */
  color: #e0e0e0; /* Light text */
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 0.5rem; /* Reduced padding */
  border: 1px solid #444444; /* Darker border */
}

.project-table td {
  padding: 0.5rem; /* Reduced padding */
  text-align: center;
  color: #e0e0e0; /* Light text */
  border: 1px solid #444444; /* Darker border */
}

/* Inputs in Table */
.project-table input {
  width: 2rem; /* Reduced width */
  padding: 0.25rem; /* Reduced padding */
  border: 1px solid #444444; /* Darker border */
  border-radius: 6px;
  font-size: 0.75rem; /* Reduced font size */
  text-align: center;
  background-color: #2e2e2e; /* Dark background */
  color: #e0e0e0; /* Light text */
  outline: none;
  transition: 0.2s;
}

.project-table input:focus {
  border-color: #4f46e5; /* Purple focus border */
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3); /* Subtle purple shadow */
}

/* Totals Row */
.project-table .total-row td {
  font-weight: 600;
  background-color: #2e2e2e; /* Darker background */
  color: #e0e0e0; /* Light text */
}

/* Row Hover */
.project-table tbody tr:hover {
  background-color: #333333; /* Slightly lighter background on hover */
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
