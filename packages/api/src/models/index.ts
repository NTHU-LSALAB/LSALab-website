import { connect } from "mongoose";

const { MONGO_URL, MONGO_USER, MONGO_PASS, MONGO_DB } = process.env;

export function init() {
  return connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority`
  );
}
