import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import send2faRouter from "./routes/send-2fa.js";
const app=express();
dotenv.config();

const PORT=process.env.PORT || 8000;
const MONGO_URL=process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth", send2faRouter);

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
        // Extract pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        // Create pagination result object
        const results = {};
        
        // Get total count for pagination info
        const totalDocuments = await productModel.countDocuments();
        
        // Add next page info if there are more documents
        if (endIndex < totalDocuments) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }
        
        // Add previous page info if not on first page
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }
        
        // Fetch paginated data from MongoDB
        const productData = await productModel
            .find()
            .limit(limit)
            .skip(startIndex)
            .exec();
        
        // Transform data to match frontend interface
        const transformedData = productData.map(product => ({
            _id: product._id,
            Name: product.Name || '',
            Price: product.Price || 0,
            Category: product.Category || '',
            Brand: product.Brand || '',
            Stock: product.Stock || 0
        }));
        
        // Send paginated response
        results.totalCount = totalDocuments;
        results.totalPages = Math.ceil(totalDocuments / limit);
        results.currentPage = page;
        results.data = transformedData;

        
        
        console.log(`MongoDB Pagination: Page ${page}/${results.totalPages}, ${transformedData.length} items`);
        
        res.json({
            success: true,
            count: transformedData.length,
            pagination: results,
            data: transformedData,
            total: totalDocuments
        });
        
    } catch (error) {
        console.error('MongoDB Pagination Error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server Error in pagination' 
        });
    }
})