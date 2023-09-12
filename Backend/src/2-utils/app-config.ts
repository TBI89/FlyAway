// Base class - configuration on the app level:
class AppConfig {
    public readonly port = process.env.PORT;
    public readonly mySqlHost = process.env.HOST;
    public readonly mySqlUser = process.env.USER;
    public readonly mySqlPassword = process.env.PASSWORD;
    public readonly mySqlDatabase = process.env.DATABASE_NAME; 
    public readonly domainName = process.env.ORIGIN + this.port;
}

// Inherited class - configuration for the development environment:
class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

// Inherited class - configuration for the production environment:
class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}

// Determine the appropriate configuration based on the NODE_ENV:
const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
