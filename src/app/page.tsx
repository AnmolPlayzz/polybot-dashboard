import styles from './landing.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className={styles.landingMain}>
            <div className={styles.landingImageContainer}>
                <Image src="/images/landing.png" alt="landing image" className={styles.landingImageBottom} width={400} height={400} quality={100} layout="intrinsic" />
                <Image src="/images/landing.png" alt="landing image" className={styles.landingImageTop} width={400} height={400} quality={100} layout="intrinsic" />
            </div>
            <div className={styles.landingTextContainer}>
                <h1 className={styles.h1}>Welcome to the Dashboard!</h1>
                <p className={styles.p}>
                    Log in with discord to enable Modules and customize how PolyBot behaves in your server.
                </p>
                <div className={styles.landingButtonContainer}>
                    <Link className={styles.landingLoginButton} href="/api/auth/login">
                        <Image src="/images/home-discord.svg" alt="discord icon image" className={styles.landingLoginButtonImg} width={20} height={20} quality={100} layout="intrinsic" />
                        <p className={styles.p}>
                            Log in
                        </p>
                    </Link>
                    <a href="https://polybot-website.vercel.app/" target="_blank" className={styles.landingRedirectButton}>
                        <Image src="/images/landing-redirect.svg" alt="website redirect image" width={16} height={16} quality={100} layout="intrinsic" />
                        <p className={styles.p}>
                            Website
                        </p>
                    </a>
                </div>
            </div>
        </div>
    )
}
