window.onload = function () {
  showPosts();
};

async function showPosts() {
  try {
    const response = await fetch(`http://localhost:5000/posts`);
    console.log(response);
    const posts = await response.json();

    let html = "";
    for (let post of posts) {
      console.log(post);
      html += `
      <div class="testing-mathias">
      
      <h1>${post.title}</h1>
        <p>${post.content}</p>
        <p>${post.author}</p>
        <p>${post.tags}</p>
        <a href= "post.html?id=${post._id}">Read More >></a>
       </div>

      `;
    }
    document.getElementById("mattias2").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}
