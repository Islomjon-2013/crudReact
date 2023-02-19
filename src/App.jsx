import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
const App = () => {
  const [dataId, setDataId] = useState(-1);
  const name = useRef();
  const job = useRef();
  const salary = useRef();

  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get("http://localhost:4444/employees")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const sentData = (e) => {
    e.preventDefault();
    let data = {
      id: Date.now(),
      name: e.target.name.value,
      job: e.target.job.value,
      salary: e.target.salary.value,
    };
    if (dataId > 0) {
      axios
        .put(`http://localhost:4444/employees/${dataId}`, data)
        .then((res) => {
          console.log(res);
          getData().catch((err) => {
            console.log(err);
          });
        });
      setDataId(-1);
    } else {
      axios.post("http://localhost:4444/employees", data).then((res) => {
        console.log(res);
        getData().catch((err) => {
          console.log(err);
        });
      });
    }

    e.target.reset();
  };
  const deleteData = (id) => {
    axios.delete(`http://localhost:4444/employees/${id}`).then((res) => {
      console.log(res);
      getData().catch((err) => {
        console.log(err);
      });
    });
  };
  const editData = (item) => {
    setDataId(item.id);
    name.current.value = item.name;
    job.current.value = item.job;
    salary.current.value = item.salary;
  };
  return (
    <div>
      <h1 className="text-center mb-4">Fill out the form</h1>
      <div className="container">
        <div className="row">
          <div className="col-4 offset-4">
            <form onSubmit={sentData}>
              <input
                ref={name}
                type="text"
                name="name"
                placeholder="Enter your name"
                className="form-control mb-2"
              />
              <input
                ref={job}
                type="text"
                name="job"
                placeholder="Enter your job"
                className="form-control mb-2"
              />
              <input
                ref={salary}
                type="text"
                name="salary"
                placeholder="Enter your salary"
                className="form-control mb-2"
              />
              <button type="submit" className="btn btn-success w-100">
                Sent
              </button>
            </form>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-8 offset-2">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Job</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.job}</td>
                      <td>{item.salary}</td>
                      <td>
                        <button
                          className="btn btn-danger mx-1"
                          onClick={() => deleteData(item.id)}
                        >
                          delete
                        </button>
                        <button
                          onClick={() => editData(item)}
                          className="btn btn-warning"
                        >
                          edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
