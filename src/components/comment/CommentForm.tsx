import React, { RefObject, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import GifUploadButton from '../../static/svg/GifUploadButton'
import PictureUploadButton from '../../static/svg/PictureUploadButton'
import UserIcon from '../../static/svg/UserIcon'
import { useRootState } from '../common/hooks/useRootState'
import viewSlice from '../../reducers/Slices/view'
import ImageUpload from '../upload/ImageUpload'
import GifUpload from '../upload/GifUpload'
import {
  BodyLengthView,
  ButtonWrapper,
  Form,
  FormInner,
  InputWrapper,
  LockedLabel,
  PostInnerButtonsWrapper,
  PostItem,
  SubmitButton,
  UserIconWrapper,
} from '../../lib/styles/post'
import styled from '@emotion/styled'
import { GifDto } from '../../types/post'
import { useParams } from 'react-router-dom'
import PreviewImage from '../post/PreviewImage'
import commentSlice from '../../reducers/Slices/comment'
import CommentEditor from './CommentEditor'
import useCommentMutation from './hooks/useCommentMutation'
import postCommentFormData from '../../lib/api/comment/postCommentFormData'
import { commentEvent } from '../../lib/utils/ga'
import optimizeImage from '../../lib/utils/optimizeImage'

interface Props {
  parentCommentId?: number
  inputRef?: RefObject<any>
}

function CommentForm({ parentCommentId, inputRef }: Props) {
  const user = useRootState((state) => state.user)
  const { isFocusInput, body, bodyLength } = useRootState(
    (state) => state.comment
  )
  const { setIsFocusInput, setBody } = commentSlice.actions
  const { setIsOpenLoginForm } = viewSlice.actions
  const [uploadImage, setUploadImage] = useState<File>()
  const [gifDto, setGifDto] = useState<GifDto>()
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer>()

  const { id: postId } = useParams<{ id: string }>()

  const dispatch = useDispatch()

  const { mutation } = useCommentMutation({
    callback: (formData: FormData) => postCommentFormData(formData),
  })

  useEffect(() => {
    if (previewUrl !== undefined) dispatch(setIsFocusInput(true))
  }, [previewUrl])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({ body, postId, gifDto, uploadImage, parentCommentId })
    setUploadImage(undefined)
    dispatch(setIsFocusInput(false))
    setGifDto(undefined)
    dispatch(setBody(''))
    setPreviewUrl(undefined)
    commentEvent()
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormInner>
        <UserIconWrapper>
          {user?.profileImg ? (
            <img
              src={optimizeImage(user.profileImg, 120)}
              alt="post_form_avatar"
            />
          ) : (
            <UserIcon />
          )}
        </UserIconWrapper>
        <InputWrapper isFocus={isFocusInput}>
          {user ? (
            <>
              {/* {user.isEmailVerified ? (
                <> */}
              <CommentEditor inputRef={inputRef} />
              <PreviewImage
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                setUploadImage={setUploadImage}
                setGifDto={setGifDto}
              />
              <NewPostInnerButtonsWrapper>
                <PostItem>
                  <ImageUpload
                    setUploadImage={setUploadImage}
                    setGifDto={setGifDto}
                    setPreviewUrl={setPreviewUrl}
                  />
                </PostItem>
                <PostItem>
                  <GifUpload
                    setUploadImage={setUploadImage}
                    setGifDto={setGifDto}
                    setPreviewUrl={setPreviewUrl}
                  />
                </PostItem>
              </NewPostInnerButtonsWrapper>
            </>
          ) : (
            //   ) : (
            //     <EmailCheck>
            //       게시글 작성을 위해 이메일 인증을 완료해주세요.{' '}
            //       <NewFontBlue>이메일 인증 요청하기</NewFontBlue>
            //     </EmailCheck>
            //   )}
            // </>
            <>
              <LockedLabel onClick={() => dispatch(setIsOpenLoginForm(true))}>
                댓글을 입력해주세요.
              </LockedLabel>
              <NewPostInnerButtonsWrapper
                onClick={() => dispatch(setIsOpenLoginForm(true))}
              >
                <PostItem>
                  <PictureUploadButton />
                </PostItem>
                <PostItem>
                  <GifUploadButton />
                </PostItem>
              </NewPostInnerButtonsWrapper>
            </>
          )}
        </InputWrapper>
        <ButtonWrapper>
          <SubmitButton
            type="submit"
            disabled={
              body.length < 1 || body === '<p><br></p>' || bodyLength > 1000
            }
          >
            게시
          </SubmitButton>
          {isFocusInput && (
            <BodyLengthView isLimited={bodyLength > 1000}>
              {1000 - bodyLength}
            </BodyLengthView>
          )}
        </ButtonWrapper>
      </FormInner>
    </Form>
  )
}

const NewPostInnerButtonsWrapper = styled(PostInnerButtonsWrapper)`
  column-gap: 12px;
`

export default CommentForm
