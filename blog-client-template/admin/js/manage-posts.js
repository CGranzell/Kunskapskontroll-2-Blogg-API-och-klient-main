window.onload = function () {
  managePuns();
};

async function managePuns() {
  try {
    const response = await fetch("http://localhost:5000/posts");
    console.log(response);
    const posts = await response.json();
    console.log(posts);
    let html = "";
    for (let post of posts) {
      html += `
      <tr>
				<td>${post.title}</td>
				<td>${post.author}</td>
				<td>${new Date(post.date).toLocaleDateString()}
          <br>
          ${
            new Date(post.date).getHours() +
            ":" +
            new Date(post.date).getSeconds()
          }</td>
				<td>
          <a href="update-post.html?id=${post._id}">Update</a>
          <a href="#" class="delete-post" data-id="${post._id}">Delete</a>
        </td>
				
			</tr>
      
      `;
    }
    document.getElementById("table-body").innerHTML = html;
  } catch (error) {
    console.log(error);
  }

  const deletePostLink = document.getElementsByClassName("delete-post");
  console.log(deletePostLink);

  for (let link of deletePostLink) {
    console.log(link);
    link.addEventListener("click", async function (e) {
      e.preventDefault();
      const postId = e.target.dataset.id;
      try {
        await fetch(`http://localhost:5000/posts/${postId}`, {
          method: "DELETE",
        });
        e.target.parentNode.parentNode.remove();
      } catch (error) {
        console.log(error);
      }
    });
  }
}
