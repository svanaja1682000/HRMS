import React, {useState, useEffect} from 'react'
import api from './api'

function Employees() {
  const [employees , setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({firstName:'', lastName:'', email:'', departmentName:'', roleName:'', dateOfJoining:''})
  const [onSubmitMessage, setOnSubmitMessage]=useState('')
  const [deleteFlag, setDeleteFlag]= useState(false)
  const [editFlagParam, setEditFlagParam]=useState('')
  const [viewEmployees, setViewEmployees]= useState(false)
  const [addNewEmployee, setaddNewEmployee] = useState(false)
  const [addPerformanceFlag, setAddPerformanceFlag] =useState(false)
  const [empIdForPerformance,setEmpIdForPerformance]= useState('')
  const [addPerformance, setAddperformance] = useState({employeeId:'',reviewDate:'',reviewer:'',comments:''})

  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  const roleData =userDetails.roleName


  useEffect(()=>{
    fetchEmployees()
  }, [onSubmitMessage,deleteFlag, viewEmployees, editFlagParam])


  const fetchEmployees = async ()=>{
    const response = await api.get('/employees')
    setEmployees(response.data)
  }

  const handleOnClickSubmit = async () =>{
    try{
      const response = await api.post('/employees',{newEmployee, roleData:userDetails.roleName})
      if(response?.data)setOnSubmitMessage(response?.data?.error || response?.data?.success  )
      if(!response?.data?.error )setNewEmployee({firstName:'', lastName:'', email:'', departmentName:'', roleName:'', dateOfJoining:''});
      setInterval(()=>{
        setOnSubmitMessage('')
      },3000)
    }catch(err){
      console.log(err.message,'error while adding new employee')
    }
  
  }
  const handleDelete = async (EmployeeId) =>{ 
  try{
      await api.delete(`/employees/${EmployeeId}`)
      setDeleteFlag(!deleteFlag)
    }catch(err){
      console.log(err.message,'Error while deleting the employee data')
    }
  }
  const handleEditEmp = async (employee,EmployeeId,) =>{
  try{
    console.log(EmployeeId,employee)
    await api.put(`/employees/${EmployeeId}`, {employee, roleData:userDetails.roleName})
  }catch(err){
    console.log(err.message,'Error while deleting the employee data')
  }
 }
const handleAddPErformance = async()=>{
  try{
    await api.post('/performances',{...addPerformance,employeeId: empIdForPerformance, roleData:userDetails.roleName})
  }catch(err){
    console.log(err.message, 'Error while adding Performance')
  }
}




  return (
    <div>
      <div className='emp-data-container'>
        <button 
          onClick={()=>{
          setViewEmployees(true)
          setaddNewEmployee(false)
          }}>
        View Employees
        </button>
        <button 
          onClick={()=>{
            setaddNewEmployee(true)
            setViewEmployees(false)
            setNewEmployee({firstName:'', lastName:'', email:'', departmentName:'', roleName:'', dateOfJoining:''});
            setEditFlagParam('')
          }}>
          Add New Employee
        </button>
      </div>
      {viewEmployees && (
        <>
        <div>
                <table className='tableStyle'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Date of Joining</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.employeeId}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.departmentName}</td>
                                <td>{employee.roleName}</td>
                                <td>{employee.dateOfJoining}</td>
                                <td>
                                    <button onClick={()=>{
                                      setNewEmployee({...employee})
                                      setaddNewEmployee(!addNewEmployee)
                                      setViewEmployees(false)
                                      setEditFlagParam(employee.employeeId)
                                      // 
                                    }}>Edit</button>
                                    <button onClick={()=>handleDelete(employee.employeeId, 'Delete')}>Delete</button>
                                    <button onClick={()=>{setAddPerformanceFlag(!addPerformanceFlag)
                                      setaddNewEmployee(false)
                                      setViewEmployees(false)
                                      setEmpIdForPerformance(employee.employeeId)
                                    } }>Add performance</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        </>)}
      <div className='add-new-emp-container'> 
    <div className='add-new-employee'>
    {addNewEmployee && (
      <>
      {console.log(newEmployee, 'new')}
      <label for="name">First Name:    <input 
          type ='text'
          placeholder='First Name '
          value={newEmployee.firstName}
          onChange={(e)=>{setNewEmployee({...newEmployee, firstName:e.target.value})}}
      /></label>
   
      <label for="name">Last Name: 
      <input 
          type ='text'
          placeholder='LastName'
          value={newEmployee.lastName}
          onChange={(e)=>{setNewEmployee({...newEmployee, lastName:e.target.value})}}
      />
      </label>
     
      <label for="name">Email: 
      <input 
          type ='email'
          placeholder='Email'
          value={newEmployee.email}
          onChange={(e)=>{setNewEmployee({...newEmployee, email:e.target.value})}}
      />
      </label>
    
      <label for="name">Department Name:
      <input 
          type ='text'
          placeholder='DepartmentName'
          value={newEmployee.departmentName}
          onChange={(e)=>{setNewEmployee({...newEmployee, departmentName:e.target.value})}}
      />
      </label>
     
      <label for="name">Role Name:    <input 
          type ='text'
          placeholder='RoleName'
          value={newEmployee.roleName}
          onChange={(e)=>{setNewEmployee({...newEmployee, roleName:e.target.value})}}
      /></label>
     
      <label for="name">Date of Joining:
      <input 
          type ='date'
          placeholder='DateOfJoining'
          value={newEmployee.dateOfJoining}
          onChange={(e)=>{setNewEmployee({...newEmployee, dateOfJoining:e.target.value})}}
      />
      </label>
     
    <button onClick={()=>{
      if(editFlagParam) {handleEditEmp(newEmployee, editFlagParam)}
      else{handleOnClickSubmit()}
    }}>Submit</button>
    {onSubmitMessage && (<p>{onSubmitMessage}</p>)}
    </>
    )}
    </div>
    {addPerformanceFlag && (
      <>
      <label htmlFor='reviewDate'>
        Review Date:
        <input
        type='date'
        placeholder='reviewDate'
        value={addPerformance.reviewDate}
        onChange={(e)=>{setAddperformance({...addPerformance,reviewDate:e.target.value})}}
        />
      </label>
      <label htmlFor='Reviewer'>
      Reviewer:
        <input
         type='text'
         placeholder='reviewer'
         value={addPerformance.reviewer}
         onChange={(e)=>{setAddperformance({...addPerformance,reviewer:e.target.value})}}
        />
      </label>
      <label htmlFor='comments'>
        Comments:
        <input
          type='text'
          placeholder='comments'
          value={addPerformance.comments}
          onChange={(e)=>{setAddperformance({...addPerformance,comments:e.target.value})}}
        />
      </label>
      <button onClick={()=>{handleAddPErformance()}}>Add</button>
      </>
    )}
    </div>
  </div>
  )
}

export default Employees