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
    document.getElementById("specific-content").innerHTML = `
      <div class="specific-post">
        <h1>${urlParams.get("title")}</h1>
        <p>
          <em> ${urlParams.get("author")} </em> | 
            ${
              getDateForPosts.getDate() +
              " | " +
              getDateForPosts.getHours() +
              " : " +
              getDateForPosts.getSeconds()
            } 
          </em>
        </p>
        <p><strong>tags:</strong> ${urlParams.get("tags")}</p>
        <p>${urlParams.get("content")}</p>
        </div>
    `;
  } catch (error) {
    console.log(error);
  }
}

//Objekt för tidshantering
let getDateForPosts = {
  //Hantera Datum
  getDate: function () {
    return new Date(urlParams.get("date")).toLocaleDateString();
  },
  //Hantera timmar
  getHours: function () {
    return new Date(urlParams.get("date")).getHours();
  },
  //Hantera sekunder
  getSeconds: function () {
    // Ställer in datum för inläggen
    const date = new Date(urlParams.get("date"));
    //Sekunder
    let seconds = date.getSeconds();
    seconds = seconds <= 9 ? "0" + seconds : seconds;
    return seconds;
  },
};
