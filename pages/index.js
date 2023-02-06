import React from 'react'
import styles from '@/styles/frame1.module.css'
import Link from 'next/link'

const Home = (props) => {
  return (
    <div >
      <div className={styles['frame1']}>
        <img
          src="/img/home_bac.png"
          alt="wallpaperflare11548"
          className={styles['wallpaperflare1']}
        />
        <div className='frame'>
        <img
          src="/img/Rectangle 1.png"
          alt="Rectangle11549"
          className={styles['rectangle1']}
        />
        <img
          src="/img/Rectangle 3.png"
          alt="Rectangle31550"
          className={styles['rectangle3']}
        />
        <img
          src="/img/Rectangle 4.png"
          alt="Rectangle41551"
          className={styles['rectangle4']}
        />
        <img
          src="/img/Rectangle 2.png"
          alt="Rectangle21552"
          className={styles['rectangle2']}
        />
        <span className={styles['text']}>
          <span>Home</span>
        </span>
        <span className={styles['text02']}>
          <span>Blog</span>
        </span>
        <span className={styles['text04']}>
          <span>Pages</span>
        </span>
        <span className={styles['text06']}>
          <span>Contact</span>
        </span>
        </div>

        <img
          src="/img/Discussion.png"
          alt="IMAGE551621566"
          className={styles['i-m-a-g-e55162']}
        />
        <span className={styles['text08']}>
          <span>We Are Here To Help You</span>
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
        <img
          src="/img/Rectangle 6.png"
          alt="Rectangle61672"
          className={styles['rectangle6']}
        />
        <span className={styles['text14']}>
          <Link href='/frontPage'>Try Now</Link>
        </span>
      </div>
    </div>
  )
}

export default Home
