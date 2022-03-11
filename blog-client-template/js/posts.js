window.onload = function () {
  showPosts();
};

async function showPosts() {
  try {
    const response = await fetch("http://localhost:5000/posts");
    console.log(response);
    const posts = await response.json();

    let html = "";
    for (let post of posts) {
      // console.log(post);
      console.log(post.tags);
      let emptyArray = [];
      emptyArray += post.tags;
      html += `
      <div class="testing-mathias">
      
      <h1>${post.title}</h1>
        <p>${post.content}</p>
        <p>${post.author}</p>
        <p>${post.tags}</p>
        <a href="post.html?id=${post._id}&title=${post.title}&content=${post.content}&author=${post.author}&tags=${emptyArray}">Read More >></a>
       </div>

      `;
    }
    document.getElementById("matias-index").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);
