import { CreateUserAddressInput, CreateUserInput } from './create-user.input';
declare const UpdateUserInput_base: import("@nestjs/common").Type<Omit<Partial<CreateUserInput>, "password">>;
export declare class UpdateUserInput extends UpdateUserInput_base {
    id: string;
}
declare const UpdateUserAddressInput_base: import("@nestjs/common").Type<Partial<CreateUserAddressInput>>;
export declare class UpdateUserAddressInput extends UpdateUserAddressInput_base {
    id: string;
}
export {};
