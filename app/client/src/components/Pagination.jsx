export default function Pagination({ page, totalPages, onChange }) {
  const items = totalPages <= 5
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : [...new Set([1, Math.max(2, Math.min(page, totalPages - 2)), Math.max(3, Math.min(page + 1, totalPages - 1)), '…', totalPages])]
  return (
    <nav className="shop-pagination" aria-label="Product pages">
      <button aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)}>
        <img src="/assets/shopping/previous.svg" alt="" />
      </button>
      {items.map((n) => n === '…'
        ? <span className="shop-page" key={n}><img src="/assets/shopping/ellipsis.svg" alt="More pages" /></span>
        : <button className="shop-page" key={n} aria-current={n === page ? 'page' : undefined} onClick={() => onChange(n)}>{n}</button>)}
      <button aria-label="Next page" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        <img src="/assets/shopping/next.svg" alt="" />
      </button>
    </nav>
  )
}
