import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import type { ProductSpec } from '../types'
import './SpecsTable.css'

interface SpecsTableProps {
  specs: ProductSpec[]
}

export function SpecsTable({ specs }: SpecsTableProps) {
  return (
    <Paper component="section" elevation={0} className="panel specs-panel">
      <Typography variant="h5" component="h2">
        Specs
      </Typography>
      <TableContainer className="specs-table-wrap">
        <Table className="specs-table" aria-label="Product specification table">
          <caption className="sr-only">Product specification table</caption>
          <TableBody>
            {specs.map((spec) => (
              <TableRow key={spec.label}>
                <TableCell component="th" scope="row">
                  {spec.label}
                </TableCell>
                <TableCell>{spec.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
