import { UserCircle } from "lucide-react";
import { Card } from "../../../../../ui/card";
const FriendsList = ({ friends, handleFriendClick }) => {
    return (
      <Card className="p-7">
        <h3 className="text-lg  font-semibold mb-4">Friends</h3>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => handleFriendClick(friend.username)}
              className="flex items-center gap-10 p-1 rounded-lg transition-colors hover:bg-light-blue cursor-pointer"
            >
             <div className="w-fit h-15 bg-muted rounded-full flex items-center justify-center">
          <img src={friend.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
        </div>
              <div className="flex-1">
                <h4 className="font-medium">{friend.username}</h4>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };
  
  export default FriendsList;