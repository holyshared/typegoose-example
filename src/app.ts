import * as mongoose from 'mongoose';
import { User, Group } from './models';

mongoose.connect("mongodb://example:example@localhost:27017/example", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const main = async () => {
  const user = await User.create({ name: 'User Name', role: { name: "adminstrator" }, password: 'somthing' });
  const group = await Group.create({ name: 'Group Name' });
  user.group = group;
  await user.save();

  const eagerLoadedUser = await User.findById(user.id).populate('group');
  console.log((eagerLoadedUser.group as typeof Group).name);

  console.log(eagerLoadedUser.name);
  console.log(eagerLoadedUser.password);
  console.log(eagerLoadedUser.toJSON());

  const startWithUser = await User.findByName('User ');
  console.log(startWithUser.name);
};

main().then(() => {
  console.log('ok');
}).catch(err => {
  console.log(err);
});