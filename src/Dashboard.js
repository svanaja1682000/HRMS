import React, { useState } from 'react'
import './App.css'
import Employees from './Employees'
import Departments from './Departments'
import Roles from './Roles'
import PerformanceReviews from './PerformanceReviews'

function Dashboard() {
    const [activeTab, setActiveTab]=useState('Employees')
  return (
    <>
        <div>
            <div className='dashboard'>
                    <p>HRMS Dashboard</p>
                    <button className='borderLess' onClick={()=>{setActiveTab('Employees')}}>List of Employees</button>
                    <button className='borderLess' onClick={()=>{setActiveTab('Departments')}}>Departments</button>
                    <button className='borderLess' onClick={()=>{setActiveTab('Roles')}}>Roles </button>
                    <button className='borderLess' onClick={()=>{setActiveTab('PRS')}}>Performance Reviews</button>
    
            </div>
            {activeTab ==='Employees' && (<Employees/>) }
            {activeTab ==='Departments' && (<Departments/>) }
            {activeTab ==='Roles' && (<Roles/>) }
            {activeTab ==='PRS' && (<PerformanceReviews/>) }
        </div>
    </>

  )
}

export default Dashboard