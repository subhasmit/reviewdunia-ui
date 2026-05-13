import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
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
  const reduceMotion = useReducedMotion()

  return (
    <Card
      component={motion.article}
      className="match-card"
      aria-label={`Match ${title}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 0.35, ease: 'easeOut', delay: animationOrder * 0.08 }
      }
    >
      <CardMedia
        component="img"
        image={thumbnail}
        alt={`${title} thumbnail`}
        className="card-thumbnail"
        loading="lazy"
      />
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
