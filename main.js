let popup = document.getElementById('popup');
let haveRead = document.getElementById('haveRead');
let submit = document.querySelector('.Submit_book');
let bookCard = document.getElementById('book')
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
   bookName.classList.add('title')
   let bookAuthor = document.createElement('h3');
   bookAuthor.innerHTML = "Written by: " + author;
   book.appendChild(bookAuthor)
   bookAuthor.classList.add('author')
   let bookPages = document.createElement('h3');
   bookPages.innerHTML = "Pages: " + pages;
   book.appendChild(bookPages)
   bookPages.classList.add('pages')
   let deleteButton = document.createElement('button');
   deleteButton.classList.add('delete-button')
   deleteButton.innerHTML = "Delete"
   book.append(deleteButton)
   let bookHaveRead = document.createElement('h5');
   bookHaveRead.innerHTML = "Have read : " + haveRead
   book.append(bookHaveRead)
   bookHaveRead.classList.add('haveRead')
   let delete_book = document.querySelectorAll('.delete-button');
            delete_book.forEach(btn => {
                btn.addEventListener('click', deleteBook)
    });
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
            bookName.classList.add('title')
            let bookAuthor = document.createElement('h3');
            bookAuthor.innerHTML = "Written by: " + library[i].author;
            book.appendChild(bookAuthor)
            bookAuthor.classList.add('author')
            let bookPages = document.createElement('h3');
            bookPages.innerHTML = "Pages: " + library[i].pages;
            book.appendChild(bookPages)
            bookPages.classList.add('pages')
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button')
            deleteButton.innerHTML = "Delete"
            book.append(deleteButton)
            let BookhaveRead = document.createElement('p');
            BookhaveRead.innerHTML = "Have read : " + library[i].haveRead;
            book.append(BookhaveRead)
            BookhaveRead.classList.add('haveRead')
            let delete_book = document.querySelectorAll('.delete-button');
            delete_book.forEach(btn => {
                btn.addEventListener('click', deleteBook)
            });
        }
    }
}

submit.addEventListener('click', getInput);

function deleteBook(e){
    let card = e.target;
    let library = JSON.parse(localStorage.getItem('library'));
    const parent = card.parentElement;
    console.log(parent)
    let title = parent.children[0].innerHTML;
    let bookTitleArr = title.split(': ');
    let bookTitle = bookTitleArr[1];
    let author = parent.children[1].innerHTML;
    let bookAuthorArr = author.split(': ')
    let bookAuthor = bookAuthorArr[1];
    let pages = parent.children[2].innerHTML;
    let bookPagesArr = pages.split(': ');
    let bookPages = bookPagesArr[1];
    let haveRead = parent.children[4].innerHTML;
    let bookHaveReadArr = haveRead.split(': ');
    let bookHaveRead = bookHaveReadArr[1];
    console.log(bookTitle)
    console.log(bookAuthor)
    console.log(bookPages)
    console.log(bookHaveRead)
    for(let i = 0; i < library.length; i++){
        if(bookTitle == library[i].name){
            if(array.length == 1){
            array.pop();
            localStorage.setItem("library", JSON.stringify(array))
            } else if(i == 0){
                array.shift();
                localStorage.setItem("library", JSON.stringify(array))
            } else {
             array.splice(i,1)
             localStorage.setItem("library", JSON.stringify(array))
        }
        } 
    }
    parent.remove()

}

