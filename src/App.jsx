/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:

todo - inserção de novos produtos no carrinho
todo - remoção de produtos já inseridos
todo - alteração de quantidade de cada item 
todo - cálculo do preço total dos itens inseridos

todo - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/
import './styles.scss';

import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import { useEffect, useState } from 'react';
import api from './http';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {

  const [cart, setCart] = useState([])

  const productObject = {
    name: 'produto',
    category: "categoria",
    price: randomNumber(90, 1200),
    quantity: 1
  }

  //pega as respostas
  const fetchAPI = () => {
    api.get('/cart')
      .then(response => {
        console.log(response.data)
        setCart(response.data)
      })
      .catch((erro) => { console.log(erro) })
  }

  //toda vez que recarga a página, vai executar o fetchAPI() para ser exibido
  useEffect(() => {
    fetchAPI()
  }, [])

  //add algum item no cart
  const handleAddItem = () => {
    //post, você coloca onde irá ser add e oq será adicionado
    console.log('adicionou no carrinho');

    api.post('/cart', productObject)
      .then(response => {
        console.log(response)
        //adicionar de forma dinâmica já oq foi add no cart
        fetchAPI()
      })
  }

  //del de algum item no cart
  const handleRemoveItem = (item) => {
    console.log(item);
    api.delete(`/cart/${item._id}`).then(response => {
      console.log(response)
      fetchAPI();
    })
  }

  //att de algum item no cart
  const handleUpdateItem = (item, action) => {

    let newQuantity = item.quantity;

    if (action === 'increase') {
      newQuantity++;
    }

    if (action === 'decrease') {
      if (newQuantity === 1) {
        return;
      }
      newQuantity--
    }

    const newData = { ...item, quantity: newQuantity }
    //pelo fato de alterar a quant a API vai gerar um novo id então, se passarmos o mesmo ele cracha
    delete newData._id;

    api.put(`/cart/${item._id}`, newData).then(
      response => {
        console.log(response)
        fetchAPI()
      }
    )
  }

  const getTotal = () => {
    let sum = 0;

    //soma de todo total
    for(let item of cart){
      sum =+ item.quantity * item.price;
    }

    return sum;
  }

  const cartTotal = getTotal();
  

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
        <div className='content'>
          <section>
            <button onClick={handleAddItem} style={{ padding: "5px 10px", marginBottom: "20px" }}>Adicionar mais produtos</button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(
                  item =>
                    <TableRow
                      data={item}
                      key={item._id}
                      handleRemoveItem={handleRemoveItem}
                      handleUpdateItem={handleUpdateItem}
                    />
                )}
                {/*Fragment condicional*/}
                {cart.length === 0 &&
                  <tr>
                    {/* colSpan faz com que escolhemos quantas colunas vão ocupar uma linha */}
                    <td colSpan={'5'} style={{ textAlign: 'center' }}>
                      <b>Carrinho de compras vazio.</b>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </section>
          <aside>
            <Summary cartTotal={cartTotal}/>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
