window.onload = function () {
  managePuns();
};
// funktion som hämtar datan från databasen
async function managePuns() {
  try {
    //Gör anrop till databasen
    const response = await fetch("http://localhost:5000/posts");
    // Får tillgång till datan
    const posts = await response.json();
    // En tom variabel för att placera html i
    let html = "";
    //Loopar igenom objektet och får tillgång till varje enskilt inlägg
    for (let post of posts) {
      // Bestämmer html struktur
      html += `
      <tr>
				<td>${post.title}</td>
				<td>${post.author}</td>
        <td>${post.tags}</td>
				<td>${getDateForPosts.getDate(post)}
          <br>
           ${
             getDateForPosts.getHours(post) +
             " : " +
             getDateForPosts.getSeconds(post)
           }
        </td>
				<td>
          <a href="update-post.html?id=${post._id}"
           class="update">Update<span>&#8634</span>
         </a>
          <a href="#" data-id="${post._id}"
          class="delete-post">Delete<span>&#10006</span>
          </a>
        </td>
			</tr>
      `;
    }
    // Skriver ut datan via html på sidan
    document.getElementById("table-body").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
  //snappar upp alla delete länkar
  const deletePostLink = document.getElementsByClassName("delete-post");
  //Loopar igenom deletelänkarna och får tillgång till varje enskild länk
  for (let link of deletePostLink) {
    // lägger till en eventlistener på varje enskild länk
    link.addEventListener("click", async function (e) {
      // Gör så att sidan inte laddas om
      e.preventDefault();
      //sparar id:et på den länk man klickar på i en variabel
      const postId = e.target.dataset.id;
      try {
        //Gör anrop till databasen
        await fetch(`http://localhost:5000/posts/${postId}`, {
          method: "DELETE",
        });
        //tar bort hela inlägget
        e.target.parentNode.parentNode.remove();
      } catch (error) {
        console.log(error);
      }
    });
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
