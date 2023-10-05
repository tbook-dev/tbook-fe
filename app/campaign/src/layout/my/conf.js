import { useMemo } from "react";
import { useParams } from "react-router-dom";

export function useNavLink() {
  const { projectId } = useParams();
  return useMemo(() => {
    return [
      {
        text: "My Campaigns",
        link: `/app/${projectId}/campaign`,
      },
      {
        text: "My Assets",
        link: `/app/${projectId}/asset`,
      },
    ];
  });
}
