import { useRef, useState, useEffect, type ReactNode, type MouseEventHandler, type UIEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import './animated-list.css'

interface AnimatedItemProps {
  children: ReactNode
  delay?: number
  index: number
  onMouseEnter?: MouseEventHandler<HTMLDivElement>
  onClick?: MouseEventHandler<HTMLDivElement>
}

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }: AnimatedItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: false })
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      className="reactbits-animated-item"
    >
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps {
  items?: string[]
  onItemSelect?: (item: string, index: number) => void
  showGradients?: boolean
  enableArrowNavigation?: boolean
  className?: string
  itemClassName?: string
  displayScrollbar?: boolean
  initialSelectedIndex?: number
}

const AnimatedList = ({
  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
  ],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
}: AnimatedListProps) => {
  const listRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex)
  const [keyboardNav, setKeyboardNav] = useState(false)
  const [topGradientOpacity, setTopGradientOpacity] = useState(0)
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1)

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const { scrollTop, scrollHeight, clientHeight } = target
    setTopGradientOpacity(Math.min(scrollTop / 50, 1))
    const bottomDistance = scrollHeight - (scrollTop + clientHeight)
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1))
  }

  useEffect(() => {
    if (!enableArrowNavigation) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault()
          onItemSelect?.(items[selectedIndex], selectedIndex)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableArrowNavigation, items, onItemSelect, selectedIndex])

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return
    const container = listRef.current
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null
    if (selectedItem) {
      const extraMargin = 50
      const { scrollTop, clientHeight } = container
      const itemTop = selectedItem.offsetTop
      const itemBottom = itemTop + selectedItem.offsetHeight
      if (itemTop < scrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' })
      } else if (itemBottom > scrollTop + clientHeight - extraMargin) {
        container.scrollTo({ top: itemBottom - clientHeight + extraMargin, behavior: 'smooth' })
      }
    }
    setKeyboardNav(false)
  }, [keyboardNav, selectedIndex])

  return (
    <div className={`reactbits-scroll-list-container ${className}`}>
      <div
        ref={listRef}
        className={`reactbits-scroll-list ${!displayScrollbar ? 'reactbits-no-scrollbar' : ''}`}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={item}
            delay={0.12}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index)
              onItemSelect?.(item, index)
            }}
          >
            <div className={`reactbits-item ${selectedIndex === index ? 'selected' : ''} ${itemClassName}`}>
              <p className="reactbits-item-text">{item}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div className="reactbits-top-gradient" style={{ opacity: topGradientOpacity }} />
          <div className="reactbits-bottom-gradient" style={{ opacity: bottomGradientOpacity }} />
        </>
      )}
    </div>
  )
}

export default AnimatedList


