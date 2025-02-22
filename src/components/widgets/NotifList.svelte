<script>
    let notifications = [
        { message: "New comment on your post", category: "social", timestamp: "2025-02-09T10:00:00Z" },
        { message: "Your password was changed", category: "security", timestamp: "2025-02-09T08:30:00Z" },
        { message: "Your time off request was accepted", category: "Time off", timestamp: "2025-02-09T09:15:00Z" },
        { message: "System maintenance scheduled", category: "system", timestamp: "2025-02-08T22:00:00Z" },
        { message: "Meeting reminder: 3 PM", category: "reminder", timestamp: "2025-02-09T07:45:00Z" },
        { message: "New Message from Dave", category: "social", timestamp: "2025-02-09T11:20:00Z" }
    ];

    notifications.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
</script>

<div class="notification-container">
    <ul class="notification-list">
        {#each notifications as notification}
            <li class="notification-item">
                <strong>[{notification.category}]</strong> {notification.message} 
                <small>({new Date(notification.timestamp).toLocaleString()})</small>
            </li>
        {/each}
    </ul>
</div>

<style>
.notification-container {
    padding: 0.5rem;
    border-radius: 8px;
    color: #d1d1d1;
    width: 16rem;
    position: absolute;
    top: calc(2rem + 10px);
    right: 1rem;
    z-index: 10;
}
.notification-list {
    width: 100%;
    background: #2a2a2a;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    margin: 0;
    list-style: none;
    padding: 0;
    max-height: 200px;
    overflow-y: auto;
}

.notification-item {
    padding: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
    color: #ffffff;
}
.notification-item:hover {
    background: #3a3a3a;
}
</style>
