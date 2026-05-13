import type { ProductSpec } from '../types'

interface SpecsTableProps {
  specs: ProductSpec[]
}

export function SpecsTable({ specs }: SpecsTableProps) {
  return (
    <section className="panel">
      <h2>Specs</h2>
      <table className="specs-table">
        <caption className="sr-only">Product specification table</caption>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.label}>
              <th scope="row">{spec.label}</th>
              <td>{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
