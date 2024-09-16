const axios = require("axios")
const express = require("express")
const app = express()
const cors = require("cors")

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = 3300 || process.env.PORT

const fetchData = async () => {
    try {
        const response = await axios.get("https://api.wazirx.com/api/v2/tickers")
        const tickers = response.data

        const top10 = Object.keys(tickers).splice(0, 10).map((key) => tickers[key])

        await prisma.crypto.deleteMany()

        for (const ticker of top10) {
            await prisma.crypto.create({
                data: {
                    name: ticker.name,
                    last: parseFloat(ticker.last),
                    buy: parseFloat(ticker.buy),
                    sell: parseFloat(ticker.sell),
                    volume: parseFloat(ticker.volume),
                    base_unit: ticker.base_unit
                }
            })
        }

        console.log("Data Stored Successfully!")
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

}

fetchData()


app.get("/api/cryptos", async (req, res) => {
    try {
        const cryptos = await prisma.crypto.findMany()
        res.json(cryptos)
    } catch (error) {
        res.status(500).send('Error retrieving data from the database');
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})