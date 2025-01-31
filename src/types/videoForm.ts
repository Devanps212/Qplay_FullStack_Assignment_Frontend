export type VideoForm  = {
    title: string,
    video: File | null
}

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
}