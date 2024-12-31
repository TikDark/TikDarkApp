"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import styles from '@/components/navbar/navbar.module.css';

function Navbar() {
    const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
    const [menuOpen, setMenuOpen] = useState(false);
    const [subMenu, setSubMenu] = useState({ planos: false, personalizado: false });
    const router = useRouter();
    const pathname = usePathname(); // Obtenha o pathname atual da URL

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSubMenu = (key: "planos" | "personalizado") => {
        setSubMenu((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const navigateTo = (path: string) => {
        router.push(path);
        setCurrentPath(path); // Atualiza o estado com o novo caminho
    };


    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("menuOpen");
        } else {
            document.body.classList.remove("menuOpen");
        }

        return () => {
            document.body.classList.remove("menuOpen");
        };
    }, [menuOpen]);

    return (
        <div className={styles.navbar}>
            <div 
                className={styles.logo} 
                onClick={() => navigateTo("/")}
                style={{cursor: 'pointer'}}
            >
                <Image src="/assets/Logo.svg" alt="Logo" width={32} height={39} />
            </div>

            <div className={styles['Nav-links']}>
                <div
                    onClick={() => navigateTo("/pages/planos")}
                    className={pathname === "/pages/planos" ? styles.activeLink : ""}
                >
                    Planos
                </div>
                <div
                    onClick={() => navigateTo("/")}
                    className={pathname === "/" ? styles.activeLink : ""}
                >
                    Home
                </div>
                <div
                    onClick={() => navigateTo("/pages/personalizado")}
                    className={pathname === "/pages/personalizado" ? styles.activeLink : ""}
                >
                    Personalizado
                </div>
            </div>


            <div></div>

            <div className={styles["Menu-mobile"]}>
                <button onClick={toggleMenu} className={styles.menuButton}>
                    {menuOpen ? 'Fechar' : 'Menu'}
                </button>
                {menuOpen && (
                    <div className={styles.mobileMenuContainer}>
                        <button onClick={toggleMenu} className={styles.closeButton}>
                            Fechar
                            <span className={styles.svgWrapper}>
                                <Image src="/assets/Ellipse.svg" alt="Elipse" width={9} height={9} />
                            </span>
                        </button>

                        <div className={styles.mobileLinks}>
                            <div>
                                <button
                                    onClick={() => toggleSubMenu("planos")}
                                    className={styles.subMenuButton}
                                >
                                    Planos
                                </button>
                                {subMenu.planos && (
                                    <div className={styles.subLinks}>
                                        <button onClick={() => navigateTo("/pages/planos/teste1")}>Teste 1</button>
                                        <button onClick={() => navigateTo("/pages/planos/teste2")}>Teste 2</button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <button
                                    onClick={() => toggleSubMenu("personalizado")}
                                    className={styles.subMenuButton}
                                >
                                    Personalizado
                                </button>
                                {subMenu.personalizado && (
                                    <div className={styles.subLinks}>
                                        <button onClick={() => navigateTo("/pages/personalizado/teste1")}>Teste 1</button>
                                        <button onClick={() => navigateTo("/pages/personalizado/teste2")}>Teste 2</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
