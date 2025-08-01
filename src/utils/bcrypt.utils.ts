import bcrypt from "bcryptjs";

export const hash = async(password:string) =>{

        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password,salt)

}

export const compare = async(password:string,hashedPassword:string) =>{

    return await bcrypt.compare(password,hashedPassword)

}