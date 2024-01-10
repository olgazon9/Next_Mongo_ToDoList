const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);
