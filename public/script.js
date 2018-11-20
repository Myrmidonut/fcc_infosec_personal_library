const booksList = document.getElementById("booksList");
const commentsList = document.getElementById("commentsList");
const bookTitle = document.getElementById("bookTitle");
const bookInterface = document.getElementById("bookInterface");
const newBookForm = document.getElementById("newBookForm");
const deleteAllBooksButton = document.getElementById("deleteAllBooks");

let dataPosition;

getBooks();

newBookForm.addEventListener("submit", e => {
  e.preventDefault();
  
  const url = "/api/books";
  
  fetch(url, {
    method: "post",
    body: new URLSearchParams(new FormData(newBookForm))
  })
  .then(response => response.json)
  .then(data => {
    getBooks();
    newBookForm.reset();
  })
  .catch(error => {
    console.log(error)
  })
})

deleteAllBooksButton.addEventListener("click", e => {
  e.preventDefault();
  
  const url = "/api/books";
  
  fetch(url, {
    method: "delete"
  })
  .then(response => response.text())
  .then(data => {
    getBooks();
    clearBookDetails();
  })
  .catch(error => {
    console.log(error)
  })
})

function showBooksList(data) {
  booksList.innerHTML = "";
  
  let books = '<ul>';
  
  data.forEach((e, i) => {
    books += `<li class="bookItem" id="${e._id} ${i}">${e.title} - ${e.comments.length} comments</li>`
  })
  books += "</ul>";
  booksList.innerHTML = books;
}

function clearBookDetails() {
  bookTitle.innerHTML = "Title:";
  commentsList.innerHTML = "";
  bookInterface.innerHTML = "";
}

function deleteBook(data, dataPosition) {
  const url = `/api/books/${data[dataPosition]._id}`;
        
  fetch(url, {
    method: "delete"
  })
  .then(response => response.text())
  .then(data => {
    getBooks();
    clearBookDetails();
  })
  .catch(error => {
    console.log(error)
  })
}

function showBookInterface(data, dataPosition) {
  bookInterface.innerHTML += 
    `<form id="addCommentForm">
      <input type="text" name="comment" placeholder="Comment" required="">
      <input type="submit" value="Add comment">
    </form>
    <button id="deleteBook">Delete Book</button>`
  
  const addCommentForm = document.getElementById("addCommentForm");
  
  addCommentForm.addEventListener("submit", e => {
    e.preventDefault();

    fetch(`/api/books/${data[dataPosition]._id}`, {
      method: 'post',
      body: new URLSearchParams(new FormData(addCommentForm))
    })
    .then(response => response.json())
    .then((data) => {
      commentsList.innerHTML += `<li>${data.comments[data.comments.length - 1]}</li>`
      addCommentForm.reset();
      getBooks();
    })
    .catch(error => {
      console.log(error)
    })
  })
  
  const deleteBookButton = document.getElementById("deleteBook")
  
  deleteBookButton.addEventListener("click", () => deleteBook(data, dataPosition))
}

function showBookDetails(bookItem, data) {
  bookItem.forEach(e => {
    e.addEventListener("click", () => {
      clearBookDetails();
      
      dataPosition = e.id.split(" ")[1]
      
      bookTitle.innerHTML = `Title: ${data[dataPosition].title}`
      data[dataPosition].comments.forEach((e, i) => {
        commentsList.innerHTML += `<li>${e}</li>`
      })
      
      showBookInterface(data, dataPosition)
    })
  })
}

function getBooks() {
  fetch("/api/books")
  .then(response => response.json())
  .then(data => {
    showBooksList(data)

    const bookItem = document.querySelectorAll(".bookItem");

    showBookDetails(bookItem, data)
  })
  .catch(error => {
    console.log(error)
  })
}