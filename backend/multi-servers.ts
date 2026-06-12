import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/Utilisateur.route';
import CategorieRouter from './routes/Categorie.routes';
import projetRouter from './routes/Projet.route';
import contributionRouter from './routes/Contribution.route';
import CommentaireRouter from './routes/commentaire.routes';
import PaymentIntentsRouter from './routes/paymentIntent.route';
import contrepartieRouter from './routes/Contrepartie.route';
import aiRouter from './routes/AI.route';
import cookieParser from 'cookie-parser';

function createApp() {
	const app = express();
	app.use(express.json());

	app.use(
		cors({
			origin: process.env.FRONTEND_URL  || 'https://bloomfund-pxo4.vercel.app',
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		})
	);	
	app.use(cookieParser());
	app.use('/api/utilisateurs', userRoutes);
	app.use('/api/categories', CategorieRouter);
	app.use('/api/projets', projetRouter);
	app.use('/api/contributions', contributionRouter);
	app.use('/api/commentaires', CommentaireRouter);
	app.use('/api/payment-intents', PaymentIntentsRouter);
	app.use('/api/contreparties', contrepartieRouter);
	app.use('/api/ai', aiRouter);

	return app;
}
const ports = process.env.PORTS ? process.env.PORTS.split(',').map(Number) : [8080];

ports.forEach(port => {
	const app = createApp();

	app.get('/', (_req, res) => {
		return res.json({ message: 'Hello World!' });
	});
	app.listen(port, () => {
		console.log(`-|Local: http://localhost:${port}/|-`);
	});
});
