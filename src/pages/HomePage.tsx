import { Box, Button, Paper, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { DragAndDropUploader } from '../components/DragAndDropUploader'
import { homepageHeroBanner, sectionIllustrationUpload } from '../assets/media'
import './HomePage.css'

export function HomePage() {
  return (
    <Box className="home-page stack">
      <Paper component="section" elevation={0} className="panel home-banner">
        <img
          src={homepageHeroBanner}
          alt=""
          className="section-banner"
          width={1200}
          height={540}
          fetchPriority="high"
          decoding="async"
        />
        <Typography variant="h4" component="h2">
          Welcome to ReviewDunia
        </Typography>
        <Typography variant="body1" className="home-subtitle">
          Discover verified product reviews and compare offers in one place.
        </Typography>
        <Button component={RouterLink} to="/products/1" variant="contained">
          View demo product review
        </Button>
      </Paper>
      <Paper component="section" elevation={0} className="panel home-illustration">
        <img
          src={sectionIllustrationUpload}
          alt=""
          className="section-illustration"
          width={1200}
          height={420}
          loading="lazy"
          decoding="async"
        />
      </Paper>
      <DragAndDropUploader />
    </Box>
  )
}
