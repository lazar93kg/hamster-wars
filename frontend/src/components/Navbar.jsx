import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>
        <span>HAMSTER WARS</span>
      </Link>
      <ul>
        <Link to='/battle'>Battle</Link>
        <Link to='/gallery'>Gallery</Link>
        <Link to='/statistics'>Statistics</Link>
        <Link to='/history'>History</Link>
      </ul>
    </nav>
  )
}
