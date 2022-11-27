import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
    padding: 16px;
    max-width: 1024px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .container-images {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 16px;

        .images {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 16px;
            border: 1px solid #ddd;
            color: #333;
            text-decoration: none;

            img {
                max-width: 100px;
            }

            div {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                h2 {
                    font-size: 15px;
                }

                p {
                    font-size: 13px;
                }
            }

            &:hover {
                background-color: #f1f1f1;
                cursor: pointer;
            }
        }

        @media (min-width: 640px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
`

const Registry = ({ registeredImages }) => {
    return (
        <Container>
            <h2>Registered Images</h2>
            <div
                className='container-images'
            >
                {registeredImages.map((image, index) => (
                    <Link
                        key={index}
                        className='images'
                        href={`/images/${image.type}`}
                    >
                        <Image 
                            src={image.image}
                            alt=''
                            width={100}
                            height={100}
                        />
                        <div>
                            <h2>{image.name}</h2>
                            <p>{image.description}</p>
                        </div>

                    </Link>
                ))}
            </div>
        </Container>
    )
}

export default Registry
