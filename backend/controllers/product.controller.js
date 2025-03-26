import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data: products});
    } catch (error) {
        console.log("error in fetching products: ", error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const createProduct = async (req, res) => {
    const products = req.body; //user will send this data

    if(!products.name || !products.price || !products.image){
        return res.status(400).send({message: "All fields are required"});
    }

    const newProduct = new Product(products)

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error in create product: ", error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new :true});
        res.status(200).json({success:true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product deleted"});
    } catch (error){
        console.log("Error in deleting product: ", error.message);
        res.status(404).json({success:false, message: "Product not found"});
    }
}