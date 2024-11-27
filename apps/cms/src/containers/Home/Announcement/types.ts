export interface IAnnouncement {
  _id: string
  weight: number
  content: string
  createdAt: string
  updatedAt: string
}

export interface Query {
  getAnnouncements: IAnnouncement[]
}

export interface CreateAnnouncementMutation {
  createAnnouncement: IAnnouncement
}

export interface CreateAnnouncementVars {
  input: {
    content: string
  }
}

export interface DeleteAnnouncementByIdMutation {
  deleteAnnouncementById: IAnnouncement
}

export interface DeleteAnnouncementByIdVars {
  id: string
}

export interface AnnouncementTableProps {
  dataSource: IAnnouncement[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  createAnnouncement: () => void
  updateAnnouncementById: () => void
  deleteAnnouncementById: () => void
  deleteAnnouncements: () => void
  exchangePosition: () => void
}

export interface AnnouncementModalProps {
  open: boolean
  handleOpen: () => void
  createAnnouncement: () => void
  updateAnnouncementById: () => void
}
