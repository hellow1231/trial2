import { useState, useEffect, useCallback } from 'react'
import { programsApi } from '../lib/programsApi'
import type { Program } from '../lib/programsApi'

export function usePrograms(filters?: {
  featured?: boolean;
  status?: string;
  limit?: number;
  offset?: number;
}) {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true)
      const data = await programsApi.getPrograms(filters)
      setPrograms(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch programs'))
    } finally {
      setLoading(false)
    }
  }, [filters?.featured, filters?.status, filters?.limit, filters?.offset])

  useEffect(() => {
    fetchPrograms()
  }, [fetchPrograms])

  return { programs, loading, error, refetch: fetchPrograms }
}

export function useProgram(slug: string) {
  const [program, setProgram] = useState<Program | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true)
        const data = await programsApi.getProgram(slug)
        setProgram(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch program'))
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProgram()
    }
  }, [slug])

  return { program, loading, error }
}