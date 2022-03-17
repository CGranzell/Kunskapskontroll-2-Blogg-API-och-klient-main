window.onload = function () {
  showPosts();
};
// funktion som hämtar datan från databasen
async function showPosts() {
  try {
    //Gör anrop till databasen
    const response = await fetch("http://localhost:5000/posts");
    console.log(response);
    // Får tillgång till datan
    const posts = await response.json();

    // En tom variabel för att placera html i
    let html = "";
    //Loopar igenom objektet och får tillgång till varje enskilt inlägg
    for (let post of posts) {
      // En tom array för att placera tags i
      let emptyArray = [];
      // Placerar tags i den tomma arrayen
      emptyArray += post.tags;
      // Bestämmer html struktur
      //Skickar även in data till post.html
      html += `
       <div class="testing-mattias">
         <h1>${post.title}</h1>
           <p>
             <em>${post.author}</em> |
               ${getDateForPosts.getDate(post) + " |"}
               ${
                 getDateForPosts.getHours(post) +
                 ":" +
                 getDateForPosts.getSeconds(post)
               }
           </p>
          <p><strong>tags:</strong>${post.tags}</p>
          <p>${post.content.substring(0, 100) + "..."}
            <a href="post.html?id=${post._id}
            &title=${post.title}
            &content=${post.content}
            &author=${post.author}
            &tags=${emptyArray}
            &date=${getDateForPosts.getDate(post)}
            ${
              getDateForPosts.getHours(post) +
              ":" +
              getDateForPosts.getSeconds(post)
            }" class="read-more-link">Read More <span>&#10142;</span></a>
          </p>
       </div>
      `;
    }
    // Skriver ut datan via html på sidan
    document.getElementById("mattias-index").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

//Objekt för tidshantering
let getDateForPosts = {
  //Hantera Datum
  getDate: function (post) {
    return new Date(post.date).toLocaleDateString();
  },
  //Hantera timmar
  getHours: function (post) {
    return new Date(post.date).getHours();
  },
  //Hantera sekunder
  getSeconds: function (post) {
    //   // Ställer in datum för inläggen
    const date = new Date(post.date);
    //   //Sekunder
    let seconds = date.getSeconds();
    seconds = seconds <= 9 ? "0" + seconds : seconds;
    return seconds;
  },
};
