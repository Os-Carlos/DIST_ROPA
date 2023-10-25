import React from 'react'
import { Space } from 'antd'
import './App.css'
import AppHeader from './components/AppHeader'
import PageContent from './components/PageContent'
import SideBar from './components/SideBar'

//componente principal
function App() {
  return (
    <div className='App'>
      <AppHeader />
      <Space className='MainContainer'>
        <SideBar />
        <PageContent />
      </Space>
    </div>
  )
}

export default App;
