import { createRoot } from 'react-dom/client';
import { Main } from './Main';

import '@includes/Fontawesome';
import { StrictMode } from 'react';
import './index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Main />
    </StrictMode>
);