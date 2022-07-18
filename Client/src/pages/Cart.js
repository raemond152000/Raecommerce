
import React from 'react'
import { Add, Remove } from '@mui/icons-material'
import styled from 'styled-components'
import { Announcement } from '../components/Announcement'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px%" })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type ==="filled" && "none"};
    background-color: ${props=>props.type ==="filled" ? "black" : "transparent"};
    color: ${props=>props.type ==="filled" && "white"};
`
const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`
const Toptext = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
    flex: 3;
    //background-color: blue;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductID = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Sumarry = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
    //background-color: red;
`
const SumarryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "900"};
    font-size: ${props=>props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SumamryItemPrice = styled.span``
const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`
export const Cart = () => {
  return (
    <Container>
        <Navbar />
        <Announcement/>
        <Wrapper>
            <Title>Your Bag</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <Toptext>Shopping Bag(2)</Toptext>
                    <Toptext>Your Wishlist (0)</Toptext>
                </TopTexts>
                <TopButton type='filled'>CHECK OUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    <Product>
                        <ProductDetail>
                            <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                            <Details>
                                <ProductName><b>Product:</b>Joe Tshirt</ProductName>
                                <ProductColor color="grey"/>
                                <ProductID><b>ID:</b>902325</ProductID>
                                <ProductSize><b>Size:</b>S</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add />
                                <ProductAmount>2</ProductAmount>
                                <Remove />
                            </ProductAmountContainer>
                            <ProductPrice>$ 10</ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr/>
                    <Product>
                        <ProductDetail>
                            <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                            <Details>
                                <ProductName><b>Product:</b>Joe Shoes</ProductName>
                                <ProductColor color="black"/>
                                <ProductID><b>ID:</b>902325</ProductID>
                                <ProductSize><b>Size:</b>40.5</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add />
                                <ProductAmount>2</ProductAmount>
                                <Remove />
                            </ProductAmountContainer>
                            <ProductPrice>$ 30</ProductPrice>
                        </PriceDetail>
                    </Product>
                </Info>
                <Sumarry>
                    <SumarryTitle>ORDER SUMMARY</SumarryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SumamryItemPrice>$ 40</SumamryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SumamryItemPrice>$ 6.5</SumamryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SumamryItemPrice>$ -6.5</SumamryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total </SummaryItemText>
                        <SumamryItemPrice>$ 40</SumamryItemPrice>
                    </SummaryItem>
                    <SummaryButton>CHECK OUT NOW</SummaryButton>
                </Sumarry>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}
