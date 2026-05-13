import { Box, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { productHeroBackdrop } from '../assets/media'
import './ProductHero.css'

interface ProductHeroProps {
  title: string
  subtitle: string
  images: string[]
}

export function ProductHero({ title, subtitle, images }: ProductHeroProps) {
  const firstImage = images[0]

  return (
    <Paper
      component={motion.section}
      elevation={0}
      className="panel product-hero"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Typography variant="body1" className="hero-subtitle">
        {subtitle}
      </Typography>
      <Box className="hero-carousel">
        <img src={productHeroBackdrop} alt="" className="hero-backdrop" />
        {firstImage ? (
          <Box component="img" src={firstImage} alt={`${title} hero`} className="hero-image" />
        ) : (
          <Box className="hero-placeholder">Hero media coming soon</Box>
        )}
      </Box>
    </Paper>
  )
}
