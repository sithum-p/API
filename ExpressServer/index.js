import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
const app=express();
dotenv.config();

const PORT=process.env.PORT || 8000;
const MONGO_URL=process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})

const productSchema=new mongoose.Schema({}, { strict: false });

const productModel=mongoose.model("products",productSchema);

app.get("/api/products",async(req,res)=>{
    try {
        const { limit, skip } = req.query;
        const limitNum = parseInt(limit) || 10;
        const skipNum = parseInt(skip) || 0;
        
        const productData = await productModel.find().skip(skipNum).limit(limitNum);
        const total = await productModel.countDocuments();
        
        console.log('Sample product:', JSON.stringify(productData[0], null, 2));
        
        const transformedData = productData.map(product => ({
            _id: product._id,
            Name: product.Name,
            Price: product.Price,
            Category: product.Category,
            Brand: product.Brand,
            Stock: product.Stock
        }));
        
        console.log('Transformed data:', JSON.stringify(transformedData[0], null, 2));
        
        res.json({ data: transformedData, total });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
})