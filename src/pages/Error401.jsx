/**
 * Error401.jsx — Unauthorized Error Page
 */

import ErrorPage from './ErrorPage'

export default function Error401() {
  return (
    <ErrorPage
      errorCode="401"
      errorDescription="Unauthorized - Anda tidak memiliki izin untuk mengakses halaman ini. Silakan login terlebih dahulu."
      errorImage="https://http.cat/401"
    />
  )
}