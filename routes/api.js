'use strict';

const expect      = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

const MONGODB_CONNECTION_STRING = process.env.DB;

module.exports = app => {
  app.route('/api/books')
    .get((req, res) => {
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.find().toArray((err, result) => {
          res.json(result);
        })
      })
    })
    
    .post((req, res) => {
      const title = req.body.title;
      
      if (!req.body.title) {
        res.send("missing title");
      } else {
        MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
          const collection = db.collection("books");
          
          collection.insert({
            title: title,
            comments: [],
            commentcount: 0
          }, (err, result) => {
            res.json(result.ops[0]);
          })
        })
      }
    })
    
    .delete((req, res) => {
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.remove((err, result) => {
          res.send("complete delete successful");
        })
      })
    })
    
  app.route('/api/books/:id')
    .get((req, res) => {
      const bookid = req.params.id;
      
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.find({_id: ObjectId(bookid)}).toArray( (err, result) => {
          if (!result[0]) {
            res.send("no book exists");
          } else {
            res.json({
              _id: result[0]._id,
              title: result[0].title,
              comments: result[0].comments
            });
          }
        })
      })
    })
    
    .post((req, res) => {
      const bookid = req.params.id;
      const comment = req.body.comment;
      
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.update({_id: ObjectId(bookid)}, {$push: {comments: comment}}, (err, result) => {})
        
        collection.find({_id: ObjectId(bookid)}).toArray( (err, result) => {
          if (!result[0]) {
            res.send("no book exists");
          } else {
            res.json({
              _id: result[0]._id,
              title: result[0].title,
              comments: result[0].comments
            });
          }
        })
      })
    })
    
    .delete((req, res) => {
      const bookid = req.params.id;
      
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        const collection = db.collection("books");
        
        collection.remove({_id: ObjectId(bookid)}, (err, result) => {
          res.send("delete successful");
        })
      })
    });
};