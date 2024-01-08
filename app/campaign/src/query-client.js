import { QueryClient } from "react-query";

const queryClient = new QueryClient({ retry: false });
export default queryClient;
