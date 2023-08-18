import { app, server } from "./setup.js";
// routes
import users from "./routes/users.js";
import messages from "./routes/messages.js";

const port = 8000;

app.use("/users", users);
app.use("/messages", messages);

server.listen(port);
