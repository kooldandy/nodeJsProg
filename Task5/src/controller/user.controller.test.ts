import { Request, Response } from 'express';
import { UserController } from './user.controller';
import { UserService } from "./../service/user.service";
import { User } from './../model';
import { UserDataAccess } from './../dao';
import { IUser } from './../interface';


const mockRequest = () => {
    return {
        //req: {
        body: jest.fn().mockReturnValue({}),
        params: jest.fn().mockReturnValue({})
    }
    //};
};
const mockResponse = () => {
    return {
        //res: {
        send: jest.fn().mockReturnValue({}),
        status: jest.fn().mockReturnValue({}),
        json: jest.fn().mockReturnValue({}),
    }
    //};
};

describe("UserController", () => {



    beforeAll(() => {
        //const userService = new UserService();
        //jest.clearAllMocks();
        // jest.spyOn(userService , "getAllUsers").mockImplementation(() => {
        //     return Promise.resolve([{ user_id: 1 , username: 'testuser' }] as IUser[]);
        // });

        //UserService.mockImplementation


        jest.doMock("./../service/user.service", () => {
            return jest.fn().mockImplementation(() => {
                return {
                    getAllUsers: jest.fn()
                }
            })
        });
    });

    it("GET /api/users", async () => {

        const req: any = mockRequest();

        req.params.id = 1;

        const res: any = mockResponse();

        const userCtrl = new UserController();
        const result = await userCtrl.getAllUsers(req, res);
        console.log(result);
    });
})


