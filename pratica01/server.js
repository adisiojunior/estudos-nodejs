// Criação usando o nodejs nativo

// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//   response.write("Ola, mundo!")
//   return response.end()
// })

// server.listen(3333)

// Utilizando da biblioteca dastify
import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js'

const server = fastify();

const database = new DatabaseMemory()



server.post('/api/v1/videos', (request, reply) => {
  
  const { title, description, duration} = request.body;

  database.create({
    title,
    description,
    duration,
  })
  
  return  reply.status(201).send()
})

server.get('/api/v1/videos', () => {
  const videos = database.list()

  return videos
})

server.put('/api/vi/videos/:id', (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration} = request.body;

  database.update(videoId, {
    title, 
    description, 
    duration,
  })

  return reply.status(204).send()
})

server.delete('/api/vi/videos/:id', () => {
  return "Hello World!"
})

server.listen({
  port: 3333,
})