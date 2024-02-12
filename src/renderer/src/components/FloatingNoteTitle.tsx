import {
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'
import { twMerge } from 'tailwind-merge'
import { ComponentProps } from 'react'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const title = 'Note title'
  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{title}</span>
    </div>
  )
}
