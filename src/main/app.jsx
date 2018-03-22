import '../common/template/dependencies' //arquivos estão conectados, então dependencias se estendem para o app
import React from 'react'

import Header from '../common/template/header'
import SideBar from '../common/template/sideBar'

export default props => (
	<div className='wrapper'>
		<Header/>
		<SideBar/>
	</div>
)