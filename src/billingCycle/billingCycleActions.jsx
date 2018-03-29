import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {reset as resetForm } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
const BASE_URL = 'http://localhost:3003/api'

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values){
	//É esperado que action creators retornem sempre ações (https://redux.js.org/basics/actions)
	//notar que o retorno não é nada mais do que uma função com callback, retornando várias ações.
	//Notação é um pouco diferente dos demais action creators, mas ver que getList() poderia ser
	//substituido por getList2() (comentado abaixo) e daria na mesma
	return actions => {
		axios.post(`${BASE_URL}/billingCycles`, values)
			.then(resp => {
				toastr.success('Sucesso', 'Operação realizada com sucesso!')
				//posso retornar um array de actions somente porque o middleware redux-multi foi incluído
				actions([
					resetForm('billingCycleForm'),
					getList(),
					selectTab('tabList'),
					showTabs('tabList', 'tabCreate')
				])
			})
			.catch(e => {
				e.response.data.errors.map(error => toastr.error('Erro', error))
			})
	}
}

export function showUpdate(billingCycle) {
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate')
    ]
}

/*
export function getList2() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return function(cb) {
    	cb({
	        type: 'BILLING_CYCLES_FETCHED',
    	    payload: request
    	})
    }
}
*/