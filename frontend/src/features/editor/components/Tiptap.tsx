import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle, Color } from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import { BulletList, ListItem, OrderedList, TaskItem, TaskList } from '@tiptap/extension-list'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import { FloatingToolbar } from './FloatingToolbar'
import { useMemo } from 'react'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        heading: false,
      }),
      Link.configure({
        openOnClick: false,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch (error) {
            return false
          }
        },
      }),
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true
      }),
      // Highlight.extend({
      //    priority: 1000 
      // }),
      TextStyle,
      Color,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Text,
      BulletList,
      OrderedList,
      ListItem,
      TaskList,
      TaskItem.configure({
        nested: true
      }),
      CodeBlock,
      Blockquote,
    ], // define your extension array

    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl m-5 focus:outline-none text-white font-sans py-12 prose-headings:text-white editor-content',

        // class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none text-white font-sans py-12',
        // class: 'prose prose-sm sm:prose-base lg:prose-headings:h2 xl:prose-headings:h3 m-5 focus:outline-none',
      },
    },

    content: '<p>Tell your story...</p>', // initial content
  })

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <div className='h-screen'>
      <EditorContext.Provider value={providerValue}>
        <div className='flex justify-center mt-5 h-full '>
          <div className='w-2xl h-auto '>
            <EditorContent editor={editor} />
          </div>
        </div>
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      <BubbleMenu editor={editor}><FloatingToolbar></FloatingToolbar></BubbleMenu>
      </EditorContext.Provider>
    </div>
  )
}

export default Tiptap