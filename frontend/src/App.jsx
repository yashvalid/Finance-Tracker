import React from 'react'
import { Layout } from './components/Layout'
import { FinanceProvider } from './context/FinanceContext'
export function App() {
  return (
    <FinanceProvider>
      <Layout />
    </FinanceProvider>
  )
}
