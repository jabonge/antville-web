import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  EmptyWrapper,
  FeedAvatar,
  Inner,
  Item,
  Nickname,
  Wrapper,
} from '../../lib/styles/search'
import optimizeImage from '../../lib/utils/optimizeImage'
import searchSlice from '../../reducers/Slices/search'
import viewSlice from '../../reducers/Slices/view'
import UserIcon30 from '../../static/svg/UserIcon30'
import { useRootState } from '../common/hooks/useRootState'

export default function SearchUser() {
  const {
    search: { users },
  } = useRootState((state) => state.search)
  const { setQuery } = searchSlice.actions
  const { setIsOpenSearchBar } = viewSlice.actions
  const dispatch = useDispatch()
  const history = useHistory()

  if (!users) return <></>

  return (
    <>
      {users.length >= 1 ? (
        users.map((user) => (
          <Wrapper key={'user-search-' + user.id}>
            <Inner>
              <Item
                onClick={() => {
                  dispatch(setIsOpenSearchBar(false))
                  dispatch(setQuery(''))
                  history.push(`/user/${user.nickname}/profile`)
                }}
              >
                <FeedAvatar>
                  {user.profileImg ? (
                    <img
                      src={optimizeImage(user.profileImg, 120)}
                      alt="profile_image"
                    />
                  ) : (
                    <UserIcon30 />
                  )}
                </FeedAvatar>
                <Nickname>{user.nickname}</Nickname>
              </Item>
            </Inner>
          </Wrapper>
        ))
      ) : (
        <EmptyWrapper>검색 결과가 없습니다.</EmptyWrapper>
      )}
    </>
  )
}
