import { homedir } from 'os'
import { appDirectoryName } from '@shared/constants'
import { ensureDir, readdir, readFile, stat, writeFile } from 'fs-extra'
import { fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote, WriteNote, CreateNote } from '@shared/types'
import { dialog } from 'electron'
import path from 'path'

export const getRootDir = () => {
  return `${homedir()}\\${appDirectoryName}`
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

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  const notes = await getNotes()

  await ensureDir(rootDir)
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}\\note${notes.length + 1}.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.log('Note creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}.`
    })

    return false
  }

  console.log(`Creating note ${filePath}`)
  await writeFile(filePath, '')

  return filename
}
