class AppConfig {
    public registerUrl = "http://localhost:4000/api/register/";
    public loginUrl = "http://localhost:4000/api/login/";
    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public followUrl = "http://localhost:4000/api/vacations/";
    public unFollowUrl = "http://localhost:4000/api/vacations/";
}

const appConfig = new AppConfig();

export default appConfig;
