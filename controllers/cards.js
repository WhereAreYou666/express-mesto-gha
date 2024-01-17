const Card = require('../models/card');

const { ERROR_INPUT, ERROR_FORBIDDEN, ERROR_SERVER} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_INPUT).send({ message: 'Данные введены некорректно' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(ERROR_FORBIDDEN).send({ message: 'Карточка с таким id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_INPUT).send({ message: 'Формат ID карточки не корректен' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(ERROR_FORBIDDEN).send({ message: 'Карточка с таким id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_INPUT).send({ message: 'Формат ID карточки не корректен' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(ERROR_FORBIDDEN).send({ message: 'Карточка с таким id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_INPUT).send({ message: 'Формат ID карточки не корректен' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
