// This will be our application entry. We'll setup our server here.
/* eslint-disable no-console */
import { userRoutes, todoRoutes } from '../server/routes';
import app from './../app';

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

const PORT = parseInt(process.env.PORT, 10) || 3000;
const msg = `Magic happening at port ${PORT}`;

app.listen(PORT, console.log(msg));

