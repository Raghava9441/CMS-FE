import { RouteConfig } from "@models/routes.types";

type Props = {
    id?: string; // URL param
    routeData?: {
        getTeacherById?: any; // Teacher data from your API
    };
    route?: RouteConfig;
    canActivate?: boolean;
}

function TeacherProfile({
    id,
    routeData,
    route,
    canActivate }: Props) {
    const teacherData = routeData?.getTeacherById;

    if (!teacherData) {
        return <div>Loading teacher data...</div>;
    }
    return (
        <div>TeacherProfile</div>
    )
}

export default TeacherProfile