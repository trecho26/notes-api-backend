const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let notes = [{
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only Javascript',
        date: '2019-05-30T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true
    }
];

app.get('/', (req, res) => {
    res.json({ message: "Hola mundo" });
});

app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find(note => note.id === id);
    if (note) {
        res.status(200).json(note);
    } else {
        res.status(404).json({ message: 'No hay notas', status: res.statusCode });
    }
});

app.post('/api/notes', (req, res) => {
    const note = req.body;

    if (!note || !note.content) {
        res.status(400).json({ message: 'note.content is missing' });
    }

    const newNote = {
        id: notes.length + 1,
        content: note.content,
        date: new Date().toISOString(),
        important: typeof note.important !== 'undefined' ? note.important : false,
    }
    notes = [...notes, newNote];
    res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).json(notes);
});

app.listen(port, () => {
    console.log(`Server app listening ${port}`);
});