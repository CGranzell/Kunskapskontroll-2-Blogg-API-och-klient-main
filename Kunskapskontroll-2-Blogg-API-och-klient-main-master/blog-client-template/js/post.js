window.onload = function () {
  showPost();
};
// Hämtar korrekt id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//Hämtar datan från respektive namn i objektet
console.log(urlParams);
console.log(urlParams.get("id"));
console.log(urlParams.get("title"));
console.log(urlParams.get("content"));
console.log(urlParams.get("author"));
console.log(urlParams.get("tags"));

// Funktion som hämtar datan från databasen
async function showPost() {
  try {
    //Gör anrop till databasen
    const response = await fetch(`http://localhost:5000/posts`);
    console.log(response);
    // Får tillgång till datan
    const posts = await response.json();
    console.log(posts);

    // Bestämmer html struktur
    // Skriver ut datan via html på sidan
    document.getElementById("mattias2").innerHTML = `
         <div class="specific-post">
        <h1>${urlParams.get("title")}</h1>
        <p>${urlParams.get("content")}</p>
        <p>${urlParams.get("author")}</p>
        <p>${urlParams.get("tags")}</p>
        </div>
    `;
  } catch (error) {
    console.log(error);
  }
}
