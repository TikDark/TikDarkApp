import React from 'react';
import styles from '@/components/Copyright/copy.module.css';

function Copy() {
    return (
        <div className={styles.Copy}>
            <p className={styles.CopyRight}>©2025</p>
            <p className={styles.textCopy}>Deixe o algoritmo dançar ao som do seu sucesso</p>
        </div>
    );
}

export default Copy;
