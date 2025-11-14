import { useEffect, useState, useRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

const srOnlyStyles: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
}

export interface DecryptedTextProps extends HTMLMotionProps<'span'> {
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: 'start' | 'end' | 'center'
  useOriginalCharsOnly?: boolean
  characters?: string
  className?: string
  parentClassName?: string
  encryptedClassName?: string
  animateOn?: 'view' | 'hover' | 'both'
}

const defaultCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+'

const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = defaultCharacters,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    let currentIteration = 0

    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length
      switch (revealDirection) {
        case 'start':
          return revealedSet.size
        case 'end':
          return textLength - 1 - revealedSet.size
        case 'center': {
          const middle = Math.floor(textLength / 2)
          const offset = Math.floor(revealedSet.size / 2)
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex
          }
          for (let i = 0; i < textLength; i += 1) {
            if (!revealedSet.has(i)) return i
          }
          return 0
        }
        default:
          return revealedSet.size
      }
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('')

    const shuffleText = (originalText: string, currentRevealed: Set<number>): string => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split('').map((char, i) => ({
          char,
          isSpace: char === ' ',
          index: i,
          isRevealed: currentRevealed.has(i),
        }))

        const nonSpaceChars = positions.filter((p) => !p.isSpace && !p.isRevealed).map((p) => p.char)

        for (let i = nonSpaceChars.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]]
        }

        let charIndex = 0
        return positions
          .map((p) => {
            if (p.isSpace) return ' '
            if (p.isRevealed) return originalText[p.index]
            const nextChar = nonSpaceChars[charIndex]
            charIndex += 1
            return nextChar
          })
          .join('')
      }

      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (currentRevealed.has(i)) return originalText[i]
          return availableChars[Math.floor(Math.random() * availableChars.length)]
        })
        .join('')
    }

    if (isHovering) {
      setIsScrambling(true)
      interval = setInterval(() => {
        setRevealedIndices((prev) => {
          if (sequential) {
            if (prev.size < text.length) {
              const nextIndex = getNextIndex(prev)
              const newRevealed = new Set(prev)
              newRevealed.add(nextIndex)
              setDisplayText(shuffleText(text, newRevealed))
              return newRevealed
            }
            clearInterval(interval)
            setIsScrambling(false)
            return prev
          }
          setDisplayText(shuffleText(text, prev))
          currentIteration += 1
          if (currentIteration >= maxIterations) {
            clearInterval(interval)
            setIsScrambling(false)
            setDisplayText(text)
          }
          return prev
        })
      }, speed)
    } else {
      setDisplayText(text)
      setRevealedIndices(new Set())
      setIsScrambling(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [animateOn, characters, isHovering, maxIterations, revealDirection, sequential, speed, text, useOriginalCharsOnly])

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'both') return

    const currentRef = containerRef.current
    if (!currentRef) return

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHovering(true)
        } else {
          setIsHovering(false)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.35,
    })

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [animateOn])

  const hoverProps: Partial<HTMLMotionProps<'span'>> =
    animateOn === 'hover' || animateOn === 'both'
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {}

  return (
    <motion.span ref={containerRef} className={parentClassName} style={{ display: 'inline-block', position: 'relative' }} {...hoverProps} {...props}>
      <span style={srOnlyStyles}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const revealed = revealedIndices.has(index) || !isScrambling || !isHovering
          return (
            <span key={index} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}

export default DecryptedText

