window.onload = function () {
  showPost();
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

console.log(urlParams.get("id"));
console.log(urlParams.get("title"));
console.log(urlParams.get("content"));
console.log(urlParams.get("author"));

async function showPost() {
  try {
    const response = await fetch(`http://localhost:5000/posts`);
    console.log(response);
    const posts = await response.json();
    console.log(posts);

    document.getElementById("mattias2").innerHTML = `
         <div>
         
        <h1>${urlParams.get("title")}</h1>
        <p>${urlParams.get("content")}</p>
        <p>${urlParams.get("author")}</p>
        </div>
    `;
  } catch (error) {
    console.log(error);
  }
}
// console.log(window.location.search); // Retrieves the querystring
// // Retrieves the querystring
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// console.log(urlParams);
// console.log(urlParams.get("firstname"));
// console.log(urlParams.get("lastname"));
// console.log(urlParams.get("id"));

// document.getElementById("text").innerHTML = `
// Retrieving the Query string values:
//     <ul>
//         <li>firstname: ${urlParams.get("firstname")}</li>
//         <li>lastname: ${urlParams.get("lastname")}</li>
//         <li>id: ${urlParams.get("id")}</li>
//         <li>favoritcolor: ${urlParams.get("favoritcolor")}</li>
//     </ul>
// `;
