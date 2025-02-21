import express from 'express';
import jwt from 'jsonwebtoken';
import {
    AboutController, 
    BlogController, 
    GalleryController, 
    ProjectController, 
    SectionController, 
    ServiceController, 
    TestimonyController, 
    TodoController,
    UserController} 
    from "../controllers";
import UserValidation from '../middleware/validation/UserValidation';
import passport from 'passport';
import { MulterUpload, UploadError, MultiFieldUpload } from '../middleware/upload';
import JwtAuth from '../middleware/JwtAuth';
import Helper from '../helpers/Helper';

const router =  express.Router();


router.get('/google', passport.authenticate("google",{
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate("google", { failureRedirect: "/google" }), (req: express.Request, res: express.Response) => {
    const token = jwt.sign(
        { user: req.user },
        process.env.JWT_SECRET || '',
        { expiresIn: "1 day" },
      );
    const userData = {
        user: req.user,
        accesstoken: token
    };
    res.cookie('ayuna', JSON.stringify(userData));
    //res.status(200).send(Helper.ResponseData(200,'logged in', null,token));
    res.redirect('http://localhost:5173/admin');
});

router.get('/user', JwtAuth, UserController.getUsers);
router.get('/user/:id', JwtAuth, UserController.getUserById);
router.post('/user', JwtAuth, UserValidation.ValidateUser, UserController.createUser);
router.put('/user/:id', JwtAuth, UserController.updateUser);
router.delete('/user/:id', JwtAuth, UserController.deleteUser);

router.get('/gallery', GalleryController.getGalleries);
router.get('/gallery/:id', JwtAuth, GalleryController.getGalleryById);
router.post('/gallery', JwtAuth, MulterUpload, GalleryController.createGallery);
router.put('/gallery/:id', JwtAuth, MulterUpload, GalleryController.updateGallery);
router.delete('/gallery/:id', JwtAuth, GalleryController.deleteGallery);

router.get('/project', ProjectController.getAllProjects);
router.get('/project/:id', ProjectController.getProjectById);
router.post('/project', JwtAuth, MulterUpload, ProjectController.createProject);
router.put('/project/:id', JwtAuth, MulterUpload, ProjectController.updateProject);
router.delete('/project/:id', JwtAuth, ProjectController.deleteProject);

router.get('/section', SectionController.getAllSections);
router.get('/section/:id', SectionController.getSectionById);
router.post('/section', JwtAuth, SectionController.createSection);
router.put('/section/:id', JwtAuth, SectionController.updateSection);
router.delete('/section/:id', JwtAuth, SectionController.deleteSection);

router.get('/service', ServiceController.getAllServices);
router.get('/service/:id', ServiceController.getServiceById);
router.post('/service', JwtAuth, MulterUpload, ServiceController.createService);
router.put('/service/:id', JwtAuth, MulterUpload, ServiceController.updateService);
router.delete('/service/:id', JwtAuth, ServiceController.deleteService);

router.get('/blog', BlogController.getAllBlogs);
router.get('/blog/:id', BlogController.getBlogById);
router.post('/blog', JwtAuth, MulterUpload, BlogController.createBlog);
router.put('/blog/:id', JwtAuth, MulterUpload, BlogController.updateBlog);
router.delete('/blog/:id', JwtAuth, BlogController.deleteBlog);

router.get('/testimony', TestimonyController.getAllTestimonys);
router.get('/testimony/:id', TestimonyController.getTestimonyById);
router.post('/testimony', JwtAuth, MultiFieldUpload, TestimonyController.createTestimony);
router.put('/testimony/:id', JwtAuth, MultiFieldUpload, TestimonyController.updateTestimony);
router.delete('/testimony/:id', JwtAuth, TestimonyController.deleteTestimony);

router.get('/about', AboutController.getAllAbouts);
router.get('/about/:id', AboutController.getAboutById);
router.post('/about', JwtAuth,  AboutController.createAbout);
router.put('/about/:id', JwtAuth,  AboutController.updateAbout);
router.delete('/about/:id', JwtAuth, AboutController.deleteAbout);

router.get('/todo', JwtAuth, TodoController.getAllTodos);
router.get('/todo/:id', JwtAuth, TodoController.getTodoById);
router.post('/todo', JwtAuth, TodoController.createTodo);
router.put('/todo/:id', JwtAuth, TodoController.updateTodo);
router.delete('/todo/:id', JwtAuth, TodoController.deleteTodo);



export default router;


