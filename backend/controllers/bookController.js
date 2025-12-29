const Book = require('../models/bookModel')
exports.getAllBooks = async(req,res)=>{
    try {
         const books = await Book.find();
      res.status(200).json({
        status : 'success',
        books
      })
    } catch (error) {
        res.status(400).json({
        status : 'fail',
        error
      })
    }
}

exports.createBooks = async(req,res)=>{
    try {
        const {name,price} = req.body;
        const book = await Book.create({name,price});
        res.status(201).json({
        status : 'success',
        book
      })
    } catch (error) {
        res.status(400).json({
        status : 'fail',
        error
      })
    }
}

exports.getBookById = async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json({
        status : 'success',
        book
      })
    } catch (error) {
        res.status(400).json({
        status : 'fail',
        error
      })
    }
}