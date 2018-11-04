'use strict';

const expect      = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

const MONGODB_CONNECTION_STRING = process.env.DB;

module.exports = app => {
  app.route('/api/books')
    .get((req, res) => {
      // response will be array of book objects
      // json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.find().toArray((err, result) => {
          res.json(result)
        })
      })
    })
    
    .post((req, res) => {
      // response will contain new book object including atleast _id and title
    
      const title = req.body.title;
      const commentcount = 0;
    
      if (!req.body.title) res.send("missing title");
      else {
        MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
          const collection = db.collection("books");

          collection.insert({
            title: title,
            commentcount: commentcount,
            comments: []
          }, (err, result) => {
            res.json(result.ops[0]);
          })
        })
      }
    })
    
    .delete((req, res) => {
      // if successful response will be 'complete delete successful'
      
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.remove((err, result) => {
          res.send("complete delete successful");
        })
      })
    })

  app.route('/api/books/:id')
    .get((req, res) => {
      // json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}, empty comments array if not present
    
      const bookid = req.params.id;
    
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.find({_id: ObjectId(bookid)}).toArray( (err, result) => {
          if (!result[0]) res.send("no book exists");
          else if (!result[0].comments) res.json({
            _id: result[0]._id,
            title: result[0].title,
            comments: []
          });
          else res.json({
            _id: result[0]._id,
            title: result[0].title,
            comments: result[0].comments
          });
        })
      })
      
    })
    
    .post(function(req, res){
      // json res format same as .get
    
      const bookid = req.params.id;
      const comment = req.body.comment;
    
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.update({_id: ObjectId(bookid)}, {$push: {comments: comment}}, (err, result) => {

        })
        
        collection.find({_id: ObjectId(bookid)}).toArray( (err, result) => {
          if (!result[0]) res.send("no book exists");
          else res.json({
            _id: result[0]._id,
            title: result[0].title,
            comments: result[0].comments
          });
        })
      })
    })
    
    .delete(function(req, res){
      // if successful response will be 'delete successful'
    
      const bookid = req.params.id;
      
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.remove({_id: ObjectId(bookid)}, (err, result) => {
          res.send("delete successful");
        })
      })
    });
};