// function Constructors and es5 syntax

// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI constructor
function UI() { }

// UI book instance to table
UI.prototype.addBookToList = function (book) {
    // console.log(book);
    const list = document.getElementById('book-list');
    // create tr element
    const rowEl = document.createElement('tr');
    // insert cols in row
    rowEl.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(rowEl);
};

// showAlert
UI.prototype.showAlert = function (msg, className) {
    // create div element
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // remove alert after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);

}

// UI delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

// UI clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};





// event listeners add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // creating new instance of book
    const book = new Book(title, author, isbn);

    // console.log(book);

    // instantiate UI object
    const ui = new UI();

    // validate
    if (title === '' || author === '' || isbn === '') {
        // alert('failed')

        // error alert
        ui.showAlert(`Please fill in all fields`, 'error');
    } else {

        // add book to list
        ui.addBookToList(book);

        // show success alert
        ui.showAlert(`Success, ${book.title} added to Library`, 'success');

        // clear fields 
        ui.clearFields();
    }


    e.preventDefault();
});

// event listener delete book
document.getElementById('book-list').addEventListener('click', function (e) {
    // instantiate UI object
    const ui = new UI();

    // delte target el
    ui.deleteBook(e.target);

    // show removed alert
    ui.showAlert(`Book Removed!`, 'success');

    e.preventDefault();
});