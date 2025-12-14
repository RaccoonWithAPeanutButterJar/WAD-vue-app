const express = require('express');
const cors = require('cors')
const port = process.env.PORT || 3000;

const postsRoutes = require('./routes/posts');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/posts', postsRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});