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
				<td>${post.date}</td>
				<td>
          <a href="#">Update</a>
          <a href="#">Delete</a>
        </td>
				
			</tr>
      
      `;
    }
    document.getElementById("table-body").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}
