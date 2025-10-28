// import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/app.scss'
import AppContainer from './AppContainer.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store/index.ts'
import '~console/theme-detect'
// import * as Sentry from "@sentry/react";
import { PersistGate } from 'redux-persist/integration/react'

// Sentry.init({
//     dsn: "https://51105c0295d3b9cba6d8ec3d6ce67ea3@o4509234784632832.ingest.us.sentry.io/4509234792628224",
//     // Setting this option to true will send default PII data to Sentry.
//     // For example, automatic IP address collection on events
//     sendDefaultPii: true
// });

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <PersistGate loading={<div>Loading persisted state...</div>} persistor={persistor}>
            <AppContainer />
        </PersistGate>
    </Provider>
    // </StrictMode>
    ,
)
