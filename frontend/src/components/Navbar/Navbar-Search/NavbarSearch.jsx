import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';

export default function NavbarSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults,setSearchResults]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  // Handle input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Paper
        component="form"
        sx={{
          p: '0.2rem 2rem',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '25px',
          height: '40px',
          maxWidth: '60rem',
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
          }}
          placeholder="Search for Players"
          inputProps={{ 'aria-label': 'search player', sx: { textAlign: 'center' } }}
          onChange={handleInputChange} // Trigger search on every input change
          value={searchTerm}
        />
        <IconButton type="button" sx={{ p: '10px',width:'40px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Display search results */}
      {isLoading && (
        <CircularProgress size={24} sx={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
      )}

      {searchResults && searchResults.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            width: '100%',
            maxWidth: '60rem',
            mt: '0.5rem',
            borderRadius: '10px',
            zIndex: 1,
          }}
        >
          <List>
            {searchResults.map((result, index) => (
              <ListItem sx={{cursor:'pointer'}}key={index}>
                <ListItemText  primary={result.name} /> {/* Adjust based on the structure of searchResults */}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}