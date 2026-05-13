import { Box, Grid, Paper, Typography } from '@mui/material'
import './ProsCons.css'

interface ProsConsProps {
  pros: string[]
  cons: string[]
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <Paper component="section" elevation={0} className="panel pros-cons-panel">
      <Grid container spacing={2} className="grid-two">
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" component="h2">
            Pros
          </Typography>
          <Box component="ul" className="pros-cons-list pros-list">
            {pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" component="h2">
            Cons
          </Typography>
          <Box component="ul" className="pros-cons-list cons-list">
            {cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
