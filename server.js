const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const API_KEY = process.env.API_KEY

app.post("/chat", async (req, res) => {

    try {

        const msg = req.body.message

        const response = await fetch("https://api.apifreellm.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: msg }
                ]
            })
        })

        const data = await response.json()

        console.log(data) // log pra debug

        if (!data.choices) {
            return res.json({ reply: "Erro na API." })
        }

        res.json({
            reply: data.choices[0].message.content
        })

    } catch (err) {

        console.error("Erro:", err)

        res.json({
            reply: "Erro ao falar com a IA."
        })
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server rodando")
})
