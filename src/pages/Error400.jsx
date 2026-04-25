/**
 * Error400.jsx — Bad Request Error Page
 */

import ErrorPage from './ErrorPage'

export default function Error400() {
  return (
    <ErrorPage
      errorCode="400"
      errorDescription="Bad Request - Permintaan yang Anda kirim tidak valid atau tidak dapat diproses oleh server."
      errorImage="https://http.cat/400"
    />
  )
}