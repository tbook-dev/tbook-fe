import { useProposal } from "./api";
export default function Preview({ id }) {
  const { data } = useProposal(id);
  return data?.title;
}
