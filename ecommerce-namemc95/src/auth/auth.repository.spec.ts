import { Test } from "@nestjs/testing"
import { UserRepository } from "../users/users.repository";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { AuthRepository } from "./auth.repository";
import { UserDto } from "../users/dtos/user.dto";


describe("AuthRepository", () => {

    let authRepository: Partial<AuthRepository>
    let mookUserRepository: Partial<UserRepository>

    const mookUser = new UserDto
    mookUser.password = "234567"
    mookUser.email = "user@email.com" 

    beforeEach(async () => {

        mookUserRepository = {
            validateEmail: () => Promise.resolve(undefined),
            createUser: (user:User): Promise<User> => Promise.resolve( user ),

        }
        
        authRepository = {
            signUp: (mookUser): Promise<Partial<User>> => Promise.resolve(mookUser)
           }

        const module = await Test.createTestingModule({
            providers: [AuthRepository,JwtService, {
                provide: UserRepository,
                useValue: mookUserRepository,
            }],
        }).compile();

       authRepository = module.get<AuthRepository>(AuthRepository);
    })
    
    it("create an instane of AuthRepository", async () => {
        expect(authRepository).toBeDefined()
    })

    it("encripted password", async () => {
        const user = await authRepository.signUp(mookUser)
        expect(user).toBeDefined();
        expect(user.password).not.toEqual(mookUser.password)
    })   

    it( "user already exist", async () => {
        const user = await authRepository.signUp(mookUser)
        expect(authRepository.signUp).
    })
})