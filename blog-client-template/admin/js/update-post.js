window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
}
/*
async function fetchPun(urlParams) {
    try {
        const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`)
        const pun = await response.json();

        document.getElementById('content').innerText = pun.content;
    } catch(error) {
        console.log(error)
    }
}

function updatePunEvent(urlParams) {
    const form = document.getElementById('update-post');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(e.target) // e.target is the form, in this case
        console.log(formData);
        const JSONString = {
            content: formData.get('content')
        };
        console.log(JSON.stringify(JSONString));

        try {
            const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`, {
                method: 'PATCH', // GET/POST/PATCH/DELETE
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSONString),
            })

            if (!response.ok) {
                throw new Error('Something went wrong with the API')
            }

            window.location.replace('index.html') // redirects to index.html
        } catch(error) {
            console.log(error);
        }
    })
}
  */