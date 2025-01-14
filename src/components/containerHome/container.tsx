"use client"

import styles from "./container.module.css";
import { useRouter } from "next/navigation";

function Container() {
    const router = useRouter(); 

    const handleNavigate = () => {
        router.push("/pages/planos"); 
    };

    return (
        <div className={styles.lowcontainer}>
        <div className={styles.leftTEXT}>
            <h2>TikDark</h2>
            <h1>Seja TikDark</h1>
            <p>Transforme sua presença no TikTok com nossos pacotes de engajamento personalizados.</p>
        </div>

        <div className={styles.btnconfira}>
            <button onClick={handleNavigate}>Confira</button>
        </div>

        </div>
    );
    }


export default Container;
