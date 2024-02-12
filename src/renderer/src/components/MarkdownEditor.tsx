import {
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'

export const MarkdownEditor = () => {
  return (
    <MDXEditor
      markdown={'# Hello from Esopo Simple Notes'}
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
