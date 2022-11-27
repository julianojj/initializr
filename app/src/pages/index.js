import styled from 'styled-components'
import Header from '../components/Header'
import Registry from '../components/Registry'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const App = ({ registeredImages }) => {
    return (
        <Container>
            <Header />
            <Registry
                registeredImages={registeredImages}
            />
        </Container>
    )
}

export const getServerSideProps = async () => {
    const response = await fetch(`${process.env.BASE_URL_APP}/api/images`)
    const data = await response.json()
    return {
        props: {
            registeredImages: data
        }
    }
}

export default App
