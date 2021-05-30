import React, { useEffect, useState, useRef, useCallback } from 'react';

import Conta from './conta/Conta';
import Transacoes from './transacoes/Transacoes';
import api from './api';

import './App.css';

export const calcularNovoSaldo = (valores, saldo) => {
  if (valores.transacao === 'deposito') {
    return saldo + parseInt(valores.valor)
  } else {
    return saldo - parseInt(valores.valor);
  }
}

function useMounted() {
  const mountedRef = useRef(true);

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  return useCallback(() => mountedRef.current || false, []);
}

function App() {
  const mounted = useMounted();
  const [saldo, atualizarSaldo] = useState(1000);
  const [transacoes, atualizarTransacoes] = useState([]);

  async function carregarTransacoes() {
    const transacoes = await api.listaTransacoes();
    if(!mounted()) return ;    
    atualizarTransacoes(transacoes);
  }

  async function obterSaldo() {
    const saldo = await api.buscaSaldo();
    if(!mounted()) return ; 
    atualizarSaldo(saldo);
  }

  function realizarTransacao(valores) {  
    const novoSaldo = calcularNovoSaldo(valores, saldo);

    atualizarSaldo(novoSaldo);
    atualizarTransacoes((valoresAtuais) => [...valoresAtuais, valores]);
  }

  useEffect(() => {
     obterSaldo();
     carregarTransacoes();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>ByteBank</h1>
      </header>

      <Conta saldo={saldo} realizarTransacao={realizarTransacao}/>
      <Transacoes transacoes={transacoes} />
    </div>
  );
}

export default App;
