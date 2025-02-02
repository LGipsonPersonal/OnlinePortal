<script>
  // @ts-ignore
  import { documentCategories } from "$assets/store.svelte.js";
  import { slide } from 'svelte/transition'

  const DEFAULT_TAB_STATE = true // open the page with all the tabs open

  let openTabs = Array.from({ length: documentCategories.length }, () => DEFAULT_TAB_STATE)

  function toggleSubmenu(index) {
    openTabs[index] = !openTabs[index]
  }
  function downloadDoc(section, doc) {
    console.log(documentCategories[section].documents[doc])
  }
</script>

<div class="documents-container">
  {#each documentCategories as section, i (section.category)}
    <div class="category-section">
      <div class="category-header">
        {section.category}
        <button class="submenu-toggle" onclick={() => toggleSubmenu(i)}>
            {#if !openTabs[i]}
              <i class="fas fa-chevron-up"></i>
            {:else}
              <i class="fas fa-chevron-down"></i>
            {/if}
        </button>
      </div>
      {#if openTabs[i]}
        <div class="doc-seciton" transition:slide>
          {#each section.documents as doc, j (doc)}
            <div class="document-row">
                <span class="document-name">{doc}</span>
                <button class="download-button" onclick={() => downloadDoc(i,j)}>Download</button>
            </div>
          {/each}
          </div>
      {/if}
    </div>
    {/each}
  </div>
  
  <style>
    .documents-container {
      width: 94%;
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      background-color: var(--accent-color-two);
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
      margin: 2rem auto;
      padding: 1rem 1rem 0px;
      overflow-y: scroll;
    }
  
    .category-section {
      margin-bottom: 1.5rem;
    }
  
    .category-header {
      background-color: #333333;
      color: #ffffff;
      font-weight: 600;
      text-transform: uppercase;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
    }
  
    .document-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2e2e2e;
      padding: 0.75rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
  
    .document-row:hover {
      background-color: #444444;
    }
  
    .document-name {
      color: #d4d4d4;
    }
  
    .download-button {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #f0f0f0;
      background-color: #3b3b3b;
      border: 1px solid #444;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s;
    }
  
    .download-button:hover {
      background-color: #4a4a4a;
      border-color: #555;
    }

    .submenu-toggle:hover {
      color: #fff; /* Highlight text color on hover */
    }
    .submenu-toggle {
      background: none;
      border: none;
      color: #aaa;
      cursor: pointer;
      transition: color 0.2s;
  }
  </style>
  