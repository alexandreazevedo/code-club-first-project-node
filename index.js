const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const users = []
const uuid = require('uuid')

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

// GET: mostra na barra de endereço
app.get('/users', (request, response) => {
    return response.json(users)
})

//POST: Adiciona no banco de dados
app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)
    
    return response.status(201).json(user)
})

//PUT / PATCH: altera e atualiza os dados do banco
app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})

//DELETE: deleta os dados do banco
app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

//Rodar o servidor
app.listen(3000, () => {
    console.log('🚀 Server started on pot 🚀 ' + port)
})

