import { getStorage } from "firebase/storage";
import firebaseApp from "./app";

const storage = getStorage(firebaseApp);
export default storage