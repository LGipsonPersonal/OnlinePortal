<div class="announcement-board">
    <h2 class="board-title">What's happening at Company</h2>
    <div class="announcement" onclick={() => handleAnnouncementClick(1)}>
        <div class="avatar-container">
            <div class="avatar">
                <img src="avatar1.png" alt="User Avatar">
            </div>
        </div>
        <div class="announcement-content">
            <p class="title">Alice posted an announcement: "New Feature Released!"</p>
            <p class="description">We are excited to announce a new feature...</p>
            <p class="timestamp">2 hours ago</p>
        </div>
    </div>

    <div class="announcement" onclick={() => handleAnnouncementClick(2)}>
        <div class="avatar-container">
            <div class="avatar">
                <img src="avatar2.png" alt="User Avatar">
            </div>
        </div>
        <div class="announcement-content">
            <p class="title">Bob posted an announcement: "Scheduled Maintenance"</p>
            <p class="description">The system will be down for maintenance...</p>
            <p class="timestamp">1 day ago</p>
        </div>
    </div>

    <div class="announcement" onclick={() => handleAnnouncementClick(3)}>
        <div class="avatar-container">
            <div class="avatar">
                <img src="avatar3.png" alt="User Avatar">
            </div>
        </div>
        <div class="announcement-content">
            <p class="title">Carol posted an announcement: "Weekly Update"</p>
            <p class="description">Here is your weekly company update...</p>
            <p class="timestamp">3 days ago</p>
        </div>
    </div>
    <div class="announcement" onclick={() => handleAnnouncementClick(3)}>
        <div class="avatar-container">
            <div class="avatar">
                <img src="avatar3.png" alt="User Avatar">
            </div>
        </div>
        <div class="announcement-content">
            <p class="title">Carol posted an announcement: "Weekly Update"</p>
            <p class="description">Here is your weekly company update...</p>
            <p class="timestamp">3 days ago</p>
        </div>
    </div>
</div>

<style>
    .announcement-board {
        width: 100%; /* Set to occupy full available width */
        max-width: 600px; /* Restrict maximum width */
        padding: 20px;
        border: 1px solid #333;
        border-radius: 8px;
        background-color: #1e1e1e;
        color: #e0e0e0;
    }

    .board-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        margin-bottom: 20px;
    }

    .announcement {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid #444;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .announcement:last-child {
        border-bottom: none;
    }

    .announcement:hover {
        background-color: #333;
    }

    .avatar-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
        flex-shrink: 0;
    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #444;
        margin-top: 5px;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .announcement-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        color: #ffffff;
    }

    .description {
        font-size: 14px;
        color: #ccc;
    }

    .timestamp {
        font-size: 14px;
        color: #aaa;
    }
</style>

<script>
    function handleAnnouncementClick(id) {
        console.log(`Announcement ${id} clicked`);
    }
</script>
