import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '../store'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return {
    selectedNote
  }
}
