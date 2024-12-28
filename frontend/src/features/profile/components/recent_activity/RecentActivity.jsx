import { Card } from "../../../../../ui/card";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { SportsSoccer, SportsBasketball, SportsVolleyball, SportsTennis } from '@mui/icons-material';
import { format } from 'date-fns';

const RecentActivity = ({ activities }) => {
  const auth = useContext(AuthContext);

  const getSportIcon = (sport) => {
    switch (sport.toLowerCase()) {
      case 'football':
        return <SportsSoccer />;
      case 'basketball':
        return <SportsBasketball />;
      case 'volleyball':
        return <SportsVolleyball />;
      case 'tennis':
      case 'tabletennis':
      case 'padel':
        return <SportsTennis />;
      default:
        return null;
    }
  };

  const getGameResult = (game) => {
    if (game.status !== 'finished') {
      return {
        status: 'Upcoming',
        color: 'bg-blue-100 text-blue-600'
      };
    }

    const isWinner = game.winners.includes(auth.userAuth.id);
    const isLoser = game.losers.includes(auth.userAuth.id);

    if (isWinner) {
      return {
        status: 'Won',
        color: 'bg-green-100 text-green-600'
      };
    }
    if (isLoser) {
      return {
        status: 'Lost',
        color: 'bg-red-100 text-red-600'
      };
    }
    return {
      status: 'Finished',
      color: 'bg-gray-100 text-gray-600'
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy • HH:mm');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const result = getGameResult(activity);
          
          return (
            <Card key={activity._id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className=" w-fit p-2 bg-gray-100 rounded-lg">
                  {getSportIcon(activity.sportType)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{activity.eventTitle}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.location}
                      </p>
                    </div>
                    <span className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${result.color}`}>
                      {result.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-sm font-medium text-primary">{activity.sportType}</span>
                    <span className="text-xs text-gray-400">{formatDate(activity.date)}</span>
                  </div>
                  {activity.status === 'finished' && (
                    <div className="mt-2 text-xs font-medium text-gray-400">
                      Host: {activity.hostUsername}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        
        {activities.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No recent activities
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;