<script>

    let { images } = $props();
    let currentIndex = $state(0);


    function next() {
        currentIndex = (currentIndex + 1) % images.length; // Loop back to start
    }

    function prev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop back to end
    }

</script>

<div class="carousel">
    <div class="carousel-inner" id="carouselInner">
        <div class="carousel-item">
            <h2>Announcement 1</h2>
            <img src="https://via.placeholder.com/600x300" alt="Announcement 1">
            <p>Description for the first announcement goes here.Description for the first announcement goes here.Description for the first announcement goes here.Description for the first announcement goes here.Description for the first announcement goes here.</p>
        </div>
        <div class="carousel-item">
            <h2>Announcement 2</h2>
            <img src="https://via.placeholder.com/600x300" alt="Announcement 2">
            <p>Description for the second announcement goes here.</p>
        </div>
        <div class="carousel-item">
            <h2>Announcement 3</h2>
            <img src="https://via.placeholder.com/600x300" alt="Announcement 3">
            <p>Description for the third announcement goes here.</p>
        </div>
    </div>
    <div class="carousel-controls">
        <button id="prev">
            <span class="material-icons">chevron_left</span>
        </button>
        <button id="next">
            <span class="material-icons">chevron_right</span>
        </button>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Material+Icons&display=swap');

    .carousel {
        width: 100%;
        max-width: 800px;
        overflow: hidden;
        border-radius: 12px;
        background-color: #121212;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
        border: 1px solid #2a2a2a;
        color: #e4e4e4;
        padding: 1rem;
    }

    .carousel-inner {
        display: flex;
        transition: transform 0.4s ease;
    }

    .carousel-item {
        min-width: 100%;
        padding: 2rem;
        text-align: center;
        box-sizing: border-box;
    }

    .carousel-item h2 {
        font-size: 1.8rem;
        font-weight: 600;
        color: #f4f4f4;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }

    .carousel-item img {
        max-width: 100%;
        border-radius: 6px;
        margin: 0.5rem 0;
        border: 1px solid #444;
    }

    .carousel-item p {
        font-size: 1rem;
        color: #c4c4c4;
        margin-bottom: 0.2rem; /* Reduce bottom margin to bring content closer to controls */
    }

    .carousel-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.2rem; /* Reduce top margin to shrink space between controls and content */
    }


    .carousel-controls button {
        background: #2a2a2a;
        border: none;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.2s;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    }

    .carousel-controls button:hover {
        background: #4f46e5;
        transform: scale(1.1);
    }

    .carousel-controls button .material-icons {
        font-size: 2rem;
        color: #ffffff;
    }

    .carousel-inner {
        padding: 0 2rem;
        box-sizing: border-box;
    }
</style>


