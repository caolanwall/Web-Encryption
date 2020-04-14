const Group = require('../models/group-model')

const createGroup = async ( name, members, key, callback) => {
    try {
      const group = new Group({
        name: name,
        members: members,
        key: key,
      });
      group
        .save()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
      callback(group);
    } catch (e) {
      console.log(e);
    }
  };

  const addToGroup = async ( name, group, callback) => {
    await Group.findOne({ name: group }, (err, GroupA) => {
        try{
        if (err) {
            callback(0);
        }
        if (!GroupA) {
                callback(0);
        }
        console.log(GroupA);
        GroupA.members.push(name);
        GroupA
            .save()
            .then(result => {
            console.log(result);
            })
            .catch(err => {
            console.log(err);
            });
        callback(group);
        } catch (e) {
        console.log(e);
      }
    })
    };


getGroupByName = async (name, callback) => {
    await Group.find({ members: name }, (err, Group) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!Group) {
            return res
                .status(404)
                .json({ success: false, error: `Group not found` })
        }
        var groups = [];
        for (i = 0; i < Group.length; i++){
            console.log(Group[i].name)
            groups.push(Group[i].name)
        }
        callback(groups);
    }).catch(err => console.log(err))
}

getGroups = async (req, res) => {
    await Group.find({}, (err, Groups) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Groups.length) {
            return res
                .status(404)
                .json({ success: false, error: `Group not found` })
        }
        return res.status(200).json({ success: true, data: Groups })
    }).catch(err => console.log(err))
}

getGroup = async (groupname, callback) => {
    await Group.find({ name: groupname}, (err, Groups) => {
        console.log('1111111111111111')
        if (err) {
            callback(0)
        }
        if (!Groups.length) {
            callback(0)
        }
        callback(Groups);
    }).catch(err => console.log(err))
}

module.exports = {
    addToGroup,
    createGroup,
    getGroup,
    getGroups,
    getGroupByName,
}