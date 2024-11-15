import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState([]);
  const[counter,setCounter]=useState(1);
  const [loading,setLoading]=useState(false);
  function ApiFunction() {
    setLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${counter}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false)
        setValue(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function prew(){
    if(counter>1){
      setCounter(counter-1);
    }
  }
  function Next(){
    if(counter<10){
      setCounter(counter+1);
    }
  }
  useEffect(() => {
    ApiFunction();
  }, [counter]);

  return loading?<h1 className='Loader'>Loading...</h1>: (
    <>
    <div>
      <table>
        <thead>
          <tr>
            <td>NO</td>
            <td>Title</td>
            <td>Body</td>
          </tr>
        </thead>
        <tbody>
          {value.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.title}</td>
              <td>{el.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='Btn-group'>
      <button onClick={prew}>Previous</button>
      <h2 className='counter'>{counter}</h2>
      <button onClick={Next}>Next</button>
      </div>

    </div>
</>
  );
}

export default App;
