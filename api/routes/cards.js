const { Router } = require('express');
const CardModel = require('../models/card');

const router = Router();

router.get('/cards', (req, res, next) => {
  CardModel.find((err, cards) => {
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(cards);
  });
});

router.post('/addCard', (req, res, next) => {
  const card = new CardModel({
    title: req.body.title,
    list: []
  });
  card.save((err, card) => {
    if(err) return console.error(err);
    res.json(card);
  });
});

router.post('/removeCard', (req, res, next) => {
  const _id = req.body.cardId;
  CardModel.findOneAndRemove({ _id }, (err, cards)=> {
    if(err) return console.error(err);
    CardModel.find((err, cards) => {
      if(err) return console.error(err);
      res.json(cards);
    })
  })
});

router.post('/addJob', (req, res, next) => {
  const _id = req.body.cardId;
  const job = req.body.job;
  CardModel.findOneAndUpdate(
    { _id },
    { $push: { list: { job } } },
    { new: true },
    (err, card) => {
      if(err) return console.error(err);
      res.json(card);
    }
  );
});

router.post('/updateJob', (req, res, next) => {
  const { cardId, jobId, job } = req.body;
  CardModel.updateOne(
    { "_id": cardId, "list._id": jobId },
    { $set: { "list.$.job": job } },
    (err, card) => {
      if(err) return console.error(err);
      res.json(card);
    }
  );
});

router.post('/moveJob', (req, res, next) => {
  const { currentCardId, selectedJobId, direction } = req.body;
  CardModel.findOneAndUpdate(
    { _id: currentCardId },
    { $pull : { "list": { _id: selectedJobId } } },
    (err, card) => {
      if(err) return console.error(err);
      const [{ job }] = card.list.filter(x => x._id.toString() === selectedJobId);
      let dirFilterOption;
      if (direction === 'next') {
        dirFilterOption = { _id: { $gt: currentCardId } }
      } else {
        dirFilterOption = { _id: { $lt: currentCardId } }
      }
      CardModel.findOneAndUpdate(
        dirFilterOption,
        { $push: { list: { job } } },
        { new: true },
        (err, card) => {
          if(err) return console.error(err);
          CardModel.find((err, cards) => {
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(cards);
          });
        }
      );
    }
  );
});

module.exports = router;
