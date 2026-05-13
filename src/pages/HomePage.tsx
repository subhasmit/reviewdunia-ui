import { Link } from 'react-router-dom'
import { DragAndDropUploader } from '../components/DragAndDropUploader'

export function HomePage() {
  return (
    <div className="stack">
      <section className="panel">
        <h2>Welcome to ReviewDunia</h2>
        <p>Discover verified product reviews and compare offers in one place.</p>
        <Link to="/products/demo-product" className="primary-button">
          View demo product review
        </Link>
      </section>
      <DragAndDropUploader />
    </div>
  )
}
