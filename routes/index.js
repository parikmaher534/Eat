var express = require('express'),
    router = express.Router();

/* Тут подрубаем все контроллеры которые нужны */
/**
  TODO: сделать автоматическое подключения контроллеров...
 */
var pathToController     = '../controllers/',
    pageController       = require(pathToController + 'PageController.js'),
    categoriesController = require(pathToController + 'CategoriesController.js');


/* Связываем урлы с ручками */
router.get('/', pageController.init);
router.get('/.categories', categoriesController.init);


module.exports = router;
