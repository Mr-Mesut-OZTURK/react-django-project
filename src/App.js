import './App.css';
import React, { useState, useEffect } from 'react'
import ModalComp from "./conponents/ModalComp";
import axios from "axios";

function App() {

  // const [data, setData] = useState([])
  const [todosList, setTodosList] = useState([])
  const [modal, setModal] = useState(false)

  const [activeItem, setActiveItem] = useState({ title: "", description: "", completed: false })
  const [viewCompleted, setViewCompleted] = useState(false)
  const [refresh, setRefresh] = useState(false)
  // const [changeItem, setChangeItem] = useState({})

  useEffect(() => {
    axios('http://127.0.0.1:8000/todos/')
      .then((response) => {
        // console.log(response.data.results)
        setTodosList(response.data.results)
        // setData(response.data.results)
      })
      // .catch(err => console.log(err))
  }, [refresh])


  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (item) => {
    toggle();
    // console.log(item)
    if (item.id) {
      axios
        .put(`http://localhost:8000/todos/${item.id}/`, item)
        .then(res => {
          setRefresh(!refresh)
          setActiveItem({ title: "", description: "", completed: false })
        });
      return;
    }

    axios.post("http://localhost:8000/todos/", activeItem)
      .then((response) => setRefresh(!refresh))
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleDelete = item => {
    axios.delete(`http://localhost:8000/todos/${item.id}`)
      .then((response) => setRefresh(!refresh))
  };

  const editItem = item => {
    setActiveItem(item)
    setModal(true);
  };




  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">

        <button
          onClick={() => setViewCompleted(true)}
          className={viewCompleted ? "btn btn-outline-primary" : "btn btn-primary"}
        >
          Complete
        </button>

        <button
          onClick={() => setViewCompleted(false)}
          className={viewCompleted ? "btn btn-warning" : "btn btn-outline-warning"}
        >
          Incomplete
        </button>

      </div>
    );
  };

  const renderItems = () => {

    const newItems = todosList.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };


  return (
    <div className="App">
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">

              <div className="">
                <button onClick={() => setModal(!modal)} className="btn btn-success">Add Task</button>
              </div>

              {renderTabList()}
              <ul className="list-group list-group-flush">
                {renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {(modal ) ? (
          <ModalComp
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            toggle={toggle}
            onSave={handleSubmit}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
