import React from "react"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='box'>
            <ul className='flex'>
              <li>Terms of Use</li>
              <li>Privacy-Policy</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Watch List</li>
            </ul>
            <p>© 2023 MOVIETICKETZ. All Rights Reserved. </p>
          </div>
          <div className='box'>
            <h3>Follow Us</h3>
            <br></br>
            <img src="https://www.freepnglogos.com/uploads/facebook-logo-icon/facebook-logo-icon-best-facebook-logo-icons-gif-transparent-png-images-21.png" width="40" alt=''></img>
            <img src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-lighting-and-furniture-design-studio-aqua-creations-32.png" width="30" alt=''></img>

            
          </div>
          <div className='box'>
            <h3>MovieTicketz App</h3>
            <div className='img flexSB'>
              <img src='https://img.icons8.com/color/48/000000/apple-app-store--v3.png' alt=''/>
              <span>App Store</span>
              <img src='https://img.icons8.com/fluency/48/000000/google-play.png' alt=''/>
              <span>Google Play Store</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
