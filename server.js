const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Jon',
            email: 'jon@email.com',
            password: 'a',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Lone',
            email: 'lone@email.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('Success');
    } else {
        res.status(400).json('Error logging in');
    }
    res.json("sign in");
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0, 
        joined: new Date()
    });

    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true; 
            return res.json(user);
        } 
    });
    if (!found) {
        res.status(400).json('Invalid user id');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true; 
            user.entires++;
            return res.json(user.entries);
        } 
    });
    if (!found) {
        res.status(400).json('No such user');
    }
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});
