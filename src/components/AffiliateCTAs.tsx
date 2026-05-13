import { Box, Button, Paper, Typography } from '@mui/material'
import type { AffiliateLink } from '../types'
import './AffiliateCTAs.css'

interface AffiliateCTAsProps {
  links: AffiliateLink[]
}

export function AffiliateCTAs({ links }: AffiliateCTAsProps) {
  return (
    <Paper component="section" elevation={0} className="panel affiliate-panel">
      <Typography variant="h5" component="h2">
        Best Price Offers
      </Typography>
      <Box className="button-row affiliate-buttons">
        {links.map((link) => (
          <Button
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            variant="contained"
            className="affiliate-button"
          >
            {link.label}
          </Button>
        ))}
      </Box>
    </Paper>
  )
}
