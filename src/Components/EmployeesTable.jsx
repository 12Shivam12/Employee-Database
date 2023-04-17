import { useEffect, useState } from "react"
import Pagination from "./Pagination"

export const EmployeesTable = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const [totalPages, setTotalPages] = useState(1)


  function handlePageChange(evt) {
    if (filter === "") {
      fetchData(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${evt.target.value}&limit=10`
      ).then((json) => {
        console.log(evt.target.value)
        setData(json.data)
        setPage(evt.target.value)
        setTotalPages(json.totalPages)
      })
    } else {
      fetchData(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${evt.target.value}&limit=10&filterBy=department&filterValue=${filter}`
      ).then((json) => {
        console.log(evt.target.value)
        setData(json.data)
        setPage(evt.target.value)
        setTotalPages(json.totalPages)
      })
    }
  } function handleFilter(evt) {
    const { value } = evt.target
    if (value === "") {
      fetchData(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10`
      ).then((json) => {
        setData(json.data)
        setPage(1)
        setTotalPages(json.totalPages)
      })
    } else {
      fetchData(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=${value}`
      ).then((json) => {
        setData(json.data)
        setPage(1)
        setTotalPages(json.totalPages)
      })
    }
  }

  async function fetchData(url) {
    let response = await fetch(url)
    let data = await response.json()
    return data
  }

  useEffect(() => {
    fetchData(
      `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10`
    ).then((json) => {
      console.log(json.data)
      setData(json.data)
      setTotalPages(json.totalPages)
      setFilter("")
    })
  }, [])

  
  return (
    <div>
      <div className="controls">
        <div>
          <select
            // select dropdown needs both value and onChange
            value={filter}
            onChange={(evt) => {
              setFilter(evt.target.value)
              handleFilter(evt)
            }}
            className="department_list"
          >
            <option value="">--Select Department--</option>
            <option value="hr">HR</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
            <option value="engineering">Engineering</option>
            <option value="operations">Operations</option>
          </select>
        </div>
      </div>
      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {/* populate all rows like below: */}
            {data.map((ele) => (
              <tr className="row" key={ele.id}>
                <td>{ele.id}</td>
                <td className="name">{ele.name}</td>
                <td className="gender">{ele.gender}</td>
                <td className="department">{ele.department}</td>
                <td className="Salary">{ele.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages && (
        <Pagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={page}
        />
      )}
    </div>
  )
}