import { Schema, model, Model, Document } from 'mongoose';

// An interface that describes the properties that are requires to create a new User
// the properties that are used to create a user or create a record
interface UserTypeAttrs {
  name: string;
  description: string;
}


// the reason we created the above and below interface is because the properties that are required to create an user might be different than the properties that actually end up on an user

// An interface that describes the property that user document has
// describes all the properties that a saved document has

interface UserTypeDoc extends Document {
  name: string;
  description: string;
}

// An interface that describe the properties that a user type Model has
// describes all the properties that the overall model it has and model represents the overall collection (its like a table in mysql world)


interface UserTypeModel extends Model<UserTypeDoc> {
  build(attrs: UserTypeAttrs): UserTypeDoc;
}

const userTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

userTypeSchema.statics.build = (attrs: UserTypeAttrs) => {
  return new UserType(attrs);
}

const UserType = model<UserTypeDoc, UserTypeModel>('UserType', userTypeSchema);

export { UserType, UserTypeDoc };
