import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/app.scss'
import AppContainer from './AppContainer.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store/index.ts'
import '~console/theme-detect'
import * as Sentry from "@sentry/react";
import { PersistGate } from 'redux-persist/integration/react'
import { setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact({
  mode: 'md'
});

Sentry.init({
    dsn: "https://51105c0295d3b9cba6d8ec3d6ce67ea3@o4509234784632832.ingest.us.sentry.io/4509234792628224",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true
});

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
