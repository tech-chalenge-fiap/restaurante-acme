import { Validator,Validation } from '@/application/validation'
import * as validator from 'class-validator'

export const makeValidator = (): Validator.GenericType => {
    return new Validation(validator)
}