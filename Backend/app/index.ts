import logger from "../logger";
import { app } from "./app";


const port = 3009
app.listen(port).on("listening", () => {
	logger.info(`server is listening on port http://localhost:${port}`);
});

module.exports = app;
