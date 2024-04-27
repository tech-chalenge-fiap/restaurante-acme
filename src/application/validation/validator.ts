export interface Validator {
    validate<T = any>(value: T): Promise<Validator.GenericType>
}

export namespace Validator {
    export type GenericType <T = any> = T
}


export class Validation {
    constructor(private readonly validator: Validator.GenericType) {}
    async validate(value: Validator.GenericType): Promise<Validator.GenericType> {
        return await this.validator.validate(value, { validationError: { target: false } });
    }
}