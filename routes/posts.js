
const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

router.post('/post/save',(req,res)=>{
    let newPost = new Posts(req.body);

    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Posts saved successfully"
        });
    });

});
/*
//get posts
router.get('/posts',(req,res)=>{
     Posts.find().exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    })  
});*/

router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find().exec();
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


//updateposts
router.put('/post/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(req.params.id,{
        $set:req.body},
        (err,post)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    })
});  

/*
router.put('/post/update/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).json({
            success: true,
            existingPost: post
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: err.message
        });
    }
});
*/

/*
//deleteposts
router.delete('/post/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletepost)=>{
        if(err){
            return res.status(400).json({
                message:"Delete unsuccessful",err
            });
       
        }
        return res.status(200).json({
            message:"Delete successful",deletepost
        });
    });
});
*/
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findOneAndDelete({ _id: req.params.id }).exec();

        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Delete successful",
            deletedPost
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Delete unsuccessful",
            error: err.message
        });
    }
});


module.exports = router;


