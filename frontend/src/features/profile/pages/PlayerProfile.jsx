import { Box, Typography } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../components/profile_header/ProfileHeader";
import SportStatsCard from "../components/sportstats/SportStatsCard";
import TrustFactor from "../components/trust_factor/TrustFactor";
import FriendsList from "../components/friendslist/FriendsList";
import RecentActivity from "../components/recent_activity/RecentActivity";
import { AuthContext } from "../../../contexts/AuthProvider";
import { getPlayerGamesById } from "../../home/services/Dashboard";
import { useContext, useEffect, useState } from "react";
import { getPlayerStats } from "../services/profileStats";

function PlayerProfile() {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState("");
  const navigate = useNavigate();
  const [gameDetailsList,setGameDetailsList]=useState([]);
  const auth=useContext(AuthContext) 
  const [hasFetchedGames, setHasFetchedGames] = useState(false);

  useEffect(() => {
    if (!playerId) {
      navigate("/");
    }

    async function getPlayerData() {
      try {
        const playerDataResponse = await getPlayerStats(playerId);
        console.log(playerDataResponse);

        if (playerDataResponse) {
          setPlayerData(playerDataResponse.responseData.profileData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (playerId) {
      console.log("here");
      getPlayerData();
    }
  }, [playerId, navigate]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        if (auth.userAuth?.id && !hasFetchedGames) { 
          const response = await getPlayerGamesById(auth.userAuth.id);
          console.log(response)
          setGameDetailsList(response.data)
          setHasFetchedGames(true); 
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    if (auth.userAuth) {
      fetchGames();
      console.log(auth.publicGames)
    }
  }, [auth.userAuth, auth.setUserGames, auth.setPublicGames, hasFetchedGames, auth]);

  const handleFriendClick = (username) => {
    window.location.href = `/profile/${username}`;
  };

  if (!playerData) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6">Loading player data...</Typography>
      </Box>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-muted">
      <div className="container py-5 space-y-6">
        <ProfileHeader
          profileImage={playerData?.profilePic}
          username={playerData?.username}
          joinDate={playerData?.createdAt.split('T')[0]}
          location={playerData?.country}
          bio={playerData?.bio}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="space-y-6">
              {playerData?.record && Object.entries(playerData.record).map(
                ([sport, stats]) => (
                  <SportStatsCard
                    key={sport}
                    sport={sport}
                    wins={stats.wins}
                    losses={stats.losses}
                    totalMatches={stats.wins + stats.losses}
                    winRate={
                      stats.wins + stats.losses > 0
                        ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
                        : 0
                    }
                  />
                )
              )}
            </div>
          </div>

          <div className="space-y-5">
            <TrustFactor initialTrust={playerData?.trustFactor} profileId={playerData?.username} />
            <FriendsList friends={playerData?.friendsList} handleFriendClick={handleFriendClick} />
            <RecentActivity activities={gameDetailsList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;
