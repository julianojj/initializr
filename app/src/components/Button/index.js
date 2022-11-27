import styled from 'styled-components'

const Container = styled.button`
    padding: 8px;
    background-color: #28a745;
    color: #fff;
    border: 1px solid #28a745;
    cursor: pointer;
`

const Button = (props) => {
    return (
        <Container
            {...props}
        >
            {props.children}
        </Container>
    )
}

export default Button
