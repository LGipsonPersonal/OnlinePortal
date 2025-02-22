<script>
    // @ts-ignore
    import { profile } from "$assets/store.svelte.js";
    import UserProfile from "./UserProfile.svelte";
    import Searchbar from "./widgets/Searchbar.svelte";
    import NotifList from "./widgets/NotifList.svelte";

    let { currentTabs } = $props();

    let showUserProfile = $state(false);
    let showNotifs = $state(false);

    let notifCount = $state(4); // Assuming 4 notifications
</script>

<div class="Topbar" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list">
        {#each { length: currentTabs.length - 1 } as tab, i}
            <li class="breadcrumb-item">
                <div>{currentTabs[i].name}</div>
            </li>
        {/each}
        <li class="breadcrumb-item" aria-current="page">
            {currentTabs[currentTabs.length - 1].name}
        </li>
    </ol>
    <div class="right">
        <Searchbar></Searchbar>
        <button
            class="notif-button"
            onclick={() => {showNotifs = !showNotifs; notifCount = 0} }
            aria-label="Toggle Notifications"
        >
            <i class="fa-solid fa-bell fa-xl white"></i>
            {#if notifCount > 0}
                <span class="notif-badge">{notifCount}</span>
            {/if}
        </button>
        <button
            class="profile-pic-button"
            onclick={() => (showUserProfile = !showUserProfile)}
            aria-label="Toggle User Profile"
        >
            <img
                class="profile-pic"
                src="./src/assets/{profile.profileImage}.jpg"
                alt="profile-pic"
            />
        </button>
    </div>
    {#if showUserProfile}
        <div class="userProfileContainer">
            <UserProfile></UserProfile>
        </div>
    {/if}
    {#if showNotifs}
        <NotifList></NotifList>
    {/if}
</div>

<style>
/* Topbar container */
.Topbar {
    flex-shrink: 0;
    flex-grow: 0;
    background-color: var(--accent-color-two);
    padding: 0.82rem;
    color: #e0e0e0;
    font-size: 0.875rem;
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Breadcrumbs list */
.breadcrumbs-list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-left: 2px;
    margin: 0;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
}

.breadcrumb-item div {
    text-decoration: none;
    color: var(--highlight-color-one);
    font-weight: 500;
    transition: color 0.3s;
}

.breadcrumb-item div:hover {
    color: #4338ca;
    cursor: pointer;
}

.right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.breadcrumb-item:not(:last-child)::after {
    content: "/";
    color: #9e9e9e;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

/* Profile pic button */
.profile-pic-button,
.notif-button {
    background: none;
    border: none;
    margin-top: 2px;
    cursor: pointer;
    flex-shrink: 0;
    border-radius: 50%;
    display: block;
    position: relative;
    transition: background-color 0.2s, transform 0.1s;
    background-size: 200%;
}

/* Hover and click states for notif-button */
.notif-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.notif-button:active {
    transform: scale(0.95);
}
.notif-button{
    width: fit-content;
}
.white {
    color: #aaa;
}

.profile-pic {
    width: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #2a2a2a;
}

/* Notification badge */
.notif-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.65rem;
    font-weight: bold;
}

.breadcrumb-item[aria-current="page"] {
    font-weight: 600;
    color: #e0e0e0;
}

.userProfileContainer {
    position: absolute;
    top: 2.5rem;
    right: 2rem;
    z-index: 5;
}

@media (max-width: 768px) {
    .Topbar {
        display: none;
    }
}
</style>
