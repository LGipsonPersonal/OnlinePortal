<script>
  let { requests } = $props();
  import Popup from "./widgets/Popup.svelte";

  let popupActive = $state(false);
  let selectedRequest = $state(null);

  function handleRowClick(request) {
    selectedRequest = request;
    popupActive = true;
  }

  function cancelRequest(request) {
    if (confirm('Are you sure you want to cancel this request?')) {
      // Implement cancellation logic here
      alert(`Request for ${request.start_date} - ${request.end_date} cancelled.`);
    }
  }

  
  function getStatusIcon(status) {
    if (status === 'Approved') return '✔️';
    if (status === 'Pending') return '⏳';
    if (status === 'Denied') return '❌';
    return '';
  }
</script>

{#snippet renderRequestDetails(request) }
    <article class="request-details-popup">
      <header>
        <h2>Time Off Request Details</h2>
      </header>
      <section>
        <p><strong>Request Date:</strong> {request.request_date}</p>
        <p><strong>Start Date:</strong> {request.start_date}</p>
        <p><strong>End Date:</strong> {request.end_date}</p>
        <p><strong>Duration:</strong> {request.duration}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Supervisor's Note:</strong></p>
        <div class="popup-note">{request.supervisor_note || "—"}</div>
      </section>
    </article>
{/snippet}

<div class="timeoff-container" role="table" aria-label="Request History Table">
  <Popup
    popupContent={renderRequestDetails}
    bind:active={popupActive}
    popupData={selectedRequest}
  />
  <div class="timeoff-header" role="row">
    <div class="timeoff-column req-date" role="columnheader">Request Date</div>
    <div class="timeoff-column start-date" role="columnheader">Start Date</div>
    <div class="timeoff-column" role="columnheader">End Date</div>
    <div class="timeoff-column duration" role="columnheader">Duration</div>
    <div class="timeoff-column status" role="columnheader">Status</div>
    <div class="timeoff-column note" role="columnheader">Supervisor's Note</div>
  </div>
  {#each requests as request, i (request.id)}
    <div
      class="timeoff-row {request.status.toLowerCase()}"
      role="row"
      tabindex="0"
      onclick={() => handleRowClick(request)}
      onkeydown={(e) => e.key === 'Enter' && handleRowClick(request)}
      aria-label="View request details"
    >
      <div class="timeoff-request-date">{request.request_date}</div>
      <div class="timeoff-start-date">{request.start_date}</div>
      <div class="timeoff-end-date">{request.end_date}</div>
      <div class="timeoff-duration">{request.duration}</div>
      <div class="timeoff-status">
        <span class="status-icon" aria-hidden="true">{getStatusIcon(request.status)}</span>
        {request.status}
      </div>
      <div class="timeoff-supervisor-note" title={request.supervisor_note}>
        {request.supervisor_note && request.supervisor_note.length > 30
          ? request.supervisor_note.slice(0, 30) + '…'
          : request.supervisor_note}
      </div>
    </div>
  {/each}
  <div class="timeoff-placeholder">
    <p>End of Request History</p>
  </div>
</div>

<style>
  .timeoff-container {
      flex: 1 1 auto;
      width:90%;
      height: 100%;
      
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
      font-family: 'Inter', sans-serif;
      z-index: 4;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;
      background-color: var(--accent-color-one);
      color: #ffffff;
      font-weight: 600;
      text-transform: uppercase;
      padding: 1rem;
      border-bottom: 1px solid #2e2e2e;
    }

    .timeoff-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;
      padding: 1rem;
      border-bottom: 1px solid #2e2e2e;
      background-color: #2a2a2a;
      color: #d4d4d4;
      transition: background-color 0.3s, transform 0.2s;
      cursor: pointer;
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
      border: 1px solid #6366f1;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;
      box-shadow: 0 1px 4px rgba(44,62,80,0.08);
    }
  
    .cancel-button:hover, .cancel-button:focus {
      background-color: #4f46e5;
      border-color: #483d8b;
      color: #fff;
      transform: scale(1.04);
      outline: none;
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
.request-details-popup {
  color: #e0e0e0;
  font-size: 1rem;
  padding: 0.5rem 0;
}
.request-details-popup header {
  border-bottom: 1px solid #444;
  margin-bottom: 1rem;
}
.request-details-popup h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #fff;
}
.request-details-popup section p {
  margin: 0.5rem 0;
}
.popup-note {
  background: #232336;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: #c0c0c0;
  word-break: break-word;
}
  </style>


