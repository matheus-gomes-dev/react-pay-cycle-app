import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSummary } from './dashboardActions'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'

class Dashboard extends Component {
	
	//método chamado sempre que elemento for renderizado
	componentWillMount() {
        this.props.getSummary()
    }

	render() {
		const {credit, debt} = this.props.summary //armazenando valores de estado através do redux
		return (
			<div>
				<ContentHeader title="Dashboard" small="Version 1.0"/>
				<Content>
					<div className='row'>
						<ValueBox cols=' 12 4' color='green' icon='bank' value={`R$ ${credit}`} text='Total of Credits'/>
						<ValueBox cols=' 12 4' color='red' icon='credit-card' value={`R$ ${debt}`} text='Total of Debts'/>
						<ValueBox cols=' 12 4' color='blue' icon='money' value={`R$ ${credit-debt}`} text='Balance'/>
					</div>
				</Content>
			</div>
		)
	}
}

const mapStateToProps = state => ({summary: state.dashboard.summary})
const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)