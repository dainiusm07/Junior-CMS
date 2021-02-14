
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Permission {
    Owner = "Owner",
    ReadUsers = "ReadUsers",
    ReadUser = "ReadUser",
    CreateUser = "CreateUser",
    UpdateUser = "UpdateUser"
}

export class NativeAuthInput {
    email: string;
    password: string;
}

export class CreateUserInput {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export class UpdateUserInput {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
}

export abstract class IMutation {
    abstract loginUser(input?: NativeAuthInput): User | Promise<User>;

    abstract createUser(input?: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: number, input?: UpdateUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: number): User | Promise<User>;
}

export class User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    updatedAt: Date;
    createdAt: Date;
    deletedAt?: Date;
}

export type Upload = any;
