import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Roles, RolesDocument, RolesSchema } from './schema/roles.schema';


@Injectable()
export class AuthService implements OnModuleInit {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
   private jwtSvc:JwtService,
   @InjectModel(Roles.name) private readonly rolesModel: Model<RolesDocument>){

  }
 async onModuleInit(){

  const rolesExist = await this.rolesModel.find()
  

  if(rolesExist.length > 0) return;

      const values =  await Promise.all([
      this.rolesModel.create({name: 'user'}),
      this.rolesModel.create({name: 'admin'})
  ])

  console.log(values)

 


  }


  async registerUser(user: CreateUserDto) {
    const {password, email, roles} = user;
    const newRole:string[] = []
    console.log(roles)
    const userRepeat = await this.userModel.findOne({email:email})

    if(userRepeat) throw  new HttpException('EMAIL_IS_ALREADY_TAKE', 403)

    const passwordHash = await hash(password, 10)

    if(roles.length > 0){
      const foundRoles = await this.rolesModel.find({name: {$in: roles}})     
      user.roles = foundRoles.map(roles => roles._id)
       
    }else {
      const role = await this.rolesModel.findOne({name:'user' })
      user.roles = [role._id]
    }

    

    user = {...user, password: passwordHash }

    // return {user}

    return  await this.userModel.create(user)
  }


 async loginUser(userData) {

  const {password, email} = userData;
    

  let isUser = await  this.userModel.findOne({email:email})

  if(!isUser) throw  new HttpException('EMAIL_NOT_FIND', 404)


  const checkPassword = await compare(password, isUser.password)

  if(!checkPassword) throw  new HttpException('PASSWORD_INCORRECT', 403)

  const role = await this.rolesModel.find({_id: {$in: isUser.roles}})

  const rol = role.map(rol => rol.name)


  const payload = {id:isUser._id, name:isUser.firstName, roles:rol }
  const token = this.jwtSvc.sign(payload)
  
  isUser.password = ' '

  const data = {
    user:isUser,
    token:token
  }

  return data

 
    

  }

  
}
