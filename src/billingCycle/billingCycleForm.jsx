import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { init } from './billingCycleActions'
import labelAndInput from '../common/form/labelAndInput'
import CreditList from './creditList'

class BillingCycleForm extends Component {

	render() {
        //handleSubmit fica disponível após redux-form
        const { handleSubmit, readOnly } = this.props
        console.log(this.props)
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} label='Name' cols='12 4' placeholder='Inform name' readOnly={readOnly}/>
                    <Field name='month' component={labelAndInput} label='Month' cols='12 4' placeholder='Inform month' type='number' readOnly={readOnly}/>
                    <Field name='year' component={labelAndInput} label='Year' cols='12 4' placeholder='Inform year' type='number' readOnly={readOnly}/>
                    <CreditList cols='12 6'/>
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
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(BillingCycleForm)
