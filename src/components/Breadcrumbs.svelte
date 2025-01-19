<script>
    // @ts-ignore
    import { profile } from "$assets/store.svelte.js";
    import UserProfile from "./UserProfile.svelte";
    let { 
        currentTabs, // Array of Obj / [{name: 'home', key: '0', subtabs: [name: 'x', key: '0-0']}]
    } = $props()

    let showUserProfile = $state(false)
</script>

<div class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list">
        {#each {length: currentTabs.length -1} as tab, i}
        <li class="breadcrumb-item">
            <div>{currentTabs[i].name}</div>
        </li>
        {/each}
        <li class="breadcrumb-item" aria-current="page">
            {currentTabs[currentTabs.length - 1].name}
        </li>
    </ol>
    <button class="profile-pic-button" onclick={() => showUserProfile = !showUserProfile} aria-label="Toggle User Profile">
        <img class="profile-pic" src="./src/assets/{profile.profileImage}.jpg" alt="profile-pic"/>
    </button>
    {#if showUserProfile}
        <div class="userProfileContainer">
            <UserProfile></UserProfile>
        </div>
    {/if}
</div>

<style>
/* Breadcrumbs container */
.breadcrumbs {
    flex-shrink: 0;
    flex-grow: 0;
    background-color: var(--accent-color-two); /* Dark background */
    padding: 1rem;
    color: #e0e0e0;
    font-size: 0.875rem;
    border-bottom: 1px solid #333; /* Subtle border */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    height: 1.5rem;
    display: flex;
    align-items: center; /* Vertically centers all children */
    justify-content: space-between; /* Ensures spacing between items */
    overflow: hidden; /* Prevent unexpected growth from children */
}

/* Breadcrumbs list */
.breadcrumbs-list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0;
    margin: 0;
}

/* Individual breadcrumb item */
.breadcrumb-item {
    display: flex;
    align-items: center;
}

/* Breadcrumb links */
.breadcrumb-item div {
    text-decoration: none;
    color: var(--highlight-color-one);
    font-weight: 500;
    transition: color 0.3s;
}

/* Link hover effect */
.breadcrumb-item div:hover {
    color: #4338ca;
    cursor: pointer;
}

/* Separator */
.breadcrumb-item:not(:last-child)::after {
    content: "/";
    color: #9e9e9e;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

/* Profile pic button */
.profile-pic-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    flex-shrink: 0; /* Prevent the button from shrinking */
    display: block;
}

.profile-pic {
    width: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #2a2a2a;
}

/* Current page style */
.breadcrumb-item[aria-current="page"] {
    font-weight: 600;
    color: #e0e0e0;
}

.userProfileContainer {
    position: absolute;
    top: 2.5rem;
    right: 2rem;
}
</style>
