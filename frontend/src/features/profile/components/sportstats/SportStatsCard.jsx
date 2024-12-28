import { 
  SportsSoccer, // Football
  SportsBasketball,
  SportsVolleyball,
  SportsTennis,
  SportsEsports, // Table Tennis
  Casino // Padel (using this as placeholder)
} from '@mui/icons-material';

const formatSportName = (sport) => {
  if (sport.toLowerCase() === 'tabletennis') {
    return 'Table Tennis';
  }
  return sport.charAt(0).toUpperCase() + sport.slice(1);
};

const getSportIcon = (sport) => {
  switch (sport.toLowerCase()) {
    case 'football':
      return <SportsSoccer />;
    case 'basketball':
      return <SportsBasketball />;
    case 'volleyball':
      return <SportsVolleyball />;
    case 'tennis':
      return <SportsTennis />;
    case 'tabletennis':
      return <SportsTennis />;
    case 'padel':
      return <SportsTennis />;
    default:
      return null;
  }
};

const SportStatsCard = ({ sport, wins, losses, totalMatches, winRate }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        {getSportIcon(sport)}
        <h3 className="text-lg font-semibold">{formatSportName(sport)}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#4CAF50' }}>{wins}</div>
          <div className="text-sm text-muted-foreground">Wins</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#f44336' }}>{losses}</div>
          <div className="text-sm text-muted-foreground">Losses</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#333333' }}>{totalMatches}</div>
          <div className="text-sm text-muted-foreground">Matches</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#2196F3' }}>{winRate}%</div>
          <div className="text-sm text-muted-foreground">Win Rate</div>
        </div>
      </div>
    </div>
  );
};

export default SportStatsCard;