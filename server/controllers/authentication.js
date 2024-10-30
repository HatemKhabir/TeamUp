import jwt from "jsonwebtoken"
import Player from "../db/models/playerModel.js"
//Authentication : when you register and login , Authorization : make sure someone is logged in to perform certain action

//Registering and logging in with jwt

//registering doesn't need jwt , so it will be added in login
export const register = async (req, res) => {
  try {
    let { username,email,password } = req.body
    username = username.toLowerCase();

    const newPlayer = new Player({
      username,
      email,
      password,
      availability: true,
    })
    const savedPlayer = await newPlayer.save()
    res.status(201).json({savedPlayer})
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ msg: "Email is already used." })
    } else {
      res.status(500).json({ msg: "password too short (5 char minimum)" })
      console.log(err);
    }
  }
}

//logging and assigning the jwt token
export const login = async (req, res) => {
  try {
    const { email,username,password } = req.body
    console.log(req)
    const player = await Player.findOne({$or:[
      {email:email},
      {username:username}
    ] }).populate('matchJoined')
    if (!player) {
      return res.status(400).json({ msg: "Email doesn't exist!" })
    }

    // Check if the password is incorrect
    if (!(await player.matchPassword(password))) {
      return res.status(400).json({ msg: "Password incorrect" })
    }
    
    // If the password is correct, generate a token
    const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET)
    res.status(200).json({ token, player })
    console.log(token)
  } catch (err) {
    res.status(501).json({ error: err.message })
  }
}
