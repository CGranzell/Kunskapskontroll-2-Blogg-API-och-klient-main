



// Get elements to be filled with data

let title = document.querySelector('#title');
let author = document.querySelector('#author');
let content = document.querySelector('#content');
let tags = document.querySelector('.tags');
let errorHandler = document.querySelector('.errorHandler');

// Get blog id and make it available globally
// So that we can use it easily

const queryString = window.location.search; //  ?id=6229f059f1d1df664039fdd1 (olika ID beroende på vilket inlägg man trycker på)
const urlParams = new URLSearchParams(queryString); // metod som används för att arbeta med querystrings
//  console.log(urlParams);
const blogId = urlParams.get('id');

// Fill the page with data fron dB

window.onload = async function () {
	try {
		const response = await fetch(`http://localhost:5000/posts/${blogId}`); //ID för inlägget är: 6229f059f1d1df664039fdd1
		const post = await response.json();
		console.log(post);

		title.value = post.title;
		author.value = post.author;
		content.value = post.content;

		let checked = post.tags;

		if (checked[0]) {
			checked.map((item) => {
				// Since the tags are changing, we create new elements and show them in the page
				let container = document.createElement('li');
				let inp = document.createElement('input');
				let lab = document.createElement('label');
				let brea = document.createElement('br');

				inp.type = 'checkbox';
				inp.value = item;
				inp.name = 'tag';
				inp.checked = true;
				lab.textContent = item;

				container.appendChild(inp);
				container.appendChild(lab);
				container.appendChild(brea);

				tags.appendChild(container);
			});
		}

		//     console.log(document.getElementById('content').innerText = post.content);
		//    console.log(document.getElementById('author').innerText = post.author);  //Funkar ej
		//     console.log(document.getElementById('title').innerText = post.title);  //Funkar ej
	} catch (error) {
		// Shows errors in the page
		errorHandler.textContent = error;
	}

	// fetchPun(urlParams); //Nu kickar du igång funktionen
	//updatePunEvent(urlParams);
};

// async function fetchPun(urlParams) {
//     try {
//         const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`)  //ID för inlägget är: 6229f059f1d1df664039fdd1
//         const post = await response.json();
//         console.log(post);

//         console.log(document.getElementById('content').innerText = post.content);
//        console.log(document.getElementById('author').innerText = post.author);  //Funkar ej
//         console.log(document.getElementById('title').innerText = post.title);  //Funkar ej

//     } catch(error) {
//         console.log(error)
//     }

//    function updatePunEvent() {

// }

// Get the form

const form = document.getElementById('update-post');

// Update the blog
form.addEventListener('submit', async function (e) {
	e.preventDefault();

	// const formData = new FormData(e.target) // e.target is the form, in this case
	// console.log(formData);
	// const JSONString = {
	//     content: formData.get('content')

	// };
	// console.log(JSON.stringify(JSONString));

	// Get updated inputs value
	let updatedtitle = e.target['title'].value;
	let updatedauthor = e.target['author'].value;
	let updatedcontent = e.target['content'].value;

	// Gets all tags
	let formtags = e.target['tag'];
	let updatedcheck = [];

    if(formtags){
        formtags.forEach((element) => {
            if (element.checked) updatedcheck = [...updatedcheck, element.value];
        });
    }

	try {
		const response = await fetch(`http://localhost:5000/posts/${blogId}`, {
			method: 'PATCH', // GET/POST/PATCH/DELETE
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: updatedtitle,
				author: updatedauthor,
				content: updatedcontent,
				tags: updatedcheck,
			}),
           
		});

		if (!response.ok) {
			throw new Error('Something went wrong with the API');
		}



		window.location.replace('index.html'); // redirects to index.html
	} catch (error) {
		errorHandler.textContent = error;
	}
});


