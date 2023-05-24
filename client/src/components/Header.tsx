import * as React from 'react'
import { useAuth } from '../Auth/AuthProvider'

export default function Header() {
  const {user} = useAuth()
  console.log(user)
  return (
    <div>Header</div>
  )
}
