<script>
  import Popup from './widgets/Popup.svelte';
  import { getTwoWeekIntervalForDate } from '$assets/utils.js';
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


  // Get the current two-week interval
  let today = new Date();
  const currentDayIndex = today.getDay() - 1; // Adjust for weekday index (0-based)
  let { start: weekStart, end: weekEnd } = getTwoWeekIntervalForDate(today);


  function updateWeekRange() {
    const dayOfWeek = today.getDay();
    const startOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    weekStart.setDate(today.getDate() - startOffset);
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
    weekStart.setDate(weekStart.getDate() - 14);
    weekEnd.setDate(weekEnd.getDate() - 14);
    updateWeekDays();
  };
  const nextWeek = () => {
    weekStart.setDate(weekStart.getDate() + 14);
    weekEnd.setDate(weekEnd.getDate() + 14);
    updateWeekDays();
  };
  function updateWeekDays() {
    weekDays = [];
    let current = new Date(weekStart);
    while (current <= weekEnd) {
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        weekDays.push(current.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }));
      }
      current.setDate(current.getDate() + 1);
    }
  }

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
          {#each weekDays as day, i}
            <th class={i === currentDayIndex ? 'current-day': ''}>{day}</th>
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
  background: #18181b;
  padding: 2rem;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 1px 8px rgba(44, 62, 80, 0.10);
  border: 1px solid var(--border-color);
  margin: 2rem;
  color: #e0e0e0;
}

/* Title */
.project-table-container .form-title {
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #fff;
  border-bottom: 2px solid #6366f1;
  padding-bottom: 0.5rem;
}

/* Controls */
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: center;
  justify-content: center;
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

.arrow-button, .submit-button, .left-button {
  padding: 0.5rem 1.1rem;
  border-radius: 6px;
  border: 1px solid #6366f1;
  background: #232336;
  color: #a5b4fc;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.arrow-button:hover, .submit-button:hover, .left-button:hover {
  background: #6366f1;
  color: #fff;
}

.date-range {
  text-align: center;
  color: #a1a1aa;
  margin-bottom: 1rem;
}

.table-wrapper {
  overflow-x: auto;
  width: 100%;
  border-radius: 8px;
  background-color: #232336;
  border: 1px solid #6366f1;
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
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(44, 62, 80, 0.04);
}

.project-table th {
  background-color: #29294d;
  color: #fff;
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

/* Inputs and Selects in Table */
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

/* Totals Row */
.project-table .total-row td {
  font-weight: 600;
  background-color: #29294d;
  color: #fff;
  border-top: 1px solid #35357a;
}

/* Row Hover Effect */
.project-table tbody tr:hover {
  background-color: #35357a;
  transition: background-color 0.3s;
}

/* Submit Container Alignment */
.submit-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;

}

/* Responsive Design */
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
  background-color: #35357a !important;
  color: #fff;
}
</style>
