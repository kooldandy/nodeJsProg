import { findAll, insert, findById, update, deleteUser } from "./../entity/user";

const getAllUsers = (req: any, res: any) => {
    findAll()
        .then((appusers: any) => res.status(200).send(appusers))
        .catch((error: any) => res.status(400).send(error))
};

const getUserById = (req: any, res: any) => {
    const id = req.params.userId;
    findById(id)
        .then((appusers: any) => res.status(200).send(appusers))
        .catch((error: any) => res.status(400).send(error))
};

const createUser = (req: any, res: any) => {
    const body = req.body;
    insert(body.name, body.email)
        .then((result: any) => res.status(200).send(result))
        .catch((error: any) => res.status(400).send(error))
};

const updateUser = (req: any, res: any) => {
    const { params, body } = req;
    const id = params.userId;
    const name = body.name;

    update(id, name)
        .then((result: any) => res.status(200).send(result))
        .catch((error: any) => res.status(400).send(error))
};

const removeUserById = (req: any, res: any) => {
    const id = req.params.userId;

    deleteUser(id)
        .then((appusers: any) => res.status(200).send(appusers))
        .catch((error: any) => res.status(400).send(error))
};

export {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    removeUserById
}