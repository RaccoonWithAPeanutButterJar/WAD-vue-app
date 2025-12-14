// Chris, siia tuleb panna andmebaasi query'd (selle let posts asemel)
let posts = [
  {
    postId: 1,
    postTime: "2025-10-01T08:30:00Z",
    authorName: "Alice",
    profileImage: "https://placekitten.com/100/100",
    postContent: "Just finished my first coding project today!"
  }
];

// Helper to create default post object
function createPost({ authorName, profileImage, postContent, postImage }) {
  return {
    postId: Date.now(), // unique id
    postTime: new Date().toISOString(),
    authorName: authorName || 'Anonymous',
    profileImage: profileImage || 'https://placekitten.com/100/100',
    postContent: postContent || ''
  };
}

// READ
exports.getAllPosts = (req, res) => {
  res.json(posts);
};

exports.getPost = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.postId === id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

// CREATE
exports.createPost = (req, res) => {
  const { authorName, profileImage, postContent} = req.body;
  const newPost = createPost({ authorName, profileImage, postContent });

  posts.push(newPost);
  res.status(201).json(newPost);
};

// UPDATE
exports.updatePost = (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex(p => p.postId === id);
  if (index === -1) return res.status(404).json({ error: 'Post not found' });

  const updated = {
    ...posts[index],
    ...req.body,
    postTime: new Date().toISOString() // update timestamp
  };
  posts[index] = updated;
  res.json(updated);
};

// DELETE
exports.deletePost = (req, res) => {
  const postId = Number(req.params.id);
  posts = posts.filter(p => p.id !== postId);

  res.json({ message: 'Post deleted' });
};

exports.deleteAllPosts = (req, res) => {
  posts = [];
  res.json({ message: 'Posts deleted' });
};
