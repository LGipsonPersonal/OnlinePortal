<div class="search-bar-container">
    <input type="text" id="searchInput" class="search-input" placeholder="Search...">
</div>

<style>
    .search-bar-container {
        background: var(--accent-color-two);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        color: #d1d1d1;
        width: 18rem;
        flex-grow: 1;
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
</style>
