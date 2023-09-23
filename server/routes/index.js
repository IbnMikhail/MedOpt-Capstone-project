import express from 'express';
import drugsEndpoints from './endpoints/drugs.js';
import usersEndpoints from './endpoints/users.js';

const app = express.Router();

drugsEndpoints(app);
usersEndpoints(app);

export default app;
