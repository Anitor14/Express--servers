const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../members");

// Gets all members
router.get("/", (req, res) => {
  res.json(members);
});

// Get a Single Member.
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

//create Members
router.post("/", (req, res) => {
  // res.send(req.body)
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
//checking if the email has alread been taken
  members.forEach((member) => {
    if (newMember.email === member.email) {
      return res.status(400).json({ msg: "this email has already been taken" });
    }
  });
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email." });
  }

  members.push(newMember);
  res.json(members);
  // res.redirect('/');
});
// Update Member members
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    //   members.forEach((member) => updMember);
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member was updated successfully", member });
      }
    });
    // res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(404).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
