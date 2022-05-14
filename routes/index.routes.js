const router = require('express').Router();

router.get('/', (req, res, next) => {
  console.log('APPEL BACKEND OK !');
  res.json('Citron en limonade : All good in here !');
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
