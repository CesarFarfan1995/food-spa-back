import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Roles } from 'src/auth/schema/roles.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey:false })
export class User {


@Prop({unique:true})
email: string;

@Prop()
password: string;

    
@Prop()
firstName: string;

@Prop()
lastName: string;

@Prop()
address: string;


@Prop()
phoneNumber: number;

@Prop([{type: SchemaTypes.ObjectId, ref: Roles.name}])
roles:Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(User);