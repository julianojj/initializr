import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Header from "../../components/Header"
import Input from '../../components/Input'

const Container = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Actions = styled.div`
    max-width: 1024px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;

    a {
        &:hover {
            text-decoration: underline;
        }
    }

    span {
        color: red;
    }
`

const RegistryImage = styled.div`
    padding: 16px;
    max-width: 1024px;
    width: 100%;
    border: 1px solid #ddd;
    margin: auto;
    display: flex;
    flex-direction: column;

    img {
        max-width: 100px;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        p {
            margin: 0;
        }

        form {
            max-width: 600px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 16px;

            div {
                gap: 16px;

                div {
                    width: 100%;
                    .container-images {
                        display: flex;
                        flex-direction: row;
                        gap: 16px;
                    }

                }
            }
        }
    }
`

const Images = ({ data, type }) => {
    const [name, setName] = useState(`${type}_c`)
    const [ports, setPorts] = useState([])
    const [environment, setEnvironment] = useState([])
    const [volumes, setVolumes] = useState([])

    const addPorts = () => {
        const newPort = { host: '', container: '' }
        setPorts(oldPorts => [...oldPorts, newPort])
    }

    const removePort = (id) => {
        const filteredPorts = ports.filter((port, index) => index !== id)
        setPorts(filteredPorts)
    }

    const addEnvironments = () => {
        const newEnvironment = { name: '', value: '' }
        setEnvironment(oldEnviroments => [...oldEnviroments, newEnvironment])
    }

    const removeEnvironment = (id) => {
        const filteredEnvironments = environment.filter((environment, index) => index !== id)
        setEnvironment(filteredEnvironments)
    }

    const addVolumes = () => {
        const newVolume = { host: '', container: '' }
        setVolumes(oldVolumes => [...oldVolumes, newVolume])
    }

    const removeVolume = (id) => {
        const filteredVolumes = volumes.filter((volume, index) => index !== id)
        setVolumes(filteredVolumes)
    }

    const changeHostPort = (id, value) => {
        const newPorts = ports.map((port, index) => index === id ? { host: value, container: port.container } : port)
        setPorts(newPorts)
    }

    const changeContainerPort = (id, value) => {
        const newPorts = ports.map((port, index) => index === id ? { host: port.host, container: value } : port)
        setPorts(newPorts)
    }

    const changeNameEnvironment = (id, value) => {
        const newEnvironments = environment.map((environment, index) => index === id ? { name: value, value: environment.value }: environment)
        setEnvironment(newEnvironments)
    }

    const changeValueEnvironment = (id, value) => {
        const newEnvironments = environment.map((environment, index) => index === id ? { name: environment.name, value }: environment)
        setEnvironment(newEnvironments)
    }

    const changeHostVolume = (id, value) => {
        const newVolumes = volumes.map((volume, index) => index === id ? { host: value, container: volume.container } : volume)
        setVolumes(newVolumes)
    }

    const changeContainerVolume = (id, value) => {
        const newVolumes = volumes.map((volume, index) => index === id ? { host: volume.host, container: value } : volume)
        setVolumes(newVolumes)
    }

    const generate = async () => {
        const data = {
            type,
            name,
            ports,
            environment,
            volumes,
            network: 'bridge'
        }
        try {
            const response = await fetch(`${process.env.BASE_URL_API}/v1/container`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const output = await response.json()
            if (response.status !== 201) {
                alert(output.message)
                return
            }
            const url = `${process.env.BASE_URL_API}/${output.path}`
            window.open(url, '_blank')
        } catch (err) {
            alert('Error to generate dockerfile')
        }
    }

    return (
        <Container>
            <Header />
            <Actions>
                <Link
                    href='/'
                >Prev</Link>
            </Actions>
            <RegistryImage>
                <Image 
                    src={data.image}
                    alt=''
                    width={100}
                    height={50}
                />
                <div>
                    <p>{data.description}</p>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <Input
                            type='text'
                            placeholder='Container name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div>
                            <span>Mapping port</span>
                            {ports.length !== 0 &&
                                <div>
                                    {ports.map((port, index) => (
                                        <div
                                            key={index}
                                            className='container-images'
                                        >
                                            <Input
                                                type='text'
                                                placeholder='Host port'
                                                onChange={e => changeHostPort(index, e.target.value)}
                                                value={port.host}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Container port'
                                                onChange={e => changeContainerPort(index, e.target.value)}
                                                value={port.container}
                                            />
                                            <Button
                                                onClick={() => removePort(index)}
                                            >Remove</Button>
                                        </div>
                                    ))}
                                </div>
                            }
                            <Button
                                onClick={(e) => addPorts(e)}
                            >Add port</Button>
                        </div>
                        <div>
                            <span>Mapping environment</span>
                            {environment.length !== 0 &&
                                <div>
                                    {environment.map((environment, index) => (
                                        <div
                                            key={index}
                                            className='container-images'
                                        >
                                            <Input
                                                type='text'
                                                placeholder='Environment name'
                                                onChange={e => changeNameEnvironment(index, e.target.value)}
                                                value={environment.name}
                                            />
                                           <Input
                                                type='text'
                                                placeholder='Environment value'
                                                onChange={e => changeValueEnvironment(index, e.target.value)}
                                                value={environment.value}
                                            />
                                            <Button
                                                onClick={() => removeEnvironment(index)}
                                            >Remove</Button>
                                        </div>
                                    ))}
                                </div>
                            }
                            <Button
                                onClick={(e) => addEnvironments(e)}
                            >Add environment</Button>
                        </div>
                        <div>
                            <span>Mapping volume</span>
                            {volumes.length !== 0 &&
                                <div>
                                    {volumes.map((volume, index) => (
                                        <div
                                            key={index}
                                            className='container-images'
                                        >
                                            <Input
                                                type='text'
                                                placeholder='Host volume'
                                                onChange={e => changeHostVolume(index, e.target.value)}
                                                value={volume.host}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Container volume'
                                                onChange={e => changeContainerVolume(index, e.target.value)}
                                                value={volume.container}
                                            />
                                            <Button
                                                onClick={() => removeVolume(index)}
                                            >Remove</Button>
                                        </div>
                                    ))}
                                </div>
                            }
                            <Button
                                onClick={(e) => addVolumes(e)}
                            >Add volume</Button>
                        </div>
                        <Button
                            onClick={() => generate()}
                        >Generate</Button>
                    </form>
                </div>
            </RegistryImage>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const params = context.params
    const response = await fetch(`${process.env.BASE_URL_APP}/api/images?type=${params.type}`)
    const data = await response.json()
    return {
        props: {
            type: params.type,
            data
        }
    }
}

export default Images
