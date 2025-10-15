import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f5f5f5',
                textAlign: 'center',
                py: 2,
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © 2025 EVA Hospital. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
