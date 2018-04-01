import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './billingCycleActions'
import labelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

    calculateSummary() {
        const sum = (t, v) => t + v
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum)
        }
    }

	render() {
        //handleSubmit fica disponível após redux-form
        const { handleSubmit, readOnly, credits, debts } = this.props
        const {sumOfCredits, sumOfDebts} = this.calculateSummary()
        console.log(this.props)
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} label='Name' cols='12 4' placeholder='Inform name' readOnly={readOnly}/>
                    <Field name='month' component={labelAndInput} label='Month' cols='12 4' placeholder='Inform month' type='number' readOnly={readOnly}/>
                    <Field name='year' component={labelAndInput} label='Year' cols='12 4' placeholder='Inform year' type='number' readOnly={readOnly}/>
                    <Summary credit={sumOfCredits} debt={sumOfDebts} />
                    <ItemList cols='12 6' list={credits} readOnly={readOnly} field='credits' legend='Credits'/>
                    <ItemList cols='12 6' list={debts} readOnly={readOnly} field='debts' legend='Debts' showStatus={true}/>
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancel</button>
                </div>
            </form>
        )
    }

}


//export default reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)

//flag destroyOnUnmount garante que valores iniciais enviados para o form serão preservados
BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
const selector = formValueSelector('billingCycleForm');

const mapStateToProps = state => ({credits: selector(state, 'credits'), debts: selector(state, 'debts')}) //extraindo atributo credit do redux-form
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)
