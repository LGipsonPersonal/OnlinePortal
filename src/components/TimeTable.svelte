<script>
  const DAYS_IN_WEEK = 7;

  let weekDays = ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']

  // 5 X 7 array meant to house the input time data
  let tableData = $state(
    Array.from({ length: 5 }, () =>
      Array.from({ length: 7 }, () => "")
    )
  );

  // Form an Array of the Time data totals
  let calculateColumnTotals = $derived.by(() => {
    return Array.from({ length: DAYS_IN_WEEK }, (_, colIndex) =>
      tableData.reduce((sum, row) => sum + (parseFloat(row[colIndex]) || 0), 0)
    );
  }
  )

  // @ts-ignore
  let tableTotal = $derived(calculateColumnTotals.reduce((sum, value) => sum + (parseFloat(value) || 0), 0))

  let rowTotals = $derived.by(() => {
    return tableData.map(row =>
      row.reduce((sum, value) => sum + (parseFloat(value) || 0), 0)
    );
  })
</script>

<div class="project-table-container">
  <h2 class="form-title">Time Sheet</h2>
  <table class="project-table">
    <thead>
      <tr>
        <th>Projects</th>
        <th>Tasks</th>
        {#each { length: 7 } as _, i}
          <th>{weekDays[i]}</th>
        {/each}
        <th>Totals</th>
      </tr>
    </thead>
    <tbody>
      {#each { length: 5 } as _, rowIndex}
        <tr>
          <td>Project {rowIndex + 1}</td>
          <td>
            <select>
              <option value="task1">Task 1</option>
              <option value="task2">Task 2</option>
              <option value="task3">Task 3</option>
              <option value="task4">Task 4</option>
            </select>
          </td>
          {#each { length: DAYS_IN_WEEK } as _, colIndex}
            <td>
              <input
                bind:value="{tableData[rowIndex][colIndex]}"
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
        {#each calculateColumnTotals as total}
          <td>{total}</td>
        {/each}
        <td>{tableTotal}</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
/* Container */
.project-table-container {
  background: var(--accent-color-two);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
  margin: 12px auto;
  color: #d1d1d1;
}

/* Title */
.project-table-container .form-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #ffffff;
  border-bottom: 1px solid #1e1e1e;
  padding-bottom: 1rem;
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

/* Select Fields */
.project-table select {
  padding: 0.5rem;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: #272727;
  color: #d4d4d4;
  outline: none;
  cursor: pointer;
}

.project-table select:focus {
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
