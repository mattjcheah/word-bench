import { v4 as uuid } from "uuid";

const userId = uuid();

const getUserId = () => userId;

export default getUserId;
