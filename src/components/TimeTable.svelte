<script>
  import Popup from './widgets/Popup.svelte';
  import { getTwoWeekIntervalForDate, toLocalDate, getProjectIssues } from '$assets/utils.js';
  // @ts-ignore
  import { tableData, issues, projects, stateGroups } from '$assets/store.svelte.js';
 
  let weekDays = $state([]);
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


  // Get the current two-week interval
  let today = new Date();
  let { start, end } = $state(getTwoWeekIntervalForDate(today));


function updateWeekRange() {
  weekDays = [];
  let currentDate = new Date(start);
  while (currentDate <= end) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Mon-Fri
      // Store both the label and the YYYY-MM-DD value
      weekDays.push({
        label: currentDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
        value: toLocalDate(currentDate)
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
}


  function previousWeek() {
    start.setDate(start.getDate() - 14);
    end.setDate(end.getDate() - 14);
    updateWeekRange();
  }

  function nextWeek() {
    start.setDate(start.getDate() + 14);
    end.setDate(end.getDate() + 14);
    updateWeekRange();
  }


  let selectedDate = $state(toLocalDate(today)); // Format YYYY-MM-DD
  function submitTimesheet() {
    console.log($state.snapshot(tableData))
  };

  function handleDateChange(event) {
    // Parse the selected date from the input (YYYY-MM-DD)
    const picked = event?.target?.value || selectedDate;
    const pickedDate = new Date(picked);

    // Find the two-week interval for the picked date
    const { start: newStart, end: newEnd } = getTwoWeekIntervalForDate(pickedDate);

    // Update start and end
    start = new Date(newStart);
    end = new Date(newEnd);

    // Update the weekDays array
    updateWeekRange();
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
    color: #e0e0e0;
    background-color: #232336;
    border: 1px solid #35357a;
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.minimal-textbox:focus {
    border-color: #6366f1;
    box-shadow: 0 0 5px rgba(99, 102, 241, 0.15);
    background-color: #29294d;
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
      bind:value={selectedDate}
      onchange={handleDateChange} 
      aria-label="Select Date" 
    />
    <button class="arrow-button" onclick={nextWeek}>
      Next Two Weeks <i class="fas fa-arrow-right"></i>
    </button>
  </div>
  <p class="date-range">
    {start.toLocaleDateString()} - {end.toLocaleDateString()}
  </p>
  <div class="table-wrapper">
    <table class="project-table">
      <thead>
        <tr>
          <th>Projects</th>
          <th>Tasks</th>
          {#each weekDays as day}
            <th class={day.value === selectedDate ? 'current-day' : ''}>{day.label}</th>
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
                {#each projects as project}
                  <option>{project.name}</option>
                {/each}
              </select>
            </td>
            <td>
              <select bind:value={row.selectedTask} disabled={row.projectName === ''}>
                <option value="" disabled selected>Select a task</option>
                {#each getProjectIssues(row.projectName, issues, projects) as task}
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
  background: var(--accent-color-two, #1e1e1e);
  padding: 1.5rem 1rem 1.2rem;
  border-radius: 8px;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 1px 8px rgba(44, 62, 80, 0.10);
  border: 1px solid var(--border-color, #333333);
  margin: 2rem;
  color: var(--text-color, #e0e0e0);

}

/* Title */
.project-table-container .form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.2rem;
  text-align: center;
  color: #e0e0e0;
  border-bottom: 1px solid var(--border-color, #333333);
  padding-bottom: 0.8rem;
}

/* Controls */
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.2rem;
  align-items: center;
  justify-content: center;
}
.left-side-buttons{
  display: flex;
  gap: 1rem;
}

.calendar-input {
  padding: 0.5rem 1rem;
  border: 1px solid #444444;
  border-radius: 6px;
  background-color: #2e2e2e;
  color: #e0e0e0;
  font-size: 0.95rem;
  text-align: center;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
}

.calendar-input:hover {
  background-color: #3a3a3a;
}

.calendar-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.arrow-button, .submit-button, .left-button {
  padding: 0.5rem 1.1rem;
  border-radius: 6px;
  border: none;
  background: var(--highlight-color-one, #4f46e5);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.arrow-button:hover, .submit-button:hover, .left-button:hover {
  background: var(--highlight-color-two, #483d8b);
  color: #fff;
  transform: scale(1.02);
}

.date-range {
  text-align: center;
  color: #a1a1aa;
  margin-bottom: 1rem;
}

.table-wrapper {
  overflow-x: auto;
  width: 100%;
  border-radius: 6px;

  border: 1px solid #444;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Table Styles */
.project-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  background-color: #232336;
  color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(44, 62, 80, 0.04);
}

.project-table th {
  background-color: #29294d;
  color: #e0e0e0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  padding: 0.75rem;
  border-bottom: 1px solid #35357a;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 2;
}

.project-table td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid #35357a;
  color: #e0e0e0;
}

.project-table input, .project-table select {
  width: 100%;
  padding-top: 0.45rem;
  padding-bottom: 0.45rem;
  font-size: 0.95rem;
  border: 1px solid #35357a;
  border-radius: 4px;
  background-color: #18181b;
  color: #e0e0e0;
  outline: none;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.project-table input:focus, .project-table select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
}

.project-table .total-row td {
  font-weight: 600;
  background-color: #29294d;
  color: #fff;
  border-top: 1px solid #35357a;
}

.project-table tbody tr:hover {
  background-color: #35357a;
  transition: background-color 0.3s;
}

.submit-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.2rem;
}

@media (max-width: 900px) {
  .project-table-container {
    padding: 1rem;
  }
  .controls {
    flex-direction: column;
    gap: 0.5rem;
  }
  .submit-container {
    flex-direction: column;
    gap: 0.5rem;
  }
  .left-side-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  .form-title {
    font-size: 1.2rem;
  }
  .project-table th, .project-table td {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
}
.current-day {
  background-color: #483d8b !important;
  color: #fff;
}
</style>
