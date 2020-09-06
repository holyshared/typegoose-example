import { prop, staticMethod, Typegoose, Ref, ModelType, InstanceType } from 'typegoose';
import { GroupType } from './group';
import { Types } from 'mongoose';

export class RoleType extends Typegoose {
  @prop({ required: true })
  name: string;
}


export class UserType extends Typegoose {
  @prop({ required: true, index: true })
  name: string;

  @prop({ required: true, select: false })
  password: string;

  @prop({ ref: GroupType })
  group?: Ref<GroupType>

  @prop({ _id: false })
  role: RoleType;

  @staticMethod
  static findByName(this: ModelType<UserType> & typeof UserType, prefix: string) {
    const regexp = new RegExp(`^${prefix}`);
    return this.findOne({ name: { $regex: regexp } });
  }
}

const transform = (_doc: any, ret: InstanceType<UserType>) => {
  delete ret._id;
  delete ret.password;
  return ret;
};

export const User = new UserType().getModelForClass(UserType, {
  schemaOptions: {
    collection: 'users',
    toJSON: {
      getters: true,
      versionKey: false,
      transform,
    }
  }
});
