import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {

    const message = {
                user: { id: 1, name: 'Isabela Medeiros'},
                course: 'Kafka com Node.js',
                grade: 5,
    };

    //chamar microserviço
    await req.producer.send({
        topic: 'issue-certificate',
        compression: CompressionTypes.GZIP,
        
        messages: [
            {
               value: JSON.stringify(message)

            },
        ],   
    })

    return res.json({ ok: true });
});

export default routes;