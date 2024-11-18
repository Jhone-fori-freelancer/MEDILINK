'use client'

export function PrintButton() {
  return (
    <button
      className="border-2 text-blue-500 font-semibold border-blue-500 py-4 rounded-xl"
      onClick={() => window.print()}
    >
      Descargar comprobante
    </button>
  )
}