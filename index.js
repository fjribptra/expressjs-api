const express = require('express')
const connection = require('./connection')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded())
app.use(bodyParser.json())

app.get('/list', (req, res) => {
    const sql = "SELECT * FROM tasks"
    connection.query(sql, function (error, results, fields) {
        res.send(results)
    })
})

app.post('/list', (req, res) => {
    console.log(req.body)
    const newList = req.body.list
    const isDone = req.body.is_done
    if (newList === '') return res.send("data tidak boleh kosong")
    const sql = `INSERT INTO tasks (id, list, is_done) VALUES (NULL, '${newList}', '${isDone}')`
    connection.query(sql, function (error, results, fields) {
        if(error) return res.send(error)
        res.send("data berhasil ditambahkan")
    })
})

app.put('/list/:id', (req, res) => {
    console.log(req.body)
    const id = req.body.id
    const sql = `UPDATE tasks SET is_done = 'true' WHERE id = ${id}`
    connection.query(sql, (error, results, fields) => {
        if(error) return res.send(error)
        res.send("updated!")
    })
})

app.delete('/list/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id
    const sql = `DELETE FROM tasks WHERE id = ${id}`
    connection.query(sql, (error, results, fields) => {
        if(error) return res.send(error)
        res.send("deleted")
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})