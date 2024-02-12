import React, { ComponentProps } from 'react'
import { DeleteNoteButton, NewNoteButton } from '@/components'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton className="mr-2" />
      <DeleteNoteButton />
    </div>
  )
}
