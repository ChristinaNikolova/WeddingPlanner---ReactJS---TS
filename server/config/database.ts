import mongoose from "mongoose";
import global from "../utils/constants/global";

const loadModels = async () => {
  await Promise.all([
    import("../models/Article"),
    import("../models/Category"),
    import("../models/Cost"),
    import("../models/Event"),
    import("../models/Guest"),
    import("../models/Note"),
    import("../models/Planner"),
    import("../models/Subtask"),
    import("../models/Task"),
    import("../models/TokenBlacklist"),
    import("../models/User"),
  ]);
};

const { messages, important, errors } = global;

export default async function connectDB(): Promise<void> {
  try {
    await loadModels();
    await mongoose.connect(important.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log(messages.DATABASE_CONNECTED);

    mongoose.connection.on("error", (err: Error) => {
      console.error(errors.DATABASE);
      console.error(err.message);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(errors.DATABASE_CONNECTION);
      console.error(err.message);
    } else {
      console.error(errors.DATABASE_CONNECTION);
      console.error(errors.DATABASE_UNKNOWN_ERROR);
    }
    process.exit(1);
  }
}
