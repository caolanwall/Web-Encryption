const User = require('../models/user-model')

const createUser = async ( userName, password, group, callback) => {
    try {
      const user = new User({
        name: userName,
        pass: password,
        group: group,
      });
      user
        .save()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
      callback(user);
    } catch (e) {
      console.log(e);
    }
  };

  const authUser = async ( username, pass, callback) => {
    try {
      console.log("Trying to validate username");
    const found = await User.findOne({name: username})
    //console.log(found);
		if(found == null) {
			console.log("Did not find username!", username);
			callback(false);
		} else if (found.pass === pass){
      console.log("YURRTTTTYYYYYYY");
      callback(found);
    } else {
      console.log("Incorrect Login");
      callback(0);
    }
    } catch (e) {
      console.log(e);
    }
  };


getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, User) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!User) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: User })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, Users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: Users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    authUser,
}