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
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 0.5rem;
        }

        .post-title {
            margin: 0;
            font-size: 2rem;
            color: #fff;
        }

        .post-meta {
            margin-top: 0.5rem;
            font-size: 0.9rem;
            color: #bbb;
        }

        .post-content p {
            margin: 1rem 0;
            color: #ccc;
        }

        .post-content blockquote {
            margin: 1rem 0;
            padding-left: 1rem;
            border-left: 4px solid #555;
            color: #aaa;
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
        flex: 1 1 100%;
        background: var(--accent-color-two);
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid #1e1e1e;
        color: #d1d1d1;
    }
    .scroll-wrap {
        padding-right: 1rem;
        padding-left: 1rem;
        height: calc(100% - 4.5rem);
    }
    .board-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        margin-top: 0.8rem;
        text-align: center;
        background: var(--accent-color-two);
        width: 96%;
        color: #ffffff;
        border-bottom: 2px solid #4f46e5;
        padding-bottom: 0.8rem;
        margin-left: auto;
        margin-right: auto;
        max-height: 2rem;
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
