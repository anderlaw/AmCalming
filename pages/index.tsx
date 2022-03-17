import type {NextPage} from 'next'
import styles from '../styles/website.module.css'
import menuStyles from "*.module.css";

const Divider = () => {
    return <div style={{display: 'flex', justifyContent: 'center', margin: '40px 0'}}>
        <div style={{width: '50%', height: '1px', backgroundColor: '#e3e3e3'}}></div>
    </div>
}
const FeatureTitle = () => {
    return <h3 style={{textAlign: 'center', margin: '50px 0', fontSize: '24px'}}>功能特点（Features）</h3>
}
const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <h1 className={styles.logo_box}>Am<span className={styles.logo_box_strong}>Calming</span>.com</h1>
                <button className={styles.button}>Donate</button>
            </div>
            <div className={`${styles.leftRightLayout} ${styles.banner}`}>
                <div className={styles.bannerLeft}>
                    <p>With <span className={styles.bannerLeft_text_strong}>Sleep Better</span></p>
                    <p>You can sleep and feel better</p>
                    <button className={`${styles.button} ${styles.button_banner}`}>立刻开始（begin now）</button>
                </div>
                <div className={styles.bannerRight}>
                    <img src={'/girl-music.png'}/>
                </div>
            </div>
            <FeatureTitle/>
            <div className={styles.cardContainer}>
                <div className={`${styles.leftRightLayout} ${styles.card}`}>
                    <div className={styles.cardImage}>
                        <img src="/player.jpeg" alt=""/>
                    </div>
                    <div className={styles.cardWord}>
                        <p>巧妙的<span className={styles.cardWord_strong}>混合式播放</span></p>
                        <p>可轻松定制属于你自己的绝佳收听体验</p>
                    </div>
                </div>
                <Divider/>
                <div className={`${styles.leftRightLayout} ${styles.card}`}>
                    <div className={styles.cardWord}>
                        <p>舒心的<span className={styles.cardWord_strong}>定时关闭</span>功能</p>
                        <p>放松、助睡眠二合一，让您更无忧</p>
                    </div>
                    <div className={styles.cardImage}>
                        <img src="/player.jpeg" alt=""/>
                    </div>
                </div>
                <Divider/>
                <div className={`${styles.leftRightLayout} ${styles.card}`}>
                    <div className={styles.cardImage}>
                        <img src="/player.jpeg" alt=""/>
                    </div>
                    <div className={styles.cardWord}>
                        <p>用心的<span className={styles.cardWord_strong}>黑白</span>主题设计</p>
                        <p>让您在夜间也能静心从容</p>
                    </div>
                </div>
                <Divider/>
                <div className={`${styles.leftRightLayout} ${styles.card}`}>
                    <div className={styles.cardWord}>
                        <p>上百首<span className={styles.cardWord_strong}>免费</span>高清音乐</p>
                        <p>还有,更多</p>
                        <button style={{marginTop:'14px'}} className={styles.button}>马上开始</button>
                    </div>
                    <div className={styles.cardImage}>
                        <img src="/player.jpeg" alt=""/>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                 &copy; 2022 AmCalming.com. All rights reserved.
            </footer>
        </div>
    )
}

export default Home