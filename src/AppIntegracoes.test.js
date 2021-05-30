import React from 'react';
import { render, screen } from '@testing-library/react';


import App from './App';
import api from "./api";

jest.mock('./api')

describe('Requisições para a API', () => {
    it('Exibir lista de transações através da API', async() => {
        api.listaTransacoes.mockResolvedValueOnce([
            {
                "transacao": "deposito",
                "valor": "5",
                "data": "28/05/2021",
                "id": 3
              },
              {
                "transacao": "saque",
                "valor": "20",
                "data": "28/05/2021",
                "id": 4
              }
        ]);

        render (<App />);      

        await screen.findByText('Saque');
       
        expect(screen.getByTestId('transacoes').children.length).toBe(2);

    });
})