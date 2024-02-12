import { homedir } from 'os'
import { appDirectoryName } from '@shared/constants'
import { ensureDir, readdir, readFile, stat, writeFile } from 'fs-extra'
import { fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote } from '@shared/types'
import { WriteNote } from '../../shared/types'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename: string) => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()
  console.log(`Saving note ${filename} to ${rootDir}`)
  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}
