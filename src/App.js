import React, { useState } from 'react';
import '../src/App.css';

const App = () => {
  const [text, setText] = useState('');
  const [number, setNumber] = useState(0);
  const [id, setId] = useState(0);

  const [formText, setFormText] = useState('');
  const [formFunLevel, setFormFunLevel] = useState(0);

  let [hobbies, setHobbies] = useState([
    { hobbie: 'eating an acia bowl', funLevel: 8.7, id: 0 },
    { hobbie: 'spending time with loved ones', funLevel: 10, id: 1 },
    { hobbie: 'doing pull ups', funLevel: 7, id: 2 },
    { hobbie: 'sleeping', funLevel: 8.3, id: 3 },
    { hobbie: 'watching naruto', funLevel: 8.5, id: 4 },
  ]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleFormChange = (e) => {
    setFormText(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleFormNumberChange = (e) => {
    setFormFunLevel(e.target.value);
  };

  const handleSubmit = (text, number) => {
    const newHobbie = {
      hobbie: text,
      funLevel: Number(number),
      id: hobbies.length + 1,
    };
    hobbies.push(newHobbie);
    setText('');
    setNumber(0);
  };

  const handleDelete = (selected) => {
    let handleFilter = hobbies.filter((hobbie) => hobbie.id != selected);
    setHobbies(handleFilter);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleEdit = (e, hobbieID, hobbieText, hobbieFunLevel) => {
    e.preventDefault();
    const currentState = hobbies;
    const hobbieToEdit = currentState.find((hobbie) => hobbie.id == hobbieID);
    hobbieToEdit.hobbie = hobbieText;
    hobbieToEdit.funLevel = hobbieFunLevel;
    setHobbies([...hobbies]);
  };

  return (
    <div className="list-form">
      <InputForm
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        text={text}
        number={number}
      />

      <br></br>

      <List
        hobbies={hobbies}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <EditForm
        hobbies={hobbies}
        handleFormChange={handleFormChange}
        handleFormNumberChange={handleFormNumberChange}
        handleEdit={handleEdit}
        handleIdChange={handleIdChange}
        formText={formText}
        formFunLevel={formFunLevel}
        id={id}
      />
    </div>
  );
};

const InputForm = ({
  handleChange,
  text,
  number,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <>
      <label>Enter Hobby</label>
      <input type="text" value={text} onChange={handleChange} />
      <label>Fun Level </label>
      <input type="number" value={number} onChange={handleNumberChange} />
      <button onClick={() => handleSubmit(text, number)}>Add To List</button>
    </>
  );
};

const List = ({ hobbies, handleDelete, handleEdit }) => {
  return (
    <ul className="hobby-list">
      {hobbies.map(({ hobbie, funLevel, id }) => {
        return (
          <>
            <li key={id}>
              <span style={{ marginRight: '0.5rem' }}>{hobbie}</span>
              <button onClick={() => handleDelete(id)}> X </button>
              <p style={{ marginRight: '0.5rem' }}>Fun Level: {funLevel}</p>
              <p className="last">This is my task ID: {id}</p>

              {/* <button class="open-modal" onClick={() => handleEdit(id)}>
                Edit Task
              </button> */}
            </li>
          </>
        );
      })}
    </ul>
  );
};

const EditForm = ({
  formText,
  id,
  formFunLevel,
  handleEdit,
  handleFormChange,
  handleFormNumberChange,
  handleIdChange,
}) => {
  return (
    <div className="modal">
      <label> Edit Task</label>
      <input type="text" value={formText} onChange={handleFormChange} />
      <label> Fun Level </label>
      <input
        type="number"
        value={formFunLevel}
        onChange={handleFormNumberChange}
      />
      <label> Who Are We Editting</label>
      <input type="number" value={id} onChange={handleIdChange} />
      <button onClick={(e) => handleEdit(e, id, formText, formFunLevel)}>
        {' '}
        Submit{' '}
      </button>
    </div>
  );
};

export default App;
