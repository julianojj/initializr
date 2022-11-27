const registriesImages = [
    {
        type: 'nginx',
        image: 'https://www.nginx.com/wp-content/uploads/2021/08/NGINX-Part-of-F5-horiz-black-type-1.svg',
        name: 'NGINX',
        description: 'Advanced Load Balancer, Web Server, & Reverse Proxy.'
    },
    {
        type: 'rabbitmq',
        image: 'https://www.rabbitmq.com/img/logo-rabbitmq.svg',
        name: 'RabbitMQ',
        description: 'RabbitMQ is the most widely deployed open source message broker.'
    },
    {   type: 'mariadb',
        image: 'https://mariadb.com/wp-content/uploads/2019/11/mariadb-horizontal-blue.svg',
        name: 'MariaDB',
        description: 'MariaDB Server is a high performing open source relational database, forked from MySQL.'
    }
]

export default function handler(req, res) {
    const { type } = req.query
    if (!type) {
        res.status(200).json(registriesImages)
        return
    }
    const image = registriesImages.find(registry => registry.type === type)
    res.status(200).json(image)
}
