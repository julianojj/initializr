import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
    padding: 16px;
    border-bottom: 1px solid #ddd;

    header {
        max-width: 1024px;
        width: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h1 {
            font-size: 24px;
        }

        nav {
            display: flex;
            align-items: center;
            gap: 16px;
        }
    }
`

const Header = () => {
    return (
        <Container>
            <header>
                <Link
                    href='/'
                >
                    <h1>Docker.Initializr</h1>
                </Link>
                <nav>
                    <Link
                        href='https://github.com/julianojj/initializr'
                        target='_blank'
                    >
                        About
                    </Link>
                </nav>
            </header>
        </Container>
    )
}

export default Header
