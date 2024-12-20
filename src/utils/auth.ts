import {Organization} from "@models/organization.modal";
import {Parent} from "@models/parent.models";
import {Student} from "@models/student.models";
import {Teacher} from "@models/teacher.modals";
import {User} from "@models/user.modals";

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'ORGADMIN';


type PermissionCheck<Key extends keyof Permissions> =
    | boolean
    | ((user: User, data: Permissions[Key]["dataType"]) => boolean)

type RolesWithPermissions = {
    [R in Role]: Partial<{
        [Key in keyof Permissions]: Partial<{
            [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
        }>
    }>
}

type Permissions = {
    organizations: {
        dataType: Organization
        action: "view" | "create" | "update" | "delete"
    }
    teachers: {
        dataType: Teacher
        action: "view" | "create" | "update" | "delete"
    }
    students: {
        dataType: Student
        action: "view" | "create" | "update" | "delete"
    }
    parents: {
        dataType: Parent
        action: "view" | "create" | "update" | "delete"
    }
    departments: {
        dataType: 'departments'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
    classes: {
        dataType: 'classes'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
    courses: {
        dataType: 'courses'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
    events: {
        dataType: 'events'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
    assignments: {
        dataType: 'assignments'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
    exams: {
        dataType: 'exams'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
    attendances: {
        dataType: 'attendances'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
    notifications: {
        dataType: 'notifications'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
    settings: {
        dataType: 'settings'//remove this and add actual data type
        action: "view" | "create" | "update" | "delete"
    }
}

const ROLES = {
    ADMIN: {
        organizations: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        teachers: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        students: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        parents: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        departments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        classes: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        courses: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        events: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        assignments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        exams: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        attendances: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        notifications: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        settings: {
            view: true,
            create: true,
            update: true,
            delete: true
        }

    },
    TEACHER: {
        organizations: {
            view: (user: any, org: any) => user.organizationId === org._id,
            create: false,
            update: false,
            delete: false
        },
        teachers: {
            view: (user: any, teacher: any) => user.organizationId === teacher.organizationId,
            create: false,
            update: (user: any, teacher: any) => user.id === teacher.id,
            delete: false
        },
        students: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        parents: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        departments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        classes: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        courses: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        events: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        assignments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        exams: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        attendances: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        notifications: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        settings: {
            view: true,
            create: true,
            update: true,
            delete: true
        }
    },
    STUDENT: {
        organizations: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        teachers: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        students: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        parents: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        departments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        classes: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        courses: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        events: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        assignments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        exams: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        attendances: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        notifications: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        settings: {
            view: true,
            create: true,
            update: true,
            delete: true
        }

    },
    PARENT: {
        organizations: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        teachers: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        students: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        parents: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        departments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        classes: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        courses: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        events: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        assignments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        exams: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        attendances: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        notifications: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        settings: {
            view: true,
            create: true,
            update: true,
            delete: true
        }

    },
    ORGADMIN: {
        organizations: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        teachers: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        students: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        parents: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        departments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        classes: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        courses: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        events: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        assignments: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        exams: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        attendances: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        notifications: {
            view: true,
            create: true,
            update: true,
            delete: true
        },
        settings: {
            view: true,
            create: true,
            update: true,
            delete: true
        }

    },
} as const satisfies RolesWithPermissions


export function hasPermission<Resource extends keyof Permissions>(
    user: User,
    resource: Resource,
    action: Permissions[Resource]["action"],
    data?: Permissions[Resource]["dataType"]
): boolean {
    // console.log(user)
    // console.log(resource)
    const role = user.role as keyof RolesWithPermissions;
    // console.log(role)
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action];
    // console.log(permission)

    if (permission == null) return false;
    // console.log(data)
    if (typeof permission === "boolean") return permission;
    return data != null && permission(user, data);
}
