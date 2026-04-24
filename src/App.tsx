import { Footer, Header, Index } from '@components/index';
import { FC } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export const App: FC = () => {
    return (
        <Router>
            <Header />
            <div className='animate__animated animate__fadeIn animate__slow'>
                <Routes>
                    <Route path='/' element={
                        <>
                            <div className='mx-auto'>
                                <div className='max-w-screen-xl mx-auto px-4 my-4'>
                                    <Index />
                                </div>
                            </div>
                        </>
                    } />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}