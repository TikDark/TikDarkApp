"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from '@/components/navbar/navbar.module.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [subMenu, setSubMenu] = useState({ planos: false, personalizado: false });

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSubMenu = (key: "planos" | "personalizado") => {
        setSubMenu((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
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
            <div className={styles.logo}>
                <Image src="/assets/Logo.svg" alt="Logo" width={32} height={39} />
            </div>

            <div className={styles['Nav-links']}>
                    <Link href="#">Planos</Link>
                    <Link href="#" className={styles['a-home']}>Home</Link>
                    <Link href="#">Personalizado</Link>
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
                                        <Link href="#">Teste 1</Link>
                                        <Link href="#">Teste 2</Link>
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
                                        <Link href="#">Teste 1</Link>
                                        <Link href="#">Teste 2</Link>
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
