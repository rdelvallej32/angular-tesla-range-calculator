'use strict';

const express = require('express');
const router = require('router');

router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
