import axios from "axios";

//@ts-ignore
const axiosWithCaching = axios.defaults?.cache ? axios : setupCache(axios);

export default axiosWithCaching;
