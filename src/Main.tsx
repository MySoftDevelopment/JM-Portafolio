import { ConfigType } from '@configuration/Configuration';
import { Loader } from '@includes/views/Loader';
import { FC, useEffect, useState } from 'react';
import { App } from './App';

import 'animate.css';

export const Main: FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    const loadConfig = async () => {
        try {
            const response = await fetch('/config.json');
            const configData: ConfigType = await response.json();
            (window as unknown as { Config: ConfigType }).Config = configData;
        } catch {
            // ignore.
        }
    };

    useEffect(() => {
        let isMounted = true;

        const initializeApp = async () => {
            try {
                await loadConfig();

                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate a delay for loading

                if (document.readyState === 'complete') {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                } else {
                    window.addEventListener('load', () => {
                        setTimeout(() => {
                            if (isMounted) {
                                setIsLoading(false);
                            }
                        }, 300);
                    });
                }

                setTimeout(() => {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                }, 5000);
            } catch {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        initializeApp();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return <App />;
};
