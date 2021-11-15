import { useContext } from 'react'
import { SelectedGenreContext } from '../contexts/SelectedGenreContext'

export function useSelectedGenre() {
  const value = useContext(SelectedGenreContext)

  return value
}
