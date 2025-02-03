<script>
  let { requests } = $props();
</script>

<div class="timeoff-container">
  <div class="timeoff-header">
    <div class="timeoff-column req-date">Request Date</div>
    <div class="timeoff-column start-date">Start Date</div>
    <div class="timeoff-column">End Date</div>
    <div class="timeoff-column duration">Duration</div>
    <div class="timeoff-column status">Status</div>
    <div class="timeoff-column note">Supervisor's Note</div>
    <div class="timeoff-column">Action</div>
  </div>
  {#each requests as request, i (request.id)}
    <div class="timeoff-row {request.status.toLowerCase()}">
      <div class="timeoff-request-date">{request.request_date}</div>
      <div class="timeoff-start-date">{request.start_date}</div>
      <div class="timeoff-end-date">{request.end_date}</div>
      <div class="timeoff-duration">{request.duration}</div>
      <div class="timeoff-status">{request.status}</div>
      <div class="timeoff-supervisor-note">{request.supervisor_note}</div>
      <div class="timeoff-action">
        {#if request.action === 'Cancel'}
          <button class="cancel-button">Cancel</button>
        {:else}
          <span>{request.action}</span>
        {/if}
      </div>
    </div>
  {/each}
  <!-- Placeholder for future requests -->
  <div class="timeoff-placeholder">
    <p>End of Request History</p>
  </div>
</div>

<style>
  .timeoff-container {
      flex: 1 1 auto;
      width:90%;
      height: 100%;
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      background-color: var(--accent-color-two);
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
      overflow-y: auto;
    }

  .timeoff-placeholder {
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

  .timeoff-header {
      position: sticky;
      top: 0;
      z-index: 10;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr 1fr;
      background-color: var(--accent-color-one);
      color: #ffffff;
      font-weight: 600;
      text-transform: uppercase;
      padding: 1rem;
      border-bottom: 1px solid #2e2e2e;
    }

    .timeoff-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr 1fr;
      padding: 1rem;
      border-bottom: 1px solid #2e2e2e;
      background-color: #2a2a2a;
      color: #d4d4d4;
    }
  
    .timeoff-column {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

    }
  
  
    .timeoff-row:hover {
      background-color: #333333;
    }
  
    .timeoff-row:last-child {
      border-bottom: none;
    }
    .scroll-wrap {
      height:unset;
      overflow-y: scroll;
      padding-left: 0;
      padding-bottom: 0px;
      padding-right: 0;
    }
    .timeoff-request-date,
    .timeoff-start-date,
    .timeoff-end-date,
    .timeoff-duration,
    .timeoff-status,
    .timeoff-supervisor-note,
    .timeoff-action {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
    }
  
    .timeoff-status {
      text-transform: capitalize;
      font-weight: 600;
    }
  
    .cancel-button {
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
  
    .cancel-button:hover {
      background-color: #4a4a4a;
      border-color: #555;
    }
  
    .cancel-button:disabled {
      background-color: #555;
      color: #888;
      cursor: not-allowed;
    }
  
    .cancel-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
    }
  
    /* Status-specific styles */
    .timeoff-row.pending .timeoff-status {
      color: #eab308; /* Yellow for pending */
    }
  
    .timeoff-row.approved .timeoff-status {
      color: #16a34a; /* Green for approved */
    }
  
    .timeoff-row.denied .timeoff-status {
      color: #dc2626; /* Red for denied */
    }
  
    @media (max-width: 1550px) {
      .timeoff-container {
        font-size: 0.75rem;
      }
  
      .timeoff-header {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* Collapse columns */
      }
  
      .timeoff-row {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* Collapse columns */
      }
  
      .timeoff-duration,
      .duration,
      .note,
      .timeoff-supervisor-note {
        display: none; /* Hide on smaller screens */
      }
  
      .cancel-button {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
      }
    }
    @media (max-width: 1300px) { 
      .timeoff-request-date, .req-date {
        display: none;
      }
      .timeoff-request-date,
    .timeoff-start-date,
    .timeoff-end-date,
    .timeoff-duration,
    .timeoff-status,
    .timeoff-supervisor-note,
    .timeoff-action {

      padding: 0.5rem 0.4rem;
    }
  }
  @media (max-width: 1150px) {
    .timeoff-container {
      display: none;
    }
   }
   /* Add this at the end of the file */
@media (max-width: 768px) {
  .timeoff-container {
    font-size: 0.75rem;
  }

  .timeoff-header,
  .timeoff-row {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .timeoff-duration,
  .timeoff-supervisor-note {
    display: none;
  }

  .cancel-button {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
}
  </style>
  
  
