import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container)

const dataFromDjango = JSON.parse(
  document.getElementById('data-from-django').textContent
)

root.render(<App dataFromDjango={dataFromDjango} />)
