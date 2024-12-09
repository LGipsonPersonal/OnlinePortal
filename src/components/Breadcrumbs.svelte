<script>
    let { 
        currentTabs, // Array of Obj / [{name: 'home', key: '0'}]
     } = $props()

</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
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
</nav>
<style>
/* Breadcrumbs container */
.breadcrumbs {
    background-color: var(--accent-color-two); /* Dark background*/
    padding: 1rem;
    color: #e0e0e0;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #333; /* Subtle border */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

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

/* Current page style */
.breadcrumb-item[aria-current="page"] {
    font-weight: 600;
    color: #e0e0e0;
}


</style>