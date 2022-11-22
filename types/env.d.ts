declare namespace NodeJS {
    interface ProcessEnv {
        readonly VITE_DEV_SERVER_HOSTNAME: string
        readonly VITE_DEV_SERVER_PORT: string
        readonly VITE_DEV_SERVER_URL: string
    }
}
