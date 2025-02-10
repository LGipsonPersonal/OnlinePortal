<script>
    // @ts-ignore
    import { profile } from "$assets/store.svelte.js";
    import UserProfile from "./UserProfile.svelte";
    import Searchbar from "./widgets/Searchbar.svelte";
    import NotifList from "./widgets/NotifList.svelte";
    let {
        currentTabs, // Array of Obj / [{name: 'home', key: '0', subtabs: [name: 'x', key: '0-0']}]
    } = $props();

    let showUserProfile = $state(false);
    let showNotifs = $state(false);
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
            onclick={() => (showNotifs = !showNotifs)}
            aria-label="Toggle User Profile"
        >
            <i class="fa-solid fa-bell fa-lg white"></i>
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
        background-color: var(--accent-color-two); /* Dark background */
        padding: 0.82rem;
        color: #e0e0e0;
        font-size: 0.875rem;
        border-bottom: 1px solid #333; /* Subtle border */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        height: 1.5rem;
        display: flex;
        align-items: center; /* Vertically centers all children */
        justify-content: space-between; /* Ensures spacing between items */
        
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
    .right {
        display: flex;
        align-items: center;
        gap: 1rem;
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
        margin-top: 2px;
        cursor: pointer;
        flex-shrink: 0; /* Prevent the button from shrinking */
        display: block;
    }
    .notif-button {
        background: none;
        border: none;
        margin-top: 2px;
        cursor: pointer;
        flex-shrink: 0; /* Prevent the button from shrinking */
        display: block;
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

    /* Current page style */
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
