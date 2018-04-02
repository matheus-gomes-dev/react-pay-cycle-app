import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {credits: [{}], debts: [{}]}


//função para ser executada no ato de submit dos forms
function submit(values, method) {
	//É esperado que action creators retornem sempre ações (https://redux.js.org/basics/actions)
	//notar que o retorno não é nada mais do que uma função com callback, retornando várias ações.
	//Notação é um pouco diferente dos demais action creators, mas ver que getList() poderia ser
	//substituido por getList2() (comentado abaixo) e daria na mesma
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucess', 'Operation completed!')
                //posso retornar um array de actions somente porque o middleware redux-multi foi incluído
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.map(error => toastr.error('Error', error))
            })
    }
}


export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values){
	return submit(values, 'post')
}


export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

export function showUpdate(billingCycle) {
    console.log(billingCycle)
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle) //inicializa form com valores pre-definidos para os campos
    ]
}

export function showDelete(billingCycle) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle) //inicializa form com valores pre-definidos para os campos
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
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