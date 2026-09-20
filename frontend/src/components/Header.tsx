import { Avatar } from '@mui/material'
import '../css/header.css'
import logoImg from '../images/logo.png'
import textImg from '../images/text.png'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function Header() {
    const [isLoggedUser, setIsLoggedUser] = useState(true)

    return (
        <header className="header-wrapper">
            <div className="header-container">
                <div className="left-navbar">
                    <img className="logo-img" src={logoImg} alt="Logo" />
                    <img className="text-img" src={textImg} alt="Brand Name" />
                </div>

                <div className="middle-navbar">
                    <SearchIcon className="search-icon" />
                    <input className="search-input" type="text" placeholder="Search a product" />
                </div>

                <div className="right-navbar">
                    <div className="main-header-icons">
                        <FavoriteIcon className="header-icon" />
                        <ShoppingCartIcon className="header-icon" />
                        <DarkModeIcon className="header-icon" />
                    </div>

                    {!isLoggedUser ? (
                        <div className="login-button-wrapper">
                            <PersonIcon className="person-icon" />
                            <button className="login-register-button">Login/Register</button>
                        </div>
                    ) : (
                        <Avatar className="avatar" alt="your profile" sx={{ bgcolor: 'deepskyblue', width: 45, height: 45 }}>
                            H
                        </Avatar>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header