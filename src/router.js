import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Chats } from './pages/Chats'

export default function Router() {
  return (
    <Routes>
        <Route path="/" Component={Home} exact />
        <Route path="/chats" Component={Chats} />
    </Routes>
  )
}
