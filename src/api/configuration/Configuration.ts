export interface ConfigType {
    [key: string]: string | number | boolean | { [key: string]: string };
}

export const GetConfiguration = <T extends ConfigType>(key: keyof ConfigType): T | undefined => {
    const config = (window as unknown as { Config: ConfigType }).Config;
    return config ? (config[key] as T) : undefined;
};