import { prop, staticMethod, Typegoose, Ref, ModelType } from 'typegoose';
import { GroupType } from './group';

export class RoleType extends Typegoose {
  @prop({ required: true })
  name: string;
}


export class UserType extends Typegoose {
  @prop({ required: true, index: true })
  name: string;

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

export const User = new UserType().getModelForClass(UserType, {
  schemaOptions: {
    collection: 'users'
  }
});
