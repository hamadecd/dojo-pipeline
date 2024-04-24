import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();
const database = new DatabaseMemory();

server.post('/videos', (request, reply) => {
    const {title, description, duration} = request.body;
    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send();
});

server.get('/videos', (request, reply) => {
    const search = request.query.search;
    const videos = database.list(search);
    return reply.status(200).send(videos);
});

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const video = request.body;
    database.update(videoId, video);
    return reply.status(204).send();
});

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    database.delete(videoId);
    return reply.status(204).send();
});

server.listen({
    port: 3333,
    host: 'localhost'
});