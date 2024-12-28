import ReactCountryFlag from "react-country-flag";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MessageIcon from "@mui/icons-material/Message";
import EditIcon from '@mui/icons-material/Edit';
import { acceptInvite, checkFriendStatus, declineInvite, removeFriendApi, sendFriendInviteApi } from "./services/profileDetails";

const countryCodeMap = {
  'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Andorra': 'AD',
  'Angola': 'AO', 'Argentina': 'AR', 'Armenia': 'AM', 'Australia': 'AU',
  'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH',
  'Bangladesh': 'BD', 'Barbados': 'BB', 'Belarus': 'BY', 'Belgium': 'BE',
  'Belize': 'BZ', 'Benin': 'BJ', 'Bhutan': 'BT', 'Bolivia': 'BO',
  'Bosnia': 'BA', 'Botswana': 'BW', 'Brazil': 'BR', 'Brunei': 'BN',
  'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Cambodia': 'KH',
  'Cameroon': 'CM', 'Canada': 'CA', 'Cabo Verde': 'CV', 'Chad': 'TD',
  'Chile': 'CL', 'China': 'CN', 'Colombia': 'CO', 'Comoros': 'KM',
  'Congo': 'CG', 'Costa Rica': 'CR', 'Croatia': 'HR', 'Cuba': 'CU',
  'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Djibouti': 'DJ',
  'Dominica': 'DM', 'Dominican Republic': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG',
  'El Salvador': 'SV', 'Estonia': 'EE', 'Ethiopia': 'ET', 'Fiji': 'FJ',
  'Finland': 'FI', 'France': 'FR', 'Gabon': 'GA', 'Gambia': 'GM',
  'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH', 'Greece': 'GR',
  'Grenada': 'GD', 'Guatemala': 'GT', 'Guinea': 'GN', 'Guyana': 'GY',
  'Haiti': 'HT', 'Honduras': 'HN', 'Hungary': 'HU', 'Iceland': 'IS',
  'India': 'IN', 'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ',
  'Ireland': 'IE', 'Israel': 'IL', 'Italy': 'IT', 'Jamaica': 'JM',
  'Japan': 'JP', 'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE',
  'Kuwait': 'KW', 'Kyrgyzstan': 'KG', 'Laos': 'LA', 'Latvia': 'LV',
  'Lebanon': 'LB', 'Libya': 'LY', 'Liechtenstein': 'LI', 'Lithuania': 'LT',
  'Luxembourg': 'LU', 'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY',
  'Maldives': 'MV', 'Mali': 'ML', 'Malta': 'MT', 'Mauritania': 'MR',
  'Mauritius': 'MU', 'Mexico': 'MX', 'Moldova': 'MD', 'Monaco': 'MC',
  'Mongolia': 'MN', 'Montenegro': 'ME', 'Morocco': 'MA', 'Mozambique': 'MZ',
  'Namibia': 'NA', 'Nepal': 'NP', 'Netherlands': 'NL', 'New Zealand': 'NZ',
  'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'Norway': 'NO',
  'Oman': 'OM', 'Pakistan': 'PK', 'Panama': 'PA', 'Paraguay': 'PY',
  'Peru': 'PE', 'Philippines': 'PH', 'Poland': 'PL', 'Portugal': 'PT',
  'Qatar': 'QA', 'Romania': 'RO', 'Russia': 'RU', 'Rwanda': 'RW',
  'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS', 'Singapore': 'SG',
  'Slovakia': 'SK', 'Slovenia': 'SI', 'Somalia': 'SO', 'South Africa': 'ZA',
  'South Korea': 'KR', 'Spain': 'ES', 'Sri Lanka': 'LK', 'Sudan': 'SD',
  'Sweden': 'SE', 'Switzerland': 'CH', 'Syria': 'SY', 'Taiwan': 'TW',
  'Tajikistan': 'TJ', 'Tanzania': 'TZ', 'Thailand': 'TH', 'Tunisia': 'TN',
  'Turkey': 'TR', 'Turkmenistan': 'TM', 'Uganda': 'UG', 'Ukraine': 'UA',
  'UAE': 'AE', 'United Kingdom': 'GB', 'United States': 'US', 'Uruguay': 'UY',
  'Uzbekistan': 'UZ', 'Venezuela': 'VE', 'Vietnam': 'VN', 'Yemen': 'YE',
  'Zambia': 'ZM', 'Zimbabwe': 'ZW'
};

const ProfileHeader = ({ username, joinDate, location, bio, profileImage }) => {
  const [isFriend, setIsFriend] = useState(false);
  const [invitePending, setInvitePending] = useState(false);
  const [isRecipient, setIsRecipient] = useState(false);
  const [inviteId, setInviteId] = useState('');
  const auth = useContext(AuthContext);
  const [isPersonal, setIsPersonal] = useState(false);

  useEffect(() => {
    if (auth.userAuth && auth.userAuth.username === username) {
      setIsPersonal(true);
    }
    const checkFriend = async () => {
      try {
        const friendStatus = await checkFriendStatus(username);
        if (friendStatus.status === 'pending') {
          if (auth.userAuth.id === friendStatus.recipient)
            setIsRecipient(true);
          setInviteId(friendStatus._id);
          setInvitePending(true);
        }
        if (friendStatus.status === 'accepted')
          setIsFriend(true);
      } catch (e) {
        console.error(e);
      }
    };
    checkFriend();
  }, [auth.userAuth, username]);

  const handleAddFriend = async () => {
    try {
      await sendFriendInviteApi(username);
      setInvitePending(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAcceptInvite = async () => {
    try {
      await acceptInvite(inviteId);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRejectInvite = async () => {
    try {
      await declineInvite(inviteId);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const removeFriend = async () => {
    try {
      await removeFriendApi(username);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{username}</h1>
              <div className="flex gap-2 text-sm text-muted-foreground mt-2">
                <span className="w-fit">Joined {joinDate}</span>
                <span className="w-fit">•</span>
                <span className="w-fit flex items-center gap-1">
                  {location && countryCodeMap[location] && (
                    <ReactCountryFlag
                      countryCode={countryCodeMap[location]}
                      svg
                      style={{
                        width: '1.2em',
                        height: '1.2em',
                      }}
                    />
                  )}
                  {location}
                </span>
              </div>
            </div>
            <div className="flex gap-2 w-fit">
              {!isPersonal ? (
                !isFriend ? (
                  invitePending ? (
                    isRecipient ? (
                      <>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={handleAcceptInvite}
                          className="w-fit"
                        >
                          Accept Invite
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleRejectInvite}
                          className="w-fit"
                        >
                          Reject Invite
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outlined"
                        color="success"
                        className="w-fit"
                      >
                        Invite Pending
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<PersonAddIcon />}
                      color="success"
                      onClick={handleAddFriend}
                      className="w-fit"
                    >
                      Add Friend
                    </Button>
                  )
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                      color="error"
                      onClick={removeFriend}
                      className="w-2/3"
                    >
                      Remove Friend
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<MessageIcon />}
                      color="primary"
                      onClick={() => window.location.href = '/friends-chat'}
                      className="w-2/3"

                    >
                      Message
                    </Button>
                  </>
                )
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  color="primary"
                  className="w-fit"
                  onClick={() => window.location.href = `/edit-profile/${auth.userAuth.username}`}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
          <p className="mt-4 text-foreground">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;