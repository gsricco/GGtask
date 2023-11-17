const express = require("express");
const cors = require("cors");
const app = express();

const port = 9090;

app.use(cors());

app.post("/api/registration", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "You are registered",
    });

    return
});

app.get("/api/ping", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "Server is ready",
    });
});
app.get("/api/request", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: {
            title: "Это пример данных от сервера",
            field_first: "В данном тестовом используется SASS/SCSS, Flex, Grid, TypeScript",
            field_second: "Используются Redux/Redux Thunk/React Router v6/React Hooks",
            field_third: "Развернуто на Git/Vercel",
            field_fourth: "Верстка адаптивная",
            field_fifth: "После появления сети сообщения отправляются по очереди"
        },
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});