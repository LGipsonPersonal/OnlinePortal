<script>
  const DAYS_IN_WEEK = 7;

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

<table class="project-table">
  <thead>
    <tr>
      <th>Projects</th>
      <th>Tasks</th>
      {#each { length: 7 } as _, i}
        <th>{i + 1}</th>
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

<style>
  .project-table {
    width: 94%;
    border-collapse: collapse;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem; /* Modern, smaller text size */
    background-color: #fff; /* White background */
    border-radius: 8px; /* Rounded corners for a modern look */
    overflow: hidden; /* Ensure rounded corners affect content */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for elevation */
  }

  .project-table th, 
  .project-table td {
    border: 1px solid #e5e7eb; /* Subtle border for cells */
    padding: 0.75rem 1rem; /* Consistent padding */
    text-align: center;
    color: #374151; /* Neutral gray text for readability */
  }

  .project-table thead th {
    background-color: #f9fafb; /* Light gray background */
    color: #111827; /* Darker text for headers */
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  .project-table tbody tr:hover {
    background-color: #f3f4f6; /* Subtle hover effect for rows */
  }

  .project-table tbody tr:last-child td {
    font-weight: 600;
    background-color: #f9fafb; /* Same as header background for totals */
    color: #111827; /* Make totals more prominent */
  }

  .project-table input {
    width: 3rem; /* Compact input fields */
    padding: 0.5rem;
    border: 1px solid #d1d5db; /* Subtle border */
    border-radius: 4px;
    font-size: 0.875rem;
    text-align: center;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .project-table input:focus {
    border-color: #3b82f6; /* Blue border on focus */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); /* Focus ring */
  }

  .project-table select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 0.875rem;
    background-color: #fff;
    color: #374151;
    outline: none;
    cursor: pointer;
  }

  .project-table select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
</style>

