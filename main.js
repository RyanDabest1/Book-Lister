let popup = document.getElementById('popup');
let haveRead = document.getElementById('haveRead');
let submit = document.querySelector('.Submit_book');
let bookCard = document.getElementById('book')
let delete_book = document.querySelectorAll('.delete_book');

let array = [];

window.onload = sync;

function findParentBySelector(element, selector) {
    for ( ; element && element !== document; element = element.parentNode ) {
    if ( element.matches(selector) ) {
      return element;
    }
  }
  return null;
}

function openPopup(){
    popup.classList.add('open_popup');
}

function closePopup(){
    popup.classList.remove('open_popup');
}

function getInput(){
let title = document.getElementById('Title');
let author = document.getElementById('Author');
let pages = document.getElementById('Pages');
let haveRead = document.getElementById('haveRead');
let trueOfalse;

if(haveRead.checked == true){
    trueOfalse = true;
} else {
    trueOfalse = false;
}


let book = {
    name : title.value, 
    author : author.value, 
    pages : pages.value, 
    haveRead : trueOfalse
}

if(book.name == '' || book.author == '' || book.pages == ''){
    return alert("Invalid inputs!")
} else {
   array.push(book)
}

localStorage.setItem('library', JSON.stringify(array))
return addBook(book.name, book.author, book.pages, book.haveRead);
}

function addBook(name, author, pages, haveRead){
   let card = document.querySelector('.books');
   let book = document.createElement('div');
   book.classList.add('book');
   card.appendChild(book);
   let bookName = document.createElement('h3');
   bookName.innerHTML = "Title: " + name;
   book.appendChild(bookName)
   let bookAuthor = document.createElement('h3');
   bookAuthor.innerHTML = "Written by: " + author;
   book.appendChild(bookAuthor)
   let bookPages = document.createElement('h3');
   bookPages.innerHTML = "Pages: " + pages;
   book.appendChild(bookPages)
   let deleteButton = document.createElement('button');
   deleteButton.classList.add('delete-button')
   deleteButton.innerHTML = "Delete"
   book.append(deleteButton)
}

function sync(){
    if(localStorage.getItem('library') == null){
        console.log(false)
    } else {
        let library = JSON.parse(localStorage.getItem('library'));
        for(let i = 0; i < library.length; i++){
            array.push(library[i])
        }
      
        for(let i = 0; i < library.length; i++){
            let card = document.querySelector('.books');
            let book = document.createElement('div');
            book.classList.add('book');
            card.appendChild(book);
            let bookName = document.createElement('h3');
            bookName.innerHTML = "Title: " + library[i].name;
            book.appendChild(bookName)
            let bookAuthor = document.createElement('h3');
            bookAuthor.innerHTML = "Written by: " + library[i].author;
            book.appendChild(bookAuthor)
            let bookPages = document.createElement('h3');
            bookPages.innerHTML = "Pages: " + library[i].pages;
            book.appendChild(bookPages)
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button')
            deleteButton.innerHTML = "Delete"
            book.append(deleteButton)


            
        }
    }
}

submit.addEventListener('click', getInput);

