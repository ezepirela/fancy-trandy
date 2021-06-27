import React from 'react'
import './Canceled.css'
function Canceled() {
	return (
		<div className='canceled'>
          <h1 className='canceled__title'>Cancelaste el pago. Intenta nuevamente</h1>
          <img alt='canceled' className='canceled__image' src='https://res.cloudinary.com/ezepirela/image/upload/v1624829178/fancytrandy/Denied_npvicr.png' />
		</div>
	)
}

export default Canceled