import { courseActions } from "@redux/actions/course.actions";
import { AppDispatch } from "@redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function CoursesPage() {
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        dispatch(courseActions.fetchCourses())
    }, [])

    return (
        <div>CoursesPage</div>
    )
}

export default CoursesPage