// This is where the items for the list are stored when creating or editing a list
var listItemsArray = [];

// This checks to see if any lists exist/check to see if localStorage.number exists - that's used to count what number the current list is on
if(!localStorage.number){
		localStorage.number = 1;
	}
else {
	for (i=1; localStorage.number-1 >= i; i++){
		var title = localStorage['listTitle' + i];
		createSavedLists(title, i);
	}
}

// Checks if the enter key was pressed
function keyDown(event) {
	var key = event.charCode;
	if(key === 13) {
		addItems();
		document.getElementById("delete-button").style.display = "none";
	}
}

// This is used to add the item in the box to the list
function addItems(){
	var item = document.getElementById("input-lists").value;
	if(listItemsArray.includes(item)) {
		document.getElementById("error-message").style.display = "block";
	}
	else{
		listItemsArray.push(item);
		document.getElementById("input-lists").value = "";
		var listItem = document.createElement("p");
		var removeItem = document.createElement("img");
		var div = document.createElement("div");
		var element = document.getElementById("list-items-container");
		listItem.innerHTML = item;
		removeItem.src = "x.png";
		removeItem.style.width = "10px";
		removeItem.style.height = "10px";
		removeItem.style.cssFloat = "right";
		removeItem.onclick = function(){removeItemFromList(this.id)};
		element.appendChild(div);
		div.appendChild(listItem);
		div.appendChild(removeItem);
		listItem.classList.add("list-items");
		listItem.setAttribute("id", "item-text" + listItemsArray.length);
		removeItem.setAttribute("id", listItemsArray.length);
		div.setAttribute("id", "item" + listItemsArray.length);
		document.getElementById("error-message").style.display = "none";
	}
}

function removeItemFromList (number) {
	document.getElementById("item" + number).style.display = "none";
	document.getElementById("delete-button").style.display = "none";
	listItemsArray[number-1] = null;
}

// This displays the preview of the list
function loadPreview(hidden) {
	if (hidden === true) {
		document.getElementById("preview").style.display = "block";
		document.getElementById("preview-background").style.display = "block";
		document.getElementById("preview-header").innerHTML = document.getElementById("list-title").value;
		for(i = 0; listItemsArray.length > i; i++){
			var addItem = document.createElement("p");
			addItem.innerHTML = listItemsArray[i];
			document.getElementById("list-header-break").appendChild(addItem);
			addItem.classList.add("preview-list-items");
		}
		
	}
	else {
		document.getElementById("preview").style.display = "none";
		document.getElementById("preview-background").style.display = "none";
		var parentElement = document.getElementById("list-header-break")
		while (parentElement.firstChild) {
			parentElement.removeChild(parentElement.firstChild);
		}
	}
}

function saveList(){
	var title = document.getElementById("list-title").value;
	var element = document.getElementById("list-items-container");
	var numOfChild = document.getElementById("list-items-container").childElementCount;
	var itemsString;
	document.getElementById("input-lists").value = "";
	document.getElementById("list-title").value = "";
	numOfChild++;
	for (i=0; numOfChild-1 > i; i++) {
		var item = listItemsArray[i];
		if(item === null || item === "undefined"){}
		else {
			itemsString += item;
			itemsString += ";";
		}
	};
	listItemsArray = [];
	if(itemsString == null){
		localStorage['listTitle' + localStorage.number] = title;
	}
	else{
		var localStorageString = itemsString.slice(9);
		localStorage['listTitle' + localStorage.number] = title;
		localStorage['list' + localStorage.number] = localStorageString;
	}
	while (element.firstChild){
			element.removeChild(element.firstChild);
		}
	localStorage.number++;
	loadPreview(false);
	createSavedLists(title);
}

// This loads a list when a user clicks on a list

function loadList(id) {
	var number = document.getElementById("list-items-container").childElementCount;
	var element = document.getElementById("list-items-container");
	for (i=0; number > i; i++){
		element.removeChild(element.firstChild);
	}
	var itemsString = localStorage["list" + id];
	var title = localStorage["listTitle" + id];
	document.getElementById("list-title").value = title;
	var parentElement = document.getElementById("list-header-break")
		while (parentElement.firstChild) {
			parentElement.removeChild(parentElement.firstChild);
		}
	if(typeof itemsString !== "undefined"){
		var lastChar = itemsString.slice(0,-1);
		var string = lastChar.split(";");
		listItemsArray = string;
		for(i=0; listItemsArray.length > i; i++){
			var listItem = document.createElement("p");
			var removeItem = document.createElement("img");
			var div = document.createElement("div");
			var count = i;
			count++;
			listItem.innerHTML = listItemsArray[i];
			removeItem.src = "x.png";
			removeItem.style.width = "10px";
			removeItem.style.height = "10px";
			removeItem.onclick = function(){removeItemFromList(this.id)};
			element.appendChild(div);
			div.appendChild(listItem);
			div.appendChild(removeItem);
			listItem.classList.add("list-items");
			listItem.setAttribute("id", "item-text" + count);
			removeItem.setAttribute("id", count);
			div.setAttribute("id", "item" + count);
			document.getElementById("error-message").style.display = "none";
		}
	}
	document.getElementById("delete-button").style.display = "inline";
	document.getElementById("delete-button").onclick = function() {deleteList(id)};
}

// When the page is loaded this creates all of the saved lists

function createSavedLists(title, listId) {
	var list = document.createElement("p");
	var container = document.getElementById("saved-lists-container");
	var id = document.getElementById("saved-lists-container").childElementCount;
	list.innerHTML = title;
	list.classList.add("saved-lists");
	list.setAttribute("id", id+1);
	container.appendChild(list);
	list.onclick = function() {loadList(this.id)};
	if(listId){
		if(document.getElementById(listId).innerHTML === "undefined"){
			document.getElementById(listId).style.display = "none";
		}
	}
}

function deleteList(listId) {
	var element = document.getElementById("saved-lists-container");
	var element = document.getElementById("list-items-container");
	localStorage.removeItem('list' + listId);
	localStorage.removeItem('listTitle' + listId);
	document.getElementById(listId).style.display = "none";
	document.getElementById("list-title").value = "";
	while (element.firstChild){
		element.removeChild(element.firstChild);
	}
	listItemsArray = [];
	document.getElementById("delete-button").style.display = "none";
}

// This is used to hide the delete button when editing or changing the title of a list that was previously saved and then loaded
function hideButton() {
	document.getElementById("delete-button").style.display = "none";
}