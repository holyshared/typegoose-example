import { prop, Typegoose, Ref } from 'typegoose';
import { GroupType } from './group';

class UserType extends Typegoose {
  @prop({ required: true, index: true })
  name?: string;

  @prop({ ref: GroupType })
  group?: Ref<GroupType>
}

export const User = new UserType().getModelForClass(UserType, {
  schemaOptions: {
    collection: 'users'
  }
});
