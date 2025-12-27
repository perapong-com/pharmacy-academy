
import "./globals.css";
import "../styles/index.scss";
import { AuthProvider } from "@/features/auth";
import { LanguageProvider } from "@/context/LanguageContext";
import { SearchProvider } from "@/context/SearchContext";
import { CartProvider } from "@/features/cart";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            <head>
                <link rel="icon" href="/favicon.svg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Inter font for English */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
                {/* TH Sarabun New font for Thai */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" />
                {/* Font Awesome Icons */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </head>
            <body>
                <LanguageProvider>
                    <AuthProvider>
                        <SearchProvider>
                            <CartProvider>
                                {children}
                            </CartProvider>
                        </SearchProvider>
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
