import RolesModel from "./RolesModel";

class UsersModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RolesModel;

}

export default UsersModel;