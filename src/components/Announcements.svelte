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
</div>

<style>
    .announcement-board {
        background: var(--accent-color-two);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
        width: 40%;
        margin: 12px auto;
        height: 89%;

        border: 1px solid #1e1e1e;
        color: #d1d1d1;
    }

    .board-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        margin-top: 0.3rem;
        text-align: center;
        color: #ffffff;
        border-bottom: 1px solid #1e1e1e;
        padding-bottom: 1rem;
    }

    .announcement {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: #2a2a2a;
        border-radius: 8px;
        border: 1px solid #3a3a3a;
        margin-bottom: 1rem;
        transition: background-color 0.3s, transform 0.2s;
        cursor: pointer;
    }

    .announcement:hover {
        background-color: #3a3a3a;
        transform: scale(1.02);
    }

    .avatar-container {
        margin-right: 1rem;
    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #444;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .announcement-content {
        flex: 1;
    }

    .title {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 0.5rem;
        color: #ffffff;
    }

    .description {
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
        color: #ccc;
    }

    .timestamp {
        font-size: 0.8rem;
        color: #aaa;
    }
</style>

<script>
    function handleAnnouncementClick(id) {
        console.log(`Announcement ${id} clicked`);
    }
</script>
