import app from "./src/app.js";
import config from "./src/config/config.js";
import connectToDB from "./src/config/database.js";

const server = app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}✅`);
})

connectToDB();

server.on("error", (err) => {
    if (err.status === "EADDRINUSE") {
        console.error(`❌ Port is already in use.`)
    } else if (err.status === "EACCES") {
        console.error(`❌ Permission denied to use port`)
    } else {
        console.error(`❌ Server connection error ${err.message}`)
    }
})