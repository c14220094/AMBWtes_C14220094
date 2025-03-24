const container = document.getElementById('posts-container');

async function loadPosts() {
    try {
        console.log(' Fetching data from API...');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const posts = await response.json();
        console.log('Data Posts:', posts);

        
        container.innerHTML = '';

        let index = 0; 

        function renderPost() {
            if (index >= 100 || index >= posts.length) return; 
            const post = posts[index];
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <small>Post ID: ${post.id}</small>
            `;
            container.appendChild(card);

            index++;
            requestAnimationFrame(renderPost); 
        }

        
        requestAnimationFrame(renderPost);

        console.log(' 100 Posts Loaded Successfully!');
    } catch (error) {
        console.error(' Fetch Error:', error);
        container.innerHTML = `<p> Gagal memuat postingan. Periksa koneksi internet Anda.</p>`;
    }
}


document.addEventListener('DOMContentLoaded', loadPosts);
