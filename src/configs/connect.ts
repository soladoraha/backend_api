import mongoose from "mongoose"
import config from "config"
import log from "@configs/logger"

function connect() {
  const dbUri = config.get("dbUri") as string

  return mongoose
    .connect(dbUri, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Database connected")
    })
    .catch((error) => {
      log.error("db error", error)
      process.exit(1)
    });
}

export default connect
