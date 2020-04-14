const Post = require('../models/post-model')

const createPost = async ( name, content, group, callback) => {
    try {
      console.log(content);
      const post = new Post({
        userName: name,
        postContent: content,
        group: group,
      });
      post
        .save()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
      callback(post);
    } catch (e) {
      console.log(e);
    }
  };


getPostById = async (req, res) => {
    await Post.findOne({ _id: req.params.id }, (err, Post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!Post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }
        return res.status(200).json({ success: true, data: Post })
    }).catch(err => console.log(err))
}

getPosts = async (req, res) => {
    await Post.find({}, (err, Posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Posts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }
        return res.status(200).json({ success: true, data: Posts })
    }).catch(err => console.log(err))
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
}