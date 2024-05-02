require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const scrapeLMS = require('./lms');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Hello')
})

app.post('/scrape', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(404).json({ err: 'Username and password are required!' })
    }
    try {
        const lmsData = await scrapeLMS(username, password);
        return res.status(200).json(lmsData)
    } catch (error) {
        console.log(error)
        return res.status(404).json(error)
    }
});




const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is listening'))
