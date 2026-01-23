import RouteRenderer from '@components/routing components/RouteRenderer'
import { BrowserRouter } from 'react-router-dom'


function NewAppRouter() {
    return (
        <div>
            <BrowserRouter>
                    <RouteRenderer />
            </BrowserRouter>
        </div >
    )
}

export default NewAppRouter