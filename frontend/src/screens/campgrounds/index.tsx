import * as React from 'react'
import CampList from './components/CampList'
import { Spinner } from 'components/lib'
import { ErrorBoundaryWrap } from 'components/ErrorBoundary'
import SearchCamps from './components/SearchCamps'
import CampsOnMap from './components/CampsOnMap'
import { useGetCampgrounds } from 'hooks/campgrounds.hooks'
import { SearchWrap } from './components/styled'

export default function CampgroundsScreen() {
  const [search, setSearch] = React.useState<string>('')
  const campsQuery = useGetCampgrounds()
  React.useEffect(() => {
    document.title = 'Campgrounds | YelpCamp'
    document.querySelector('main')?.classList.add('no-margin')
    return () => {
      document.title = 'YelpCamp'
      document.querySelector('main')?.classList.remove('no-margin')
    }
  }, [])
  console.log(campsQuery)
  return (
    <>
      <React.Suspense fallback={<Spinner />}>
        <ErrorBoundaryWrap>
          <CampsOnMap />
        </ErrorBoundaryWrap>
      </React.Suspense>
      <SearchWrap>
        <h2 className="search-title">
          All campgrounds
          <br />
          {['loading', 'idle'].includes(campsQuery.status) ? (
            <Spinner />
          ) : campsQuery.status === 'success' ? (
            <small>
              <strong>{campsQuery.data?.count}</strong> campgrounds
            </small>
          ) : null}
        </h2>
        <SearchCamps
          keyword={search}
          onSearch={(search) => {
            setSearch(search)
          }}
        />
      </SearchWrap>
      <CampList query={campsQuery} />
    </>
  )
}
