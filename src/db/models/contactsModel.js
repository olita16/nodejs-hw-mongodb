import mongoose, { Schema } from 'mongoose';

const contactsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photo: { type: String },
  },
  { timestamps: true, versionKey: false },
);

const Contact = mongoose.model('Contact', contactsSchema);

export default Contact;
