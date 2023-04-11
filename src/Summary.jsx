import React from 'react';

const Summary = ({cartTotal}) => {
  return (
    <>
      <div className='box'>
        <header>Resumo da compra</header>
        <div className='info'>
          <div>
            <span>Sub-total</span>
            <span>R$ {cartTotal}</span>
          </div>
          <div>
            <span>Frete</span>
            <span>Gratuito</span>
          </div>
          <div>
            <button>
              Adicionar cupom de desconto
              <i className='bx bx-right-arrow-alt'></i>
            </button>
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>R$ {cartTotal}</span>
        </footer>
      </div>
      <button>Finalizar Compra</button>
    </>
  );
};

export default Summary;
