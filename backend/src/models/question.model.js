import mongoose from 'mongoose';
const blockSchema = new mongoose.Schema({
  text: { type: String, required: true },
  showInOption: { type: Boolean, required: true },
  isAnswer: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  anagramType: { type: String, required: true }, 
  blocks: { type: [blockSchema], required: true },
  siblingId: { type: mongoose.Schema.Types.ObjectId, required: true },
  solution: { type: String, required: true }, 
  title: { type: String, required: true },
});

export const Question = mongoose.model('Question', questionSchema);