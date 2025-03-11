<script>
  import { slide } from 'svelte/transition';
  import { documentCategories } from "$assets/store.svelte.js";
  import Popup from './widgets/Popup.svelte';

  const DEFAULT_TAB_STATE = true; // open the page with all the tabs open

  let openTabs = $state(Array.from({ length: documentCategories.length }, () => DEFAULT_TAB_STATE));
  let showingDocument = $state(false);
  let documentContent = $state(null);

  function toggleSubmenu(index) {
    openTabs[index] = !openTabs[index];
  }

  function viewDoc(fileUrl) {
    documentContent = fileUrl;
    showingDocument = true;
  }
</script>

<div class="documents-container">
  {#each documentCategories as section, i (section.category)}
    <div class="category-section">
      <div class="category-header" on:click={() => toggleSubmenu(i)}>
        {section.category}
        <span class="submenu-toggle">
          {#if !openTabs[i]}
            <i class="fas fa-chevron-up"></i>
          {:else}
            <i class="fas fa-chevron-down"></i>
          {/if}
        </span>
      </div>
      {#if openTabs[i]}
        <div class="doc-section" transition:slide>
          {#each section.documents as doc, j (doc)}
            <div class="document-row">
              <a href={`./sample.pdf`} class="link" download>{doc}</a>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>

{#snippet documentViewer(documentContent)}
  <iframe src={documentContent} width="100%" height="800px"></iframe>
{/snippet}
<!-- Popup for viewing document -->
<Popup popupContent={documentViewer} bind:active={showingDocument} popupData={documentContent}></Popup>

<style>
  .documents-container {
    width: 94%;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    background-color: #1e1e1e; /* Dark background */
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
    cursor: pointer;
  }

  .document-row {
    background-color: #252525;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .document-row:hover {
    background-color: #3a3a3a;
  }

  .link {
    font-size: 0.875rem;
    font-weight: 600;
    color: #4f46e5; /* Purple text */
    text-decoration: underline; /* Underline to indicate hyperlink */
    cursor: pointer;
    transition: color 0.2s;
  }

  .link:hover {
    color: #6a5acd; /* Lighter purple on hover */
  }

  .submenu-toggle {
    color: #ddd; /* Higher contrast */
    transition: color 0.2s;
  }

  .submenu-toggle:hover {
    color: #ffffff; /* Full contrast on hover */
  }
</style>