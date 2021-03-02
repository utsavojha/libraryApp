// classes syntactic sugar for Protypal inheritance es6

// Book class
class Book {
    // function constructor
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class
class UI {
    // METHODS
    // display book in table element
    addBookToList(book) {
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
    }

    // alert message
    showAlert(msg, className) {
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

    // remove element from table element
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    // clear input fields on submit
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// storage class
class Store {
    // METHODS
    // get books from local storage
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    // display books in UI
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI();

            ui.addBookToList(book);
        });
    }

    // add book to localStorage
    static addBook(book) {
        // books list is equal to books in local storage
        const books = Store.getBooks();

        // push book instance to localStorage bookslist
        books.push(book);

        // set localStorage with new book
        localStorage.setItem('books', JSON.stringify(books));
    }

    // remove book from localStorage
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// event listener on-page load display books in localStorage
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// EVENT LISTENERS
// add book event listener
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

        // add book to locaStorage
        Store.addBook(book);

        // show success alert
        ui.showAlert(`Success, ${book.title} added to Library`, 'success');

        // clear fields 
        ui.clearFields();
    }


    e.preventDefault();
});

// delete book event listener
document.getElementById('book-list').addEventListener('click', function (e) {
    // instantiate UI object
    const ui = new UI();

    // delte target el
    ui.deleteBook(e.target);

    // delete from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent); //isbn number

    // show removed alert
    ui.showAlert(`Book Removed!`, 'success');

    e.preventDefault();
});