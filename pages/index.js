import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Landing from '../components/landing'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'
gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Home() {
  const router = useRouter()
  const [showScrollDown, setShowScrollDown] = useState(true)
  const [width, setWidth] = useState(0)
  const logoRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const logos = logoRef.current.children
    const cards = cardRef.current.children
    const handleScroll = () => {
      setShowScrollDown(false)
    }
    document.addEventListener('scroll', handleScroll)
    gsap.utils.toArray('#smallImageContainer').forEach((smallScreenImg, i) => {
      const smallImg = smallScreenImg.querySelector(`div`)
      smallImg.style.backgroundPosition = `50% ${
        -window.innerHeight / 12 - 150
      }px`
      gsap.to(smallImg, {
        backgroundPosition: `50% ${window.innerHeight / 12}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: smallScreenImg,
          scrub: true,
        },
      })
    })
    const tlFirstInfo = gsap.timeline(),
      splitFirstInfo = new SplitText('#firstSplit', {
        type: 'words,chars',
      }),
      chars = splitFirstInfo.chars
    tlFirstInfo.from(
      chars,
      {
        duration: 0.8,
        opacity: 0,
        y: 10,
        ease: 'circ.out',
        stagger: 0.02,
        scrollTrigger: {
          trigger: '#first',
          start: 'top 75%',
          end: 'bottom center',
          scrub: 1,
        },
      },
      '+=0'
    )
    const tlSecondInfo = gsap.timeline(),
      splitSecondInfo = new SplitText('#secondSplit', {
        type: 'words,chars',
      }),
      charsSecond = splitSecondInfo.chars
    tlSecondInfo.from(
      charsSecond,
      {
        duration: 0.8,
        opacity: 0,
        y: 10,
        ease: 'circ.out',
        stagger: 0.02,
        scrollTrigger: {
          trigger: '#second',
          start: 'top 75%',
          end: 'bottom center',
          scrub: 1,
        },
      },
      '+=0'
    )
    const tlThirdInfo = gsap.timeline(),
      splitThirdInfo = new SplitText('#thirdSplit', {
        type: 'words,chars',
      }),
      charsThird = splitThirdInfo.chars
    tlThirdInfo.from(
      charsThird,
      {
        duration: 0.8,
        opacity: 0,
        y: 10,
        ease: 'circ.out',
        stagger: 0.02,
        scrollTrigger: {
          trigger: '#third',
          end: 'top 25%',
          scrub: 1,
        },
      },
      '+=0'
    )
    gsap.fromTo(
      logos,
      { opacity: 0, y: -20 },
      {
        duration: 0.1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'top bottom',
          end: 'bottom 75%',
        },
      }
    )
    gsap.fromTo(
      cards,
      { opacity: 0 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.1,
        scrollTrigger: {
          trigger: '#grid',
          start: 'top bottom',
          end: 'top center',
        },
      }
    )
    gsap.from('#grid', {
      backgroundColor: 'rgba(0,0,0,0)',
      scrollTrigger: {
        trigger: '#grid',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 'true',
      },
    })
  })

  useEffect(() => {
    setWidth(window.innerWidth)
    console.log(width)
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Insert Productions Limited - Live and virtual event technical
          production.
        </title>
      </Head>
      <Header />
      <div className={styles.hero}>
        <Landing />
        <div
          className={styles.scrollDown}
          style={{ opacity: showScrollDown ? 1 : 0 }}
        />
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeWrapper}>
          <div id='grid' className={`${styles.row} section`}>
            <div className={styles.grid} ref={cardRef}>
              <Link href='/services/live-events'>
                <div className={`${styles.card} hoverCard card`}>
                  <img src='/images/2.jpg' alt='' />
                  <h3>Live</h3>
                  <ul>
                    <li>Conference</li>
                    <li>Exhibition</li>
                    <li>Award Shows</li>
                    <li>Concerts & Live Performance</li>
                    <li>Broadcast & Film</li>
                    <li>Outdoor Events</li>
                    <li>Sporting Events</li>
                  </ul>
                  <div className={styles.cardLine} />
                  <div className={styles.cardLineHover} />
                </div>
              </Link>
              <Link href='/services/virtual-events'>
                <div className={`${styles.card} hoverCard card`}>
                  <img src='/images/2.1.jpg' alt='' />
                  <h3>Virtual</h3>
                  <ul>
                    <li>Remote</li>
                    <li>Studio</li>
                    <li>Green Screen</li>
                    <li>Extended Reality (xR)</li>
                  </ul>
                  <div className={styles.cardLine} />
                  <div className={styles.cardLineHover} />
                </div>
              </Link>
              <Link href='/services/digital'>
                <div className={`${styles.card} hoverCard card`}>
                  <img src='/images/2.2.jpg' alt='' />
                  <h3>Digital</h3>
                  <ul>
                    <li>Software Applications</li>
                    <li>Interactive Applications</li>
                    <li>UI & XI Design</li>
                    <li>Graphic Design</li>
                    <li>3D Visualisation</li>
                    <li>Generative Content</li>
                    <li>AR / xR / VR</li>
                  </ul>
                  <div className={styles.cardLine} />
                  <div className={styles.cardLineHover} />
                </div>
              </Link>
              <Link href='/services/experiential'>
                <div className={`${styles.card} hoverCard card`}>
                  <img src='/images/2.3.jpg' alt='' />
                  <h3>Experiential</h3>
                  <ul>
                    <li>Retail</li>
                    <li>Product Launch</li>
                    <li>Consumer Engagement</li>
                    <li>Pop Up</li>
                    <li>Fan Zone</li>
                    <li>Festival</li>
                  </ul>
                  <div className={styles.cardLine} />
                  <div className={styles.cardLineHover} />
                </div>
              </Link>
              <Link href='/services/av-hire'>
                <div className={`${styles.card} hoverCard card`}>
                  <img src='/images/2.4.jpg' alt='' />
                  <h3>Hire</h3>
                  <ul>
                    <li>Video</li>
                    <li>Lighting</li>
                    <li>Audio</li>
                    <li>Rigging</li>
                    <li>Staging</li>
                  </ul>
                  <div className={styles.cardLine} />
                  <div className={styles.cardLineHover} />
                </div>
              </Link>
            </div>
          </div>
          <div
            className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
            id={width >= 1350 ? 'smallImageContainer' : ''}
          >
            <div
              className={`${styles.imgLeft} ${styles.smallImg}`}
              style={{ backgroundImage: `url(/images/2.10.jpg)` }}
            />
          </div>
          <div className={`${styles.row} ${styles.rowEnd} section`} id='first'>
            <div className={`${styles.info} ${styles.infoFirst}`}>
              <img
                className={`${styles.bts} ${styles.bts1}`}
                src='/home-2.png'
              />
              <h3 id='firstSplit'>Creative excellence with global reach</h3>
              <Link href='/contact'>
                <button className={styles.viewButton}>
                  <div className={styles.underlay}></div>
                  <span>Find out more</span>
                </button>
              </Link>
            </div>
          </div>
          <div className={`${styles.row} section`}>
            <div className={`${styles.fullImg}`}>
              <div style={{ backgroundImage: `url(/home-3.jpg)` }} />
            </div>
          </div>
          <div
            className={`${styles.row} ${styles.rowStart} section`}
            id='second'
          >
            <div className={`${styles.info} ${styles.infoFirst}`}>
              <img
                className={`${styles.bts} ${styles.bts2}`}
                src='/images/2.18.jpg'
              />
              <p style={{ textTransform: 'uppercase' }}>
                Matt Mullenweg - Social media entrepreneur
              </p>

              <h3 id='secondSplit'>
                "Technology is best when it brings people together".
              </h3>
              <button className={styles.viewButton}>
                <div className={styles.underlay}></div>
                <span>Find out more</span>
              </button>
            </div>
          </div>
          <div
            className={`${styles.row} ${styles.rowImages} ${styles.rowShort} section`}
          >
            <div
              id={width >= 1350 ? 'smallImageContainer' : ''}
              className={`${styles.fullImg} ${styles.mobileRemoveImg}`}
            >
              <div />
            </div>
            <img
              className={`${styles.bts} ${styles.bts3}`}
              src='/images/2.17.jpg'
            />
          </div>
          <div
            className={`${styles.row} ${styles.rowCentre} section`}
            style={{ position: 'relative' }}
          >
            <div className={styles.brands}>
              <div className={styles.brandsLine}></div>
              <h1>Brands we work with</h1>
            </div>
            <div className={styles.logoGrid} ref={logoRef}>
              <img src='/images/logo-pernot.svg' alt='' />
              <img src='/images/logo-adidas.svg' alt='' />
              <img src='/images/logo-amex.svg' alt='' />
              <img src='/images/logo-netflix.svg' alt='' />
              <img src='/images/logo-microsoft.svg' alt='' />
              <img src='/logo-yamaha.svg' alt='' />
              <img src='/logo-digitain.png' alt='' />
              <img src='/logo-tiktok.svg' alt='' />
            </div>
          </div>
          <div className={`${styles.contentLeftContainer} section`} id='third'>
            <div className={styles.contentLeft}>
              <div className={styles.content}>
                <h2>Our Clients</h2>
                <div className={styles.sectionLine} />
                <button className={styles.viewButton}>
                  <div className={styles.underlay}></div>
                  <span>Work with us</span>
                </button>
              </div>
              <p id='thirdSplit'>
                At Insert Productions, we take great pride in our client-centric
                approach. We believe that the success of our clients is our
                success, and we are committed to forming strong, collaborative
                partnerships and working closely with them to deliver
                exceptional value and achieve mutual goals. Our client list
                speaks volumes. From our inception, we have represented a
                diverse spectrum of brands, spanning from startups to
                World-renowned enterprises, all underpinned by the same
                dedicated partnership approach. Every day has seen us
                wholeheartedly committing our expertise and passion to our
                clients, resulting in remarkable successes and the cultivation
                of enduring relationships.
              </p>
              <p id='thirdSplit'></p>
            </div>
          </div>
          <div className={`${styles.contentFull} section`}>
            <img src='/images/2.33.jpg' alt='' style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      <div className='wrapper' style={{ background: '#070707' }}>
        <div
          className='backToTop'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <p>BACK TO TOP</p>
          <div />
        </div>
      </div>
      <Footer top={-1} bg={router.pathname === '/' ? '#070707' : 'none'} />
    </div>
  )
}
