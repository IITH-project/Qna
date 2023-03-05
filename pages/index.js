import React from 'react'
import styles from '@/styles/frame1.module.css'
import Link from 'next/link'
import Typing from '@/components/Typewriting'
import { motion as m,AnimatePresence } from "framer-motion"

const Home = (props) => {
  return (
    <AnimatePresence>
    <m.div initial={{y:-10}} animate={{y:0}} transition={{duration:0.55,ease:"easeOut"}}
    exit={{y:-1000}}
    >
      <div className={styles['frame1']}>
        <img
          src="/img/home_bac.png"
          alt="wallpaperflare11548"
          className={styles['wallpaperflare1']}
        />
        <div className='frame'>
        <a href='http://localhost:3000/frontPage/1'>
          <span className={styles['text']}>Home</span>
        </a>
        <a href='https://github.com/websiteSuraj/Qna#report'>
        <span className={styles['text02']}>Blog</span>
        </a>
        <a href='https://github.com/websiteSuraj/Qna#contribution-of-each-group-member-in-the-implementation-'>
        <span className={styles['text04']}>About us</span>
        </a>
        <a>
        <span className={styles['text06']}>Contact</span>
        </a>
        </div>
        <div className={styles.Typing}>
          <h1 className={styles.develop}>Developers</h1>
        <Typing/>
        </div>
        <img
          src="/img/Discussion.png"
          alt="IMAGE551621566"
          className={styles['i-m-a-g-e55162']}
        />
        <span className={styles['text08']}>
        We Are Here To Help You
        </span>
        <span className={styles['text10']}>
          <span>
            “The most important thing any teacher has to learn, not to be
            learned in any school of education I ever heard of, can be expressed
            in seven words: Learning is not the product of teaching. Learning is
            the product of the activity of learners.”
          </span>
        </span>

        <img
          src="/img/Ellipse 1.png"
          alt="Ellipse11669"
          className={styles['ellipse1']}
        />
        <span className={styles['text12']}>
          <span>QnA</span>
        </span>
        {/* <img
          src="/img/Rectangle 6.png"
          alt="Rectangle61672"
          className={styles['rectangle6']}
        /> */}
        <span className={styles['text14']}>
          {/* <button href='/frontPage/1' type="button">Try Now</button> */}
          <Link href='/frontPage/1'>Try Now</Link>
        </span>
      </div>
    </m.div>
    </AnimatePresence>
  )
}

export default Home
