import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class UserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    // INSIDE MATCHES AN EXPRESION REGEX USED TO VALIDATE PASSWORDS 
    // ^ THIS SING AIN THE CHAING STARTPOINT HERE IS WHERE VALIDATIONS START
    // (?=[a-z]) USED TO VLIDATE IF ANY LOWERCASE IS INCLUDED IN PASSWORD
    // ?= IS THE LOOKHEADER AIN TO EXIXTENCY OF 
    //  [a-z] INSIDE THE CHAIN
    // (?=.*\d) iS A LOOKHEADER THAT VALIDATE THE EXISTENCI OF A NUMBER BETWEEN 0-9 INSIDE THE CHAING 
    // \d AIN TO ANY NUMBER BETWEEN 0-9
    // (?=.*[!@#$%^&*]) OTHER LOOKHEADER TO VALIDATE THE EXISTENCI OF ANY SPECIAL CHARACTER 
    // .{8,15}$ . INDICATE ANI CHARRACTER EXEPTING NEW LINE (8,15) STABLISHED THE MIN AND MAX LENGTH 
    // $ INDICATE THE END OF CHAING VERIFICATION
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, 
        // { A MESSAGE ALSO CAN BE INCLUDED HERE message: "message"}
    )
    password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @IsNotEmpty()
    @IsInt()
    phone: number

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string
    
    @MinLength(5)
    @MaxLength(20)
    @IsString()
    city: string
}