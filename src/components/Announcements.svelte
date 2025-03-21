<script>
    import Popup from "./widgets/Popup.svelte";
    let { props } = $props();

    let announcementContent = $state(null);
    let showingAnnouncement = $state(false);

    function handleAnnouncementClick(id) {
        console.log(id);
        announcementContent = props.announcements.find(
            (announcement) => announcement.id === id,
        );
        showingAnnouncement = true;
    }
</script>

{#snippet shownAnnouncement(announcementContent)}
    <article class="blog-post">
        <header class="post-header">
            <h1 class="post-title">{announcementContent.title}</h1>
            <p class="post-meta">
                Published on {announcementContent.date} by {announcementContent.author}
            </p>
        </header>
        <section class="post-content">
            {@html announcementContent.postContent}
        </section>
    </article>
    <style>
        /* Blog post styles */
        .post-content {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        .blog-post {
            line-height: 1.6;
        }
        .post-header {
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #444;
            padding-bottom: 0.5rem;
        }

        .post-title {
            margin: 0;
            font-size: 1.5rem;
            color: #e0e0e0;
        }

        .post-meta {
            margin-top: 0.5rem;
            font-size: 0.9rem;
            color: #888;
        }

        .post-content p {
            margin: 1rem 0;
            color: #e0e0e0;
        }

        .post-content blockquote {
            margin: 1rem 0;
            padding-left: 1rem;
            border-left: 4px solid #555;
            color: #888;
            font-style: italic;
        }

        .post-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1rem 0;
        }
    </style>
{/snippet}

<div class="announcement-board box-shadow">
    <Popup
        popupContent={shownAnnouncement}
        bind:active={showingAnnouncement}
        popupData={announcementContent}
    ></Popup>
    <h2 class="board-title">{props.boardTitle}</h2>
    <div class="scroll-wrap">
        {#each props.announcements as announcement, i (announcement.id)}
            <div
                class="announcement"
                onclick={() => handleAnnouncementClick(announcement.id)}
            >
                    <div class="avatar avatar-container">
                        <img src={announcement.avatar} alt="User Avatar" />
                    </div>
                <div class="announcement-content">
                    <p class="title">{announcement.title}</p>
                    <p class="description">{announcement.description}</p>
                    <div class="timestamp">{announcement.timestamp}</div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .announcement-board {
        max-height: 400px;
        flex: 1 1 100%;
        background: var(--accent-color-two);
        padding: 1rem;
        border-radius: 6px;
        border: 1px solid #444;
        color: #e0e0e0;
    }
    .scroll-wrap {
        padding-right: 1rem;
        padding-left: 1rem;
        height: calc(100% - 4.5rem);
        overflow-y: auto;
    }
    .board-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        margin-top: 0.8rem;
        text-align: center;
        color: #e0e0e0;
        border-bottom: 1px solid #444;
        padding-bottom: 0.8rem;
    }

    .announcement {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: #2e2e2e;
        border-radius: 6px;
        border: 1px solid #444;
        margin-bottom: 0.8rem;
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
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #444;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .announcement-content {
        flex: 1;
        color: #e0e0e0;
    }

    .title {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 0.5rem;
        color: #e0e0e0;
    }

    .description {
        font-size: 0.875rem;
        margin: 0 0 0.5rem;
        color: var(--text-color-muted, #c0c0c0);
    }

    .timestamp {
        font-size: 0.75rem;
        color: #888;
    }
</style>
