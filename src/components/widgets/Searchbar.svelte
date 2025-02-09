<script>
    import Fuse from 'fuse.js';
    let tabs = [
        { name: "Home", synonyms: ["dashboard", "news", "events", "deadlines", "meetings", "request day off", "hours worked"] },
        { name: "Time Sheet", synonyms: ["hours worked", "time tracking", "work hours", "timesheet"] },
        { name: "Request Time Off", synonyms: ["vacation", "leave", "time off", "request leave"] },
        { name: "Documents", synonyms: ["files", "handbook", "code of conduct", "privacy policy", "upload", "download"] },
        { name: "Settings", synonyms: ["preferences", "account settings", "profile", "password", "email", "profile picture"] },
        { name: "Your Projects", synonyms: ["projects", "deadlines", "tasks", "work"] },
        { name: "IT Helpdesk", synonyms: ["support", "help", "IT", "ticket", "issue"] },
        { name: "Messages", synonyms: ["communication", "chat", "email", "messages"] }
    ];

    const fuse = new Fuse(tabs, {
        keys: ["name", "synonyms"],
        threshold: 0.25, // Lower threshold means stricter matching
        minMatchCharLength: 2
    });
    
    let searchInput = $state("");
    let filteredTabs = $derived.by(() => {
        if (searchInput.trim() === "") {
            return [];
        } else {
            return fuse.search(searchInput).map(result => result.item);
        }
    })
     
    $inspect(filteredTabs)
    </script>
    
    <div class="search-bar-container">
        <input type="text" bind:value={searchInput} class="search-input" placeholder="Search...">
        {#if filteredTabs.length > 0}
            <div class="search-box">
                <ul class="autocomplete-list">
                    {#each filteredTabs as tab}
                        <li class="autocomplete-item">{tab.name}</li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
    
    <style>
    .search-bar-container {
        background: var(--accent-color-two);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        color: #d1d1d1;
        width: 18rem;
        position: relative;
    }
    .search-box {
        position: absolute;
        z-index: 10;
        top: calc(2rem + 8px);
        height: 100vh;
        width: calc(100% - 1rem);
    }
    .search-input {
        width: 100%;
        padding: 0.4rem;
        border-radius: 6px;
        border: 1px solid #3a3a3a;
        background-color: #2a2a2a;
        color: #ffffff;
        font-size: 0.875rem;
        transition: border-color 0.3s, box-shadow 0.3s;
    }
    .search-input:focus {
        border-color: #4f46e5;
        box-shadow: 0 0 4px rgba(79, 70, 229, 0.5);
        outline: none;
    }
    .autocomplete-list {
        position: absolute;
        left: 0;
        width: 100%;
        background: #2a2a2a;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        margin-top: 4px;
        list-style: none;
        padding: 0;
        max-height: 200px;
        overflow-y: auto;
        z-index: 10;
    }
    .autocomplete-item {
        padding: 0.5rem;
        cursor: pointer;
        transition: background 0.2s;
        color: #ffffff;
    }
    .autocomplete-item:hover {
        background: #3a3a3a;
    }
    </style>
