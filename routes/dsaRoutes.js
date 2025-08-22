    const express = require('express');
    const router = express.Router();
    const dsaController = require('../controllers/dsaController');

    // Stack Routes
    router.get('/stack', dsaController.getStackPage);
    router.post('/stack', dsaController.addStackOperation);

    // Queue Routes
    router.get('/queue', dsaController.getQueuePage);
    router.post('/queue', dsaController.addQueueOperation);

    // Array Routes
    router.get('/array', dsaController.getArrayPage);
    router.post('/array', dsaController.addArrayOperation);

    // Linked List Routes
    router.get("/linkedlist", dsaController.getLLPage);
    router.post("/linkedlist", dsaController.addLLOperation);

    router.get("/tree", dsaController.getTreePage);
    router.post("/tree", dsaController.addTreeNode);
    
    module.exports = router;
