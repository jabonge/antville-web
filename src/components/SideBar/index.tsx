import styled from '@emotion/styled'

import { useRootState } from '../../hooks/useRootState'
import { grey040, grey050 } from '../../mds/styled/colors'
import {
  StockListWrapper,
  StockListHeader,
  StockName,
  StockPrice,
  CompanyName,
  UpDownRate,
  UpDownIcon,
  StockListGroup,
  StockListItem,
} from '../../mds/styled/stockList'

const Wrapper = styled.div`
  position: absolute;
  left: 2.4rem;
`

const Main = styled.div`
  height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainLabel = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 150%;

  text-align: center;

  color: #202020;
`

const Footer = styled.div`
  margin-top: 2rem;
`

const Group = styled.div`
  display: flex;
  column-gap: 1rem;
`

const Item = styled.div`
  color: ${grey040};

  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
`

const NewStockListWrapper = styled(StockListWrapper)`
  width: 297px;
`

const ScrollBar = styled.div`
  overflow: auto;
  height: 459px;
  ::-webkit-scrollbar {
    width: 5px; /*스크롤바의 너비*/
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${grey050}; /*스크롤바의 색상*/
    border-radius: 7px;
  }
`

function SideBar() {
  const { watchList } = useRootState((state) => state)

  return (
    <>
      <Wrapper>
        <NewStockListWrapper>
          <StockListHeader>관심 종목</StockListHeader>
          {watchList ? (
            <ScrollBar>
              {watchList?.stocks.map((stock) => (
                <StockListGroup key={`${stock.id}-side-bar`}>
                  <StockListItem>
                    <StockName>{stock.krName}</StockName>
                    <StockPrice>₩64,551,100</StockPrice>
                  </StockListItem>
                  <StockListItem>
                    <CompanyName>{stock.symbol}/KRW</CompanyName>
                    <UpDownRate>
                      <UpDownIcon>*</UpDownIcon>20.21 (-2.91%)
                    </UpDownRate>
                  </StockListItem>
                </StockListGroup>
              ))}
            </ScrollBar>
          ) : (
            <Main>
              <MainLabel>
                원하는 종목을 검색하고
                <br />
                관심 종목 리스트에 등록해보세요!
              </MainLabel>
            </Main>
          )}
        </NewStockListWrapper>
        <Footer>
          <Group>
            <Item>약관</Item>
            <Item>개인정보 처리 방침</Item>
            <Item>© 2021 Antville, Inc.</Item>
          </Group>
        </Footer>
      </Wrapper>
    </>
  )
}

export default SideBar
