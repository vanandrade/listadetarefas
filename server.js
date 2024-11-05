const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        custo REAL NOT NULL,
        dataLimite TEXT NOT NULL,
        ordem INTEGER UNIQUE NOT NULL
    )`);
});

app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM Tarefas ORDER BY ordem', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.post('/tasks', (req, res) => {
    const { nome, custo, dataLimite } = req.body;
    db.get('SELECT COUNT(*) as count FROM Tarefas', (err, row) => {
        const ordem = row.count + 1;
        db.run('INSERT INTO Tarefas (nome, custo, dataLimite, ordem) VALUES (?, ?, ?, ?)', [nome, custo, dataLimite, ordem], (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send('Task added');
            }
        });
    });
});

app.delete('/tasks/:id', (req, res) => {
    db.run('DELETE FROM Tarefas WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Task deleted');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
