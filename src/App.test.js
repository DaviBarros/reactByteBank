import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App, { calcularNovoSaldo } from './App';

describe('Componente principal', () => {

    describe('Quando eu abro o app do banco ',() => {

        it('O nome é exibido', async () => {
            render(<App />);
            expect(await screen.findByText('ByteBank')).toBeInTheDocument();
        })
    
        it('O saldo é exibido', async () => {
    
            render(<App />);
        
            expect(await screen.findByText('Saldo:')).toBeInTheDocument();
        
        })
    
        it('O botão de realizar transação é exibido', async () => {
    
            render(<App />);
        
            expect(await screen.getByText('Realizar operação')).toBeInTheDocument();
        
        })

    })


    describe('Quando eu realizo uma transação ',() => {

        xit('que é um saque o valor vai diminuir', () => {

            const valores = {
                transacao: 'saque',
                valor:50
            }

            const novoSaldo = calcularNovoSaldo(valores,150);
            expect(novoSaldo).toBe(100);
        })

        it('que é um saque, a transação deve ser realizada', async () => {
            
            render(<App />);
            
            const saldo = await screen.findByText('R$ 1000');

            expect(saldo).toBeInTheDocument();

            const tipoTransacao = screen.getByLabelText('Saque');
            const valor = screen.getByTestId('valor'); 
            const botaoTransacao = screen.getByText('Realizar operação');            
            
 
            fireEvent.click(tipoTransacao, {target: {value: 'saque'}});
            fireEvent.change(valor, {target: {value: 10}});
            fireEvent.click(botaoTransacao);

            const novoSaldo = await screen.findByText('R$ 990')

            expect(saldo).toBe(novoSaldo);
           
        })
    
     

    })

    
})

//se digitar xit desabilita o it
