import { useSelector } from "react-redux";
import useProjects from "./useProjects";


export default function(){
    const id =  useSelector((state) => state.user.currentProjectId)
    const projects = useProjects()
    const isExisted = !!projects.find(v => v.projectId === id) 

    if(!isExisted){
        // 如果不存在，就取最后创建的一个project
        return projects[0]?.projectId
    }
    return id
}