import express from 'express';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {
    //chamar microserviço
    console.log(req.producer);

    return res.json({ ok: true });
});

export default routes;