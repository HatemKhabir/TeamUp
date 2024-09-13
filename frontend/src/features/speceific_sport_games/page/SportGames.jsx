import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

function SportGames() {
    const {sportName}=useParams()

  return (
    <>
    <header><Header sportName={sportName}/></header>
    <main></main>
    <aside></aside>
    </>
  )
}

export default SportGames