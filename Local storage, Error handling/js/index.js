function visitLink(path) {
	let counter = localStorage.getItem(path) ? localStorage.getItem(path) : 0;
	localStorage.setItem(path, ++counter);
}

function viewResults() {
	let existingUl = document.getElementById('visitList');
	if(existingUl){
		existingUl.remove();
	}
	let ul = document.createElement('ul');
	ul.id = 'visitList';
	let contentDiv = document.getElementById('content');

	for (let i = 0; i < localStorage.length; i++){
		let key = localStorage.key(i);
		let li = document.createElement('li');
		li.innerHTML = 'You visited ' + key + ' ' + localStorage.getItem(key) + ' time(s)';
		ul.append(li);	
	}
	contentDiv.append(ul);
	localStorage.clear();
}