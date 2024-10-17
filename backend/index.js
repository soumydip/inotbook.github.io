const connectToURI = require('./db');
const express = require('express')
const app = express()
const port = 4000
connectToURI();
const cors = require('cors');
app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//avalabile routes
app.use('/api/auth',require('./routes/auth'))
const notesRouter = require('./routes/notes');  // Make sure to import your notes router
app.use('/api/notes', notesRouter);  // Mount the notes router at '/api/notes'
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


