'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'

// Register plugins (safe to call multiple times)
gsap.registerPlugin(ScrollTrigger, SplitText, Flip)

export { gsap, ScrollTrigger, SplitText, Flip }
