const { Router } = require('express');

const router = Router();

router.post('/login', (req, res) => {
  if (req.body.id === 'admin' && req.body.pw === '1111') {
    req.session.authUser = req.body.id
    return res.json({ id: 'admin' });
  }
  return res.json({ id: '' });
});

router.post('/logout', (req, res) => {
  delete req.session.authUser;
  res.json({ ok: true });
});

module.exports = router;
