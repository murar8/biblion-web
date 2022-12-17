import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getCurrentUser } from "./api";

export default createQueryKeyStore({
  users: {
    me: { queryKey: null, queryFn: getCurrentUser },
  },
});
