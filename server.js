import express from 'express';
import BankController from "./Controllers/BankController.js";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8888;

app.use(express.json());

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
    app.get('/', (request, response) =>
    {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.get('/banks', BankController.getAll);
app.post('/banks', BankController.createBank);
app.delete('/banks/:id', BankController.deleteBank);
app.put('/banks', BankController.updateBank);

const start = async () =>
{
    try
    {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        app.listen(PORT, () =>
        {
            console.log(`server is running on port ${PORT}`);
        });
    } catch (e)
    {
        console.log(e);
    }
};

start();