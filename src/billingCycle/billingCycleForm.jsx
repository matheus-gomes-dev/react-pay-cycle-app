import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import labelAndInput from '../common/form/labelAndInput'

class BillingCycleForm extends Component {

	render() {
        const { handleSubmit } = this.props
        console.log(handleSubmit)
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} label='Name' cols='12 4' placeholder='Inform name'/>
                    <Field name='month' component={labelAndInput} label='Month' cols='12 4' placeholder='Inform month' type='number'/>
                    <Field name='year' component={labelAndInput} label='Year' cols='12 4' placeholder='Inform year' type='number'/>
                </div>
                <div className='box-footer'>
                    <button type='submit' className='btn btn-primary'>
                        Submit
                    </button>
                </div>
            </form>
        )
    }

}

export default reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
//flag destroyOnUnmount garante que valores iniciais enviados para o form serão preservados