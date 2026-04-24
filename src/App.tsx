import { FC } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Index } from './components';

export const App: FC = () => {
    return (
        <Router>
            <div className='animate__animated animate__fadeIn animate__slow'>
                <Routes>
                    <Route path='/' element={
                        <Index />
                    } />
                </Routes>
            </div>
        </Router>
    )
}