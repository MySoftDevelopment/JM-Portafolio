import { FC } from 'react';

import { GetConfiguration } from '@configuration/Configuration';
import '../includes.scss';

export const Footer: FC = () => {
    const socials = GetConfiguration<{ [key: string]: string }>('socials.url');
    console.log(socials);

    return (
        <></>
    )
}