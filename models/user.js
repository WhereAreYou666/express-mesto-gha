const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле является обязательным'],
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символа'],
    },
    about: {
      type: String,
      required: [true, 'Поле является обязательным'],
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символа'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле является обязательным'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
