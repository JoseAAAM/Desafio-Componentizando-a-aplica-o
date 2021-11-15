import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

interface SelectedGenreProviderProps {
  children: ReactNode
}

interface SelectedGenreType {
  genres: GenreResponseProps[]
  movies: MovieProps[]
  selectedGenreId: number
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>
  selectedGenre: GenreResponseProps
}

interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

export const SelectedGenreContext = createContext({} as SelectedGenreType)

export function SelectedGenreProvider(props: SelectedGenreProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([])
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  )

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data)
      })

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data)
      })
  }, [selectedGenreId])

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data)
    })
  }, [])

  return (
    <SelectedGenreContext.Provider
      value={{
        genres,
        movies,
        selectedGenreId,
        selectedGenre,
        setSelectedGenreId
      }}
    >
      {props.children}
    </SelectedGenreContext.Provider>
  )
}
