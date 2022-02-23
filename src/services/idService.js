import { v4 as uuid } from "uuid";

export function idServiceGetNewId() {
  return uuid();
}
