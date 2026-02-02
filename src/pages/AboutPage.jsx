import styles from './about.module.css'

export function AboutPage() {
    return (
    <div className={styles.contentWrapper}>
        <div className={styles.gridItem1}>
            <img src="/media/vicky-portrait-square-overflow.png" alt="Vicky Bilbily self-portrait" title="Self-portrait by me!"/>
        </div>
        <div className={styles.gridItem2 + " fade-in"}>
            <div className={styles.aboutGrid}>
                <div className={styles.aboutContent}>
                    <h1>Hi! I'm Vicky.</h1>

                    I love to make things. I draw from expertise in software engineering, human-computer interaction,
                    and visual art to create experiences that are reliable, intentional, and delightful.  
                </div>
            </div>
        </div>
    </div>
    )
}