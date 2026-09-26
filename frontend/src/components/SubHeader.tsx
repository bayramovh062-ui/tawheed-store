import { useEffect } from 'react'
import '../css/subHeader.css'
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import { fetchCategoriesFromBackend } from '../redux/slice/categorySlice'
import { Button } from '@mui/material'
import { IoReorderThreeOutline } from "react-icons/io5";


function SubHeader() {
    const { categories, loading, error } = useSelector((state: RootState) => {
        return state.category
    })
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchCategoriesFromBackend())
    }, [])
    return (
        <header className="sub-header-wrapper">
            <div className="sub-header-container">
                <div className='left-sub-header'>
                    <Button variant="outlined" startIcon={<IoReorderThreeOutline />} sx={{
                        border: 'none',
                        color: 'black',
                        marginTop: '2px',
                        marginRight: '5px'
                    }}>
                        Categories
                    </Button>
                </div>
                <div className='middle-sub-header'>
                    {categories.map((cat) => {
                        return < Category key={cat.id} cat={cat} />
                    })}
                </div>
            </div>
        </header>
    )
}

export default SubHeader