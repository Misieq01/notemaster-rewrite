import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position:absolute;
    z-index: 5000;
    background: red;
`

const LoadingScreen = () => {
    return <Container>LoadingScreen</Container>
}

export default LoadingScreen