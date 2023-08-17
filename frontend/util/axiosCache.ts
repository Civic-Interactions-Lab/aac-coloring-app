import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

//@ts-ignore
const axiosWithCaching = axios.defaults?.cache ? axios : setupCache(axios);

export default axiosWithCaching;
