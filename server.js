
const express = require('express');
const cors = require('cors');
const db = require('./database'); // Import the database connection pool
const port = 3000;

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies


app.use(cors({
    origin: 'http://localhost:5173' // allow your React app
}));

// GET all notes
app.get('/notes', (req, res) => {

    // Printing out all the note
    db.query('SELECT * FROM note', (err, results) => {

        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        res.json(results);
    });
        
});

// POST - create a new note
app.post('/notes', (req, res) => {
    let { title, content } = req.body;

    if (!title) {
        title = "Note without title";
    }

    if (!content) {
        content = "";
    }

    db.query('INSERT INTO note (title, note) VALUES (?,?)', [title, content], (err, results) => {
        if (err) {
            console.error('Error inserting query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(201).json({ id: results.insertId, title, content })

    })  
})

// PUT - update an existing note
app.put('/notes/:id', (req, res) => {
    let { title, content } = req.body;

    if (!title) {
        title = "Note without title";
    }

    if (!content) {
        content = "";
    }

    db.query('UPDATE note SET title = ?, note = ? WHERE id = ?', [title, content, req.params.id], (err, results) => {
        if (err) {
            console.error('Error updating query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ message: `Note ${req.params.id} updated` })

    })  
})


// DELETE - update an existing note
app.delete('/notes/:id', (req, res) => {
    db.query('DELETE FROM note WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            console.error('Error deleting query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ message: `Note ${req.params.id} deleted` })

    })  
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});