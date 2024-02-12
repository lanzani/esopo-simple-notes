import {
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '../hooks/useMarkdownEditor'
import iconPNG from '@/assets/full_icon.png'

export const MarkdownEditor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()

  if (!selectedNote) {
    return (
      <>
        <div className="flex h-screen">
          <div className="m-auto">
            <img className="h-60 w-60 m-auto" src={iconPNG}></img>
            <br></br>
            <p className="m-auto">Great stories starts with a simple note...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin()
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] prose-hr:my-10 prose-hr:h-px prose-hr:my-8 prose-hr:bg-gray-200 prose-hr:border-0"
    />
  )
}
