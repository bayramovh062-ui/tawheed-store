import '../css/subHeader.css'
import { Button } from '@mui/material'
import { useState } from 'react';
import { BiSolidCategoryAlt } from "react-icons/bi";
import Drawer from '@mui/material/Drawer';

function SubHeader() {
    const [isClicked, setIsClicked] = useState(false)

    return (
        <header className="sub-header-wrapper">
            <div className="sub-header-container">
                <Button variant="contained" startIcon={<BiSolidCategoryAlt />} size='small' onClick={() => {
                    setIsClicked(!isClicked)
                }}>
                    Categories
                </Button>
                <Drawer open={isClicked} anchor='right' onClose={() => {
                    setIsClicked(!isClicked)
                }}>
                </Drawer>
            </div>
        </header>
    )
}

export default SubHeader