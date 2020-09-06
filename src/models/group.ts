import { prop, Typegoose } from 'typegoose';

export class GroupType extends Typegoose {
  @prop({ required: true, index: true })
  name?: string;
}

export const Group = new GroupType().getModelForClass(GroupType, {
  schemaOptions: {
    collection: 'groups'
  }
});
