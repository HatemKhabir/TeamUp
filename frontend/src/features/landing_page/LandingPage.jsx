import { useNavigate } from "react-router-dom";
import { MessageCircle, GamepadIcon, Trophy, Star, ArrowRight, ChevronDown } from "lucide-react";
import { Button, Container, Box, IconButton } from "@mui/material";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);
  
  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const scrollToCTA = () => {
    document.getElementById('cta').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-light-blue via-white to-light-green overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-24 h-24 bg-primary/10 rounded-full -left-12 top-20 animate-bounce" style={{ animationDuration: "3s" }} />
          <div className="absolute w-32 h-32 bg-accent/10 rounded-full right-12 top-40 animate-bounce" style={{ animationDuration: "4s" }} />
          <div className="absolute w-20 h-20 bg-primary/10 rounded-full left-1/4 bottom-20 animate-bounce" style={{ animationDuration: "3.5s" }} />
        </div>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <Box className="inline-block animate-fade-in">
              <span className="px-4 w-fit py-2 rounded-full bg-primary/10 text-primary text-xl font-medium mb-6 inline-block">
                Join the Future of Sports Networking
              </span>
            </Box>
            <h1 className="text-6xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-green-800  to-green-200 bg-clip-text text-transparent animate-fade-in">
              Connect. Play. <br />TeamUp<br/>
            </h1>
            <p className="text-xl text-gray-600 mb-10 animate-fade-in max-w-2xl mx-auto">
              The ultimate platform for athletes to connect, organize matches, and track their progress.
            </p>
            <Box className="  flex w-fit gap-4 justify-center mb-12 animate-fade-in">
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => window.location.href = '/auth'}
                sx={{
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  textWrap:'nowrap',
                  backgroundColor: 'var(--color-primary)',
                  '&:hover': {
                    backgroundColor: 'var(--color-primary)',
                    opacity: 0.9
                  },
                }}
              >
                Get Started Free <ArrowRight className="ml-2" />
              </Button>
            </Box>
          </Box>
        </Container>

        {/* First Scroll Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <IconButton 
            onClick={scrollToFeatures}
            sx={{
              width: '50px',
              backgroundColor: 'rgba(76, 196, 124, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(76, 196, 124, 0.2)',
              },
            }}
          >
            <ChevronDown className="text-primary w-6 h-6" />
          </IconButton>
        </div>

      </div>

      {/* Features Section */}
      <div id="features" className="bg-white/80 backdrop-blur-sm py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Powerful features to enhance your sports journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Chat</h3>
              <p className="text-gray-600">Real-time messaging with teammates. Coordinate games, share strategies, and stay connected.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GamepadIcon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Game Lobbies</h3>
              <p className="text-gray-600">Find and join games in your area. Create matches and invite players easily.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">Track your achievements, stats, and improvement over time with detailed analytics.</p>
            </div>
          </div>
        </div>

        {/* Second Scroll Arrow */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <IconButton 
            onClick={scrollToCTA}
            sx={{
              width: '50px',
              backgroundColor: 'rgba(76, 196, 124, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(76, 196, 124, 0.2)',
              },
            }}
          >
            <ChevronDown className="text-primary w-6 h-6" />
          </IconButton>
        </div>
      </div>

      {/* CTA Section */}
      <div id="cta">
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Sports Experience?</h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of athletes who are already enjoying a more connected sports community.
            </p>
            <Button 
              variant="contained"
              color="primary"
              size="large"
              onClick={() => window.location.href = '/auth'}
              sx={{ 
                px: 4, 
                py: 1.5,
                width:'fit-content',
                fontSize: '1.1rem',
                textTransform: 'none',
                backgroundColor: 'var(--color-primary)',
                '&:hover': {
                  backgroundColor: 'var(--color-primary)',
                  opacity: 0.9
                }
              }}
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </div>
    </Box>
  );
};

export default LandingPage;