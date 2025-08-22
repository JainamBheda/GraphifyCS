const express = require('express');
const router = express.Router();
const CNController = require('../controllers/cnController');

// ARP Simulation Page
router.get('/arp', CNController.getARPPage);
router.get('/routing', CNController.getRoutingPage);
router.get('/tcpip', CNController.getTCPIPPage);
module.exports = router;
