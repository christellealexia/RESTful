const express = require ('express')
const controller = require('../controllers/controller');
const router = express.Router()

router.get ('/', controller.getItem)

router.get("/:id", controller.getItems)
   
router.post('/', controller.createItem)

router.put('/:id',controller.updateItem)

router.delete('/:id',controller.deleteItem)

module.exports = router;