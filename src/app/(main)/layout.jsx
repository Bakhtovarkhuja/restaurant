'use client';

import { AppProvider, DashboardLayout } from '@toolpad/core';
import { extendTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import BarChartIcon from '@mui/icons-material/BarChart';
import LoginIcon from '@mui/icons-material/Login';
// import Header from '@/app/components/layout/header';

const NAVIGATION = [
//   { kind: 'header', title: 'Основное' },
  { segment: '', title: 'Рабочий', icon: <PersonIcon /> },
  { segment: 'orders', title: 'Заказы', icon: <ShoppingCartIcon /> },
  { segment: 'products', title: 'Товары', icon: <LayersIcon /> },
  { segment: 'other', title: 'Другое', icon: <BarChartIcon /> },
  { segment: 'login', title: 'Выйти', icon: <LoginIcon /> },
];

const theme = extendTheme({
  palette: {
    primary: {
      main: '#6B4C3B',  // коричневый цвет
      light: '#8B6B53',
      dark: '#4A3425',
    },
    // можно добавить дополнительные цвета, если нужно
  },
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
});


function useNextRouter() {
  const pathname = usePathname();
  const router = useRouter();

  return {
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (href) => router.push(href),
  };
}

export default function RootLayout({ children }) {
  const router = useNextRouter();

  return <>
    <html lang="ru">
      <body>
        <AppProvider theme={theme} navigation={NAVIGATION} router={router}>
          <DashboardLayout>
            {/* <Header /> */}
            {children}
          </DashboardLayout>
        </AppProvider>
      </body>
    </html>
  </>
}
