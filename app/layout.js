import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Course Helper',
  description: 'A platform to manage and discover courses',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
                Course Helper
              </Link>
            </Typography>
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}