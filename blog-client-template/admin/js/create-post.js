let theForm = document.querySelector('[name="myForm"]'); 
let errorHandler = document.querySelector('.errorHandler');

// Posting function

let postBlog = async (title, author, content, checked) => {
	try {
		let p = await fetch('http://localhost:5000/posts', {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
				author: author,
				content: content,
				tags: checked,
			}),
		});

		let res = await p.json();

		// If we get a response, redirect user to admin/index.html
		if (res) window.location.href = '../admin/';

	} catch (error) {
		errorHandler.textContent = error;
	}
};

// Handles blog submission

theForm.addEventListener('submit', (e) => {
	// Prevents reload
	e.preventDefault();

	// Get inputs value
	let title = e.target['title'].value;
	let author = e.target['author'].value;
	let content = e.target['content'].value;

	// Gets all tags
	let tags = e.target['tag'];
	let checked = [];

	// Select checked tags and put them in a new array  --> checked
	tags.forEach((element) => {
		if (element.checked) checked = [...checked, element.value];
	});

	// Checks if title, author and content are not empty
	if (!title || !author || !content)
		errorHandler.textContent = 'Title, author and content fields are required';
	else {
		// Post the new blog to dB
		postBlog(title, author, content, checked);
	}
});
