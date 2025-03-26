<script>
    let messages = [
      { id: 1, sender: "Alice", content: "Hey, how's the project going?", timestamp: "2025-02-25 10:00 AM" },
      { id: 2, sender: "Bob", content: "Don't forget the meeting at 3 PM.", timestamp: "2025-02-25 09:30 AM" },
      { id: 3, sender: "Charlie", content: "Can you review my code?", timestamp: "2025-02-24 05:00 PM" },
      // Add more messages as needed
    ];
  </script>
  
  <div class="messages-container">
    <h2 class="messages-title">Messages</h2>
    <div class="messages-list">
      {#each messages as message}
        <div class="message-item">
          <div class="message-header">
            <span class="message-sender">{message.sender}</span>
            <span class="message-timestamp">{message.timestamp}</span>
          </div>
          <div class="message-content">{message.content}</div>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .messages-container {

      background-color: var(--accent-color-two);
      padding: 1rem;
      border-radius: 8px;
      color: var(--text-color);
    }
  
    .messages-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-align: center;
      color: var(--text-color);
      border-bottom: 2px solid var(--highlight-color-one);
      padding-bottom: 0.5rem;
    }
  
    .messages-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .message-item {
      background-color: var(--accent-color-one);
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: background-color 0.2s, transform 0.2s;
    }
  
    .message-item:hover {
      background-color: var(--highlight-color-one);
      transform: scale(1.02);
    }
  
    .message-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
  
    .message-sender {
      font-weight: 600;
      color: var(--text-color);
    }
  
    .message-timestamp {
      font-size: 0.875rem;
      color: var(--text-color-muted);
    }
  
    .message-content {
      font-size: 1rem;
      color: var(--text-color);
    }
  </style>