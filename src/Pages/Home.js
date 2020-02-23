import React from 'react';
import {Link} from 'react-router-dom'
import Background from '../Components/Background'


const Home = () =>{
    return (
      <>
        <Background />
        <div className="home__container">
          <div className="home__header">
            <div>
              <Link className="home__navLink" to="/">
                <h1>NoteMaster</h1>
              </Link>
            </div>
            <nav>
              <Link className="home__navLink" to="/About">
                About
              </Link>
              <Link className="home__navLink" to="/Funct">
                Functionalities
              </Link>
              <Link className="home__navLink" to="/Contact">
                Contact
              </Link>
              <Link className="home__loginLink" to="/Login">
                Login
              </Link>
            </nav>
          </div>
          <div className="home__textWrapper">
            <p>
              „Why take notes? The obvious reason is to remember. Visual
              note-taking translates what we hear into pictures that give
              context, color, and meaning. By adding symbols, visual metaphors,
              likenesses of people, and room layouts, we add several
              dimensions.“
            </p>
            <p className="home__textWrapper--autor"> - Tom Wujec</p>
          </div>
        </div>
      </>
    );
}

export default Home