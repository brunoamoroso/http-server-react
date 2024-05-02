
import './App.css'
import { useEffect, useState } from 'react'

interface IProduct{
  id: number;
  name: string;
  price: number;
}

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function fetchData(){
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }

    fetchData();
  }, []);

  //2 - adição de produtos
  const handleSubmit = async (e) => {

  }


  return (
    <>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product: IProduct) => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))}
      </ul>

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name="name" id="name" value={name} onChange={handleChange}/>
          </label>

          <label>
            Preço:
            <input type="text" name="price" id="price" value={price} onChange={handleChange}/>
          </label>

          <input type="submit" value="Criar" />
        </form>
      </div>
    </>
  )
}

export default App
