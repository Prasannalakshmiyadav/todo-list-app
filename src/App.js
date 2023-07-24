import "./index.css";
import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changes");
    } else {
      showAlert(true, "success", "Item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id !== id);
    setIsEditing(true);
    setEditID(id);
    setName(editItem.title);
  };
  const clearList = () => {
    showAlert(true, "danger", "Empty List");
    setList([]);
  };

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 style={{ marginBottom: "1.5rem", teaxtAlign: "center" }}>
          Todo List App{" "}
          <img src="https://i.pinimg.com/564x/6e/bf/6f/6ebf6f1eea0f9e8245e1f4a941af2e64--icon-check-kill-list.jpg" />
        </h3>
        <div className="mb-3 form">
          <input
            type="text"
            className="form-control"
            placeholder="enter your task e.g:study"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <div>
            <button className="btn btn-warning" onClick={clearList}>
              clear items
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
export default App;

// import "./index.css";
// import React, { useState, useEffect } from "react";
// import List from "./components/List";
// import Alert from "./components/Alert";

// const getLocalStorage = () => {
//   let list = localStorage.getItem("list");
//   if (list) {
//     return (list = JSON.parse(localStorage.getItem("list")));
//   } else {
//     return [];
//   }
// };

// const App = () => {
//   const [name, setName] = useState("");
//   const [list, setList] = useState(getLocalStorage());
//   const [isEditing, setIsEditing] = useState(false);
//   const [editID, setEditID] = useState(null);
//   const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

//   useEffect(() => {
//     localStorage.setItem("list", JSON.stringify(list));
//   }, [list]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name) {
//       showAlert(true, "danger", "Please enter a value");
//     } else if (name && isEditing) {
//       setList((prevList) =>
//         prevList.map((item) => {
//           if (item.id === editID) {
//             return { ...item, title: name };
//           }
//           return item;
//         })
//       );
//       setName("");
//       setEditID(null);
//       setIsEditing(false);
//       showAlert(true, "success", "Value changes");
//     } else {
//       showAlert(true, "success", "Item added to the list");
//       const newItem = { id: new Date().getTime().toString(), title: name };
//       setList((prevList) => [...prevList, newItem]);
//       setName("");
//     }
//   };

//   const showAlert = (show = false, type = "", msg = "") => {
//     setAlert({ show, type, msg });
//   };

//   const removeItem = (id) => {
//     showAlert(true, "danger", "Item removed");
//     setList((prevList) => prevList.filter((item) => item.id !== id));
//   };

//   const editItem = (id) => {
//     const editItem = list.find((item) => item.id === id);
//     setIsEditing(true);
//     setEditID(id);
//     setName(editItem.title);
//   };

//   const clearList = () => {
//     showAlert(true, "danger", "Empty List");
//     setList([]);
//   };

//   const toggleItem = (id) => {
//     setList((prevList) =>
//       prevList.map((item) => {
//         if (item.id === id) {
//           return { ...item, completed: !item.completed };
//         }
//         return item;
//       })
//     );
//   };

//   return (
//     <section className="section-center">
//       <form onSubmit={handleSubmit}>
//         {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
//         <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
//           Todo List App{" "}
//           <img
//             src="https://i.pinimg.com/564x/6e/bf/6f/6ebf6f1eea0f9e8245e1f4a941af2e64--icon-check-kill-list.jpg"
//             alt="Todo List"
//           />
//         </h3>
//         <div className="mb-3 form">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter your task e.g: study"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//           />
//           <button type="submit" className="btn btn-success">
//             {isEditing ? "Edit" : "Submit"}
//           </button>
//         </div>
//       </form>
//       {list.length > 0 && (
//         <div style={{ marginTop: "2rem" }}>
//           <List
//             items={list}
//             removeItem={removeItem}
//             editItem={editItem}
//             toggleItem={toggleItem}
//           />
//           <div>
//             <button className="btn btn-warning" onClick={clearList}>
//               Clear Items
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default App;
