import { Box, Paper, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { productHeroBackdrop } from '../assets/media'
import './ProductHero.css'

interface ProductHeroProps {
  title: string
  subtitle: string
  images: string[]
}

export function ProductHero({ title, subtitle, images }: ProductHeroProps) {
  const reduceMotion = useReducedMotion()
  const firstImage = images[0]

  return (
    <Paper
      component={motion.section}
      elevation={0}
      className="panel product-hero"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.5, ease: 'easeOut' }}
    >
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Typography variant="body1" className="hero-subtitle">
        {subtitle}
      </Typography>
      <Box className="hero-carousel">
        <img
          src={productHeroBackdrop}
          alt=""
          className="hero-backdrop"
          width={1200}
          height={520}
          fetchPriority="high"
          decoding="async"
        />
        {firstImage ? (
          <Box
            component="img"
            src={firstImage}
            alt={`${title} hero`}
            className="hero-image"
            width={900}
            height={500}
            loading="eager"
            decoding="async"
          />
        ) : (
          <Box className="hero-placeholder">Hero media coming soon</Box>
        )}
      </Box>
    </Paper>
  )
}
