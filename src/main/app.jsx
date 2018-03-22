import '../common/template/dependencies' //arquivos estão conectados, então dependencias se estendem para o app
import React from 'react'

import Header from '../common/template/header'

export default props => (
	<div className='wrapper'>
		<Header/>
	</div>
)