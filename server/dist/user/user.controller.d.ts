import { UserService } from './user.service';
import { UserForLoginDTO, UserForRegisterDTO } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    showAllUsers(user: any): Promise<import("./user.dto").UserForReturnDTO[]>;
    register(data: UserForRegisterDTO): Promise<import("@nestjs/common").HttpStatus>;
    login(data: UserForLoginDTO): Promise<import("./user.dto").UserForReturnDTO>;
}
