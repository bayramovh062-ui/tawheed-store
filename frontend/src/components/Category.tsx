import Link from '@mui/material/Link';
import '../css/subHeader.css'
import type { category } from '../redux/slice/categorySlice';
interface CategoryProps {
    cat: category
}

function Category({ cat }: CategoryProps) {
    return (
        <div >
            <Link underline='none' sx={{
                color: 'black',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                margin: '0 10px',

                '&:hover': {
                    cursor: 'pointer',
                    color: ' rgb(242, 122, 26)',
                    textDecoration: 'underline solid rgb(242, 122, 26) 2px',
                    textUnderlineOffset: '6px'
                }
            }} >{cat.name}</Link>

        </div>
    )
}

export default Category