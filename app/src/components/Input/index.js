import styled from 'styled-components'

const Container = styled.input`
    padding: 16px;
    border: 1px solid transparent;
    border-bottom-color: #333;
    outline: none;
    width: 100%;
`

const Input = (props) => {
    return (
        <Container
            {...props}
        >
            {props.children}
        </Container>
    )
}

export default Input
