
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: number): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(input?: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: number, input?: UpdateUserInput): User | Promise<User>;
}

export class User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    updatedAt: Date;
    createdAt: Date;
    deletedAt?: Date;
}

export type Upload = any;
