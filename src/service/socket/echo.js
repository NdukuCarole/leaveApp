import Echo from "laravel-echo";
import { socketBaseUrl } from "../../environment";

export default new Echo({
  broadcaster: "socket.io",
  host: socketBaseUrl,
  client: require("socket.io-client"),
});
