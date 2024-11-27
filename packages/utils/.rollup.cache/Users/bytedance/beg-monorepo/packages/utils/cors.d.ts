export declare const configCORS: (isEnvProduction: boolean) => {
    origin: RegExp[] | string[];
    methods: string;
    credentials: boolean;
    preflightContinue: boolean;
    optionsSuccessStatus: number;
    allowedHeaders: string;
};
