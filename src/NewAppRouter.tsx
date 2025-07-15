import RouteRenderer from '@components/routing components/RouteRenderer'
import { SidebarProvider } from '@contexts/SidebarContext'
import { BrowserRouter } from 'react-router-dom'

type Props = {}

function NewAppRouter({ }: Props) {
    return (
        <div>
            <BrowserRouter>
                    <RouteRenderer />
            </BrowserRouter>
        </div >
    )
}

export default NewAppRouter