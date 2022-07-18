import React from 'react'
import styled from 'styled-components'

const Container =styled.div`
    height: 30px;
    background-color: teal;
    color:white;
    display: flex;
    justify-content: center;
    font: 14px;
    font-weight: 500;
`

export const Announcement = () => {
  return (
    <Container>
        Super Deal! Free Shipping on Orders over $50
    </Container>
  )
}
