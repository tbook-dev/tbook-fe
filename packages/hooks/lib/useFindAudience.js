import useProjectAudience from "./useProjectAudience";

export default function useFindAudience(){
    const projectAudience = useProjectAudience();

    return value => projectAudience?.find(v => v.value === value)?.label

}