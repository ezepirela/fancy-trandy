import React from 'react'
import { Link } from 'react-router-dom';
function Success() {
	return (
		<div className='success'>
			<div className="sr-payment-summary completed-view">
          		<h1>Your payment succeeded</h1>
           		<Link to="/">Restart demo</Link>
        	</div>
		</div>
	)
}

export default Success