const { Router } = require("express");
const fs = require('fs');
let jsonfile = require('jsonfile');
let user = require('../data/User/user.json')

const router = Router();

router.get ('/user', (req, res) => {
    res.status(200).type('text/plain')
    res.send(JSON.stringify(user, null, '\t'))
  })

  module.exports = router