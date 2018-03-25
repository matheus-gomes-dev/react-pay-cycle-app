import '../common/template/dependencies' //arquivos estão conectados, então dependencias se estendem para o app
import React from 'react'

import Header from '../common/template/header'
import SideBar from '../common/template/sideBar'
import Footer from '../common/template/footer'
import Router from './routes'

export default props => (
	<div className='wrapper'>
		<Header/>
		<SideBar/>
		<div className='content-wrapper'>
			<Router/>
		</div>
		<Footer/>
	</div>
)