// Get elements to be filled with data

let title = document.querySelector('#title');
let author = document.querySelector('#author');
let content = document.querySelector('#content');
let errorHandler = document.querySelector('.errorHandler');

// Get blog id and make it available globally
// So that we can use it easily

const queryString = window.location.search; //  ?id=6229f059f1d1df664039fdd1 (olika ID beroende på vilket inlägg man trycker på)
const urlParams = new URLSearchParams(queryString); // metod som används för att arbeta med querystrings
const blogId = urlParams.get('id');

// Fill the page with data from dB

window.onload = async function () {
	try {
		const response = await fetch(`http://localhost:5000/posts/${blogId}`); //ID för inlägget, t.ex.: 6229f059f1d1df664039fdd1
		const post = await response.json();
		

		title.value = post.title; //title refererar här till title när man loggar - inte 'let title'
		//	console.log(post.title); //Visar titeln (Man får ut samma värde, men har olika tillvägagångssätt: title.value = post.title)
		author.value = post.author;
		content.value = post.content;
		let checked = post.tags;

		let inputs = document.getElementsByName(['tag']);

		inputs.forEach((item) => {
			// Check if tags from dB match with the tags from the HTML
			// If true, checkbox will be checked
			if (checked.includes(item.value)) item.checked = true;
		});
	} catch (error) {
		// Shows errors in the page
		errorHandler.textContent = error;
	}
};

// Get the form
const form = document.getElementById('update-post');

// Update the blog
form.addEventListener('submit', async function (e) {
	e.preventDefault(); 

	// Get updated inputs value
	let updatedtitle = e.target['title'].value;
	let updatedauthor = e.target['author'].value;
	let updatedcontent = e.target['content'].value;

	// Gets all tags
	let formtags = e.target['tag'];
	let updatedcheck = [];

	if (formtags) {
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
