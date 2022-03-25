import React from "react";
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
    return(
        <MDBFooter bgColor='light' className='text-center text-lg-left'>
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(255, 255, 255, 38)' }}>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a className='text-dark' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ%27%3E'>
            Bhismo
          </a>
        </div>
      </MDBFooter>
    )
}
export default Footer;