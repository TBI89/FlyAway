// class AppConfig {
//     public registerUrl = "http://localhost:4000/api/register/";
//     public loginUrl = "http://localhost:4000/api/login/";
//     public vacationsUrl = "http://localhost:4000/api/vacations/";
//     public followUrl = "http://localhost:4000/api/vacations/";
//     public unFollowUrl = "http://localhost:4000/api/vacations/";
// }

// const appConfig = new AppConfig();

// export default appConfig;

abstract class AppConfig {
    public readonly registerUrl = this.baseUrl + "/api/register/";
    public readonly loginUrl = this.baseUrl + "/api/login/";
    public readonly vacationsUrl = this.baseUrl + "/api/vacations/";
    public readonly followUrl = this.baseUrl + "/api/vacations/";
    public readonly unFollowUrl = this.baseUrl + "/api/vacations/";
    public constructor (private baseUrl: string) { }
}

class DevelopmentConfig extends AppConfig {
    public constructor() {
        super("http://localhost:4000"); // Development backend address.
    }
}

class ProductionConfig extends AppConfig {
    public constructor() {
        super(""); // Production backend address.
    }
}

const appConfig = new DevelopmentConfig();
// const appConfig = new ProductionConfig();

export default appConfig;