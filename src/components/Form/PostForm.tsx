import styled from '@emotion/styled'
import React, { useRef, useState } from 'react'
import usePostFormik from '../../hooks/usePostFormik'
import { grey010, grey030, grey080 } from '../../mds/styled/colors'
import GifUploadButton from '../../assets/svg/GifUploadButton'
import PictureUploadButton from '../../assets/svg/PictureUploadButton'
import StockDownButton from '../../assets/svg/StockDownButton'
import StockUpButton from '../../assets/svg/StockUpButton'
import UserIcon from '../../assets/svg/UserIcon'
import useElementSize from '../../hooks/useElementSize'
import FeedSection from '../Feed/FeedSection'
import { useRootState } from '../../hooks/useRootState'
import { FontBlue } from '../../mds/styled/texts'

const Form = styled.form`
  position: relative;
`

const FormInner = styled.div`
  display: flex;
  justify-content: space-between;

  column-gap: 1.4rem;
`

const InputWrapper = styled.div<{ isFocus: boolean }>`
  width: 56.1rem;

  padding: 12px 10px;

  background: #ffffff;
  border: 1px solid #bbbbbb;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  flex-direction: ${(p) => (p.isFocus ? 'column' : 'row')};
`

const PostInput = styled.textarea<{ isFocus: boolean; scrollHeight: number }>`
  align-self: center;
  width: 100%;
  height: ${(p) => (p.isFocus ? `76px` : '22px')};
  min-height: ${(p) => (p.isFocus ? `${p.scrollHeight}px` : '22px')};
  font-size: 16px;
  line-height: 2.2rem;
  outline: none;
  border: none;
  resize: none;

  padding: 0;

  color: #202020;
  background-color: #fff;

  &::placeholder {
    color: #aeaeae;
    font-size: 16px;
  }
`

const PostInnerButtonsWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2px;
`

const PostItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SubmitButton = styled.button`
  width: 55px;
  height: 29px;

  border-radius: 3px;
  border: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  margin-top: 9px;

  border: ${(props) =>
    props.disabled ? `1px solid ${grey030}` : '1px solid #1942e0'};
  background: ${(props) => (props.disabled ? `${grey030}` : '#1942e0')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  color: ${grey010};
`

const FeedTapWraaper = styled.div`
  margin-top: 36px;
  padding: 15px 21px;
  display: flex;
  column-gap: 44px;
`

const TabItem = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  padding-bottom: 3px;

  color: #000000;

  border-bottom: 1px solid #1942e0;
`

const UserIconWrapper = styled.div`
  margin-top: 3px;
`

const EmailCheck = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  color: ${grey080};
`

const NewFontBlue = styled(FontBlue)`
  cursor: pointer;
`

const PostForm = () => {
  const {
    dirty,
    isValid,
    values,
    errors,
    touched,
    isValidating,
    submitCount,
    handleSubmit,
    resetForm,
    getFieldProps,
  } = usePostFormik()
  const [isFocus, setIsFocus] = useState(false)

  const { user } = useRootState((state) => state)

  const textRef = useRef<HTMLTextAreaElement>(null)

  const { scrollHeight } = useElementSize(textRef)

  return (
    <Form onSubmit={handleSubmit}>
      <FormInner>
        <UserIconWrapper>
          <UserIcon />
        </UserIconWrapper>
        <InputWrapper isFocus={isFocus}>
          {user ? (
            <>
              {user.isEmailVerified ? (
                <>
                  <PostInput
                    id="postBody"
                    {...getFieldProps('postBody')}
                    placeholder={
                      '당신의 생각을 공유해주세요! ($ 태그 사용 후, 종목  입력) '
                    }
                    autoComplete="off"
                    onFocus={() => {
                      setIsFocus(true)
                    }}
                    isFocus={isFocus}
                    scrollHeight={scrollHeight}
                    ref={textRef}
                  />
                  <PostInnerButtonsWrapper>
                    <PostItem>
                      <StockUpButton />
                    </PostItem>
                    <PostItem>
                      <StockDownButton />
                    </PostItem>
                    <PostItem>
                      <PictureUploadButton />
                    </PostItem>
                    <PostItem>
                      <GifUploadButton />
                    </PostItem>
                  </PostInnerButtonsWrapper>
                </>
              ) : (
                <EmailCheck>
                  게시글 작성을 위해 이메일 인증을 완료해주세요.{' '}
                  <NewFontBlue>이메일 인증 요청하기</NewFontBlue>
                </EmailCheck>
              )}
            </>
          ) : (
            <EmailCheck>로그인 해주세요!</EmailCheck>
          )}
        </InputWrapper>

        <SubmitButton type="submit" disabled={!(dirty && isValid)}>
          게시
        </SubmitButton>
      </FormInner>
      <FeedTapWraaper>
        <TabItem>전체</TabItem>
        <TabItem>관심종목</TabItem>
        <TabItem>팔로잉</TabItem>
      </FeedTapWraaper>
      <FeedSection />
    </Form>
  )
}

export default PostForm
