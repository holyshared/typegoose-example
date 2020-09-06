import { prop, Typegoose, Ref } from 'typegoose';
import { GroupType } from './group';

class RoleType extends Typegoose {
  @prop({ required: true })
  name: string;
}


class UserType extends Typegoose {
  @prop({ required: true, index: true })
  name: string;

  @prop({ ref: GroupType })
  group?: Ref<GroupType>

  @prop({ _id: false })
  role: RoleType;
}

export const User = new UserType().getModelForClass(UserType, {
  schemaOptions: {
    collection: 'users'
  }
});
