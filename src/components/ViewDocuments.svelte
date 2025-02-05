<script>
  import { slide } from 'svelte/transition';
  import { documentCategories } from "$assets/store.svelte.js";
  import Popup from './widgets/Popup.svelte';

  const DEFAULT_TAB_STATE = true; // open the page with all the tabs open

  let openTabs = $state(Array.from({ length: documentCategories.length }, () => DEFAULT_TAB_STATE));
  let downloadLink = null;
  let showingDocument = $state(false);
  let documentContent = $state(null);

  function toggleSubmenu(index) {
    openTabs[index] = !openTabs[index];
  }

  async function downloadDoc(section, doc) {
    const fileName = documentCategories[section].documents[doc];
    const fileUrl = `./sample.pdf`; // Adjust the path as needed

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  function viewDoc(section, doc) {
    const fileUrl = `./sample.pdf`; // Adjust the path as needed
    documentContent = fileUrl;
    showingDocument = true;
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
        <div class="doc-section" transition:slide>
          {#each section.documents as doc, j (doc)}
            <div class="document-row">
              <span class="document-name">{doc}</span>
              <div class="buttons">
                <button class="btn" onclick={() => downloadDoc(i, j)}>Download</button>
                <button class="btn" onclick={() => viewDoc(i, j)}>View</button>
            </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>

<!-- Hidden download link -->
<a bind:this={downloadLink} style="display: none;" download></a>

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
    background-color: #252525;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .document-row:hover {
    background-color: #3a3a3a;
  }

  .document-name {
    color: #d4d4d4;
  }

  .btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    background-color: var(--highlight-color-one); /* Purple base */
    border: 1px solid #372fa1;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .btn:hover {
    background-color: var(--highlight-color-two); /* Darker purple on hover */
    border-color: #282177;
  }
  .buttons {
    display: flex;
    gap: 1rem;
  }
  .submenu-toggle {
    background: none;
    border: none;
    color: #ddd; /* Higher contrast */
    cursor: pointer;
    transition: color 0.2s;
  }

  .submenu-toggle:hover {
    color: #ffffff; /* Full contrast on hover */
  }
</style>