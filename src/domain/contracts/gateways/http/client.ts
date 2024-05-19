import { Register } from "@/domain/contracts/repos"

export namespace ClientHttp {
    export type CreateClientInput = {
        email: string
        cpf: string
        name: string
    }

    export type CreateClientOutput = Register.InsertClientOutput

    export type GetClientOutput = Register.FindClientOutput
}