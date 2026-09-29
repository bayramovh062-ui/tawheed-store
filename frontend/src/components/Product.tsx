import type { productType } from "../redux/slice/productSlice"
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../css/products.css'

interface propState {
    product: productType
}

function Product({ product }: propState) {
    return (
        <div style={{ display: 'flex' }}>
            <Card sx={{ width: '280px', objectFit: 'contain' }}>
                <CardActionArea>
                    <CardMedia component="img" height="320" image={product.image} alt={product.title} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant='body1' sx={{ color: 'darkorange' }}>
                            {product.price} AZN
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {product.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        details
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product