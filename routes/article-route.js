const router = require('express').Router();
// const searchMiddleware = require('../http/middlewares/search-middleware');
const articlesValidator = require('../http/middlewares/article-validator');
const articlesController = require('../http/controllers/article-controller');
const articleStatusConverter = require('../http/middlewares/article-status-converter');
const moderatorRequireMiddleware = require('../http/middlewares/moderator-require-middleware');
const canCreatingArticle = require('../http/middlewares/can-creating-article-middleware');
const commentController = require('../http/controllers/comment-controller');
const commentValidator = require('../http/middlewares/comment-middleware');

router.get('/', articlesController.getAllArticlesWithMember);

router.get('/detail/:articleId', articlesController.articleDetail);

router.get('/create', canCreatingArticle, (req, res) => {
    return res.render('article-creator.ejs',{errors: ""});
});

router.post('/create', articlesValidator.newArticleConverter, articlesController.articleCreating);

router.get('/edit/:articleId', articlesController.getArticle);

router.post('/edit/:articleId', articlesValidator.articleConverterWithEditing, articlesController.articleEditing);

router.get('/delete/:articleId', articlesController.articleDeleting);

//Accept, Reject Or Delete a Article
router.get('/list', moderatorRequireMiddleware, articlesController.getAllArticlesWithModerator);

router.get('/accept/:articleId', moderatorRequireMiddleware, articleStatusConverter.acceptedArticle, articlesController.statusChanging);

router.get('/reject/:articleId', moderatorRequireMiddleware, articleStatusConverter.rejectedArticle, articlesController.statusChanging);

router.get('/unreject/:articleId', moderatorRequireMiddleware, articleStatusConverter.waitingArticle, articlesController.statusChanging);

router.get('/delete/:articleId', moderatorRequireMiddleware, articlesController.articleDeleting);

//Comment
router.post('/comment/:article_id', commentValidator, commentController.createComment);

router.get('/comments/delete/:comment_id/:article_id', commentController.deleteComment);

//Search
// router.get('/search-advance',(req, res)=>{
//     res.render('search-advance',{message:"",username: req.session.username, role: req.session.role});
// });
// router.post('/search', articleSearchingDataFilter.searchingDataFilter, articleSearchingController.search);
// router.post('/search-advance',searchMiddleware, articleSearchingController.searchAdvance);

module.exports = router;