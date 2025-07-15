import { RouteConfig } from '@models/routes.types';

type Props = {
    route: RouteConfig;
}

function AccessDeniedComponent({ route }: Props) {
    return (
        <div>AccessDeniedComponent</div>
    )
}

export default AccessDeniedComponent