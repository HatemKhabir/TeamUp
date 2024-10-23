import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  email:{
    type:String,
    unique:true,
    required:true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase:true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  record: [{
    'volleyball':{
    wins:0,losses:0
  },
  'football':{
    wins:0,
    losses:0
  },
   'basketball':{
    wins:0,
    losses:0
   },
   'tabletennis':{
    wins:0,
    losses:0
   },
   'tennis':{
    wins:0,
    losses:0
   },
   'padel':{
    wins:0,
    losses:0
   }
}],
  matchJoined: [{
    type: Schema.Types.ObjectId,
    ref:"Match",
    default: null
  }],
  
  availability: {
    type: Boolean,
    default: true,
  },
})
userSchema.pre('save',async function functionName(next){
  if (!this.isModified)
    {next()}
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt)
}
)
userSchema.methods.matchPassword=async function(password){
  return await bcrypt.compare(password,this.password)
}
const Player = mongoose.model("Player", userSchema, "players")

export default Player
