<script>
  let { docs } = $props() // [{name: 'Resume.pdf', status: 'Pending', due_date: '2024-06-20', submitted_date: '-', action: 'Upload'}]

</script>

<table class="upload-table">
  <thead>
    <tr>
      <th class="column-name">Document Name</th>
      <th class="column-status">Status</th>
      <th class="column-due-date">Due Date</th>
      <th class="column-submitted-date">Submitted Date</th>
      <th class="column-action">Action</th>
    </tr>
  </thead>
  <tbody>
    {#each docs as doc, i (doc.name)}
      <tr class="upload-item {doc.status.toLowerCase()}">
        <td class="document-name">{doc.name}</td>
        <td class="status">{doc.status}</td>
        <td class="due-date">{doc.due_date}</td>
        <td class="submitted-date">{doc.submitted_date}</td>
        <td class="action">
          <button class="upload-button">{doc.action}</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  /* Table styles for the upload list */
  .upload-table {
    width: 98%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    background-color: #1e1e1e;
    color: #f0f0f0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
  }

  .upload-table th, .upload-table td {
    padding: 0.75rem 1rem;
    border: 1px solid #333;
    text-align: center;
  }

  .upload-table th {
    background-color: #2d2d2d;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }



  .document-name {
    font-size: 0.95rem;
    font-weight: 500;
    color: #e5e5e5;
  }

  .status, .due-date, .submitted-date {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .upload-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #f0f0f0;
    background-color: #3b3b3b;
    border: 1px solid #444;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .upload-button:hover {
    background-color: #4a4a4a;
    border-color: #555;
  }

  .upload-item.pending .status {
    color: #eab308; /* Darker yellow for pending */
  }

  .upload-item.uploaded .status {
    color: #16a34a; /* Darker green for uploaded */
  }

  .upload-item.failed .status {
    color: #dc2626; /* Darker red for failed */
  }
</style>
