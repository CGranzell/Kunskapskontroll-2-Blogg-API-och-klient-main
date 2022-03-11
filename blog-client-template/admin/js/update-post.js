window.onload = function() {
    const queryString = window.location.search; //  ?id=6229f059f1d1df664039fdd1 (olika ID beroende på vilket inlägg man trycker på)
    
    const urlParams = new URLSearchParams(queryString);  // metod som används för att arbeta med querystrings
    console.log(urlParams);
    console.log(urlParams.get('id'));
    
   
    fetchPun(urlParams); //Nu kickar du igång funktionen
    //updatePunEvent(urlParams);
}



async function fetchPun(urlParams) {
    try {
        const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`)  //ID för inlägget är: 6229f059f1d1df664039fdd1
        const post = await response.json();
        console.log(post);
        
                
        console.log(document.getElementById('content').innerText = post.content);
       console.log(document.getElementById('author').innerText = post.author);  //Funkar ej
        console.log(document.getElementById('title').innerText = post.title);  //Funkar ej
      
    } catch(error) {
        console.log(error)
    }
    


   function updatePunEvent(urlParams) {
    const form = document.getElementById(update-post);
    
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
}
