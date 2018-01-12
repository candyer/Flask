
let new_item_name;
let new_item_image = 'https://cdn3.iconfinder.com/data/icons/creative-easter-chicken/512/chicken-3-512.png';

function previewName() {
	let new_item = document.querySelector('.item');
	new_item_name = new_item.value.toLowerCase();
	console.log('new item name->', new_item_name)
}

function previewFile() {
	let example = document.querySelector('.example');
	let preview_img = document.querySelector('.preview_img');
	let preview_name = document.querySelector('.preview_name');
	preview_name.textContent = new_item_name;

	let file    = document.querySelector('input[type=file]').files[0];
	let reader  = new FileReader();

	reader.addEventListener('load', function () {
		preview_img.src = reader.result; // string
		new_item_image = preview_img.src;
		
	}, false);

	if (file) {// name, size, type...
		reader.readAsDataURL(file);
	}
}

function add_new_item_to_server(){
	let message = document.querySelector('.message');
	message.innerHTML = new_item_name + ' added to list!';
	console.log(new_item_name, new_item_image);
	post_new_item(new_item_name, new_item_image);
}


function post_new_item(new_item, new_image) {
	fetch('http://127.0.0.1:5000/add', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			item_name: new_item,
			item_image: new_image
		})});
}

function display_list(items){
	let list = document.querySelector('.list');
	Object.entries(items).forEach(([key, val]) =>{ //convert object to array
		let showcase = document.createElement('div');
		showcase.className='showcase';
		list.appendChild(showcase);
		let image = document.createElement('img');
		image.src = val;
		let name = document.createElement('p');
		name.textContent = key;
		showcase.appendChild(image);
		showcase.appendChild(name);	
	})
}

function get_inventory() {
	fetch('http://127.0.0.1:5000/list_items', {method: 'get'})
	.then(response => response.json())
	.then(e => display_list(e)) // display items
	.catch(e => console.log("error----->", e));
}

// setInterval(get_inventory, 1000);
get_inventory();


