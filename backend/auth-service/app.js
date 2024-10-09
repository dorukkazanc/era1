const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const createDatabase = require('./configs/database')
const authRoutes = require('./routes/auth.routes')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Başlangıçta DB oluşturup Seed data ekliyorum.
createDatabase().then(db => {
    db.users.insert({
        email: 'admin@1.com',
        password: '1234'
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})