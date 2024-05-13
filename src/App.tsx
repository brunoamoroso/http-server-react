import "./App.css";
import { FormEvent, useState } from "react";
import { IProduct, useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //4 - custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url);

  // useEffect(() => {
  //   async function fetchData(){
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }

  //   fetchData();
  // }, []);

  //2 - adição de produtos
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    // const res =  await fetch(url, {
    //   method: "POST",
    //   headers:{
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(product)
    // });

    // //3 - Dynamic Data Load
    // const addedProduct = await res.json();

    // setProducts((prevState) => [...prevState, addedProduct]);

    //5 - refatorando post
    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  const handleDelete = async(productID: number) =>{
    httpConfig(productID, "DELETE");
  }

  return (
    <>
      <h1>Lista de Produtos</h1>
      {/* 6 - Loading */}
      {error && <p>{error}</p>}
      {loading && <p>Carregando Dados</p>}
      {!error && (
        <ul className="products_list">
          {items &&
            items.map((product: IProduct) => (
              <li key={product.id}>
                <div className="product_content">
                  <span className="product_name">{product.name}</span>
                  <span className="product_price">R$ {product.price}</span>
                </div>
                <div className="product_action">
                  <button onClick={() => {handleDelete(product.id)}}>Excluir</button>
                </div>
              </li>
            ))}
        </ul>
      )}

      <div className="add-product">
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Preço:
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </>
  );
}

export default App;
