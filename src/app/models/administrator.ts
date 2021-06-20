import { SubUser } from "./sub-user";
import { User } from "./user";
import { UserDevice } from "./user-device";

export class Administrator {
    cin_admin: Number;
    subuser: SubUser;
    list_users:User[];
    list_user_dev:UserDevice[];
}
