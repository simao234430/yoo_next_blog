'use client'
import { FC, useState, useEffect } from 'react'

import { getNodeText, sluggifyTitle } from './sluggify'
import { Icon } from './Icon'
export const PageNavigation: FC<{ headings: DocHeading[] }> = ({ headings }) => {
  // const [activeHeading, setActiveHeading] = useState('')
  const [activeHeading, setActiveHeading] = useState(
    headings.length > 0 ? headings[0].slug : ''
  )
  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (const heading of headings) {
        const slug = sluggifyTitle(getNodeText(heading.title))
        console.log(slug)
        const element = document.getElementById(slug)
        console.log(document.getElementById(slug)?.getBoundingClientRect().top)
        if (element && element.getBoundingClientRect().top < 340)  {
          current = slug
           }
        // current = slug 
      }
      setActiveHeading(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  const headingsToRender = headings.filter((_) => _.level > 1)

  if ((headingsToRender ?? []).length === 0) return null

  return (
    <div className="text-sm sticky top-32  w-80 shrink-0 overflow-y-scroll">
      <h4 className="mb-4 font-medium text-slate-600 dark:text-slate-300">On this page</h4>
      <ul className="space-y-2">
        {headingsToRender.map(({ title, level }, index) => (
          <li key={index}>
        
            <a
              href={`#${sluggifyTitle(getNodeText(title))}`}
              style={{ marginLeft: (level - 2) * 16 }}
              className={`flex ${
                sluggifyTitle(getNodeText(title)) == activeHeading
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <span className="mr-2 mt-[5px] block w-1.5 shrink-0">
                <Icon name="chevron-right" />
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: title.replace('`', '<code style="font-size: 0.75rem;">').replace('`', '</code>'),
                }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
