import { FC } from 'react';

import '../includes.scss';

export const Loader: FC = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <span className='loader'></span>
        </div>
    )
}