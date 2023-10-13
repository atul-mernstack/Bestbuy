import React from 'react'
import './Whatsappconnect.css'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';


const Whatsappconnect = () => {

    const URL="https://wa.me/+917497925101?text=Hi Ecommerce"
  return <>
  <a   href={URL} target="_blank">
  <WhatsAppIcon class="whats-app"/>
</a>
  </>
}

export default Whatsappconnect