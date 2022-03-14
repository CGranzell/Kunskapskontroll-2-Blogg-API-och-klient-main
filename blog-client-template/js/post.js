window.onload = function () {
	showPost();
};
// Hämtar korrekt id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//Hämtar datan från respektive namn i objektet
console.log(urlParams);
console.log(urlParams.get('id'));
console.log(urlParams.get('title'));
console.log(urlParams.get('content'));
console.log(urlParams.get('author'));
console.log(urlParams.get('tags'));

// Funktion som hämtar datan från databasen
async function showPost() {
	try {
		//Gör anrop till databasen
		const response = await fetch(`http://localhost:5000/posts`);
		console.log(response);
		// Får tillgång till datan
		const posts = await response.json();
		console.log(posts);

<<<<<<< HEAD
		// Bestämmer html struktur
		// Skriver ut datan via html på sidan
		document.getElementById('mattias2').innerHTML = `
         <div class="specific-post">
        <h1>${urlParams.get('title')}</h1>
        <p>${urlParams.get('content')}</p>
        <p>${urlParams.get('author')}</p>
        <p>${urlParams.get('tags')}</p>
		<p>${urlParams.get('date')}</p>
    {/8}
=======
    // Bestämmer html struktur
    // Skriver ut datan via html på sidan
    document.getElementById("specific-content").innerHTML = `
         <div class="specific-post">
        <h1>${urlParams.get("title")}</h1>
        <p>${urlParams.get("content")}</p>
        <p>Author: ${urlParams.get("author")}</p>
        <p><em>Tags:</em> ${urlParams.get("tags")}</p>
>>>>>>> 55e481f31b32d5dcf2c21ec9748a429cca0b7bcd
        </div>
    `;
	} catch (error) {
		console.log(error);
	}
}
