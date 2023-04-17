function createArrayOfSize(n) {
  return new Array(n).fill(0)
}

function Pagination({ totalPages, handlePageChange, currentPage }) {
  let pages = createArrayOfSize(totalPages).map((a, i) => {
    return (
      <button
        data-testid="page-btn"
        key={i + 1}
        value={i + 1}
        disabled={i + 1 === currentPage ? true : false}
        onClick={(evt) => {
          handlePageChange(evt)
        }}
      >
        {i + 1}
      </button>
    )
  })
  return <div>{pages}</div>
}

export default Pagination