<script>
    let { props } = $props();

    function handleAnnouncementClick(id) {
        console.log(`Announcement ${id} clicked`);
    }
</script>

<div class="announcement-board">
    <h2 class="board-title">{props.boardTitle}</h2>
    <div class="scroll-wrap">
    {#each props.announcements as announcement, i (announcement.id)}
        <div class="announcement" onclick={() => handleAnnouncementClick(i)}>
            <div class="avatar-container">
                <div class="avatar">
                    <img src={announcement.avatar} alt="User Avatar" />
                </div>
            </div>
            <div class="announcement-content">
                <p class="title">{announcement.title}</p>
                <p class="description">{announcement.description}</p>
                <p class="timestamp">{announcement.timeStamp}</p>
            </div>
        </div>
    {/each}
</div>
</div>

<style>
    .announcement-board {
        max-height: 380px;
        flex: 1 1 auto;
        background: var(--accent-color-two);
        padding: 1.8rem 1.6rem 1rem;
        border-radius: 12px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
        border: 1px solid #1e1e1e;
        color: #d1d1d1;
    }
    .scroll-wrap{
        position: relative;
        height: calc(100% - 4.8rem);
        padding-left: 0.4rem;
        padding-right: 0.4rem;
        overflow-y: scroll;
    }
    .board-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        margin-top: 0.3rem;
        text-align: center;
        background: var(--accent-color-two);

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
        margin-bottom: 0.8rem;
        transition:
            background-color 0.3s,
            transform 0.2s;
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