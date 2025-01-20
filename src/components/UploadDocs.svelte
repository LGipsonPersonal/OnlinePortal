<script>
  let { docs } = $props(); // Assume props are passed with docs array

  // Function to handle uploading
  function uploadDocument(doc) {
    console.log(`Uploading ${doc.name}`);
    // Logic for handling upload goes here
  }
</script>


<div class="documents-container">
  <div class="document-header">
    <div class="document-column">Document Name</div>
    <div class="document-column">Status</div>
    <div class="document-column">Due Date</div>
    <div class="document-column">Submitted Date</div>
    <div class="document-column">Action</div>
  </div>
  {#each docs as doc, i (doc.name)}
    <div class="document-row {doc.status.toLowerCase()}">
      <div class="document-name">{doc.name}</div>
      <div class="document-status">{doc.status}</div>
      <div class="document-due-date">{doc.due_date}</div>
      <div class="document-submitted-date">{doc.submitted_date}</div>
      <div class="document-action">
        <button 
          class="action-button" 
          onclick={() => uploadDocument(doc)}>
          {doc.action}
        </button>
      </div>
    </div>
  {/each}
  <!-- Placeholder for future documents -->
  <div class="document-placeholder">
    <p>End of Required Documents</p>
  </div>
</div>

<style>
.documents-container {
    width: 94%;
    height: calc(100% - 2rem);
    margin: 2rem auto;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    background-color: var(--accent-color-two);
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);

  }

  .document-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    background-color: var(--accent-color-one);
    color: #ffffff;
    font-weight: 600;
    text-transform: uppercase;
    padding: 1rem;
    border-bottom: 1px solid #2e2e2e;
  }
  
  .document-column {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .document-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 1rem;
    border-bottom: 1px solid #2e2e2e;
    background-color: #2a2a2a;
    color: #d4d4d4;
  }

  .document-row:hover {
    background-color: #333333;
  }

  .document-row:last-child {
    border-bottom: none;
  }

  .document-name,
  .document-status,
  .document-due-date,
  .document-submitted-date,
  .document-action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
  }

  .document-status {
    text-transform: capitalize;
    font-weight: 600;
  }

  .action-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #f0f0f0;
    background-color: #3b3b3b;
    border: 1px solid #444;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .action-button:hover {
    background-color: #4a4a4a;
    border-color: #555;
  }

  .action-button:disabled {
    background-color: #555;
    color: #888;
    cursor: not-allowed;
  }

  .action-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }

  .document-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-style: italic;
    font-size: 1rem;
    color: #888888;
    background-color: #1f1f1f;
    border-top: 1px solid #2e2e2e;
  }

  /* Status-specific styles */
  .document-row.pending .document-status {
    color: #eab308; /* Yellow for pending */
  }

  .document-row.uploaded .document-status {
    color: #16a34a; /* Green for uploaded */
  }

  .document-row.failed .document-status {
    color: #dc2626; /* Red for failed */
  }

  @media (max-width: 768px) {
    .documents-container {
      font-size: 0.75rem;
    }

    .document-row {
      grid-template-columns: 2fr 1fr 1fr 1fr;
    }

    .action-button {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }
  }
</style>
