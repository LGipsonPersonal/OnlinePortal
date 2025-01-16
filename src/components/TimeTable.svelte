<script>
  const DAYS_IN_WEEK = 7;
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  let projects = $state([
    {
      name: 'Project X', 
      tasks:["Task 1", "Task 2"]
    }, 
    {
      name: 'Project Y', 
      tasks:["Task 1", "Task 2"]
    },{
      name: 'Project Z', 
      tasks:["Task 1", "Task 2"]
    },
    {
      name: 'Project R', 
      tasks:["Task 1", "Task 2"]
    },
    {
      name: 'Leave', 
      tasks:["PTO", "Holdiay", "Unpaid"]
    },
  
  ])

   let tableData = $state(
    Array.from({ length:  projects.length}, () =>
      Array.from({ length: DAYS_IN_WEEK }, () => "")
    )
  );

  // Form an Array of the Time data totals
  let columnTotals = $derived.by(() => {
    return Array.from({ length: DAYS_IN_WEEK }, (_, colIndex) =>
      tableData.reduce((sum, row) => sum + (parseFloat(row[colIndex]) || 0), 0)
    );
  }
  )

  // @ts-ignore
  let tableTotal = $derived(columnTotals.reduce((sum, value) => sum + (parseFloat(value) || 0), 0))

  let rowTotals = $derived.by(() => {
    return tableData.map(row =>
      row.reduce((sum, value) => sum + (parseFloat(value) || 0), 0)
    );
  })
  let currentDate = new Date();
  let weekStart = $state(null)
  let weekEnd = $state(null);

  const updateWeekRange = () => {
    const dayOfWeek = currentDate.getDay();
    const startOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - startOffset);
    weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const previousWeek = () => {
    currentDate.setDate(currentDate.getDate() - 7);
    updateWeekRange();
  };

  const nextWeek = () => {
    currentDate.setDate(currentDate.getDate() + 7);
    updateWeekRange();
  };
  let selectedDate = ''
  const submitTimesheet = () => {
    console.log('Timesheet submitted:', tableData);
  };

  function handleDateChange() {
    
  }
  
  function addRow() {}

  updateWeekRange();

</script>

<div class="project-table-container">
  <h2 class="form-title">Time Sheet</h2>
  <div class="controls">
    <button class="arrow-button" onclick={previousWeek}>
      <i class="fas fa-arrow-left"></i> Previous Week
    </button>
    <input 
      class="calendar-input" 
      type="date" 
      value={selectedDate} 
      onchange={handleDateChange} 
      aria-label="Select Date" 
    />
    <button class="arrow-button" onclick={nextWeek}>
      Next Week <i class="fas fa-arrow-right"></i>
    </button>
  </div>
  <p class="date-range">{formatDate(weekStart)} - {formatDate(weekEnd)}</p>

  <div class="table-wrapper">
    <table class="project-table">
      <thead>
        <tr>
          <th>Projects</th>
          <th>Tasks</th>
          {#each weekDays as day (day)}
            <th>{day}</th>
          {/each}
          <th>Totals</th>
        </tr>
      </thead>
      <tbody>
        {#each projects as project, rowIndex}
          <tr>
            <td>{project.name}</td>
            <td>
              <select>
                {#each project.tasks as task}
                  <option>{task}</option>
                {/each}
              </select>
            </td>
            {#each { length: DAYS_IN_WEEK } as _, colIndex}
              <td>
                <input
                  bind:value={tableData[rowIndex][colIndex]}
                  type="number"
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
    <button class="add-row-button" onclick={addRow}>Add Row</button>
    <button class="submit-button" onclick={submitTimesheet}>Submit Timesheet</button>
  </div>
</div>

<style>
/* Wrapper for Table to Enable Horizontal Scrolling */
.table-wrapper {
  overflow-x: auto;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }

  .arrow-button {
    width: 100%;
    justify-content: center;
  }

  .calendar-input {
    width: 100%;
  }

  .project-table input {
    width: 3rem;
  }
}

@media (max-width: 480px) {
  .form-title {
    font-size: 1.2rem;
  }

  .project-table th, .project-table td {
    font-size: 0.75rem;
    padding: 0.5rem;
  }

  .submit-button {
    width: 100%;
  }
}

/* Container */
.project-table-container {
  background: var(--accent-color-two);
  padding: 2rem;
  padding-top: 0.4rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
  margin: 2rem auto; /* Adds vertical space and centers horizontally */
  color: #d1d1d1;
  width: 95%; /* Takes up most of the available space */
  box-sizing: border-box; /* Includes padding in width calculation */
}


/* Title */
.project-table-container .form-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: #ffffff;
  border-bottom: 1px solid #1e1e1e;
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
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  text-align: center;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.calendar-input:hover {
  background-color: #272727;
}

.calendar-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
}

.calendar-input::-webkit-calendar-picker-indicator {
  filter: invert(1); /* Ensures the calendar icon matches the light text style */
  cursor: pointer;
}
/* Submit Button Container */
.submit-container {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Ensures vertical alignment */
  margin-top: 1rem; /* Adds space between the table and buttons */
}
/* Add Row Button */
.add-row-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background-color: #4caf50; /* Green button color */
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.add-row-button:hover {
  background-color: #45a047;
  transform: translateY(-2px);
}

.add-row-button:active {
  background-color: #2e7d32;
  transform: translateY(0);
}

/* Submit Button */
.submit-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.submit-button:hover {
  background-color: #3b36d5;
  transform: translateY(-2px);
}

.submit-button:active {
  background-color: #2a259a;
  transform: translateY(0);
}

.arrow-button, .submit-button, .add-row-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #272727;
  color: #ffffff;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.arrow-button:hover, .submit-button:hover {
  background-color: #4f46e5;
}

.date-range {
  text-align: center;
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

/* Table */
.project-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  background-color: var(--accent-color-two);
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

/* Table Header */
.project-table th {
  background-color: var(--accent-color-one);
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #2e2e2e;
}

/* Table Body */
.project-table td {
  padding: 1rem;
  text-align: center;
  color: #d4d4d4;
  border: 1px solid #2e2e2e;
}

/* Input Fields */
.project-table input {
  width: 4rem; /* Adjust width for better number display */
  padding: 0.5rem;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
  background-color: #1e1e1e;
  color: #e0e0e0;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.project-table input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
}

/* Totals Row */
.project-table .total-row td {
  font-weight: 600;
  background-color: var(--accent-color-one);
  color: #ffffff;
}

/* Row Hover */
.project-table tbody tr:hover {
  background-color: #333333;
  transition: background-color 0.3s ease;
}
</style>
