import jwt from "jsonwebtoken"
import Player from "../db/models/playerModel.js"
import Chat from "../db/models/chatModel.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Add this function to generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Add email sending functionality
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"TeamUp" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: 'Verify your TeamUp account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #4CAF50; text-align: center;">Welcome to TeamUp!</h1>
        <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/verify-email/${verificationToken}" 
             style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Verify Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

//Authentication : when you register and login , Authorization : make sure someone is logged in to perform certain action

//Registering and logging in with jwt

//registering doesn't need jwt , so it will be added in login
export const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    username = username.toLowerCase();

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newPlayer = new Player({
      username,
      email,
      password,
      availability: true,
      isVerified: false,
      verificationToken,
      verificationExpires
    });

    const savedPlayer = await newPlayer.save();

    try {
      // Send verification email
      await sendVerificationEmail(email, verificationToken);
      
      res.status(201).json({ 
        message: "Registration successful! Please check your email to verify your account.",
        savedPlayer 
      });
    } catch (emailError) {
      // If email sending fails, delete the created user and throw error
      await Player.findByIdAndDelete(savedPlayer._id);
      console.error('Email sending error:', emailError);
      return res.status(500).json({ 
        msg: "Failed to send verification email. Please try again." 
      });
    }

  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ msg: "Email is already used." });
    } else {
      console.error('Registration error:', err);
      res.status(500).json({ 
        msg: err.message || "Error during registration. Please try again." 
      });
    }
  }
};

//logging and assigning the jwt token
export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const player = await Player.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    }).populate('matchJoined');

    if (!player) {
      return res.status(400).json({ msg: "Email doesn't exist!" });
    }

    // Check if email is verified
    if (!player.isVerified) {
      return res.status(403).json({ 
        msg: "Please verify your email before logging in." 
      });
    }

    // Check if the password is incorrect
    if (!(await player.matchPassword(password))) {
      return res.status(400).json({ msg: "Password incorrect" })
    }
    
    // If the password is correct, generate a token
    const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET)
    try {
      const userChats = await Chat.find({
        users: { $elemMatch: { $eq: player._id } },
      })
      return res.status(200).json({ token, player,userChats })
    }catch(e){
          console.log(e)
        }
        return res.status(200).json({ token, player })

  } catch (err) {
    res.status(501).json({ error: err.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { username, password, profilePic, bio, country } = req.body;
    console.log(req.body)
    // Find the user by their ID
    const player = await Player.findOne({username:username});
    if (!player) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    // Update username if provided and different
    if (username && player.username !== username) {
      player.username = username;
    }

    // Update password if provided and different
    if (password && player.password !== password) {
      player.password = password;
    }

    // Update profile picture if provided
    if (profilePic) {
      player.profilePicture = profilePic;
    }

    // Update bio if provided
    if (bio !== undefined) {
      player.bio = bio;
    }

    // Update country if provided
    if (country !== undefined) {
      player.country = country;
    }

    await player.save();

    return res.status(200).json({
      msg: 'Profile updated successfully!',
      player,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Add verification endpoint
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    const player = await Player.findOne({ 
      verificationToken: token,
    });

    if (!player) {
      return res.status(400).json({ 
        msg: "Invalid or expired verification token." 
      });
    }

    // Check if already verified
    if (player.isVerified) {
      return res.status(409).json({ 
        msg: "Email is already verified. You can proceed to login." 
      });
    }

    player.isVerified = true;
    player.verificationToken = undefined;
    player.verificationExpires = undefined;
    await player.save();

    res.status(200).json({ 
      msg: "Email verified successfully! You can now log in." 
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      msg: "An error occurred during verification. Please try again." 
    });
  }
};
