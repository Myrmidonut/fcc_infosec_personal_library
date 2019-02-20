# Personal Library

## Introduction
Users can add or remove books to a public list. Comments can be added to individual books.

Testing is done with Chai.

This project is part of freeCodeCamps Information Security and Quality Assurance certificate.

***

## Project Requirements
* Nothing from the website will be cached in the client as a security measure.
* The site shows that it is powered by PHP 4.2.0 even though it isn't as a security measure.
* It is possible to POST a title to /api/books to add a book and returned will be the object with the title and a unique \_id.
* It is possible to GET /api/books to retrieve an array of all books containing title, \_id, & commentcount.
* It is possible to GET /api/books/{\_id} to retrieve a single object of a book containing title, \_id and an array of comments (empty array if no comments present).
* It is possible to POST a comment to /api/books/{\_id} to add a comment to a book and returned will be the books object similar to GET /api/books/{\_id}.
* It is possible to DELETE /api/books/{\_id} to delete a book from the collection. Returned will be "delete successful" if successful.
* If a request to a book that doesn't exist is made a "no book exists" message gets returned.
* It is possible to send a DELETE request to /api/books to delete all books in the database. Returned will be "complete delete successful" if successful.
* All 6 functional tests required are complete and passing.

***

## Final Project
https://fcc-infosec-personal-library-fred.glitch.me

***

## Technologies
### Frontend
* HTML5
* CSS3
* JavaScript

### Backend
* Node
* Express
* Helmet
* Chai
* Mongodb

### Database
* MongoDB

## Hosting
* Glitch
* mLab

***

## Preview Images
### Main View:
![Main](readme_images/personal-library.png)
