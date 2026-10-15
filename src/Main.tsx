import { ConfigType } from '@configuration/Configuration';
import { FC, useEffect } from 'react';
import { App } from './App';

export const Main: FC = () => {
    // La configuración en tiempo de ejecución se carga en segundo plano: la página no la espera.
    useEffect(() => {
        fetch('/config.json')
            .then((r) => r.json())
            .then((config: ConfigType) => {
                (window as unknown as { Config: ConfigType }).Config = config;
            })
            .catch(() => undefined);
    }, []);

    return <App />;
};
