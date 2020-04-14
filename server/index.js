const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const API_PORT = 3001
const UserCtrl = require('./controller/user-controller')
const PostCtrl = require('./controller/post-controller')
const GroupCtrl = require('./controller/group-controller')
const router = express.Router();
const dbRoute =
  'mongodb+srv://admin:admin@cluster0-4spo1.mongodb.net/test?retryWrites=true&w=majority';

app.use(cors());

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true },
);

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
app.get('/', (req, res) => {
    res.send('Working!')
})


router.post('/user', cors(), (req, res) => {
	console.log("create user", req.query);
    const userName = req.query.name;
    const pass = req.query.pass;
    const group = req.query.group;
    console.log(userName);
    console.log(group);
    UserCtrl.createUser(
        userName,
        pass,
        group,
        data => {
          return res.json({ data, success: true });
        },
        () => {
          return res.json({
            success: false,
          });
        },
      );
});

router.get('/auth', cors(), (req, res) => {
    const name = req.query.name;
    const pass = req.query.password;
    console.log(name);
    console.log(pass);
    UserCtrl.authUser(
        name,
        pass,
        data => {
          return res.json({ data, success: true });
        },
        () => {
          return res.json({
            success: false,
          });
        },
      );
});

router.post('/group', cors(), (req, res) => {
	console.log("create group", req.query);
    const name = req.query.name;
    const members = req.query.members;
    const key = req.query.key;
    GroupCtrl.createGroup(
        name,
        members,
        key,
        data => {
          return res.json({ data, success: true });
        },
        () => {
          return res.json({
            success: false,
          });
        },
      );
});

router.patch('/group', cors(), (req, res) => {
	console.log("Add user to group", req.query);
    const name = req.query.name;
    const group = req.query.group;
    GroupCtrl.addToGroup(
        name,
        group,
        data => {
          return res.json({ data, success: true });
        },
        () => {
          return res.json({
            success: false,
          });
        },
      );
});

router.get('/group', cors(), (req, res) => {
	console.log("Get member", req.query);
    const name = req.query.name;
    GroupCtrl.getGroupByName(
        name,
        data => {
          return res.json({ data, success: true });
        },
        () => {
          return res.json({
            success: false,
          });
        },
      );
});




router.post('/post', cors(), (req, res) => {
	console.log("create post", req.query);
    const userID = req.query.name;
    const content = req.query.content;
    const group = req.query.group;
    console.log(userID);
    console.log(content);
    console.log(group);
    PostCtrl.createPost(
        userID,
        content,
        group,
        data => {
          return res.json({ data, success: true });
        },
        () => {
          return res.json({
            success: false,
          });
        },
      );
});

router.get('/groupmem', cors(), (req, res) => {
	console.log("Get group", req.query);
    const name = req.query.name;
    GroupCtrl.getGroup(
        name,
        data => {
          return res.json({ data, success: true });
        },
        () => {
          return res.json({
            success: false,
          });
        },
      );
});

router.get('/post', PostCtrl.getPosts);
router.get('/group', GroupCtrl.getGroups);