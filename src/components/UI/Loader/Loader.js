// from loader.io/css
import React from 'react'
import './Loader.css'

const Loader = () => {
	return (
		<div style={{textAlign: 'center'}}>
			<div className="lds-facebook">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loader
