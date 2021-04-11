import React from 'react'
import { Link } from 'react-router-dom';
function Canceled() {
	return (
		<div className='canceled'>
          <h1>Your payment was canceled</h1>
          <Link to="/">Restart demo</Link>

		</div>
	)
}

export default Canceled