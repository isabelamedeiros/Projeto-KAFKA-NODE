import express from 'express';
import { Kafka } from 'kafkajs';
import routes from '../routers';

const app = express();

/**
 * Faz conexão com o kafka
 */

const kafka = new Kafka({
    clientId: 'api',
    brokers: ['kafka: 9092']
});

const producer = kafka.producer()

/**
 * Disponibiliza o producer para todas as rotas
 */

app.use((req, res, next) => {
    req.producer = producer;

    return next();
})
/**
 * Cadastra as rotas da aplicação
 */
app.use(routes);

async function run(){
    app.listen(3333);
}

run().catch(console.error)

// const producer = kafka.producer();

