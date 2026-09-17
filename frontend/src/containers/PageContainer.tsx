import { Container } from '@mui/material'
import type React from 'react'
function PageContainer({ children }: React.PropsWithChildren) {
    return (
        <div>
            <Container maxWidth='lg'>{children}</Container>
        </div>
    )
}

export default PageContainer