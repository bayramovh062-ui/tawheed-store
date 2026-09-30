import type { productType } from "../redux/slice/productSlice"
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../css/products.css'
import { useState } from "react";

interface propState {
    product: productType
}


function Product({ product }: propState) {
    const [rating, setRating] = useState(2.5) //heleliy sonradan backend den cekilmelidi

    return (
        <div style={{ display: 'flex' }}>
            <Card sx={{ width: '280px', objectFit: 'contain' }}>
                <CardActionArea>
                    <CardMedia component="img" height="310" image={product.image} alt={product.title} />
                    <IconButton sx={{
                        margin: '0'
                    }}><FavoriteBorderIcon /></IconButton>
                    <CardContent>
                        <div style={{ height: '187px' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                <p className="product-title">{product.title}</p>
                            </Typography>
                            <Typography variant='body1' sx={{ color: 'darkorange' }}>
                                {product.price} AZN
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {product.description}
                            </Typography>
                        </div>
                        <Typography>
                            <Stack spacing={1}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}><p style={{ margin: '0', marginRight: '6px' }}>{rating}</p> <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /></div>
                            </Stack>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        see details
                    </Button>
                </CardActions>
            </Card>
        </div >
    )
}

export default Product