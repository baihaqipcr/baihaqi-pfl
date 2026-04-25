/**
 * Error403.jsx — Forbidden Error Page
 */

import ErrorPage from './ErrorPage'

export default function Error403() {
  return (
    <ErrorPage
      errorCode="403"
      errorDescription="Forbidden - Akses ditolak. Anda tidak memiliki hak akses untuk halaman ini."
      errorImage="https://http.cat/403"
    />
  )
}