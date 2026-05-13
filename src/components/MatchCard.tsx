import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { MatchResult } from '../types'
import './MatchCard.css'

type MatchCardProps = Pick<MatchResult, 'title' | 'thumbnail' | 'scorePercentage'> & {
  animationOrder?: number
}

export function MatchCard({
  title,
  thumbnail,
  scorePercentage,
  animationOrder = 0,
}: MatchCardProps) {
  return (
    <Card
      component={motion.article}
      className="match-card"
      aria-label={`Match ${title}`}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: animationOrder * 0.08 }}
    >
      <CardMedia component="img" image={thumbnail} alt={`${title} thumbnail`} className="card-thumbnail" />
      <CardContent className="card-content">
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
        <Chip
          label={`Score: ${scorePercentage}% match`}
          color={scorePercentage >= 90 ? 'success' : 'primary'}
          className="score-label"
        />
      </CardContent>
    </Card>
  )
}
